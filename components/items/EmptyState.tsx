import Link from "next/link";

interface EmptyStateProps {
  /** Heading shown to the user. */
  title?: string;
  /** Supporting message shown below the heading. */
  message?: string;
}

/**
 * Shown when no items match the current search/filter.
 * Offers quick paths to report lost or found items.
 */
export function EmptyState({
  title = "No items found",
  message = "There are no open items matching your search.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-gray-300 bg-white/60 p-8 py-16 text-center shadow-xs">
      {/* Friendly Illustration */}
      <div className="mb-5 flex h-20 w-20 items-center justify-center rounded-2xl bg-blue-50/80 text-blue-600 ring-8 ring-blue-50/40">
        <svg
          className="h-10 w-10 stroke-[1.5]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803zM10.5 7.5v6m-3-3h6"
          />
        </svg>
      </div>

      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <p className="mt-2 max-w-sm text-sm text-gray-500 leading-relaxed">
        {message}
      </p>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <Link
          href="/report?type=Lost"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-rose-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-rose-700 transition-colors shadow-xs"
        >
          <span>🟥 Report Lost Item</span>
        </Link>
        <Link
          href="/report?type=Found"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-emerald-700 transition-colors shadow-xs"
        >
          <span>🟩 Report Found Item</span>
        </Link>
      </div>
    </div>
  );
}

