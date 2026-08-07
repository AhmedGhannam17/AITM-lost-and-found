import type { Metadata } from "next";
import { ItemsGrid } from "@/components/items/ItemsGrid";

export const metadata: Metadata = {
  title: "Browse Items | AITM Lost & Found",
  description:
    "Browse all open lost and found items at AITM. Search and filter to find what you're looking for.",
};

/**
 * / — homepage.
 * Displays all open items with search and filter controls.
 */
export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Page heading */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">
          Lost &amp; Found
        </h1>
        <p className="mt-1.5 text-sm text-gray-500">
          Browse open items reported at AITM. Use the filters to narrow your
          search.
        </p>
      </div>

      <ItemsGrid />
    </main>
  );
}

