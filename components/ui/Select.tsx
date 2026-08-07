import React from "react";

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  hasError?: boolean;
  placeholder?: string;
  options: readonly string[];
};

/** Styled native select element with a placeholder option. */
export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  (
    { hasError = false, placeholder, options, className = "", ...props },
    ref
  ) => (
    <select
      ref={ref}
      className={[
        "w-full rounded-lg border px-3.5 py-2.5 text-sm text-gray-900 bg-white",
        "outline-none transition-colors appearance-none",
        "bg-[url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='%236b7280'%3E%3Cpath fill-rule='evenodd' d='M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z' clip-rule='evenodd'/%3E%3C/svg%3E\")] bg-no-repeat bg-[right_0.75rem_center] bg-[length:1.25rem]",
        hasError
          ? "border-red-400 focus:border-red-500 focus:ring-2 focus:ring-red-200"
          : "border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      {...props}
    >
      {placeholder && (
        <option value="" disabled>
          {placeholder}
        </option>
      )}
      {options.map((opt) => (
        <option key={opt} value={opt}>
          {opt}
        </option>
      ))}
    </select>
  )
);
Select.displayName = "Select";
