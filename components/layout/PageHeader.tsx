import Link from "next/link";

interface PageHeaderProps {
  title: string;
  description?: string;
  backHref?: string;
  backLabel?: string;
}

/**
 * Consistent top-of-page header used across route pages.
 * Optionally renders a back navigation link.
 */
export function PageHeader({
  title,
  description,
  backHref,
  backLabel = "Back",
}: PageHeaderProps) {
  return (
    <div className="mb-8">
      {backHref && (
        <Link
          href={backHref}
          className="mb-4 inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 transition-colors"
        >
          <svg
            className="h-4 w-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          {backLabel}
        </Link>
      )}
      <h1 className="pl-1.5 text-2xl font-bold tracking-tight white">
        {title}
      </h1>
      {description && (
        <p className="mt-1.5 text-sm text-gray-500 white">{description}</p>
      )}
    </div>
  );
}
