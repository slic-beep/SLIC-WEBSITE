"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import ImageUpload from "@/components/ImageUpload";
import { Leader, createLeader, getLeadership } from "@/lib/api";

export default function LeadershipPage() {
  const [leaders, setLeaders] = useState<Leader[]>([]);
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [bio, setBio] = useState("");
  const [image, setImage] = useState("");
  const [socialLinkedin, setSocialLinkedin] = useState("");
  const [socialTwitter, setSocialTwitter] = useState("");
  const [sortOrder, setSortOrder] = useState(0);
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaders() {
      try {
        const response = await getLeadership();
        setLeaders(response.data || []);
      } catch {
        setError("Unable to load leadership team.");
      } finally {
        setLoading(false);
      }
    }

    loadLeaders();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createLeader({
        name,
        role,
        bio,
        image,
        socialLinkedin,
        socialTwitter,
        sortOrder,
        status,
      });
      const response = await getLeadership();
      setLeaders(response.data || []);
      setName("");
      setRole("");
      setBio("");
      setImage("");
      setSocialLinkedin("");
      setSocialTwitter("");
      setSortOrder(0);
      setStatus("Active");
    } catch {
      setError("Unable to create team member.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Leadership" description="Manage the SLIC leadership team shown on the public website.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Leadership team</h2>
            <span className="text-xs text-gray-500">{leaders.length} members</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading team…</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {leaders.map((leader) => (
                <div key={leader.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm flex gap-3">
                  <div className="flex-shrink-0 w-14 h-14 rounded-full bg-riara-100 border-2 border-riara-200 flex items-center justify-center overflow-hidden">
                    {leader.image ? (
                      <img src={leader.image} alt={leader.name} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-riara-600 font-bold text-sm">
                        {leader.name.charAt(0).toUpperCase()}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-gray-900">{leader.name}</p>
                    <p className="text-xs text-riara-500">{leader.role}</p>
                    <span className="mt-2 inline-block text-[10px] rounded-full bg-gray-100 px-2 py-0.5 text-gray-600">
                      {leader.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Add Team Member</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Full name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Jane Doe"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Role</label>
              <input
                value={role}
                onChange={(event) => setRole(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="President, Vice President, Secretary…"
                required
              />
            </div>
            <ImageUpload value={image} onChange={setImage} bucket="profileImages" label="Photo" />
            <div>
              <label className="text-xs text-gray-500">Bio</label>
              <textarea
                value={bio}
                onChange={(event) => setBio(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={3}
                placeholder="Short bio"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">LinkedIn URL</label>
              <input
                type="url"
                value={socialLinkedin}
                onChange={(event) => setSocialLinkedin(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="https://linkedin.com/in/..."
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Twitter / X URL</label>
              <input
                type="url"
                value={socialTwitter}
                onChange={(event) => setSocialTwitter(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="https://x.com/..."
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Display order</label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(event) => setSortOrder(Number(event.target.value))}
                  className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="0"
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
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Team Member"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}
