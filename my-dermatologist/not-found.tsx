import Link from "next/link";
import { getGlobalData } from "./lib/content";

export default async function NotFound() {
  let brandName = "Home";
  try {
    const { brand } = getGlobalData();
    brandName = brand.name;
  } catch {}
  
  return (
    <main className="dermatologist min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center px-6 py-20">
        <div className="mb-8">
          <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-6">
            Page Not Found
          </h2>
          <p className="text-xl text-text-muted max-w-md mx-auto mb-8">
            The page you're looking for doesn't exist or has been moved. Let's get you back on track.
          </p>
        </div>
        <Link
          href="/"
          className="inline-flex items-center gap-2 bg-primary text-primary-fg px-8 py-4 rounded-full font-semibold text-lg hover:bg-accent hover:text-accent-fg transition-all hover:scale-105"
        >
          Return to {brandName}
        </Link>
      </div>
    </main>
  );
}
