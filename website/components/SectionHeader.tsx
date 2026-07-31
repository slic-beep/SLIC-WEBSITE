"use client";

import { useEffect, useRef } from "react";

interface SectionHeaderProps {
  label: string;
  title: string;
  subtitle?: string;
  align?: "center" | "left";
  gradient?: boolean;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  gradient = false,
}: SectionHeaderProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-8");
        }
      },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`opacity-0 translate-y-8 transition-all duration-700 ease-out max-w-3xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-riara-400 mb-4">
        {label}
      </span>
      <h2
        className={`text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4 ${
          gradient ? "gradient-text" : "text-gray-900"
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}