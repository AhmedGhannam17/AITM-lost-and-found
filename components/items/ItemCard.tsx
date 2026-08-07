import Link from "next/link";
import Image from "next/image";
import type { Item } from "@/types/item";
import { ItemTypeBadge, StatusBadge } from "@/components/ui/Badge";

interface ItemCardProps {
  item: Item;
}

/**
 * Responsive card that summarises a single lost/found item.
 * Clicking "View Details" navigates to /item/[id].
 */
export function ItemCard({ item }: ItemCardProps) {
  const formattedDate = new Date(item.event_date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {/* ── Photo ── */}
      <div className="relative h-44 w-full bg-gray-100 shrink-0">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg
              className="h-10 w-10 text-gray-300"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 3v18M3 3l18 18"
              />
            </svg>
          </div>
        )}
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-3 p-4">
        {/* Badges */}
        <div className="flex items-center gap-2 flex-wrap">
          <ItemTypeBadge type={item.item_type} />
          <StatusBadge status={item.status} />
        </div>

        {/* Title */}
        <h2 className="text-sm font-semibold text-gray-900 line-clamp-2 leading-snug">
          {item.title}
        </h2>

        {/* Meta */}
        <dl className="mt-auto flex flex-col gap-1.5 text-xs text-gray-500">
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <dd>{item.category}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <dd>{item.campus_area}</dd>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="h-3.5 w-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <dd>{formattedDate}</dd>
          </div>
        </dl>

        {/* CTA */}
        <Link
          href={`/item/${item.id}`}
          className="mt-3 inline-flex w-full items-center justify-center rounded-lg border border-gray-300 px-4 py-2 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
        >
          View Details
        </Link>
      </div>
    </article>
  );
}
