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
  { label: "All Items", value: "All" },
  { label: "Lost", value: "Lost" },
  { label: "Found", value: "Found" },
];

/**
 * Modern search bar + type toggle + category select container.
 */
export function ItemsFilter({ filters, onChange }: ItemsFilterProps) {
  function set(patch: Partial<FilterState>) {
    onChange({ ...filters, ...patch });
  }

  return (
    <div className="rounded-2xl border border-gray-200/80 bg-white p-4 sm:p-5 shadow-xs flex flex-col gap-4 sm:flex-row sm:items-center justify-between">
      {/* Search Bar */}
      <div className="relative flex-1 min-w-0">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3.5">
          <svg
            className="h-4 w-4 text-gray-400"
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
        </div>
        <input
          type="search"
          placeholder="Search by title or description..."
          value={filters.search}
          onChange={(e) => set({ search: e.target.value })}
          className="w-full rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder-gray-400 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          aria-label="Search items"
        />
      </div>

      {/* Filter Controls Group */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center shrink-0">
        {/* Type Toggle Pills */}
        <div
          className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200/60"
          role="group"
          aria-label="Filter by item type"
        >
          {TYPE_OPTIONS.map(({ label, value }) => {
            const isActive = filters.typeFilter === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => set({ typeFilter: value })}
                className={[
                  "rounded-lg px-3.5 py-1.5 text-xs font-semibold transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
                  isActive
                    ? value === "Lost"
                      ? "bg-rose-500 text-white shadow-xs"
                      : value === "Found"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "bg-white text-gray-900 shadow-xs"
                    : "text-gray-600 hover:text-gray-900",
                ].join(" ")}
                aria-pressed={isActive}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Category Select */}
        <select
          value={filters.categoryFilter}
          onChange={(e) => set({ categoryFilter: e.target.value })}
          className="rounded-xl border border-gray-200 bg-gray-50/50 py-2 pl-3.5 pr-8 text-xs font-medium text-gray-700 outline-none transition-all focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100 shrink-0 cursor-pointer"
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
    </div>
  );
}

