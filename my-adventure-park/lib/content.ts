import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { GlobalData } from "../types";


const __filename = fileURLToPath(import.meta.url);
const TEMPLATE_ROOT = path.dirname(path.dirname(__filename));
const CONTENT_DIR = path.join(TEMPLATE_ROOT, "content");

function readJson(filePath: string) {
  return fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "");
}

/**
 * Reads `content/global.json` and returns shared layout data (brand, nav, footer).
 * Used by every page to populate <Navbar> and <Footer> with consistent site-wide content.
 */
export function getGlobalData(): GlobalData {
  const file = readJson(path.join(CONTENT_DIR, "_global.json"));
  const data = JSON.parse(file);
  return {
    brand: data.brand,
    nav: data.nav,
    footer: data.footer,
    theme: data.theme ?? "theme-midnight",
    headingFont: data.headingFont ?? "Crimson Pro",
    bodyFont: data.bodyFont ?? "Nunito",
  };
}

export interface SeoData {
  title?: string;
  description?: string;
  keywords?: string[];
  alternates?: {
    canonical?: string;
    languages?: Record<string, string>;
  };
  openGraph?: {
    title?: string;
    description?: string;
    url?: string;
    siteName?: string;
    images?: { url: string; width?: number; height?: number; alt?: string }[];
    locale?: string;
    type?: string;
  };
  twitter?: {
    card?: string;
    title?: string;
    description?: string;
    images?: string[];
    creator?: string;
  };
  robots?: {
    index?: boolean;
    follow?: boolean;
    nocache?: boolean;
    googleBot?: Record<string, unknown>;
  };
  structuredData?: Record<string, unknown>;
}

export interface BuildMetadataOptions {
  /** Resolved SeoData from `getPageSeo` or `getCollectionPageSeo`. */
  seo: SeoData;
  /** Current page slug (e.g. "about", "blog/my-post"). Used for title fallback. */
  page: string;
}

/**
 * Converts a resolved `SeoData` object into a Next.js `Metadata` object.
 * Reads site name and default description from `_global.json` — no hardcoded values.
 *
 * @example
 * const seo = getCollectionPageSeo(page) ?? getPageSeo(page) ?? {};
 * return buildMetadata({ seo, page });
 */
export function buildMetadata({ seo, page }: BuildMetadataOptions): import("next").Metadata {
  const { brand } = getGlobalData();
  const siteName = brand.name;
  const defaultDescription = brand.siteDescription ?? brand.tagline;

  const title = seo.title
    ? seo.title
    : page === "home"
    ? siteName
    : `${page.split("/").pop()!.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | ${siteName}`;

  const description = seo.description ?? defaultDescription;

  return {
    title,
    description,
    ...(seo.keywords?.length ? { keywords: seo.keywords } : {}),
    ...(seo.alternates ? { alternates: seo.alternates } : {}),
    openGraph: seo.openGraph ?? { title, description, siteName, type: "website" },
    twitter: seo.twitter ?? { card: "summary_large_image", title, description },
    ...(seo.robots ? { robots: seo.robots } : {}),
    ...(seo.structuredData
      ? { other: { "application/ld+json": JSON.stringify(seo.structuredData) } }
      : {}),
  };
}

/**
 * Returns SEO metadata for a given page slug.
 * Reads the `seo` key from content JSON. For item detail pages without an explicit
 * `seo` key, falls back to deriving values from the first content section.
 */
export function getPageSeo(slug: string): SeoData {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return {};
  const data = JSON.parse(readJson(filePath)) as Record<string, Record<string, unknown>>;

  if (data.seo) return data.seo as SeoData;

  // Fallback: extract from first non-underscore section (covers blog/class/event detail pages)
  const firstSection = Object.entries(data).find(([k]) => !k.startsWith("_"))?.[1];
  if (!firstSection) return {};
  const title = (firstSection.title ?? firstSection.heading) as string | undefined;
  const description = (firstSection.excerpt ?? firstSection.description ?? firstSection.subtext) as string | undefined;
  const image = firstSection.image as string | undefined;
  return {
    title,
    description,
    openGraph: { title, description, ...(image ? { images: [{ url: image, width: 1200, height: 630, alt: title }] } : {}) },
    twitter: { card: "summary_large_image", title, description, ...(image ? { images: [image] } : {}) },
  };
}

export interface PageOptions {
  /** Current page number (1-based). Used when a $itemsFrom section has $pageSize. */
  page?: number;
  /** Filter items by a ref field value (e.g. { field: "categoryRef", value: "mindfulness" }). */
  filter?: { field: string; value: string };
  /** Pagination base path for link generation (e.g. "/blog" or "/blog/categories/mindfulness"). */
  basePath?: string;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  basePath: string;
  prevHref: string | null;
  nextHref: string | null;
}

