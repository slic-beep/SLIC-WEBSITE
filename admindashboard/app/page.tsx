"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import DashboardCard from "@/components/DashboardCard";
import {
  IconUsers,
  IconRocket,
  IconCalendar,
  IconPrograms,
  IconHandshake,
  IconApplications,
} from "@/components/Icon";
import { getDashboardOverview, getRecentActivities, getPendingApprovals, RecentActivity, PendingApproval } from "@/lib/api";
import MembershipGrowth from "@/components/charts/MembershipGrowth";

const initialRecentActivities: RecentActivity[] = [];
const initialPendingApprovals: PendingApproval[] = [];

interface DashboardStat {
  title: string;
  value: string | number;
  icon: string;
  trend?: { value: string; positive: boolean };
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStat[]>([]);
  const [overviewData, setOverviewData] = useState<Record<string, number> | null>(null);
  const [recentActivities, setRecentActivities] = useState<RecentActivity[]>(initialRecentActivities);
  const [pendingApprovalsState, setPendingApprovalsState] = useState<PendingApproval[]>(initialPendingApprovals);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadOverview() {
    setLoading(true);
    setError(null);

    try {
      const data = await getDashboardOverview();
      const recent = await getRecentActivities();
      const pending = await getPendingApprovals();
      setRecentActivities(recent);
      setPendingApprovalsState(pending);
      setOverviewData(data);
      setStats([
        { title: "Total Members", value: data.members ?? 0, icon: "👥", trend: { value: "Live", positive: true } },
        { title: "Active Projects", value: data.projects ?? 0, icon: "🚀", trend: { value: "Live", positive: true } },
        { title: "Upcoming Events", value: data.events ?? 0, icon: "📅", trend: { value: "Live", positive: true } },
        { title: "Programs", value: data.programs ?? 0, icon: "🎓", trend: { value: "Live", positive: true } },
        { title: "Partnerships", value: data.partners ?? 0, icon: "🤝", trend: { value: "Live", positive: true } },
        { title: "Applications", value: data.applications ?? 0, icon: "📝", trend: { value: "New", positive: true } },
      ]);
    } catch (error) {
      setError("Unable to load dashboard metrics.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadOverview();
  }, []);

  return (
    <AdminPageShell
      title="Dashboard"
      description="Summary of active members, projects, events, programs, and partnerships."
      action={
        <button
          type="button"
          onClick={loadOverview}
          className="rounded-md border border-gray-200 px-3 py-2 text-xs text-gray-600 hover:bg-gray-50 transition"
        >
          Refresh
        </button>
      }
    >
      <div className="space-y-6">
        {loading ? (
          <div className="text-gray-500 text-sm">Loading dashboard metrics&hellip;</div>
        ) : error ? (
          <div className="text-red-500 text-sm">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {stats.map((stat) => {
                let IconComp = IconApplications;
                if (stat.title === "Total Members") IconComp = IconUsers;
                if (stat.title === "Active Projects") IconComp = IconRocket;
                if (stat.title === "Upcoming Events") IconComp = IconCalendar;
                if (stat.title === "Programs") IconComp = IconPrograms;
                if (stat.title === "Partnerships") IconComp = IconHandshake;
                if (stat.title === "Applications") IconComp = IconApplications;

                return (
                  <DashboardCard
                    key={stat.title}
                    title={stat.title}
                    value={stat.value}
                    icon={<IconComp className="w-6 h-6 text-riara-500" />}
                    trend={{ value: stat.trend?.value ?? "", positive: stat.trend?.positive ?? true, percent: stat.trend?.value === 'Live' ? 5 : undefined }}
                  />
                );
              })}
            </div>
          </>
        )}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Activity */}
          <div className="lg:col-span-2 glass-card rounded-xl p-5">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Recent Activity</h2>
            {recentActivities.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">No recent activity yet.</p>
              </div>
            ) : (
              <div className="space-y-0">
                {recentActivities.map((activity, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-3 py-3 border-b border-gray-100 last:border-0"
                  >
                    <div className="w-7 h-7 rounded-full bg-gray-100 flex items-center justify-center text-xs flex-shrink-0">
                      {activity.type === "member"
                        ? "👤"
                        : activity.type === "project"
                        ? "🏗️"
                        : activity.type === "event"
                        ? "📅"
                        : activity.type === "partner"
                        ? "🤝"
                        : "📋"}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-gray-700">{activity.action}</p>
                      <p className="text-xs text-gray-500">{activity.user}</p>
                    </div>
                    <span className="text-[11px] text-gray-400 flex-shrink-0">
                      {activity.time}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pending Approvals */}
          <div className="glass-card rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-gray-900">Pending Approvals</h2>
              <span className="text-xs text-riara-500">{pendingApprovalsState.length} items</span>
            </div>
            {pendingApprovalsState.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-8 text-gray-400">
                <svg className="w-10 h-10 mb-3" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-sm">All clear &mdash; no pending approvals.</p>
              </div>
            ) : (
              <div className="space-y-2">
                {pendingApprovalsState.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-3 rounded-lg bg-gray-50"
                  >
                    <div>
                      <p className="text-sm text-gray-700">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.type}</p>
                    </div>
                    <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
                      Pending
                    </span>
                  </div>
                ))}
              </div>
            )}
            <button className="w-full mt-4 py-2 text-xs text-riara-500 hover:text-gray-900 transition-colors text-center">
              View All Approvals &rarr;
            </button>
          </div>
        </div>

        {/* Membership Growth Chart */}
        <div className="grid grid-cols-1 gap-6">
          <MembershipGrowth />
        </div>
      </div>
    </AdminPageShell>
  );
}
