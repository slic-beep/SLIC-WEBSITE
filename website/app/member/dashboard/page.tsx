"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { useToast } from "@/components/Toast";
import { getMemberProfile, getPublicAnnouncements, getPublicEvents } from "@/lib/api";

interface MemberProfile {
  member: Record<string, unknown> | null;
  account: Record<string, unknown>;
}

export default function MemberDashboard() {
  const router = useRouter();
  const { token, isAuthenticated, loading, logout, user } = useAuth();
  const { toast } = useToast();

  const [profile, setProfile] = useState<MemberProfile | null>(null);
  const [announcements, setAnnouncements] = useState<Array<Record<string, unknown>>>([]);
  const [upcomingEvents, setUpcomingEvents] = useState<Array<Record<string, unknown>>>([]);

  // Redirect unauthenticated users to login
  useEffect(() => {
    if (!loading && !isAuthenticated) {
      router.replace("/login");
    }
  }, [loading, isAuthenticated, router]);

  const loadProfile = useCallback(async () => {
    if (!token) return;
    try {
      const res = await getMemberProfile(token);
      setProfile(res?.data ?? null);
    } catch {
      // Profile fetch failure is non-fatal — dashboard still renders with account info
    }
  }, [token]);

  useEffect(() => {
    if (!token) return;
    loadProfile();
  }, [token, loadProfile]);

  useEffect(() => {
    async function loadData() {
      try {
        const [annRes, evRes] = await Promise.all([
          getPublicAnnouncements(),
          getPublicEvents(),
        ]);
        setAnnouncements(annRes?.data ?? []);
        setUpcomingEvents(
          (evRes?.data ?? []).filter((e) => (e.status as string) === "Upcoming").slice(0, 3)
        );
      } catch {
        // Non-fatal — leave sections empty
      }
    }
    loadData();
  }, []);

  async function handleLogout() {
    await logout();
    toast("Logged out successfully.", "info");
    router.push("/");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-gray-500">Loading your portal…</div>
      </div>
    );
  }

  const member = profile?.member;
  const str = (value: unknown): string => (typeof value === "string" ? value : value ? String(value) : "");
  const displayName = str(member?.fullName) || str(member?.name) || str(user?.name) || "Member";
  const memberEmail = str(member?.email) || str(user?.email);
  const studentId = str(member?.studentId) || str(member?.userId) || "—";
  const faculty = str(member?.faculty) || "—";
  const course = str(member?.course) || "—";
  const yearOfStudy = str(member?.yearOfStudy) || "—";
  const membershipType = str(member?.membershipType) || "Student";
  const status = str(member?.status) || "Pending";
  const joinedAt = member?.createdAt
    ? new Date(member.createdAt as string).toLocaleDateString("en-KE", { month: "short", year: "numeric" })
    : "—";
  const skills = Array.isArray(member?.skills) ? (member.skills as string[]) : [];
  const interests = Array.isArray(member?.interests) ? (member.interests as string[]) : [];
  const initials = String(displayName)
    .split(" ")
    .map((part) => part.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const statCards = [
    { label: "Membership Status", value: status, accent: status === "Approved" ? "text-green-600" : "text-amber-600" },
    { label: "Student ID", value: String(studentId), accent: "text-gray-900" },
    { label: "Membership Type", value: String(membershipType), accent: "text-riara-500" },
    { label: "Year of Study", value: String(yearOfStudy), accent: "text-gray-900" },
  ];

  const quickActions = [
    { label: "Browse Events", href: "/events", icon: "📅", desc: "Find your next workshop or hackathon" },
    { label: "Explore Projects", href: "/projects", icon: "💡", desc: "See what fellow members are building" },
    { label: "Startup Showcase", href: "/startups", icon: "🚀", desc: "Discover student-led ventures" },
    { label: "Submit an Idea", href: "/", icon: "✍️", desc: "Share a new innovation with SLIC" },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ── Top nav ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-riara-500 to-pink-400 flex items-center justify-center text-white font-bold">
              S
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">Member Portal</p>
              <p className="text-[11px] text-gray-400 leading-tight">SLIC · Riara University</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-sm text-gray-600 font-medium">{String(displayName)}</span>
            <div className="w-9 h-9 rounded-full bg-riara-100 border-2 border-riara-200 flex items-center justify-center text-riara-600 text-sm font-bold">
              {initials}
            </div>
            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-10">
        {/* Welcome banner */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-riara-600 via-riara-500 to-pink-500 p-6 sm:p-8 mb-8 text-white">
          <div className="absolute -top-10 -right-10 w-48 h-48 rounded-full bg-white/10 blur-2xl" />
          <div className="absolute -bottom-16 right-24 w-40 h-40 rounded-full bg-white/10 blur-xl" />
          <p className="text-xs font-semibold tracking-[0.2em] uppercase text-white/70 mb-1">Welcome back</p>
          <h1 className="text-2xl sm:text-3xl font-bold mb-2">{String(displayName)}</h1>
          <p className="text-sm text-white/80 max-w-xl">
            Your hub for events, projects, and the SLIC innovation community.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm text-xs font-semibold">
            <span className={`w-2 h-2 rounded-full ${status === "Approved" ? "bg-green-300" : "bg-amber-300 animate-pulse"}`} />
            {status} membership
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {statCards.map((card) => (
            <div key={card.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-1">{card.label}</p>
              <p className={`text-lg font-bold ${card.accent}`}>{card.value}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column: profile + announcements */}
          <div className="lg:col-span-2 space-y-8">
            {/* Profile card */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Profile</h2>
                <span className="text-xs text-gray-400">Member since {joinedAt}</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4 text-sm">
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Full Name</span>
                  <p className="text-gray-900 font-medium">{String(displayName)}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Email</span>
                  <p className="text-gray-900 font-medium">{memberEmail}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Student ID</span>
                  <p className="text-gray-900 font-medium">{String(studentId)}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Faculty</span>
                  <p className="text-gray-900 font-medium">{String(faculty)}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Course</span>
                  <p className="text-gray-900 font-medium">{String(course)}</p>
                </div>
                <div>
                  <span className="block text-xs text-gray-400 mb-0.5">Year of Study</span>
                  <p className="text-gray-900 font-medium">{String(yearOfStudy)}</p>
                </div>
              </div>

              {(skills.length > 0 || interests.length > 0) && (
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-4">
                  {skills.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {skills.map((skill) => (
                          <span key={skill} className="px-3 py-1 rounded-full bg-riara-50 text-riara-600 text-xs font-medium border border-riara-100">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  {interests.length > 0 && (
                    <div>
                      <p className="text-xs text-gray-400 mb-2">Interests</p>
                      <div className="flex flex-wrap gap-2">
                        {interests.map((interest) => (
                          <span key={interest} className="px-3 py-1 rounded-full bg-pink-50 text-pink-600 text-xs font-medium border border-pink-100">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </section>

            {/* Announcements */}
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Announcements</h2>
                <span className="w-2 h-2 rounded-full bg-riara-500 animate-pulse" />
              </div>
              {announcements.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">No announcements yet.</p>
              ) : (
                <ul className="space-y-4">
                  {announcements.map((ann, idx) => (
                    <li key={(ann.$id as string) || idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-riara-50 border border-riara-100 flex items-center justify-center">
                        <span className="text-base">📢</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{String(ann.title || "Announcement")}</p>
                        <p className="text-sm text-gray-500 leading-relaxed mt-0.5">{String(ann.content || "")}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Right column: upcoming events + quick actions */}
          <div className="space-y-8">
            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg font-bold text-gray-900">Upcoming Events</h2>
                <a href="/events" className="text-xs font-semibold text-riara-500 hover:text-riara-600">
                  View all →
                </a>
              </div>
              {upcomingEvents.length === 0 ? (
                <p className="text-gray-400 text-sm py-4 text-center">No upcoming events.</p>
              ) : (
                <ul className="space-y-4">
                  {upcomingEvents.map((event, idx) => (
                    <li key={(event.$id as string) || idx} className="flex gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-pink-50 border border-pink-100 flex items-center justify-center">
                        <span className="text-base">🗓️</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-gray-900">{String(event.title || "Event")}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{String(event.date || "Date TBD")}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </section>

            <section className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-5">Quick Links</h2>
              <div className="grid grid-cols-2 gap-3">
                {quickActions.map((action) => (
                  <a
                    key={action.label}
                    href={action.href}
                    className="group rounded-xl border border-gray-100 bg-gray-50 hover:border-riara-200 hover:bg-riara-50 p-4 transition-all"
                  >
                    <span className="text-xl block mb-2">{action.icon}</span>
                    <p className="text-sm font-semibold text-gray-900 group-hover:text-riara-600">{action.label}</p>
                    <p className="text-xs text-gray-400 mt-0.5 leading-snug">{action.desc}</p>
                  </a>
                ))}
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
