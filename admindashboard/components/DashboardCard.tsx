import React from "react";

interface DashboardCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: React.ReactNode;
  trend?: { value: string; positive: boolean; percent?: number; comparison?: string };
}

export default function DashboardCard({ title, value, subtitle, icon, trend }: DashboardCardProps) {
  return (
    <div className="glass-card rounded-xl p-5 animate-fade-in-up">
      <div className="flex items-start justify-between mb-3">
        <span className="text-lg">{icon}</span>
        {trend && (
          <div className="flex items-center gap-3">
            <span
              className={`text-xs font-medium flex items-center gap-1 ${
                trend.positive ? "text-riara-green" : "text-red-400"
              }`}
            >
              <svg
                className={`w-3 h-3 ${trend.positive ? "" : "rotate-180"}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 10l7-7m0 0l7 7m-7-7v18"
                />
              </svg>
              {trend.value}
            </span>

            {typeof trend.percent === "number" && (
              <span
                className={`text-xs font-semibold px-2 py-0.5 rounded-md bg-gray-100 ${
                  trend.positive ? "text-riara-green" : "text-red-400"
                }`}
              >
                {trend.percent > 0 ? "+" : ""}{trend.percent}%
              </span>
            )}
          </div>
        )}
      </div>
      <div className="text-2xl font-bold text-gray-900 mb-0.5">{value}</div>
      <div className="text-xs text-gray-500">{title}</div>
      {subtitle && (
        <div className="text-[11px] text-gray-500 mt-1">{subtitle}</div>
      )}
    </div>
  );
}
