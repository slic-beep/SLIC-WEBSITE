"use client";

import React from "react";

export default function ColumnSelector({
  columns,
  visible,
  onToggle,
}: {
  columns: string[];
  visible: string[];
  onToggle: (col: string) => void;
}) {
  return (
    <div className="flex gap-2 items-center flex-wrap">
      {columns.map((col) => (
        <button
          key={col}
          onClick={() => onToggle(col)}
          className={`px-2 py-1 text-xs rounded-md border ${visible.includes(col) ? 'bg-riara-500 text-white border-riara-500' : 'bg-gray-50 text-gray-700 border-gray-200'}`}
        >
          {col}
        </button>
      ))}
    </div>
  );
}
