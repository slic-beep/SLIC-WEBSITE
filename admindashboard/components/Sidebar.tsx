"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  IconUsers,
  IconRocket,
  IconCalendar,
  IconPrograms,
  IconHandshake,
  IconApplications,
  IconLeader,
} from "@/components/Icon";

const groupedNav = [
  {
    group: "Main",
    items: [
      { label: "Dashboard", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={1.5} d="M3 13h8V3H3v10zM13 21h8V11h-8v10zM13 3v6h8V3h-8zM3 21h8v-6H3v6z"/></svg>, href: "/" },
    ],
  },
  {
    group: "Manage",
    items: [
      { label: "Members", icon: <IconUsers className="w-5 h-5" />, href: "/members" },
      { label: "Projects", icon: <IconRocket className="w-5 h-5" />, href: "/projects" },
      { label: "Events", icon: <IconCalendar className="w-5 h-5" />, href: "/events" },
      { label: "Programs", icon: <IconPrograms className="w-5 h-5" />, href: "/programs" },
      { label: "Partners", icon: <IconHandshake className="w-5 h-5" />, href: "/partners" },
      { label: "Hero Images", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 10l3 3 2-2 4 4"/></svg>, href: "/hero-images" },
      { label: "Impact Metrics", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 19h16M7 15l3-4 3 2 4-6"/></svg>, href: "/impact-metrics" },
      { label: "Leadership", icon: <IconLeader className="w-5 h-5" />, href: "/leadership" },
      { label: "Applications", icon: <IconApplications className="w-5 h-5" />, href: "/applications" },
    ],
  },
  {
    group: "Insights",
    items: [
      { label: "Analytics", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={1.5} d="M3 3v18h18"/><path strokeWidth={1.5} d="M7 13l3-3 4 4 5-5"/></svg>, href: "/analytics" },
      { label: "Reports", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={1.5} d="M9 17v-6a3 3 0 013-3h6"/><path strokeWidth={1.5} d="M21 7v10a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h12"/></svg>, href: "/reports" },
    ],
  },
  {
    group: "Settings",
    items: [{ label: "Settings", icon: <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path strokeWidth={1.5} d="M12 15.5A3.5 3.5 0 1012 8.5a3.5 3.5 0 000 7z"/><path strokeWidth={1.5} d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09a1.65 1.65 0 00-1-1.51 1.65 1.65 0 00-1.82.33l-.06.06A2 2 0 014.28 18.9l.06-.06a1.65 1.65 0 00.33-1.82A1.65 1.65 0 003 15.4H3a2 2 0 010-4h.09a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-.33-1.82L3.28 3.78A2 2 0 016.11 1l.06.06a1.65 1.65 0 001.82.33c.6-.35 1.3-.35 1.82 0 .6.35 1.3.35 1.82 0a1.65 1.65 0 001.82-.33L17.7 1A2 2 0 0120.72 3.78l-.06.06a1.65 1.65 0 00-.33 1.82c.35.6.35 1.3 0 1.82.35.6.35 1.3 0 1.82z"/></svg>, href: "/settings" }],
  },
];

export default function Sidebar({ collapsed: collapsedProp, onToggle }: { collapsed?: boolean; onToggle?: () => void }) {
  const pathname = usePathname();
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const collapsed = typeof collapsedProp === "boolean" ? collapsedProp : internalCollapsed;

  function toggle() {
    if (onToggle) onToggle();
    else setInternalCollapsed((s) => !s);
  }

  return (
    <aside
      className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 flex flex-col z-40 transition-all duration-300 ${
        collapsed ? "w-16" : "w-60"
      }`}
      aria-expanded={!collapsed}
    >
      <div className="h-16 flex items-center gap-2.5 px-4 border-b border-gray-100">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-riara-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          S
        </div>
        {!collapsed && (
          <div className="flex flex-col">
            <span className="text-sm font-bold text-gray-900">SLIC Admin</span>
            <span className="text-[10px] text-gray-500">Dashboard</span>
          </div>
        )}
      </div>

      <nav className="flex-1 py-4 px-2 space-y-3 overflow-y-auto">
        {groupedNav.map((group) => (
          <div key={group.group} className="px-2">
            {!collapsed && <div className="text-xs text-gray-500 uppercase px-2 mb-2">{group.group}</div>}
            <div className="space-y-1">
              {group.items.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`sidebar-link w-full text-left flex items-center gap-3 ${isActive ? "active" : ""}`}
                    title={collapsed ? item.label : undefined}
                  >
                    <span className="text-base flex-shrink-0 text-gray-500">{item.icon}</span>
                    {!collapsed && <span>{item.label}</span>}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-2 border-t border-gray-200">
        <button
          onClick={toggle}
          className="sidebar-link w-full text-left justify-center flex items-center gap-2"
          title={collapsed ? "Expand" : "Collapse"}
        >
          <svg
            className={`w-4 h-4 transition-transform duration-200 ${collapsed ? "" : "rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
          </svg>
          {!collapsed && <span className="text-xs">Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
