import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getPageSections, getPageSlugs, getPageSeo, buildMetadata } from "../lib/content";
import { getCollectionPageSections, getCollectionSlugs, getCollectionPageSeo } from "../lib/collections";
import ComponentMapper from "../components/ComponentMapper";

interface PageProps {
  params: Promise<{ slug?: string[] }>;
}

export async function generateStaticParams() {
  const pageSlugs = getPageSlugs();
  const collectionSlugs = getCollectionSlugs();
  const allSlugs = [...pageSlugs, ...collectionSlugs];
  
  return [
    { slug: undefined }, // home page
    ...allSlugs.map((slug) => ({ slug: slug.split("/") }))
  ];
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const pageName = slug && slug.length > 0 ? slug.join("/") : "home";
  
  const seo = getCollectionPageSeo(pageName) ?? getPageSeo(pageName) ?? {};
  return buildMetadata({ seo, page: pageName });
}

export default async function CatchAllPage({ params }: PageProps) {
  const { slug } = await params;
  const pageName = slug && slug.length > 0 ? slug.join("/") : "home";
  
  // Try collection routes first, then regular pages
  let sections = getCollectionPageSections(pageName);
  if (!sections) {
    sections = getPageSections(pageName);
  }
  
  if (!sections.length) notFound();

  return (
    <main className="dermatologist">
      {sections.map((section: any, i: number) => (
        <ComponentMapper key={i} section={section} />
      ))}
    </main>
  );
}
