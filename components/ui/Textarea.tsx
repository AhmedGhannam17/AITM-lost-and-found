import React from "react";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean;
};

/** Styled multi-line textarea that forwards all native attributes. */
export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ hasError = false, className = "", ...props }, ref) => (
    <textarea
      ref={ref}
      className={[
        "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400",
        "outline-none transition-colors resize-none",
        hasError
          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    />
  )
);
Textarea.displayName = "Textarea";
