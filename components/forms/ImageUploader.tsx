"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";

interface ImageUploaderProps {
  onFileSelect: (file: File | null) => void;
  error?: string;
}

/**
 * Drag-and-drop / click-to-browse image upload zone.
 * Previews the selected image and lets the user remove it.
 */
export function ImageUploader({ onFileSelect, error }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  function handleFile(file: File | null) {
    if (!file) {
      setPreview(null);
      onFileSelect(null);
      return;
    }

    if (!file.type.startsWith("image/")) {
      onFileSelect(null);
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    setPreview(objectUrl);
    onFileSelect(file);
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    handleFile(e.target.files?.[0] ?? null);
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    setIsDragging(false);
    handleFile(e.dataTransfer.files?.[0] ?? null);
  }

  function handleRemove() {
    setPreview(null);
    onFileSelect(null);
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-medium text-gray-700">
        Photo <span className="text-gray-400 font-normal">(optional)</span>
      </label>

      {preview ? (
        <div className="relative w-full rounded-xl overflow-hidden border border-gray-200 bg-gray-50 aspect-video">
          <Image
            src={preview}
            alt="Item preview"
            fill
            className="object-contain p-2"
          />
          <button
            type="button"
            onClick={handleRemove}
            className="absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-gray-900/60 text-white text-xs hover:bg-gray-900/80 transition-colors"
            aria-label="Remove image"
          >
            ✕
          </button>
        </div>
      ) : (
        <div
          role="button"
          tabIndex={0}
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
          className={[
            "flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed",
            "py-10 cursor-pointer transition-colors text-center",
            isDragging
              ? "border-blue-400 bg-blue-50"
              : "border-gray-300 bg-gray-50 hover:border-blue-300 hover:bg-blue-50/40",
            error ? "border-red-400" : "",
          ]
            .filter(Boolean)
            .join(" ")}
        >
          <svg
            className="h-8 w-8 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
            />
          </svg>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-blue-600">Click to upload</span>{" "}
            or drag and drop
          </p>
          <p className="text-xs text-gray-400">PNG, JPG, WEBP up to 10 MB</p>
        </div>
      )}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={handleInputChange}
        aria-label="Upload item image"
      />

      {error && (
        <p className="text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
