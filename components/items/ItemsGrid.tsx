"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import type { Item } from "@/types/item";
import { fetchAllOpenItems } from "@/utils/itemService";
import { ItemCard } from "@/components/items/ItemCard";
import { ItemCardSkeleton } from "@/components/items/ItemCardSkeleton";
import { EmptyState } from "@/components/items/EmptyState";
import { ItemsFilter, type FilterState } from "@/components/items/ItemsFilter";

const INITIAL_FILTERS: FilterState = {
  search: "",
  typeFilter: "All",
  categoryFilter: "",
};

const SKELETON_COUNT = 6;

/**
 * Main browsing interface:
 * Includes Hero banner, quick action cards, stats cards, and search/filter grid.
 */
export function ItemsGrid() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);

  // ── Fetch once on mount ───────────────────────────────────────────────────
  useEffect(() => {
    let cancelled = false;

    fetchAllOpenItems()
      .then((data) => {
        if (!cancelled) setItems(data);
      })
      .catch((err: unknown) => {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Could not load items."
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  // // ── Statistics calculation ─────────────────────────────────────────────────
  // const stats = useMemo(() => {
  //   const totalOpen = items.length;
  //   const lostCount = items.filter((i) => i.item_type === "Lost").length;
  //   const foundCount = items.filter((i) => i.item_type === "Found").length;
  //   return { totalOpen, lostCount, foundCount };
  // }, [items]);

  // ── Client-side filtering ─────────────────────────────────────────────────
  const filtered = useMemo(() => {
    const query = filters.search.toLowerCase().trim();

    return items.filter((item) => {
      // Search: title or description
      if (
        query &&
        !item.title.toLowerCase().includes(query) &&
        !item.description.toLowerCase().includes(query)
      ) {
        return false;
      }

      // Type filter
      if (filters.typeFilter !== "All" && item.item_type !== filters.typeFilter) {
        return false;
      }

      // Category filter
      if (filters.categoryFilter && item.category !== filters.categoryFilter) {
        return false;
      }

      return true;
    });
  }, [items, filters]);

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-8">
      {/* ── 1. Hero & Action Cards Section ── */}
      <section className="relative overflow-hidden rounded-3xl border border-blue-100 bg-gradient-to-b from-blue-50/80 via-white to-gray-50/50 p-6 sm:p-8 md:p-10 shadow-xs">
        <div className="flex flex-col gap-6">
          {/* Header text */}
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-100/80 px-3 py-1 text-xs font-semibold text-blue-700 tracking-wide">
              Campus Lost &amp; Found Portal
            </span>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              AITM Lost &amp; Found
            </h1>
            <p className="mt-2 text-base text-gray-600 leading-relaxed">
              Helping students reconnect with their belongings. Report lost items or submit found property to reunite them with their owners.
            </p>
          </div>

          {/* Prominent Action Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Card 1: Lost Item */}
            <Link
              href="/report?type=Lost"
              className="group relative flex flex-col justify-between rounded-2xl border border-rose-200/80 bg-gradient-to-br from-rose-500 to-red-600 p-6 text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:from-rose-600 hover:to-red-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-rose-400"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-xl">
                  🟥
                </span>
                <svg
                  className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">I Lost Something</h2>
                <p className="mt-1 text-xs text-rose-100 leading-relaxed">
                  Lost an item on campus? Report it here with location and date to get help finding it.
                </p>
              </div>
            </Link>

            {/* Card 2: Found Item */}
            <Link
              href="/report?type=Found"
              className="group relative flex flex-col justify-between rounded-2xl border border-emerald-200/80 bg-gradient-to-br from-emerald-500 to-teal-600 p-6 text-white shadow-md transition-all duration-200 hover:-translate-y-1 hover:from-emerald-600 hover:to-teal-700 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400"
            >
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 backdrop-blur-xs text-xl">
                  🟩
                </span>
                <svg
                  className="h-5 w-5 opacity-70 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </div>
              <div className="mt-4">
                <h2 className="text-xl font-bold">I Found Something</h2>
                <p className="mt-1 text-xs text-emerald-100 leading-relaxed">
                  Found something left behind? Post details so the owner can contact you and claim it.
                </p>
              </div>
            </Link>
          </div>
        </div>
      </section>



      {/* ── 3. Filters & Search Section ── */}
      <ItemsFilter filters={filters} onChange={setFilters} />

      {/* Error State */}
      {error && (
        <p className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Loading Skeletons */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={
            filters.search || filters.typeFilter !== "All" || filters.categoryFilter
              ? "No matching items found"
              : "No items reported yet"
          }
          message={
            filters.search || filters.typeFilter !== "All" || filters.categoryFilter
              ? "Try adjusting your search criteria or changing your category filter."
              : "Be the first to report a lost or found item on campus."
          }
        />
      )}

      {/* Item Grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Result Count Footer */}
      {!loading && !error && items.length > 0 && (
        <p className="text-center text-xs text-gray-400 pb-4">
          Showing {filtered.length} of {items.length} open{" "}
          {items.length === 1 ? "item" : "items"}
        </p>
      )}
    </div>
  );
}

