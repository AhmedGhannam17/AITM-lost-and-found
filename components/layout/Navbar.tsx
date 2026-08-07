import Link from "next/link";

/**
 * Site-wide navigation bar.
 * Server component — no interactivity needed.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / brand */}
        <Link
          href="/"
          className="text-sm font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
        >
          AITM Lost &amp; Found
        </Link>

        {/* Primary action */}
        <Link
          href="/report"
          className="inline-flex items-center gap-1.5 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
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
              d="M12 4v16m8-8H4"
            />
          </svg>
          Report Item
        </Link>
      </nav>
    </header>
  );
}
