"use client";

import { useState, useEffect } from "react";

const LOCAL_STORAGE_KEY = "aitm_prototype_notice_dismissed";

/**
 * Modal that appears on first visit to explain prototype limitations.
 * Uses localStorage so it only displays once per browser.
 */
export function PrototypeNoticeModal() {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    try {
      const dismissed = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (dismissed === "true") {
        setIsOpen(false);
      }
    } catch {
      // In case localStorage is blocked/restricted
      setIsOpen(true);
    }
  }, []);

  function handleDismiss() {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, "true");
    } catch {
      // Ignore storage errors
    }
    setIsOpen(false);
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-gray-900/60 backdrop-blur-xs animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-labelledby="prototype-notice-title"
    >
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl border border-gray-100 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3 border-b border-gray-100 pb-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div>
            <h2 id="prototype-notice-title" className="text-lg font-bold text-gray-900">
              Prototype Notice
            </h2>
            <p className="text-xs text-gray-500">AITM Coding Club Assessment</p>
          </div>
        </div>

        {/* Content */}
        <div className="text-sm text-gray-600 leading-relaxed flex flex-col gap-3">
          <p>
            This application is a functional prototype created for the AITM Coding Club Assessment. Authentication has not yet been implemented.
          </p>
          <p className="font-semibold text-gray-800">Because of this:</p>
          <ul className="list-disc pl-5 flex flex-col gap-1 text-xs text-gray-700">
            <li>Anyone can submit reports.</li>
            <li>Anyone can edit reports.</li>
            <li>Anyone can delete reports.</li>
            <li>Anyone can mark items as claimed.</li>
          </ul>
          <p className="text-xs text-gray-500 pt-1">
            These limitations are intentional for this prototype and would be resolved in a production version using authentication and authorization.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-2 pt-2 border-t border-gray-100">
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white hover:bg-blue-700 transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Continue
          </button>
          <button
            type="button"
            onClick={handleDismiss}
            className="w-full sm:flex-1 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-xs font-semibold text-gray-700 hover:bg-gray-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gray-400"
          >
            Do not show again
          </button>
        </div>
      </div>
    </div>
  );
}
