"use client";

import { useEffect, useMemo, useState } from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { getMembers, Member } from "@/lib/api";

function formatMonthLabel(date: Date) {
  return date.toLocaleString(undefined, { month: "short", year: "numeric" });
}

export default function MembershipGrowth() {
  const [data, setData] = useState<{ month: string; count: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      setLoading(true);
      setError(null);
      try {
        const resp = await getMembers();
        const members: Member[] = resp.data || [];

        // build last 12 months buckets
        const now = new Date();
        const months: Date[] = [];
        for (let i = 11; i >= 0; i--) {
          const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
          months.push(d);
        }

        const counts: Record<string, number> = {};
        months.forEach((m) => (counts[m.toISOString()] = 0));

        members.forEach((m) => {
          const created = m.createdAt ? new Date(m.createdAt) : null;
          if (!created) return;
          // find matching month (first day iso)
          const key = new Date(created.getFullYear(), created.getMonth(), 1).toISOString();
          if (counts[key] === undefined) return; // outside range
          counts[key] = (counts[key] || 0) + 1;
        });

        const chartData = months.map((m) => ({ month: formatMonthLabel(m), count: counts[m.toISOString()] || 0 }));

        if (mounted) setData(chartData);
      } catch (err) {
        setError("Unable to load membership data");
      } finally {
        if (mounted) setLoading(false);
      }
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  const total = useMemo(() => data.reduce((s, d) => s + d.count, 0), [data]);

  return (
    <div className="glass-card rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-gray-900">Membership Growth</h3>
          <div className="text-xs text-gray-500">Last 12 months</div>
        </div>
        <div className="text-right">
          <div className="text-lg font-bold text-gray-900">{total}</div>
          <div className="text-xs text-gray-500">New members</div>
        </div>
      </div>

      {loading ? (
        <div className="text-xs text-gray-500">Loading chart…</div>
      ) : error ? (
        <div className="text-xs text-red-500">{error}</div>
      ) : (
        <div style={{ width: "100%", height: 260 }}>
          <ResponsiveContainer>
            <LineChart data={data} margin={{ top: 10, right: 20, left: -10, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
              <XAxis dataKey="month" tick={{ fontSize: 12 }} />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Line type="monotone" dataKey="count" stroke="#7c3aed" strokeWidth={3} dot={{ r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}