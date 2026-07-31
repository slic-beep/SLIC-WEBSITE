"use client";

import { useState } from "react";
import Link from "next/link";

export default function Topbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex items-center gap-4">
      <div className="relative">
        <input
          type="search"
          placeholder="Search members, projects..."
          className="hidden sm:inline-block w-64 rounded-2xl border border-gray-200 bg-gray-50 px-4 py-2 text-sm text-gray-900 outline-none focus:border-riara-400"
        />
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((s) => !s)}
          className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-md border border-gray-200 bg-gray-50 hover:bg-gray-100 transition text-gray-700"
          aria-expanded={open}
          aria-haspopup="menu"
        >
          Quick Actions
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {open && (
          <div className="absolute right-0 mt-2 w-56 bg-white text-black rounded-md shadow-lg overflow-hidden z-50">
            <Link href={{ pathname: "/members", query: { create: "1" } }} className="block px-4 py-2 text-sm hover:bg-gray-100">
              Add Member
            </Link>
            <Link href={{ pathname: "/events", query: { create: "1" } }} className="block px-4 py-2 text-sm hover:bg-gray-100">
              Create Event
            </Link>
            <Link href={{ pathname: "/reports", query: { generate: "monthly" } }} className="block px-4 py-2 text-sm hover:bg-gray-100">
              Generate Report
            </Link>
          </div>
        )}
      </div>

      <button className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors">
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 00-4-5.659V5a2 2 0 10-4 0v.341" />
          <path strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" d="M13 21a3 3 0 11-6 0v-1" />
        </svg>
        <span className="sr-only">Notifications</span>
      </button>

      <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-riara-500 to-pink-400 flex items-center justify-center text-white font-bold text-xs">
        A
      </div>
    </div>
  );
}
