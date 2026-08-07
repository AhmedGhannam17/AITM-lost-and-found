"use client";

import { useEffect } from "react";

type ToastType = "success" | "error";

interface ToastProps {
  message: string;
  type?: ToastType;
  onDismiss: () => void;
  durationMs?: number;
}

const typeClasses: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
};

const typeIcons: Record<ToastType, string> = {
  success: "✓",
  error: "✕",
};

/**
 * Accessible toast notification.
 * Auto-dismisses after `durationMs` (default 3500 ms).
 */
export function Toast({
  message,
  type = "success",
  onDismiss,
  durationMs = 3500,
}: ToastProps) {
  useEffect(() => {
    const id = setTimeout(onDismiss, durationMs);
    return () => clearTimeout(id);
  }, [onDismiss, durationMs]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={[
        "fixed bottom-6 right-6 z-50 flex items-center gap-3 rounded-xl px-5 py-3.5",
        "shadow-lg text-sm font-medium max-w-sm",
        "animate-in slide-in-from-bottom-4 duration-300",
        typeClasses[type],
      ].join(" ")}
    >
      <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
        {typeIcons[type]}
      </span>
      {message}
    </div>
  );
}
