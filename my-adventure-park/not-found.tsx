import Link from "next/link";
import { getGlobalData } from "./lib/content";

export default async function NotFound() {
  let brandName = "Home";
  try {
    const { brand } = getGlobalData();
    brandName = brand.name;
  } catch {}
  
  return (
    <main className="adventure-park min-h-screen flex items-center justify-center bg-bg">
      <div className="text-center px-6">
        <h1 className="font-heading text-8xl md:text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="font-heading text-3xl md:text-4xl font-bold text-text mb-4">
          Lost on the Trail?
        </h2>
        <p className="text-xl text-text-muted mb-8 max-w-md mx-auto">
          The adventure you're looking for doesn't exist. Let's get you back to {brandName}.
        </p>
        <Link
          href="/"
          className="inline-block px-8 py-4 bg-primary text-primary-fg rounded-full font-bold text-lg hover:bg-accent hover:scale-105 transition-all duration-300"
        >
          Return to Base Camp
        </Link>
      </div>
    </main>
  );
}
