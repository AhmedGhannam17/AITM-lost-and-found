/**
 * Animated skeleton placeholder shown while items are loading.
 * Matches the visual dimensions of ItemCard so there's no layout shift.
 */
export function ItemCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm overflow-hidden animate-pulse">
      {/* Photo placeholder */}
      <div className="h-44 w-full bg-gray-200" />

      {/* Content placeholder */}
      <div className="flex flex-col gap-3 p-4">
        {/* Badges */}
        <div className="flex gap-2">
          <div className="h-5 w-14 rounded-full bg-gray-200" />
          <div className="h-5 w-12 rounded-full bg-gray-200" />
        </div>

        {/* Title */}
        <div className="h-4 w-3/4 rounded bg-gray-200" />

        {/* Meta lines */}
        <div className="flex flex-col gap-1.5 mt-1">
          <div className="h-3 w-2/3 rounded bg-gray-100" />
          <div className="h-3 w-1/2 rounded bg-gray-100" />
          <div className="h-3 w-2/5 rounded bg-gray-100" />
        </div>

        {/* Button */}
        <div className="mt-3 h-8 w-full rounded-lg bg-gray-200" />
      </div>
    </div>
  );
}
