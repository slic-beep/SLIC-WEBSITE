"use client";

import { impactMetrics } from "@/lib/constants";
import MetricCounter from "./MetricCounter";

export default function ImpactSection() {
  return (
    <section id="impact" className="py-20 bg-white relative overflow-hidden">
      {/* Gradient Orb Background Effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] rounded-full bg-riara-100 blur-[120px] animate-float" />
        <div className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full bg-riara-100 blur-[100px] animate-float-delayed" />
        <div className="absolute bottom-1/4 left-1/2 w-[350px] h-[350px] rounded-full bg-pink-100 blur-[90px] animate-float" style={{ animationDelay: "3s" }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
            Our Impact
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Measurable outcomes that reflect our commitment to building a
            thriving innovation ecosystem at Riara University.
          </p>
        </div>

        {/* Metrics Row */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {impactMetrics.map((metric, index) => (
            <div
              key={index}
              className="glass-card rounded-2xl p-4 animate-fade-in-up"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <MetricCounter
                label={metric.label}
                value={metric.value}
                suffix={metric.suffix}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
