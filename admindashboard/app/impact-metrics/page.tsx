"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { ImpactMetric, createImpactMetric, deleteImpactMetric, getImpactMetrics, updateImpactMetric } from "@/lib/api";

export default function ImpactMetricsPage() {
  const [metrics, setMetrics] = useState<ImpactMetric[]>([]);
  const [label, setLabel] = useState("");
  const [value, setValue] = useState(0);
  const [suffix, setSuffix] = useState("");
  const [order, setOrder] = useState(0);
  const [status, setStatus] = useState("Active");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadMetrics() {
      try {
        const response = await getImpactMetrics();
        setMetrics(response.data || []);
      } catch {
        setError("Unable to load impact metrics.");
      } finally {
        setLoading(false);
      }
    }

    loadMetrics();
  }, []);

  function resetForm() {
    setLabel("");
    setValue(0);
    setSuffix("");
    setOrder(0);
    setStatus("Active");
    setEditingId(null);
  }

  async function refreshMetrics() {
    const response = await getImpactMetrics();
    setMetrics(response.data || []);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        await updateImpactMetric(editingId, { label, value, suffix, order, status });
      } else {
        await createImpactMetric({ label, value, suffix, order, status });
      }

      await refreshMetrics();
      resetForm();
    } catch {
      setError(editingId ? "Unable to update impact metric." : "Unable to create impact metric.");
    } finally {
      setSubmitting(false);
    }
  }

  function handleEdit(item: ImpactMetric) {
    setEditingId(item.$id);
    setLabel(item.label || "");
    setValue(item.value ?? 0);
    setSuffix(item.suffix || "");
    setOrder(item.order ?? 0);
    setStatus(item.status || "Active");
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Remove this impact metric?")) {
      return;
    }

    setError(null);

    try {
      await deleteImpactMetric(id);
      await refreshMetrics();
      if (editingId === id) {
        resetForm();
      }
    } catch {
      setError("Unable to delete impact metric.");
    }
  }

  return (
    <AdminPageShell title="Impact Metrics" description="Update the homepage impact statistics that appear on the website.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Impact metrics</h2>
            <span className="text-xs text-gray-500">{metrics.length} items</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading impact metrics…</p>
          ) : metrics.length === 0 ? (
            <p className="text-sm text-gray-500">No impact metrics yet.</p>
          ) : (
            <div className="space-y-3">
              {metrics.map((item) => (
                <div key={item.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-gray-900">{item.label || "Impact metric"}</p>
                      <p className="mt-2 text-xs text-gray-500">Value: {item.value ?? 0}{item.suffix || ""}</p>
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
          <h2 className="text-sm font-semibold text-gray-900 mb-4">{editingId ? "Edit Impact Metric" : "Add Impact Metric"}</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Label</label>
              <input
                value={label}
                onChange={(event) => setLabel(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Students Engaged"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Value</label>
              <input
                type="number"
                min={0}
                value={value}
                onChange={(event) => setValue(Number(event.target.value))}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Suffix</label>
              <input
                value={suffix}
                onChange={(event) => setSuffix(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="+"
              />
            </div>
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
                {submitting ? "Saving…" : editingId ? "Save Changes" : "Add Metric"}
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
