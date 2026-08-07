import Link from "next/link";

interface EmptyStateProps {
  /** Heading shown to the user. */
  title?: string;
  /** Supporting message shown below the heading. */
  message?: string;
}

/**
 * Shown when no items match the current search/filter.
 * Always offers a path to /report to encourage content creation.
 */
export function EmptyState({
  title = "No items found",
  message = "There are no open items matching your search.",
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 text-center">
      {/* Illustration */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100">
        <svg
          className="h-10 w-10 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803 7.5 7.5 0 0016.803 15.803z"
          />
        </svg>
      </div>

      <h2 className="text-base font-semibold text-gray-900">{title}</h2>
      <p className="mt-1.5 max-w-xs text-sm text-gray-500">{message}</p>

      <Link
        href="/report"
        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Report an Item
      </Link>
    </div>
  );
}
