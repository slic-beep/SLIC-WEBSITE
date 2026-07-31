"use client";

import AdminPageShell from "@/components/AdminPageShell";
import MembershipGrowth from "@/components/charts/MembershipGrowth";

export default function AnalyticsPage() {
  return (
    <AdminPageShell title="Analytics" description="Insights into membership and program performance.">
      <div className="space-y-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MembershipGrowth />
          {/* placeholder for next chart */}
          <div className="glass-card rounded-xl p-5 flex flex-col items-center justify-center min-h-[200px]">
            <h2 className="text-sm font-semibold text-gray-900">Faculty Distribution</h2>
            <p className="text-sm text-gray-500 mt-1">This chart is coming soon. Stay tuned for faculty breakdown insights.</p>
          </div>
        </div>
      </div>
    </AdminPageShell>
  );
}