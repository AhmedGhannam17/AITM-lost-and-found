import type { Metadata } from "next";
import { ItemsGrid } from "@/components/items/ItemsGrid";

export const metadata: Metadata = {
  title: "AITM Lost & Found | Campus Belongings Portal",
  description:
    "Browse open lost and found items reported at AITM. Search, filter, and reconnect with your belongings.",
};

/**
 * / — homepage.
 * Renders Hero section, stats, search/filters, and items grid.
 */
export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
      <ItemsGrid />
    </main>
  );
}


