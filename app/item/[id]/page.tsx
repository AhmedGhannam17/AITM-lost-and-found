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
          <div className="relative w-full overflow-hidden rounded-2xl border border-gray-200 bg-gray-100 aspect-video">
            <Image
              src={item.image_url}
              alt={item.title}
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 100vw, 672px"
            />
          </div>
        )}

        {/* ── Badges & Actions ── */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2">
            <ItemTypeBadge type={item.item_type} />
            <StatusBadge status={item.status} />
          </div>
          <ItemActions item={item} />
        </div>

        {/* ── Detail sections ── */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {/* Description */}
          <section className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-2 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Description
            </h2>
            <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap">
              {item.description}
            </p>
          </section>

          {/* Location */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Location
            </h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-xs text-gray-400">Campus Area</dt>
                <dd className="font-medium text-gray-800">{item.campus_area}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Specific Location</dt>
                <dd className="font-medium text-gray-800">{item.specific_location}</dd>
              </div>
            </dl>
          </section>

          {/* Item Info */}
          <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Item Info
            </h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div>
                <dt className="text-xs text-gray-400">Category</dt>
                <dd className="font-medium text-gray-800">{item.category}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Date Lost / Found</dt>
                <dd className="font-medium text-gray-800">{formattedDate}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Reported On</dt>
                <dd className="font-medium text-gray-800">{formattedReported}</dd>
              </div>
            </dl>
          </section>

          {/* Contact */}
          <section className="sm:col-span-2 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <h2 className="mb-3 text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Contact
            </h2>
            <dl className="flex flex-col gap-2 text-sm sm:flex-row sm:gap-8">
              <div>
                <dt className="text-xs text-gray-400">Name</dt>
                <dd className="font-medium text-gray-800">{item.contact_name}</dd>
              </div>
              <div>
                <dt className="text-xs text-gray-400">Phone</dt>
                <dd>
                  <a
                    href={`tel:${item.contact_phone}`}
                    className="font-medium text-blue-600 hover:text-blue-700"
                  >
                    {item.contact_phone}
                  </a>
                </dd>
              </div>
            </dl>
          </section>
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex justify-center pb-4">
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            ← Back to all items
          </Link>
        </div>
      </div>
    </main>
  );
}
