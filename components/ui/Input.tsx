import React from "react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  hasError?: boolean;
};

/** Styled text / date / tel input that forwards all native attributes. */
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, className = "", ...props }, ref) => (
    <input
      ref={ref}
      className={[
        "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 placeholder-gray-400",
        "outline-none transition-colors",
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
Input.displayName = "Input";
