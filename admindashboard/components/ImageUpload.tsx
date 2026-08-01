"use client";

import { useRef, useState } from "react";
import { uploadFile } from "@/lib/api";

interface ImageUploadProps {
  value: string;
  onChange: (url: string) => void;
  bucket?: "projectImages" | "eventBanners" | "partnerLogos" | "profileImages" | "programThumbnails";
  label?: string;
}

export default function ImageUpload({ value, onChange, bucket = "profileImages", label = "Image" }: ImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFile(file: File | undefined) {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const result = await uploadFile(file, bucket);
      onChange(result.data.url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  const hasImage = Boolean(value);

  return (
    <div>
      <label className="text-xs text-gray-500">{label}</label>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(event) => handleFile(event.target.files?.[0])}
      />
      <div
        className="mt-1 w-full rounded-2xl border-2 border-dashed border-gray-200 bg-gray-50 p-4 flex flex-col items-center justify-center cursor-pointer hover:border-riara-300 transition-colors"
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Uploading…
          </div>
        ) : hasImage ? (
          <img src={value} alt="Uploaded preview" className="max-h-40 rounded-lg object-cover" />
        ) : (
          <div className="flex flex-col items-center gap-1 py-2 text-gray-400">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-xs">Click to choose an image from your device</span>
          </div>
        )}
      </div>
      {hasImage && !uploading && (
        <div className="mt-2 flex items-center justify-between gap-2">
          <p className="text-[11px] text-gray-400 truncate flex-1" title={value}>
            {value}
          </p>
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onChange("");
            }}
            className="text-[11px] font-semibold text-red-400 hover:text-red-600"
          >
            Remove
          </button>
        </div>
      )}
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
