"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

import { CATEGORIES } from "@/constants/categories";
import { CAMPUS_AREAS } from "@/constants/campusAreas";
import type { ItemType } from "@/types/item";
import { uploadItemImage, insertItem } from "@/utils/itemService";

import { FormField } from "@/components/ui/FormField";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Select } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { Toast } from "@/components/ui/Toast";
import { ImageUploader } from "@/components/forms/ImageUploader";

// ─── Validation ─────────────────────────────────────────────────────────────

interface FormValues {
  title: string;
  description: string;
  item_type: ItemType | "";
  category: string;
  campus_area: string;
  specific_location: string;
  event_date: string;
  contact_name: string;
  contact_phone: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (!values.title.trim()) errors.title = "Item name is required.";
  if (!values.description.trim()) errors.description = "Description is required.";
  if (!values.item_type) errors.item_type = "Please select Lost or Found.";
  if (!values.category) errors.category = "Please select a category.";
  if (!values.campus_area) errors.campus_area = "Please select a campus area.";
  if (!values.specific_location.trim())
    errors.specific_location = "Specific location is required.";
  if (!values.event_date) errors.event_date = "Date is required.";
  if (!values.contact_name.trim())
    errors.contact_name = "Contact name is required.";
  if (!values.contact_phone.trim()) {
    errors.contact_phone = "Contact phone is required.";
  } else if (!/^\+?[\d\s\-()]{7,15}$/.test(values.contact_phone.trim())) {
    errors.contact_phone = "Enter a valid phone number.";
  }

  return errors;
}

// ─── Initial state ───────────────────────────────────────────────────────────

const INITIAL_VALUES: FormValues = {
  title: "",
  description: "",
  item_type: "",
  category: "",
  campus_area: "",
  specific_location: "",
  event_date: "",
  contact_name: "",
  contact_phone: "",
};

// ─── Component ───────────────────────────────────────────────────────────────

/**
 * Full report form — handles validation, image upload, DB insert,
 * success toast, and redirect to homepage.
 */
export function ReportForm() {
  const router = useRouter();

  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // ── Field helpers ────────────────────────────────────────────────────────

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    // Clear the field error as soon as the user starts correcting it
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  }

  const handleImageSelect = useCallback((file: File | null) => {
    setImageFile(file);
  }, []);

  // ── Submit ───────────────────────────────────────────────────────────────

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const validationErrors = validate(values);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setSubmitting(true);

    try {
      // 1. Upload image (if any) and get public URL
      let imageUrl: string | null = null;
      if (imageFile) {
        imageUrl = await uploadItemImage(imageFile);
      }

      // 2. Insert into database
      await insertItem({
        title: values.title.trim(),
        description: values.description.trim(),
        item_type: values.item_type as ItemType,
        category: values.category,
        campus_area: values.campus_area,
        specific_location: values.specific_location.trim(),
        event_date: values.event_date,
        status: "Open",
        image_url: imageUrl,
        contact_name: values.contact_name.trim(),
        contact_phone: values.contact_phone.trim(),
      });

      setToast({ message: "Your item has been reported successfully!", type: "success" });

      // Redirect after toast is visible
      setTimeout(() => router.push("/"), 2000);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong.";
      setToast({ message, type: "error" });
    } finally {
      setSubmitting(false);
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────

  return (
    <>
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onDismiss={() => setToast(null)}
        />
      )}

      <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-6">
        {/* ── Item Details section ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-5">
          <h2 className="text-base font-semibold text-gray-900">
            Item Details
          </h2>

          <FormField
            label="Item Name"
            htmlFor="title"
            error={errors.title}
            required
          >
            <Input
              id="title"
              name="title"
              value={values.title}
              onChange={handleChange}
              placeholder="e.g. Black leather wallet"
              hasError={!!errors.title}
              maxLength={120}
            />
          </FormField>

          <FormField
            label="Description"
            htmlFor="description"
            error={errors.description}
            required
          >
            <Textarea
              id="description"
              name="description"
              value={values.description}
              onChange={handleChange}
              placeholder="Describe the item — colour, brand, any identifying marks…"
              rows={4}
              hasError={!!errors.description}
              maxLength={500}
            />
          </FormField>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Lost or Found?"
              htmlFor="item_type"
              error={errors.item_type}
              required
            >
              <Select
                id="item_type"
                name="item_type"
                value={values.item_type}
                onChange={handleChange}
                placeholder="Select type"
                options={["Lost", "Found"]}
                hasError={!!errors.item_type}
              />
            </FormField>

            <FormField
              label="Category"
              htmlFor="category"
              error={errors.category}
              required
            >
              <Select
                id="category"
                name="category"
                value={values.category}
                onChange={handleChange}
                placeholder="Select category"
                options={CATEGORIES}
                hasError={!!errors.category}
              />
            </FormField>
          </div>
        </section>

        {/* ── Location & Date section ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-5">
          <h2 className="text-base font-semibold text-gray-900">
            Location & Date
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Campus Area"
              htmlFor="campus_area"
              error={errors.campus_area}
              required
            >
              <Select
                id="campus_area"
                name="campus_area"
                value={values.campus_area}
                onChange={handleChange}
                placeholder="Select area"
                options={CAMPUS_AREAS}
                hasError={!!errors.campus_area}
              />
            </FormField>

            <FormField
              label="Date"
              htmlFor="event_date"
              error={errors.event_date}
              required
            >
              <Input
                type="date"
                id="event_date"
                name="event_date"
                value={values.event_date}
                onChange={handleChange}
                max={new Date().toISOString().split("T")[0]}
                hasError={!!errors.event_date}
              />
            </FormField>
          </div>

          <FormField
            label="Specific Location"
            htmlFor="specific_location"
            error={errors.specific_location}
            required
          >
            <Input
              id="specific_location"
              name="specific_location"
              value={values.specific_location}
              onChange={handleChange}
              placeholder="e.g. Near the main entrance, Room 204…"
              hasError={!!errors.specific_location}
              maxLength={200}
            />
          </FormField>
        </section>

        {/* ── Contact section ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm flex flex-col gap-5">
          <h2 className="text-base font-semibold text-gray-900">
            Contact Information
          </h2>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <FormField
              label="Your Name"
              htmlFor="contact_name"
              error={errors.contact_name}
              required
            >
              <Input
                id="contact_name"
                name="contact_name"
                value={values.contact_name}
                onChange={handleChange}
                placeholder="Full name"
                hasError={!!errors.contact_name}
                maxLength={80}
              />
            </FormField>

            <FormField
              label="Phone Number"
              htmlFor="contact_phone"
              error={errors.contact_phone}
              required
            >
              <Input
                type="tel"
                id="contact_phone"
                name="contact_phone"
                value={values.contact_phone}
                onChange={handleChange}
                placeholder="+92 300 0000000"
                hasError={!!errors.contact_phone}
                maxLength={20}
              />
            </FormField>
          </div>
        </section>

        {/* ── Photo section ── */}
        <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h2 className="mb-5 text-base font-semibold text-gray-900">Photo</h2>
          <ImageUploader onFileSelect={handleImageSelect} />
        </section>

        {/* ── Actions ── */}
        <div className="flex items-center justify-end gap-3 pb-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => router.back()}
            disabled={submitting}
          >
            Cancel
          </Button>
          <Button type="submit" loading={submitting} disabled={submitting}>
            {submitting ? "Submitting…" : "Submit Report"}
          </Button>
        </div>
      </form>
    </>
  );
}
