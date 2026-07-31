"use client";

import { useEffect, useRef } from "react";
import { siteConfig } from "@/lib/constants";
import SectionHeader from "./SectionHeader";

const values = [
  { title: "Innovation", desc: "Pushing boundaries with creative thinking and emerging technologies." },
  { title: "Entrepreneurship", desc: "Building startups and solutions that solve real problems." },
  { title: "Research", desc: "Deep inquiry and evidence-based problem-solving." },
  { title: "Problem-Solving", desc: "Tackling challenges with structured thinking and collaboration." },
  { title: "Leadership", desc: "Developing the next generation of visionary leaders." },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("opacity-100", "translate-y-0");
          entry.target.classList.remove("opacity-0", "translate-y-12");
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="relative py-24 sm:py-32 bg-gray-50">
      <div className="absolute inset-0 bg-gradient-to-b from-white to-transparent opacity-60" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="About SLIC"
          title="Where Student Ideas Become Impact"
          subtitle={siteConfig.description}
        />

        {/* Vision & Mission */}
        <div
          ref={ref}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 opacity-0 translate-y-12 transition-all duration-700 ease-out"
        >
          <div className="gradient-border p-8">
            <div className="text-3xl mb-4">🔭</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Vision</h3>
            <p className="text-gray-600 leading-relaxed">{siteConfig.vision}</p>
          </div>
          <div className="gradient-border p-8">
            <div className="text-3xl mb-4">🎯</div>
            <h3 className="text-xl font-bold text-gray-900 mb-3">Our Mission</h3>
            <p className="text-gray-600 leading-relaxed">{siteConfig.mission}</p>
          </div>
        </div>

        {/* Values */}
        <div className="mt-20">
          <h3 className="text-center text-sm font-semibold tracking-[0.2em] uppercase text-gray-400 mb-10">
            What Drives Us
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="glass-card rounded-xl p-5 text-center"
                style={{
                  animation: `fade-in-up 0.5s ease-out ${i * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <h4 className="text-sm font-bold text-gray-900 mb-2">{v.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}