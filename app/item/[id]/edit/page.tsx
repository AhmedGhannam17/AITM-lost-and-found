import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { fetchItemById } from "@/utils/itemService";
import { PageHeader } from "@/components/layout/PageHeader";
import { ReportForm } from "@/components/forms/ReportForm";

interface PageProps {
  params: Promise<{ id: string }>;
}

/** Generate dynamic metadata for the edit page. */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const item = await fetchItemById(id);
  if (!item) return { title: "Item Not Found | AITM Lost & Found" };
  return {
    title: `Edit ${item.title} | AITM Lost & Found`,
  };
}

/**
 * /item/[id]/edit — item edit page.
 * Prefills the existing item data into ReportForm.
 */
export default async function ItemEditPage({ params }: PageProps) {
  const { id } = await params;
  const item = await fetchItemById(id);

  if (!item) notFound();

  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl">
        <PageHeader
          title={`Edit ${item.title}`}
          description="Update details for this reported item."
          backHref={`/item/${item.id}`}
          backLabel="Back to Item Details"
        />
        <ReportForm initialItem={item} mode="edit" />
      </div>
    </main>
  );
}
