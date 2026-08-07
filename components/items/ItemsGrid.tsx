"use client";

import { useEffect, useMemo, useState } from "react";
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
 * Fetches all open items from Supabase, then handles search & filter
 * entirely client-side. Renders loading skeletons while fetching.
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
    <div className="flex flex-col gap-6">
      {/* Filters — always visible so user can search during load */}
      <ItemsFilter filters={filters} onChange={setFilters} />

      {/* Error */}
      {error && (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </p>
      )}

      {/* Loading skeletons */}
      {loading && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
            <ItemCardSkeleton key={i} />
          ))}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && filtered.length === 0 && (
        <EmptyState
          title={
            filters.search || filters.typeFilter !== "All" || filters.categoryFilter
              ? "No matching items"
              : "No items reported yet"
          }
          message={
            filters.search || filters.typeFilter !== "All" || filters.categoryFilter
              ? "Try adjusting your search or filters."
              : "Be the first to report a lost or found item."
          }
        />
      )}

      {/* Item grid */}
      {!loading && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <ItemCard key={item.id} item={item} />
          ))}
        </div>
      )}

      {/* Result count */}
      {!loading && !error && items.length > 0 && (
        <p className="text-center text-xs text-gray-400">
          Showing {filtered.length} of {items.length} open{" "}
          {items.length === 1 ? "item" : "items"}
        </p>
      )}
    </div>
  );
}