/**
 * Reads `content/[slug].json` and returns its sections as an ordered array.
 * The JSON file is a keyed object (e.g. { hero: {...}, about: {...} });
 * Object.entries() converts it into an array so ComponentMapper can iterate and
 * render each section by its `id` field. Returns [] if the file doesn't exist.
 *
 * Supports cross-page shared sections via `{ "$ref": "<slug>" }` stubs.
 * When a section stub has a `$ref` key, its content is loaded from the referenced
 * page's JSON file (e.g. `contact.json`) so one file is the single source of truth.
 *
 * Supports subfolder-driven item lists via `"$itemsFrom"` on a section.
 * When a section has `$itemsFrom`, all JSON files in `content/<folder>/` are scanned,
 * the specified `$itemsKey` sub-object is extracted, only `$itemsFields` are kept,
 * and the result is set as `items` on the section — no duplication needed.
 */
export function getPageSections(slug: string, options?: PageOptions): { id: string; [key: string]: unknown }[] {
  const filePath = path.join(CONTENT_DIR, `${slug}.json`);
  if (!fs.existsSync(filePath)) return [];
  const file = readJson(filePath);
  const data = JSON.parse(file) as Record<string, { id: string; $ref?: string; $itemsFrom?: string; $itemsKey?: string; $itemsFields?: string[]; [key: string]: unknown }>;

  return Object.entries(data)
    .filter(([key]) => !key.startsWith("_"))
    .map(([key, section]) => resolveSection(key, section, options));
}

type RefMapping = { folder: string; key: string };
type RawSection = { id?: string; $ref?: string; $itemsFrom?: string; $itemsKey?: string; $itemsFields?: string[]; $resolveRefs?: Record<string, RefMapping>; $itemsFilter?: Record<string, string>; $pageSize?: number; count?: number; [key: string]: unknown };

