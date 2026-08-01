"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import ImageUpload from "@/components/ImageUpload";
import { HeroImage, createHeroImage, deleteHeroImage, getHeroImages, updateHeroImage } from "@/lib/api";

export default function HeroImagesPage() {
  const [heroImages, setHeroImages] = useState<HeroImage[]>([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadHeroImages() {
      try {
        const response = await getHeroImages();
        setHeroImages(response.data || []);
      } catch {
        setError("Unable to load hero images.");
      } finally {
        setLoading(false);
      }
    }

    loadHeroImages();
  }, []);

  function resetForm() {
    setTitle("");
    setCaption("");
    setImageUrl("");
    setOrder(0);
    setStatus("Active");
    setEditingId(null);
  }

  async function refreshHeroImages() {
    const response = await getHeroImages();
    setHeroImages(response.data || []);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await updateHeroImage(editingId, { title, caption, imageUrl, order, status });
      } else {
        await createHeroImage({ title, caption, imageUrl, order, status });
      }

      await refreshHeroImages();
      resetForm();
    } catch {
      setError(editingId ? "Unable to update hero image." : "Unable to create hero image.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(item: HeroImage) {
    setEditingId(item.$id);
    setTitle(item.title || "");
    setCaption(item.caption || "");
    setImageUrl(item.imageUrl || "");
    setOrder(item.order ?? 0);
    setStatus(item.status || "Active");
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this hero slide?")) {
      return;
    }

    setError(null);

    try {
      await deleteHeroImage(id);
      await refreshHeroImages();
      if (editingId === id) {
        resetForm();
      }
    } catch {
      setError("Unable to delete hero image.");
    }
  }

  return (
    <AdminPageShell title="Hero Images" description="Manage the homepage hero carousel images from the admin dashboard.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Hero carousel</h2>
            <span className="text-xs text-gray-500">{heroImages.length} images</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading hero images…</p>
          ) : (
            <div className="space-y-3">
              {heroImages.map((item) => (
                <div key={item.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.title || "Hero image"}</p>
                      <p className="mt-2 text-xs text-gray-500">{item.caption || "No caption provided"}</p>
                      <p className="mt-2 text-[11px] text-gray-500">Order: {item.order ?? 0}</p>
                      <p className="mt-2 text-[11px] text-gray-500">Status: {item.status || "Active"}</p>
                    </div>
                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="rounded-lg border border-gray-200 px-2.5 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.$id)}
                        className="rounded-lg border border-red-200 px-2.5 py-1.5 text-xs font-medium text-red-600 transition hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">{editingId ? "Edit Hero Image" : "Add Hero Image"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Innovation Week"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Caption</label>
              <textarea
                value={caption}
                onChange={(event) => setCaption(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={3}
                placeholder="Short supporting text for the hero slide"
              />
            </div>
            <ImageUpload value={imageUrl} onChange={setImageUrl} bucket="eventBanners" label="Hero image" />
            <div>
              <label className="text-xs text-gray-500">Display order</label>
              <input
                type="number"
                min={0}
                value={order}
                onChange={(event) => setOrder(Number(event.target.value))}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              >
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-2xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {submitting ? "Saving…" : editingId ? "Save Changes" : "Add Hero Image"}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={resetForm}
                  className="rounded-2xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}
