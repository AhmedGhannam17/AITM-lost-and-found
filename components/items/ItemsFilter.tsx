"use client";

import { CATEGORIES } from "@/constants/categories";
import type { ItemType } from "@/types/item";

export interface FilterState {
  search: string;
  typeFilter: ItemType | "All";
  categoryFilter: string;
}

interface ItemsFilterProps {
  filters: FilterState;
  onChange: (filters: FilterState) => void;
}

const TYPE_OPTIONS: Array<{ label: string; value: ItemType | "All" }> = [
  { label: "All", value: "All" },
  { label: "Lost", value: "Lost" },
  { label: "Found", value: "Found" },
];

/**
 * Search bar + type toggle + category select for the items list.
 * Fully controlled — parent owns filter state.
 */
export function ItemsFilter({ filters, onChange }: ItemsFilterProps) {
  function set(patch: Partial<FilterState>) {
    onChange({ ...filters, ...patch });
  }

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      {/* Search */}
      <div className="relative flex-1">
        <svg
          className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
          />
        </svg>
        <input
          type="search"
          placeholder="Search items…"
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          className="w-full rounded-lg border border-gray-300 py-2.5 pl-9 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          aria-label="Search items"
        />
      </div>

      {/* Type filter pill group */}
      <div
        className="inline-flex rounded-lg border border-gray-300 overflow-hidden shrink-0"
        role="group"
        aria-label="Filter by type"
      >
        {TYPE_OPTIONS.map(({ label, value }) => (
          <button
            key={value}
            type="button"
            onClick={() => set({ typeFilter: value })}
            className={[
              "px-4 py-2.5 text-sm font-medium transition-colors focus:outline-none",
              filters.typeFilter === value
                ? "bg-blue-600 text-white"
                : "bg-white text-gray-600 hover:bg-gray-50",
            ].join(" ")}
            aria-pressed={filters.typeFilter === value}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Category select */}
      <select
        value={filters.categoryFilter}
        onChange={(e) => set({ categoryFilter: e.target.value })}
        className="rounded-lg border border-gray-300 bg-white py-2.5 pl-3.5 pr-8 text-sm text-gray-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 shrink-0"
        aria-label="Filter by category"
      >
        <option value="">All Categories</option>
        {CATEGORIES.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>
    </div>
  );
}
