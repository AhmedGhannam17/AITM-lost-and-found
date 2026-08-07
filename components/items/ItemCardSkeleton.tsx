/**
 * Animated skeleton placeholder shown while items are loading.
 * Matches the visual dimensions of ItemCard so there's no layout shift.
 */
export function ItemCardSkeleton() {
  return (
    <div className="flex flex-col rounded-2xl border border-gray-200/80 bg-white shadow-xs overflow-hidden animate-pulse">
      {/* Photo placeholder */}
      <div className="h-48 w-full bg-gray-200" />

      {/* Content placeholder */}
      <div className="flex flex-col gap-3.5 p-5">
        {/* Title placeholder */}
        <div className="h-5 w-3/4 rounded-md bg-gray-200" />

        {/* Snippet placeholder */}
        <div className="flex flex-col gap-1.5">
          <div className="h-3 w-full rounded bg-gray-100" />
          <div className="h-3 w-4/5 rounded bg-gray-100" />
        </div>

        {/* Meta section placeholder */}
        <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-gray-100">
          <div className="flex items-center justify-between">
            <div className="h-3.5 w-20 rounded bg-gray-200" />
            <div className="h-4 w-12 rounded-full bg-gray-200" />
          </div>
          <div className="h-3.5 w-3/4 rounded bg-gray-100" />
          <div className="h-3.5 w-1/2 rounded bg-gray-100" />
        </div>

        {/* Button placeholder */}
        <div className="mt-1 h-9 w-full rounded-xl bg-gray-200" />
      </div>
    </div>
  );
}

