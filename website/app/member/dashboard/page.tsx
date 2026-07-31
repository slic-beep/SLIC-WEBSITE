"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";

export default function MemberDashboard() {
  const router = useRouter();
  const { token, user, isAuthenticated, loading, logout } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  async function handleLogout() {
    await logout();
    toast("Logged out successfully.", "info");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-riara-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
              S
            </div>
            <span className="font-bold text-gray-900">Member Portal</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-500">
              {user?.name as string || user?.email as string || "Member"}
            </span>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Dashboard</h1>
        <p className="text-gray-500 mb-8">Welcome to your SLIC member portal.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-gray-900 font-semibold mb-1">Membership Status</h2>
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-700">
              Pending Review
            </span>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-gray-900 font-semibold mb-1">My Projects</h2>
            <p className="text-gray-400 text-sm">No projects yet</p>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <h2 className="text-gray-900 font-semibold mb-1">Events Attended</h2>
            <p className="text-gray-400 text-sm">No events yet</p>
          </div>
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
          <h2 className="text-gray-900 font-semibold mb-4">Profile Information</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Name</span>
              <p className="text-gray-900 font-medium">{user?.name as string || "—"}</p>
            </div>
            <div>
              <span className="text-gray-400">Email</span>
              <p className="text-gray-900 font-medium">{user?.email as string || "—"}</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
