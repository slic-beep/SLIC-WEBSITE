"use client";

import { useMemo, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import ColumnSelector from "@/components/ColumnSelector";
import ExportModal from "@/components/ExportModal";
import { getMembers, getProjects, getEvents, getApplications } from "@/lib/api";
import { exportToCSV, exportToXLSX, exportToPDF } from "@/lib/export";

type EntityKey = "members" | "projects" | "events" | "applications";

const sourceMap: Record<EntityKey, { label: string; fetch: () => Promise<any[]> }> = {
  members: { label: "Members", fetch: async () => (await getMembers()).data },
  projects: { label: "Projects", fetch: async () => (await getProjects()).data },
  events: { label: "Events", fetch: async () => (await getEvents()).data },
  applications: { label: "Applications", fetch: async () => (await getApplications()).data },
};

function extractDate(row: any) {
  return row.createdAt || row.$createdAt || row.submittedAt || row.date || row.timestamp || null;
}

function pick(obj: Record<string, any>, keys: string[]) {
  const out: Record<string, any> = {};
  keys.forEach((k) => (out[k] = obj[k] ?? ""));
  return out;
}

export default function ReportsPage() {
  const [entity, setEntity] = useState<EntityKey>("members");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState<string | null>(null);
  const [dateTo, setDateTo] = useState<string | null>(null);

  const [visibleColumns, setVisibleColumns] = useState<string[]>([]);
  const [selectedIndices, setSelectedIndices] = useState<number[]>([]);

  const [exportOpen, setExportOpen] = useState(false);

  async function load() {
    setLoading(true);
    setError(null);
    try {
      const items = await sourceMap[entity].fetch();
      const list = items || [];
      setData(list);
      // initialize visible columns from first item
      const keys = list[0] ? Object.keys(list[0]) : [];
      setVisibleColumns(keys.slice(0, 8));
      setSelectedIndices([]);
    } catch (err) {
      setError("Unable to load data for export");
    } finally {
      setLoading(false);
    }
  }

  const columns = useMemo(() => {
    return data[0] ? Object.keys(data[0]) : [];
  }, [data]);

  function toggleColumn(col: string) {
    setVisibleColumns((prev) => (prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]));
  }

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return data.filter((row) => {
      // date filter
      const d = extractDate(row);
      if (d && (dateFrom || dateTo)) {
        const dt = new Date(d);
        if (dateFrom && dt < new Date(dateFrom)) return false;
        if (dateTo && dt > new Date(dateTo + "T23:59:59")) return false;
      }
      if (!q) return true;
      // search across visible columns
      return visibleColumns.some((col) => String(row[col] ?? "").toLowerCase().includes(q));
    });
  }, [data, search, dateFrom, dateTo, visibleColumns]);

  function toggleSelect(index: number) {
    setSelectedIndices((prev) => (prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]));
  }

  function selectAllVisible() {
    const indices = filtered.map((_, i) => i);
    setSelectedIndices(indices);
  }

  function clearSelection() {
    setSelectedIndices([]);
  }

  function doExport(format: "csv" | "xlsx" | "pdf", scope: "all" | "filtered" | "selected", filename: string) {
    let rows: any[] = [];
    if (scope === "all") rows = data;
    if (scope === "filtered") rows = filtered;
    if (scope === "selected") rows = selectedIndices.map((i) => filtered[i]).filter(Boolean);

    // map to visible columns
    const out = rows.map((r) => pick(r, visibleColumns.length ? visibleColumns : columns));

    if (format === "csv") exportToCSV(filename, out);
    if (format === "xlsx") exportToXLSX(filename, out);
    if (format === "pdf") exportToPDF(filename, out);
    setExportOpen(false);
  }

  return (
    <AdminPageShell title="Reports" description="Export and generate executive reports.">
      <div className="space-y-6">
        <div className="glass-card rounded-xl p-5">
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm">Entity</label>
              <select value={entity} onChange={(e) => setEntity(e.target.value as EntityKey)} className="rounded-md p-2 border border-gray-200 bg-gray-50 text-gray-900">
                <option value="members">Members</option>
                <option value="projects">Projects</option>
                <option value="events">Events</option>
                <option value="applications">Applications</option>
              </select>
              <button onClick={load} className="ml-2 px-3 py-2 rounded-md bg-riara-500 text-white">Fetch</button>
            </div>

            <div className="flex items-center gap-2">
              <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} className="rounded-md p-2 border border-gray-200 bg-gray-50 text-gray-900" />
              <input type="date" onChange={(e) => setDateFrom(e.target.value || null)} className="rounded-md p-2 border border-gray-200 bg-gray-50 text-gray-900" />
              <input type="date" onChange={(e) => setDateTo(e.target.value || null)} className="rounded-md p-2 border border-gray-200 bg-gray-50 text-gray-900" />
            </div>

            <div className="ml-auto flex items-center gap-2">
              <button onClick={() => setExportOpen(true)} className="px-3 py-2 rounded-md bg-riara-500 text-white">Export</button>
              <button onClick={selectAllVisible} className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Select All</button>
              <button onClick={clearSelection} className="px-3 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200">Clear</button>
            </div>
          </div>

          <div className="mt-4">
            <div className="text-xs text-gray-500 mb-2">Columns</div>
            <ColumnSelector columns={columns} visible={visibleColumns} onToggle={toggleColumn} />
          </div>
        </div>

        <div className="glass-card rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-2 text-gray-900">Preview ({filtered.length})</h3>
          {loading && <div className="text-xs text-gray-500">Loading…</div>}
          {error && <div className="text-xs text-red-500">{error}</div>}

          {!loading && !error && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr>
                    <th className="p-2 text-xs text-gray-500"> </th>
                    {visibleColumns.map((k) => (
                      <th key={k} className="p-2 text-xs text-gray-500">{k}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.slice(0, 200).map((row, i) => (
                    <tr key={i} className="border-t border-gray-100">
                      <td className="p-2">
                        <input type="checkbox" checked={selectedIndices.includes(i)} onChange={() => toggleSelect(i)} />
                      </td>
                      {visibleColumns.map((k) => (
                        <td key={k} className="p-2 text-xs text-gray-600">{String(row[k] ?? "")}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        <ExportModal
          open={exportOpen}
          onClose={() => setExportOpen(false)}
          onExport={(format, scope, filename) => doExport(format, scope as any, filename)}
          totalCount={data.length}
          filteredCount={filtered.length}
          selectedCount={selectedIndices.length}
        />
      </div>
    </AdminPageShell>
  );
}