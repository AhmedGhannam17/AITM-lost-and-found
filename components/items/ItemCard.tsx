import Link from "next/link";
import Image from "next/image";
import type { Item } from "@/types/item";
import { ItemTypeBadge, StatusBadge } from "@/components/ui/Badge";

interface ItemCardProps {
  item: Item;
}

/**
 * Responsive card that summarises a single lost/found item.
 * Clicking navigates to /item/[id].
 */
export function ItemCard({ item }: ItemCardProps) {
  const formattedDate = new Date(item.event_date).toLocaleDateString("en-PK", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <article className="group flex flex-col rounded-2xl border border-gray-200/80 bg-white shadow-xs transition-all duration-200 hover:-translate-y-1 hover:border-gray-300 hover:shadow-md overflow-hidden">
      {/* ── Photo Container ── */}
      <div className="relative h-48 w-full bg-gradient-to-br from-gray-50 to-gray-100/80 overflow-hidden shrink-0">
        {item.image_url ? (
          <Image
            src={item.image_url}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-gray-300">
            <svg
              className="h-10 w-10 stroke-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3h18M3 3v18M3 3l18 18"
              />
            </svg>
            <span className="text-xs text-gray-400">No Photo Attached</span>
          </div>
        )}

        {/* Badges overlay on top right */}
        <div className="absolute top-3 right-3 flex items-center gap-1.5">
          <ItemTypeBadge type={item.item_type} />
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex flex-1 flex-col gap-3.5 p-5">
        {/* Title */}
        <h3 className="text-base font-semibold text-gray-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
          {item.title}
        </h3>

        {/* Description snippet */}
        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">
          {item.description}
        </p>

        {/* Metadata */}
        <dl className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-100 text-xs text-gray-600">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-gray-500">
              <svg className="h-3.5 w-3.5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {item.category}
            </span>
            <StatusBadge status={item.status} />
          </div>

          <div className="flex items-center gap-1.5 text-gray-500 truncate">
            <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="truncate">{item.campus_area} ({item.specific_location})</span>
          </div>

          <div className="flex items-center gap-1.5 text-gray-500">
            <svg className="h-3.5 w-3.5 shrink-0 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span>{formattedDate}</span>
          </div>
        </dl>

        {/* CTA Button */}
        <Link
          href={`/item/${item.id}`}
          className="mt-1 inline-flex w-full items-center justify-center gap-1 rounded-xl bg-gray-50 px-4 py-2 text-xs font-semibold text-gray-700 hover:bg-blue-600 hover:text-white transition-all shadow-xs group-hover:bg-blue-600 group-hover:text-white"
        >
          View Details
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
          </svg>
        </Link>
      </div>
    </article>
  );
}