function resolveSection(key: string, section: RawSection, options?: PageOptions): { id: string; [key: string]: unknown } {
  // Resolve $ref: load the section from the referenced page file, then resolve it too.
  // Extra keys alongside $ref (e.g. count) are forwarded as overrides into the resolved section.
  if (section["$ref"]) {
    const refSlug = section["$ref"] as string;
    // Try the direct path first, then the _-prefixed filename (non-route convention)
    const refDir = path.dirname(path.join(CONTENT_DIR, `${refSlug}.json`));
    const refBase = path.basename(refSlug);
    const refPath = path.join(CONTENT_DIR, `${refSlug}.json`);
    const refPathUnderscored = path.join(refDir, `_${refBase}.json`);
    const resolvedRefPath = fs.existsSync(refPath) ? refPath : fs.existsSync(refPathUnderscored) ? refPathUnderscored : null;
    if (resolvedRefPath) {
      const refData = JSON.parse(readJson(resolvedRefPath)) as Record<string, RawSection>;
      if (refData[key]) {
        const { $ref: _, ...overrides } = section;
        return { ...resolveSection(key, { ...refData[key], ...overrides }, options), _sharedSource: refSlug };
      }
    }
  }
  // Resolve $itemsFrom: build items array from subfolder JSON files
  if (section["$itemsFrom"]) {
    const folder = section["$itemsFrom"] as string;
    const itemsKey = (section["$itemsKey"] as string) ?? folder;
    const fields = section["$itemsFields"] as string[] | undefined;
    const count = section["count"] as number | undefined;
    const pageSize = section["$pageSize"] as number | undefined;
    const folderPath = path.join(CONTENT_DIR, folder);
    const resolveRefs = section["$resolveRefs"] as Record<string, RefMapping> | undefined;
    const itemsFilter = section["$itemsFilter"] as Record<string, string> | undefined;
    const { $itemsFrom: _, $itemsKey: __, $itemsFields: ___, count: ____, $resolveRefs: _____, $itemsFilter: ______, $pageSize: _______, ...rest } = section;
    if (fs.existsSync(folderPath)) {
      const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".json")).sort();
      let items = files.map((file) => {
        const fileData = JSON.parse(readJson(path.join(folderPath, file))) as Record<string, Record<string, unknown>>;
        // Skip files that don't contain the expected key (e.g. authors.json in blog/ root)
        if (!(itemsKey in fileData)) return null;
        const detail = fileData[itemsKey];
        let item: Record<string, unknown> = detail;
        if (fields) {
          item = fields.reduce<Record<string, unknown>>((acc, f) => { if (f in detail) acc[f] = detail[f]; return acc; }, {});
        }
        // Apply static filter from the section config
        if (itemsFilter) {
          const passes = Object.entries(itemsFilter).every(([k, v]) => detail[k] === v);
          if (!passes) return null;
        }
        // Apply dynamic filter from page options (e.g. filter by categoryRef value)
        if (options?.filter) {
          const rawVal = detail[options.filter.field];
          if (rawVal !== options.filter.value) return null;
        }
        // Resolve ref fields (e.g. authorRef -> author object, categoryRef -> category object)
        if (resolveRefs) {
          for (const [refField, mapping] of Object.entries(resolveRefs)) {
            const refSlug = item[refField] as string | undefined;
            if (refSlug) {
              const refFilePath = path.join(CONTENT_DIR, mapping.folder, `${refSlug}.json`);
              if (fs.existsSync(refFilePath)) {
                const refData = JSON.parse(readJson(refFilePath)) as Record<string, unknown>;
                item[refField.replace("Ref", "")] = refData[mapping.key] ?? refData;
              }
            }
          }
        }
        return item;
      }).filter((item): item is Record<string, unknown> => item !== null);

      // Apply count limit (used on home/preview sections)
      if (count !== undefined) items = items.slice(0, count);

      // Apply $pageSize pagination when requested via options.page
      if (pageSize && options?.page !== undefined) {
        const currentPage = Math.max(1, options.page);
        const totalPages = Math.max(1, Math.ceil(items.length / pageSize));
        const safePage = Math.min(currentPage, totalPages);
        const start = (safePage - 1) * pageSize;
        const pagedItems = items.slice(start, start + pageSize);
        const bp = options.basePath ?? "";
        const pagination: Pagination = totalPages > 1 ? {
          currentPage: safePage,
          totalPages,
          basePath: bp,
          prevHref: safePage > 1 ? (safePage === 2 ? bp : `${bp}/page/${safePage - 1}`) : null,
          nextHref: safePage < totalPages ? `${bp}/page/${safePage + 1}` : null,
        } : { currentPage: 1, totalPages: 1, basePath: bp, prevHref: null, nextHref: null };
        return { ...rest, items: pagedItems, pagination } as { id: string; [key: string]: unknown };
      }

      return { ...rest, items } as { id: string; [key: string]: unknown };
    }
    return rest as { id: string; [key: string]: unknown };
  }
  // Resolve inline authorRef / categoryRef fields on any section
  const resolved = { ...(section as { id: string; [key: string]: unknown }) };
  const inlineRefFields = Object.keys(resolved).filter((k) => k.endsWith("Ref") && typeof resolved[k] === "string");
  const refConfigMap: Record<string, { folder: string; dataKey: string }> = {
    authorRef: { folder: "blog/authors", dataKey: "authorProfile" },
    categoryRef: { folder: "blog/categories", dataKey: "categoryProfile" },
  };
  for (const refField of inlineRefFields) {
    const config = refConfigMap[refField];
    if (!config) continue;
    const refSlug = resolved[refField] as string;
    const resolvedKey = refField.replace("Ref", ""); // "author" or "category"
    const refFilePath = path.join(CONTENT_DIR, config.folder, `${refSlug}.json`);
    if (fs.existsSync(refFilePath)) {
      const refData = JSON.parse(readJson(refFilePath)) as Record<string, unknown>;
      resolved[resolvedKey] = refData[config.dataKey] ?? refData;
    }
  }
  // Recursively resolve nested $ref / $itemsFrom directives in any remaining fields
  for (const k of Object.keys(resolved)) {
    if (typeof resolved[k] === "object" && resolved[k] !== null) {
      resolved[k] = resolveNestedDirectives(resolved[k]);
    }
  }
  return resolved;
}

/**
 * Recursively resolves `$ref` and `$itemsFrom` directives inside any nested object or array.
 * This allows content fields (not just top-level sections) to reference shared files or
 * dynamically collect item lists from subfolders — e.g. a `nav` field that auto-builds
 * from the docs/ folder structure without any manual nav maintenance.
 */
