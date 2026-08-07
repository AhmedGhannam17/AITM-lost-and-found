import Link from "next/link";
import Image from "next/image";

/**
 * Site-wide navigation bar.
 * Features AITM logo and quick navigation link to Browse Items.
 */
export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-gray-200 bg-white/95 backdrop-blur-sm">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Logo / brand */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-gray-900 hover:text-blue-600 transition-colors"
        >
          <Image
            src="/aitm-logo.png"
            alt="AITM Logo"
            width={32}
            height={32}
            className="h-8 w-auto object-contain"
            priority
          />
          <span>AITM Lost &amp; Found</span>
        </Link>

        {/* Primary action */}
        <Link
          href="/#items"
          className="inline-flex items-center gap-1.5 rounded-xl border border-gray-200/80 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-blue-600 transition-all shadow-xs"
        >
          <svg
            className="h-4 w-4 text-blue-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          Browse Items
        </Link>
      </nav>
    </header>
  );
}

