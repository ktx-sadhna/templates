/**
 * Collections resolver — handles routing for collection-type pages.
 *
 * Responsibility split:
 *   - collections.json  → declares which URL patterns belong to each collection,
 *                          plus a reference to the content JSON that is the page shell.
 *   - content JSON      → all content config: $itemsFrom, $pageSize, $itemsFields,
 *                          $resolveRefs, headings, extra sections (membership, etc.)
 *   - content.ts        → loads and paginates items from the content JSON
 *   - collections.ts    → matches URLs to routes, extracts :page/:filterValue,
 *                          delegates rendering to content.ts via getPageSections()
 *
 * Route pattern tokens:
 *   :page        — page number (1-based)
 *   :filterValue — slug used to filter items by a ref field
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { getPageSections } from "./content";

const __filename = fileURLToPath(import.meta.url);
const TEMPLATE_ROOT = path.dirname(path.dirname(__filename));
const CONTENT_DIR = path.join(TEMPLATE_ROOT, "content");
const MANIFEST_PATH = path.join(CONTENT_DIR, "_collections.json");

// --- Manifest types --------------------------------------------------------

interface CollectionRoute {
  id: string;
  pattern: string;
  filterRef?: string;
  taxFolder?: string;
  taxKey?: string;
}

interface CollectionDef {
  contentFile: string;
  itemsSection: string;
  routes: CollectionRoute[];
}

interface CollectionsManifest {
  [collectionName: string]: CollectionDef;
}

// --- Helpers ---------------------------------------------------------------

function readJson<T = unknown>(filePath: string): T {
  return JSON.parse(fs.readFileSync(filePath, "utf-8").replace(/^\uFEFF/, "")) as T;
}

function getManifest(): CollectionsManifest {
  if (!fs.existsSync(MANIFEST_PATH)) return {};
  const raw = readJson<Record<string, unknown>>(MANIFEST_PATH);
  const { _readme: _, ...collections } = raw;
  return collections as CollectionsManifest;
}

function matchPattern(pattern: string, urlPath: string): Record<string, string> | null {
  const paramNames: string[] = [];
  const regexStr = pattern.replace(/:([a-zA-Z]+)/g, (_, name: string) => {
    paramNames.push(name);
    return "([^/]+)";
  });
  const match = new RegExp(`^${regexStr}$`).exec(urlPath);
  if (!match) return null;
  return Object.fromEntries(paramNames.map((name, i) => [name, match[i + 1]]));
}

function getSectionPageCount(
  contentFile: string,
  itemsSection: string,
  filterRef?: string,
  filterValue?: string
): number {
  const filePath = path.join(CONTENT_DIR, `${contentFile}.json`);
  if (!fs.existsSync(filePath)) return 1;
  const data = readJson<Record<string, Record<string, unknown>>>(filePath);
  const section = data[itemsSection];
  if (!section) return 1;
  const pageSize = section["$pageSize"] as number | undefined;
  if (!pageSize) return 1;
  const itemsFolder = section["$itemsFrom"] as string | undefined;
  const itemsKey = (section["$itemsKey"] as string) ?? itemsSection;
  if (!itemsFolder) return 1;
  const folderPath = path.join(CONTENT_DIR, itemsFolder);
  if (!fs.existsSync(folderPath)) return 1;
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".json")).sort();
  let count = 0;
  for (const file of files) {
    const item = readJson<Record<string, Record<string, unknown>>>(path.join(folderPath, file));
    if (!(itemsKey in item)) continue;
    if (filterRef && filterValue && item[itemsKey][filterRef] !== filterValue) continue;
    count++;
  }
  return Math.max(1, Math.ceil(count / pageSize));
}

function getUniqueFilterValues(contentFile: string, itemsSection: string, filterRef: string): string[] {
  const filePath = path.join(CONTENT_DIR, `${contentFile}.json`);
  if (!fs.existsSync(filePath)) return [];
  const data = readJson<Record<string, Record<string, unknown>>>(filePath);
  const section = data[itemsSection];
  if (!section) return [];
  const itemsFolder = section["$itemsFrom"] as string | undefined;
  const itemsKey = (section["$itemsKey"] as string) ?? itemsSection;
  if (!itemsFolder) return [];
  const folderPath = path.join(CONTENT_DIR, itemsFolder);
  if (!fs.existsSync(folderPath)) return [];
  const values = new Set<string>();
  const files = fs.readdirSync(folderPath).filter((f) => f.endsWith(".json")).sort();
  for (const file of files) {
    const item = readJson<Record<string, Record<string, unknown>>>(path.join(folderPath, file));
    if (!(itemsKey in item)) continue;
    const val = item[itemsKey][filterRef] as string | undefined;
    if (val) values.add(val);
  }
  return Array.from(values);
}

// --- Public API ------------------------------------------------------------

export function getCollectionSlugs(): string[] {
  const manifest = getManifest();
  const slugs: string[] = [];
  for (const def of Object.values(manifest)) {
    for (const route of def.routes) {
      const hasFilter = route.pattern.includes(":filterValue");
      const hasPage = route.pattern.includes(":page");
      const filterValues: (string | undefined)[] = hasFilter && route.filterRef
        ? getUniqueFilterValues(def.contentFile, def.itemsSection, route.filterRef)
        : [undefined];
      for (const filterValue of filterValues) {
        if (hasPage) {
          const totalPages = getSectionPageCount(def.contentFile, def.itemsSection, route.filterRef, filterValue);
          for (let p = 1; p <= totalPages; p++) {
            let resolved = route.pattern;
            if (filterValue) resolved = resolved.replace(":filterValue", filterValue);
            resolved = resolved.replace(":page", String(p));
            slugs.push(resolved.replace(/^\//, ""));
          }
        } else {
          let resolved = route.pattern;
          if (filterValue) resolved = resolved.replace(":filterValue", filterValue);
          slugs.push(resolved.replace(/^\//, ""));
        }
      }
    }
  }
  return slugs;
}

export function getCollectionPageSections(
  urlPath: string
): { id: string; [key: string]: unknown }[] | null {
  const manifest = getManifest();
  const normalised = `/${urlPath.replace(/^\//, "")}`;

  for (const def of Object.values(manifest)) {
    for (const route of def.routes) {
      const params = matchPattern(route.pattern, normalised);
      if (!params) continue;

      const page = params.page ? parseInt(params.page, 10) : 1;
      const filterValue = params.filterValue ?? null;

      const basePath = route.pattern
        .replace(/\/page\/:page$/, "")
        .replace(":filterValue", filterValue ?? "");

      const sections = getPageSections(def.contentFile, {
        page,
        filter: filterValue && route.filterRef
          ? { field: route.filterRef, value: filterValue }
          : undefined,
        basePath,
      });

      if (!sections.length) return null;

      // For filtered routes, override pageHero with the taxonomy profile data
      if (filterValue && route.taxFolder && route.taxKey) {
        const taxFilePath = path.join(CONTENT_DIR, route.taxFolder, `${filterValue}.json`);
        if (fs.existsSync(taxFilePath)) {
          const taxData = readJson<Record<string, Record<string, unknown>>>(taxFilePath);
          const profile = taxData[route.taxKey] ?? {};
          const heroIndex = sections.findIndex((s) => s.id === "pageHero");
          const hero = {
            id: "pageHero" as const,
            label: def.contentFile.charAt(0).toUpperCase() + def.contentFile.slice(1),
            heading: (profile.name as string) ?? filterValue,
            subtext: profile.description as string | undefined,
            image: heroIndex !== -1 ? sections[heroIndex].image : undefined,
          };
          if (heroIndex !== -1) {
            sections[heroIndex] = hero;
          } else {
            sections.unshift(hero);
          }
        }
      }

      return sections;
    }
  }

  return null;
}

/**
 * Returns SEO data for a collection-type page (e.g. /blog, /blog/page/2, /classes).
 * Reads the `_seo` key from the collection's content JSON file.
 * For filtered/paginated pages the base collection SEO is returned.
 */
export function getCollectionPageSeo(urlPath: string): import("./content").SeoData | null {
  const manifest = getManifest();
  const normalised = `/${urlPath.replace(/^\//, "")}`;

  for (const def of Object.values(manifest)) {
    for (const route of def.routes) {
      const params = matchPattern(route.pattern, normalised);
      if (!params) continue;

      const filePath = path.join(CONTENT_DIR, `${def.contentFile}.json`);
      if (!fs.existsSync(filePath)) return null;
      const data = readJson<Record<string, Record<string, unknown>>>(filePath);
      if (data.seo) return data.seo as import("./content").SeoData;
      return null;
    }
  }

  return null;
}
