import type { ItemStatus, ItemType } from "@/types/item";

// ─── Item Type Badge ─────────────────────────────────────────────────────────

const typeStyles: Record<ItemType, string> = {
  Lost: "bg-rose-50 text-rose-700 border-rose-200/80",
  Found: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
};

interface ItemTypeBadgeProps {
  type: ItemType;
  className?: string;
}

/** Prominent pill badge showing "Lost" or "Found" with icon. */
export function ItemTypeBadge({ type, className = "" }: ItemTypeBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-semibold shadow-xs tracking-wide",
        typeStyles[type],
        className,
      ].join(" ")}
    >
      <span
        className={[
          "h-1.5 w-1.5 rounded-full",
          type === "Lost" ? "bg-rose-500" : "bg-emerald-500",
        ].join(" ")}
        aria-hidden="true"
      />
      {type}
    </span>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────

const statusStyles: Record<ItemStatus, string> = {
  Open: "bg-blue-50 text-blue-700 border-blue-200/80",
  Claimed: "bg-gray-100 text-gray-600 border-gray-200",
};

interface StatusBadgeProps {
  status: ItemStatus;
  className?: string;
}

/** Pill badge showing item status ("Open" or "Claimed"). */
export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-xs font-medium tracking-wide",
        statusStyles[status],
        className,
      ].join(" ")}
    >
      {status}
    </span>
  );
}

