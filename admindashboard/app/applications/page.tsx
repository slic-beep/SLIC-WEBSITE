"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { Application, createApplication, getApplications } from "@/lib/api";

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [program, setProgram] = useState("");
  const [status, setStatus] = useState("Pending");
  const [reviewedBy, setReviewedBy] = useState("");
  const [applicationType, setApplicationType] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadApplications() {
      try {
        const response = await getApplications();
        setApplications(response.data || []);
      } catch {
        setError("Unable to load applications.");
      } finally {
        setLoading(false);
      }
    }

    loadApplications();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createApplication({
        name,
        email,
        program,
        status,
        reviewedBy,
        applicationType: applicationType || program,
      });
      const response = await getApplications();
      setApplications(response.data || []);
      setName("");
      setEmail("");
      setProgram("");
      setStatus("Pending");
      setReviewedBy("");
      setApplicationType("");
    } catch {
      setError("Unable to create application.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Applications" description="View and add program applications stored in Appwrite.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Applications</h2>
            <span className="text-xs text-gray-500">{applications.length} entries</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading applications…</p>
          ) : (
            <div className="space-y-3">
              {applications.map((application) => (
                <div key={application.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-semibold text-gray-900">{application.name}</p>
                      <p className="text-xs text-gray-500">{application.email}</p>
                    </div>
                    <span className="text-[11px] rounded-full bg-gray-100 px-2 py-1 text-gray-700">
                      {application.status}
                    </span>
                  </div>
                  <p className="mt-2 text-[11px] text-gray-500">Program: {application.program}</p>
                  <p className="mt-3 text-[11px] text-gray-500">Submitted: {application.submittedAt}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">New Application</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Student Name"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Email</label>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="student@example.com"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Program</label>
              <input
                value={program}
                onChange={(event) => setProgram(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Accelerator Program"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Application type</label>
              <input
                value={applicationType}
                onChange={(event) => setApplicationType(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Startup, Fellowship, Grant"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Reviewed by</label>
              <input
                value={reviewedBy}
                onChange={(event) => setReviewedBy(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Admin reviewer"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-1 w-full rounded-2xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              >
                <option>Pending</option>
                <option>Approved</option>
                <option>Rejected</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-2xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Submit Application"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}