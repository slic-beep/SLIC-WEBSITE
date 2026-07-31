"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { Project, createProject, getProjects } from "@/lib/api";

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [problemStatement, setProblemStatement] = useState("");
  const [solution, setSolution] = useState("");
  const [category, setCategory] = useState("");
  const [teamMembers, setTeamMembers] = useState("");
  const [stage, setStage] = useState("");
  const [projectImage, setProjectImage] = useState("");
  const [createdBy, setCreatedBy] = useState("");
  const [status, setStatus] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        const response = await getProjects();
        setProjects(response.data || []);
      } catch {
        setError("Unable to load projects.");
      } finally {
        setLoading(false);
      }
    }

    loadProjects();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const teamMembersList = teamMembers
        .split(',')
        .map((member) => member.trim())
        .filter(Boolean);

      await createProject({
        title,
        description,
        problemStatement,
        solution,
        category,
        teamMembers: teamMembersList,
        stage,
        projectImage,
        createdBy,
        status,
      });
      const response = await getProjects();
      setProjects(response.data || []);
      setTitle("");
      setDescription("");
      setProblemStatement("");
      setSolution("");
      setCategory("");
      setTeamMembers("");
      setStage("");
      setProjectImage("");
      setCreatedBy("");
      setStatus("Active");
    } catch {
      setError("Unable to create project.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Projects" description="Publish and manage SLIC project submissions.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Project list</h2>
            <span className="text-xs text-gray-500">{projects.length} records</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading projects…</p>
          ) : (
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <p className="text-sm font-semibold text-gray-900">{project.title}</p>
                  <p className="text-xs text-gray-500 line-clamp-2">{project.description}</p>
                  <div className="mt-3 flex items-center justify-between gap-3 text-[11px] text-gray-500">
                    <span>{new Date(project.createdAt).toLocaleDateString()}</span>
                    <span className="rounded-full bg-gray-100 px-2 py-1 text-gray-700">{project.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Create Project</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Title</label>
              <input
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Project title"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Problem statement</label>
              <textarea
                value={problemStatement}
                onChange={(event) => setProblemStatement(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={3}
                placeholder="What problem does this project solve?"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Solution</label>
              <textarea
                value={solution}
                onChange={(event) => setSolution(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={3}
                placeholder="How does the project work?"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Category</label>
              <input
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Health, Finance, Education"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Team members</label>
              <input
                value={teamMembers}
                onChange={(event) => setTeamMembers(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Alice, Bob, Carol"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-gray-500">Stage</label>
                <input
                  value={stage}
                  onChange={(event) => setStage(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="Ideation, MVP, Scaling"
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Project image</label>
                <input
                  value={projectImage}
                  onChange={(event) => setProjectImage(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="https://..."
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Created by</label>
              <input
                value={createdBy}
                onChange={(event) => setCreatedBy(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Founder or team lead"
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Short overview of the project"
                rows={4}
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Status</label>
              <select
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
              >
                <option>Active</option>
                <option>Review</option>
                <option>Completed</option>
              </select>
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Project"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}