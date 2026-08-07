import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { fetchItemById } from "@/utils/itemService";
import { ItemTypeBadge, StatusBadge } from "@/components/ui/Badge";
import { PageHeader } from "@/components/layout/PageHeader";
import { ItemActions } from "@/components/items/ItemActions";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Generate dynamic metadata from the item's title. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItemById(id);
  if (!item) return { title: "Item Not Found | AITM Lost & Found" };
  return {
    title: `${item.title} | AITM Lost & Found`,
    description: item.description,
  };
}

/**
 * /item/[id] — item detail page.
 * View of a single item's full information with action buttons (Edit, Claim, Delete).
 */
export default async function ItemDetailPage({ params }: PageProps) {
  const { id } = await params;
  const item = await fetchItemById(id);

  if (!item) notFound();

  const formattedDate = new Date(item.event_date).toLocaleDateString("en-PK", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const formattedReported = new Date(item.created_at).toLocaleDateString(
    "en-PK",
    { year: "numeric", month: "short", day: "numeric" }
  );

  return (
    <main className="mx-auto w-full max-w-3xl px-4 py-8 sm:px-6 lg:px-8">
      <PageHeader
        title={item.title}
        backHref="/"
        backLabel="Back to Browse"
      />

      <div className="flex flex-col gap-6">
        {/* ── Image ── */}
        {item.image_url && (
          <div className="relative w-full overflow-hidden rounded-3xl border border-gray-200/80 bg-gray-100 shadow-xs aspect-[16/9] max-h-96">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-contain p-2"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        {/* ── Badges & Actions Bar ── */}
        <div className="flex flex-col gap-4 rounded-2xl border border-gray-200/80 bg-white p-4 shadow-xs sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap items-center gap-2">
            <ItemTypeBadge type={item.item_type} />
            <StatusBadge status={item.status} />
          </div>
          <ItemActions item={item} />
        </div>

        {/* ── Detail sections ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Description Card */}
          <section className="sm:col-span-2 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
            <h2 className="mb-3 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <svg className="h-4 w-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Description
            </h2>
            <p className="text-sm text-gray-900 font-normal leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </section>

          {/* Location Card */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <svg className="h-4 w-4 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Location Details
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-xs text-gray-500 font-medium">Campus Area</dt>
                <dd className="mt-0.5 font-bold text-gray-900">{item.campus_area}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 font-medium">Specific Location</dt>
                <dd className="mt-0.5 font-bold text-gray-900">{item.specific_location}</dd>
              </div>
            </dl>
          </section>

          {/* Item Info Card */}
          <section className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-gray-500 flex items-center gap-1.5">
              <svg className="h-4 w-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Item Information
            </h2>
            <dl className="flex flex-col gap-3 text-sm">
              <div>
                <dt className="text-xs text-gray-500 font-medium">Category</dt>
                <dd className="mt-0.5 font-bold text-gray-900">{item.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 font-medium">Date Lost / Found</dt>
                <dd className="mt-0.5 font-bold text-gray-900">{formattedDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 font-medium">Reported On</dt>
                <dd className="mt-0.5 font-bold text-gray-900">{formattedReported}</dd>
              </div>
            </dl>
          </section>

          {/* Contact Card — Solid White background with clean high-contrast text */}
          <section className="sm:col-span-2 rounded-2xl border border-gray-200/80 bg-white p-6 shadow-xs">
            <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-blue-600 flex items-center gap-1.5">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Contact Person
            </h2>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 text-sm">
              <div>
                <dt className="text-xs text-gray-500 font-medium">Contact Name</dt>
                <dd className="mt-0.5 text-base font-bold text-gray-900">{item.contact_name}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-500 font-medium">Contact Number</dt>
                <dd className="mt-0.5">
                  <a
                    href={`tel:${item.contact_phone}`}
                    className="inline-flex items-center gap-1.5 text-base font-bold text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                  >
                    <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {item.contact_phone}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex justify-center pb-4 pt-2">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            ← Back to all open items
          </Link>
        </div>
      </div>

    </main>
  );
}