function resolveNestedDirectives(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(resolveNestedDirectives);
  if (value === null || typeof value !== "object") return value;
  const obj = value as Record<string, unknown>;

  // Nested $ref: load the referenced file and return its content (recursively resolved)
  if ("$ref" in obj && typeof obj["$ref"] === "string") {
    const refPath = path.join(CONTENT_DIR, `${obj["$ref"]}.json`);
    if (!fs.existsSync(refPath)) return value;
    const refData = JSON.parse(readJson(refPath)) as Record<string, unknown>;
    const { $ref: _, ...extras } = obj;
    return resolveNestedDirectives({ ...refData, ...extras });
  }

  // Nested $itemsFrom: collect items from a subfolder (same semantics as section-level)
  if ("$itemsFrom" in obj && typeof obj["$itemsFrom"] === "string") {
    const folder = obj["$itemsFrom"] as string;
    const itemsKey = (obj["$itemsKey"] as string | undefined) ?? folder.split("/").pop()!;
    const fields = obj["$itemsFields"] as string[] | undefined;
    const folderPath = path.join(CONTENT_DIR, folder);
    if (!fs.existsSync(folderPath)) return [];
    const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".json")).sort();
    const items = files.map((file) => {
      const fileData = JSON.parse(readJson(path.join(folderPath, file))) as Record<string, Record<string, unknown>>;
      if (!(itemsKey in fileData)) return null;
      const detail = fileData[itemsKey];
      if (fields) {
        return fields.reduce<Record<string, unknown>>((acc, f) => { if (f in detail) acc[f] = detail[f]; return acc; }, {});
      }
      return resolveNestedDirectives(detail) as Record<string, unknown>;
    }).filter((item): item is Record<string, unknown> => item !== null);
    // Sort by `order` field if every item has one
    if (items.length > 0 && items.every((item) => typeof item["order"] === "number")) {
      items.sort((a, b) => (a["order"] as number) - (b["order"] as number));
    }
    return items;
  }

  // Nested $navFrom: build a { sections: [...] } nav from the docs folder structure.
  // Each immediate subdirectory of content/<folder>/ becomes a section.
  // Section title is derived from the folder name (kebab-case → Title Case).
  // Items are collected from JSON files in the subfolder using the "docLayout" key,
  // picking "order", "label", and "href" fields, sorted by "order".
  if ("$navFrom" in obj && typeof obj["$navFrom"] === "string") {
    const baseFolder = obj["$navFrom"] as string;
    const basePath = path.join(CONTENT_DIR, baseFolder);
    if (!fs.existsSync(basePath)) return { sections: [] };
    const subfolders = fs.readdirSync(basePath, { withFileTypes: true })
      .filter((e) => e.isDirectory())
      .map((e) => e.name)
      .sort();
    const sections = subfolders.map((folderName) => {
      const slug = folderName;
      const title = folderName.split("-").map((w) => w.charAt(0).toUpperCase() + w.slice(1)).join(" ");
      const folderPath = path.join(basePath, folderName);
      // Read optional _section.json for section-level order
      const sectionMetaPath = path.join(folderPath, "_section.json");
      let sectionOrder = 9999;
      if (fs.existsSync(sectionMetaPath)) {
        const meta = JSON.parse(readJson(sectionMetaPath)) as Record<string, unknown>;
        if (typeof meta["order"] === "number") sectionOrder = meta["order"];
      }
      const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".json") && f !== "_section.json").sort();
      const items = files.map((file) => {
        const fileData = JSON.parse(readJson(path.join(folderPath, file))) as Record<string, Record<string, unknown>>;
        if (!("docLayout" in fileData)) return null;
        const dl = fileData["docLayout"];
        return {
          order: dl["order"] ?? 0,
          label: dl["label"] ?? "",
          href: dl["href"] ?? "",
        };
      }).filter((item): item is { order: number; label: string; href: string } =>
        item !== null &&
        typeof item.order === "number" &&
        typeof item.label === "string" &&
        typeof item.href === "string"
      );
      items.sort((a, b) => (a.order as number) - (b.order as number));
      return { title, slug, items, _sectionOrder: sectionOrder };
    });
    sections.sort((a, b) => a._sectionOrder - b._sectionOrder);
    return { sections: sections.map(({ _sectionOrder: _, ...s }) => s) };
  }

  // Plain object — recurse into all values
  return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, resolveNestedDirectives(v)]));
}

/**
 * Scans the `content/` directory recursively at build time
 * and returns all page slugs, excluding `global.json`.
 * Supports nested slugs like `classes/community-flow` → `/classes/community-flow`
 * and `blog/author/aisha-patel` → `/blog/author/aisha-patel`.
 */
export function getPageSlugs(): string[] {
  function scanDir(dir: string, prefix: string): string[] {
    const results: string[] = [];
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      if (entry.isDirectory()) {
        results.push(...scanDir(path.join(dir, entry.name), prefix ? `${prefix}/${entry.name}` : entry.name));
      } else if (entry.isFile() && entry.name.endsWith(".json") && !entry.name.startsWith("_")) {
        const slug = entry.name.replace(/\.json$/, "");
        results.push(prefix ? `${prefix}/${slug}` : slug);
      }
    }
    return results;
  }

  return scanDir(CONTENT_DIR, "");
}

