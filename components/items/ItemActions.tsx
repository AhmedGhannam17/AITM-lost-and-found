"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import type { Item } from "@/types/item";
import { deleteItem, markItemClaimed } from "@/utils/itemService";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

interface ItemActionsProps {
  item: Item;
}

/**
 * Action toolbar for the Item Details page.
 * Provides Edit, Mark as Claimed, and Delete with confirmation modals and toast feedback.
 */
export function ItemActions({ item }: ItemActionsProps) {
  const router = useRouter();

  const [showClaimDialog, setShowClaimDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [claiming, setClaiming] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  async function handleClaim() {
    setClaiming(true);
    try {
      await markItemClaimed(item.id);
      setToast({ message: "Item marked as claimed successfully!", type: "success" });
      setShowClaimDialog(false);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to mark as claimed.";
      setToast({ message, type: "error" });
      setClaiming(false);
      setShowClaimDialog(false);
    }
  }

  async function handleDelete() {
    setDeleting(true);
    try {
      await deleteItem(item.id);
      setToast({ message: "Item deleted successfully!", type: "success" });
      setShowDeleteDialog(false);
      setTimeout(() => {
        router.push("/");
        router.refresh();
      }, 1500);
    } catch (err) {
      const message = err instanceof Error ? err.message : "Failed to delete item.";
      setToast({ message, type: "error" });
      setDeleting(false);
      setShowDeleteDialog(false);
    }
  }

  const isBusy = claiming || deleting;

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      <div className="flex flex-wrap items-center gap-3 pt-2">
        {/* Edit Button */}
        <Link
          href={`/item/${item.id}/edit`}
          className={[
            "inline-flex items-center justify-center gap-1.5 rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-400",
            isBusy ? "pointer-events-none opacity-50" : "",
          ].join(" ")}
        >
          <svg
            className="h-4 w-4 text-gray-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
            />
          </svg>
          Edit Item
        </Link>

        {/* Mark as Claimed Button */}
        {item.status === "Open" && (
          <Button
            type="button"
            variant="ghost"
            className="border-green-600 text-green-700 hover:bg-green-50 focus-visible:ring-green-400"
            onClick={() => setShowClaimDialog(true)}
            disabled={isBusy}
          >
            <svg
              className="h-4 w-4 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            Mark as Claimed
          </Button>
        )}

        {/* Delete Button */}
        <Button
          type="button"
          variant="ghost"
          className="border-red-300 text-red-600 hover:bg-red-50 focus-visible:ring-red-400"
          onClick={() => setShowDeleteDialog(true)}
          disabled={isBusy}
        >
          <svg
            className="h-4 w-4 text-red-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
          Delete
        </Button>
      </div>

      {/* Claim Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showClaimDialog}
        title="Mark Item as Claimed?"
        description="Are you sure you want to mark this item as claimed? It will no longer be listed on the open browse page."
        confirmLabel="Yes, Mark Claimed"
        cancelLabel="Cancel"
        variant="primary"
        loading={claiming}
        onConfirm={handleClaim}
        onCancel={() => setShowClaimDialog(false)}
      />

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Delete Item Report?"
        description="Are you sure you want to delete this report? This action is permanent and cannot be undone."
        confirmLabel="Delete Report"
        cancelLabel="Cancel"
        variant="danger"
        loading={deleting}
        onConfirm={handleDelete}
        onCancel={() => setShowDeleteDialog(false)}
      />
    </>
  );
}
