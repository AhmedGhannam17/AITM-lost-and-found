import type { ItemStatus, ItemType } from "@/types/item";

// ─── Item Type Badge ─────────────────────────────────────────────────────────

const typeStyles: Record<ItemType, string> = {
  Lost: "bg-red-100 text-red-700",
  Found: "bg-green-100 text-green-700",
};

interface ItemTypeBadgeProps {
  type: ItemType;
}

/** Small pill showing "Lost" or "Found" with matching colour. */
export function ItemTypeBadge({ type }: ItemTypeBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${typeStyles[type]}`}
    >
      {type}
    </span>
  );
}

// ─── Status Badge ────────────────────────────────────────────────────────────

const statusStyles: Record<ItemStatus, string> = {
  Open: "bg-blue-100 text-blue-700",
  Claimed: "bg-gray-100 text-gray-500",
};

interface StatusBadgeProps {
  status: ItemStatus;
}

/** Small pill showing item status. */
export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
