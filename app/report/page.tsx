import { Suspense } from "react";
import type { Metadata } from "next";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportForm } from "@/components/forms/ReportForm";

export const metadata: Metadata = {
  title: "Report an Item | AITM Lost & Found",
  description:
    "Report a lost or found item at AITM. Fill in the details and we'll help reunite it with its owner.",
};

/**
 * /report — route page.
 * Wraps ReportForm in Suspense for searchParams client preselection.
 */
export default function ReportPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title="Report an Item"
          description="Lost something, or found something? Fill in the details below."
          backHref="/"
          backLabel="Back to Home"
        />
        <Suspense fallback={<div className="h-96 rounded-2xl bg-white animate-pulse" />}>
          <ReportForm />
        </Suspense>
      </div>
    </main>
  );
}

