"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { Program, createProgram, getPrograms } from "@/lib/api";

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [requirements, setRequirements] = useState("");
  const [status, setStatus] = useState("Open");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPrograms() {
      try {
        const response = await getPrograms();
        setPrograms(response.data || []);
      } catch {
        setError("Unable to load programs.");
      } finally {
        setLoading(false);
      }
    }

    loadPrograms();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createProgram({
        title,
        description,
        category,
        duration,
        thumbnail,
        requirements,
        status,
      });
      const response = await getPrograms();
      setPrograms(response.data || []);
      setTitle("");
      setDescription("");
      setCategory("");
      setDuration("");
      setThumbnail("");
      setRequirements("");
      setStatus("Open");
    } catch {
      setError("Unable to create program.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Programs" description="Manage programs and training offers for the SLIC community.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Program catalog</h2>
            <span className="text-xs text-gray-500">{programs.length} items</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading programs…</p>
          ) : (
            <div className="space-y-3">
              {programs.map((item) => (
                <div key={item.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{item.title}</p>
                    <span className="text-[11px] text-gray-500">{item.status}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">{item.description}</p>
                  <p className="mt-3 text-[11px] text-gray-500">Duration: {item.duration}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Create Program</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Design Sprint Series"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Category</label>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Design, Business, Tech"
              />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs text-gray-500">Duration</label>
                <input
                  value={duration}
                  onChange={(event) => setDuration(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="6 weeks"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Thumbnail URL</label>
                <input
                  value={thumbnail}
                  onChange={(event) => setThumbnail(event.target.value)}
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Requirements</label>
              <textarea
                value={requirements}
                onChange={(event) => setRequirements(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={3}
                placeholder="Prerequisites for this program"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={4}
                placeholder="Summarise the program"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              >
                <option>Open</option>
                <option>Full</option>
                <option>Closed</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Program"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}