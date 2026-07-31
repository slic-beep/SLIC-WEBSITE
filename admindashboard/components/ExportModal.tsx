"use client";

import React from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  onExport: (format: "csv" | "xlsx" | "pdf", scope: "all" | "filtered" | "selected", filename: string) => void;
  totalCount: number;
  filteredCount: number;
  selectedCount: number;
};

export default function ExportModal({ open, onClose, onExport, totalCount, filteredCount, selectedCount }: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-lg p-6 bg-white rounded-xl shadow-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-2">Export Options</h3>
        <p className="text-sm text-gray-500 mb-4">Choose export format and which records to include.</p>

        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-3">
            <button onClick={() => onExport("csv", "all", "export_all") } className="px-3 py-2 rounded bg-riara-500 text-white text-sm">CSV &mdash; All ({totalCount})</button>
            <button onClick={() => onExport("xlsx", "filtered", "export_filtered") } className="px-3 py-2 rounded bg-gray-100 text-gray-700 text-sm">XLSX &mdash; Filtered ({filteredCount})</button>
            <button onClick={() => onExport("pdf", "selected", "export_selected") } className="px-3 py-2 rounded bg-gray-100 text-gray-700 text-sm">PDF &mdash; Selected ({selectedCount})</button>
          </div>
          <p className="text-xs text-gray-500">Tip: use the preview table to select specific rows for PDF output.</p>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button onClick={onClose} className="px-4 py-2 rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition text-sm">Cancel</button>
        </div>
      </div>
    </div>
  );
}
