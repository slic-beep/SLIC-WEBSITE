"use client";

import { useEffect, useRef, useState } from "react";
import { siteConfig } from "@/lib/constants";

const heroImages = [
  "/images/image1.jpeg",
  "/images/image2.jpeg",
  "/images/image3.jpeg",
  "/images/image4.jpeg",
  "/images/image5.jpeg",
  "/images/image6.jpeg",
  "/images/image7.jpeg",
];

export default function HeroSection() {
  const particlesRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Image carousel rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Floating particles
  useEffect(() => {
    const container = particlesRef.current;
    if (!container) return;
    const count = 30;
    for (let i = 0; i < count; i++) {
      const dot = document.createElement("div");
      const size = Math.random() * 4 + 2;
      dot.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: rgba(124, 58, 237, ${Math.random() * 0.1 + 0.05});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: float ${Math.random() * 6 + 4}s ease-in-out infinite;
        animation-delay: ${Math.random() * 4}s;
        pointer-events: none;
      `;
      container.appendChild(dot);
    }
    return () => {
      container.innerHTML = "";
    };
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">
      {/* Background Image Carousel */}
      <div className="absolute inset-0">
        {heroImages.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 transition-opacity duration-1000 ease-in-out"
            style={{ opacity: i === currentIndex ? 1 : 0 }}
          >
            <img
              src={src}
              alt=""
              className="w-full h-full object-scale-down bg-black"
              loading={i === 0 ? "eager" : "lazy"}
            />
          </div>
        ))}
        {/* Dark overlay for readability */}
        <div className="absolute inset-0 bg-black/50" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
      </div>

      {/* Grid Background */}
      <div className="absolute inset-0 hero-grid opacity-20 z-[1]" />

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 z-[2]" />

      {/* Gradient Orbs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-riara-500/20 rounded-full blur-[128px] z-[2]" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-riara-500/20 rounded-full blur-[128px] z-[2]" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-24 pb-20">
        <div className="max-w-4xl">
          {/* Tagline */}
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-xs text-white/80 font-medium tracking-wide mb-8 animate-fade-in-up">
            <span className="w-2 h-2 rounded-full bg-riara-400 animate-pulse-riara" />
            {siteConfig.tagline}
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] text-white mb-6 animate-fade-in-up">
            {siteConfig.headline}
          </h1>

          {/* Subtitle */}
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl mb-10 animate-fade-in-up">
            {siteConfig.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-4 animate-fade-in-up">
            <a
              href="#join"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-pink-500 text-white font-semibold text-sm hover:bg-pink-600 transition-all duration-200 shadow-lg shadow-pink-500/30"
            >
              Join SLIC
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
            <a
              href="/projects"
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl border border-white/30 text-white/90 font-semibold text-sm hover:bg-white/10 transition-all duration-200 backdrop-blur-sm"
            >
              Explore Innovation
            </a>
          </div>
        </div>

        {/* Floating rings */}
        <div className="absolute right-0 top-1/3 hidden lg:block">
          <div className="relative">
            <div className="w-64 h-64 rounded-full border border-white/10 animate-spin-slow flex items-center justify-center">
              <div className="w-48 h-48 rounded-full border border-white/10 animate-spin-slow" style={{ animationDirection: "reverse" }} />
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-riara-400 rounded-full animate-pulse-riara" />
          </div>
        </div>

        {/* Carousel indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 z-10">
          {heroImages.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === currentIndex
                  ? "w-8 bg-white"
                  : "w-2 bg-white/40 hover:bg-white/60"
              }`}
              aria-label={`Image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white/10 to-transparent z-[3]" />
    </section>
  );
}
