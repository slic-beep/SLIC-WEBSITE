"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import ImageUpload from "@/components/ImageUpload";
import { Partner, createPartner, getPartners } from "@/lib/api";

export default function PartnersPage() {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [name, setName] = useState("");
  const [website, setWebsite] = useState("");
  const [description, setDescription] = useState("");
  const [logo, setLogo] = useState("");
  const [category, setCategory] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPartners() {
      try {
        const response = await getPartners();
        setPartners(response.data || []);
      } catch {
        setError("Unable to load partners.");
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createPartner({
        name,
        website,
        description,
        logo,
        category,
        status,
      });
      const response = await getPartners();
      setPartners(response.data || []);
      setName("");
      setWebsite("");
      setDescription("");
      setLogo("");
      setCategory("");
      setStatus("");
    } catch {
      setError("Unable to create partner.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Partners" description="Manage partnership records stored in Appwrite.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Partners</h2>
            <span className="text-xs text-gray-500">{partners.length} records</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading partners…</p>
          ) : (
            <div className="space-y-3">
              {partners.map((partner) => (
                <div key={partner.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{partner.name}</p>
                    <a href={partner.website} target="_blank" rel="noreferrer" className="text-xs text-riara-400">
                      Visit
                    </a>
                  </div>
                  <p className="mt-2 text-xs text-gray-500 line-clamp-2">{partner.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Create Partner</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="iLab Africa"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Website</label>
              <input
                type="url"
                value={website}
                onChange={(event) => setWebsite(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="https://example.com"
                required
              />
            </div>
            <ImageUpload value={logo} onChange={setLogo} bucket="partnerLogos" label="Logo" />
            <div>
              <label className="text-xs text-gray-500">Category</label>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Education, Corporate, Government"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Status</label>
              <input
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Active"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={4}
                placeholder="Describe the partner relationship"
                required
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Partner"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}
