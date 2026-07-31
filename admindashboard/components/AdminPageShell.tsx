"use client";

import type { ReactNode } from "react";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import { useState } from "react";

interface AdminPageShellProps {
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export default function AdminPageShell({
  title,
  description,
  action,
  children,
}: AdminPageShellProps) {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex min-h-screen">
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((s) => !s)} />

      <div className={`flex-1 transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-60'}`}>
        <header className="h-16 border-b border-gray-200 flex items-center justify-between px-6 bg-white/90 backdrop-blur-xl">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCollapsed((s) => !s)}
              className="md:hidden w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors"
              aria-label="Toggle sidebar"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
          <div className="flex-1">
            <h1 className="text-base font-semibold text-gray-900">{title}</h1>
            {description ? (
              <p className="text-xs text-gray-500">{description}</p>
            ) : (
              <p className="text-xs text-gray-500">Manage SLIC content and collections.</p>
            )}
          </div>
          {action ? (
            <div className="flex items-center gap-4">{action}</div>
          ) : (
            <div className="flex items-center gap-4">
              <Topbar />
            </div>
          )}
        </header>

        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
