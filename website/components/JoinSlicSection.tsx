"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import SectionHeader from "./SectionHeader";
import MembershipForm from "./MembershipForm";

const benefits = [
  { title: "Innovation Skills", description: "Master design thinking, rapid prototyping, and emerging technologies through hands-on workshops and real challenges.", icon: "💡" },
  { title: "Entrepreneurship Exposure", description: "Gain firsthand experience with startup methodologies, pitch training, and mentorship from successful founders.", icon: "🚀" },
  { title: "Networking", description: "Connect with industry leaders, alumni, investors, and fellow innovators across East Africa's tech ecosystem.", icon: "🤝" },
  { title: "Leadership Growth", description: "Develop project management, team coordination, and public speaking skills by leading real initiatives.", icon: "🎯" },
  { title: "Real-World Projects", description: "Build portfolio-worthy solutions to actual industry problems, collaborating with peers and mentors.", icon: "⚡" },
];

export default function JoinSlicSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showForm, setShowForm] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (showForm) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showForm]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>(".benefit-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-8");
                card.classList.add("opacity-100", "translate-y-0");
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="join" className="relative py-24 bg-white overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-riara-100 blur-[150px] pointer-events-none opacity-60" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full bg-riara-50 blur-[150px] pointer-events-none opacity-60" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          label="Join Us"
          title="Ready to Build the Future?"
          subtitle="Become part of a vibrant community of innovators, creators, and changemakers at Riara University."
          align="center"
        />

        {/* Benefits Grid */}
        <div ref={sectionRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-5xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={benefit.title}
              className={`benefit-card opacity-0 translate-y-8 transition-all duration-500 ease-out ${
                index === benefits.length - 1 && benefits.length % 3 === 2 ? "sm:col-span-2 lg:col-span-1" : ""
              }`}
            >
              <div className="relative h-full p-6 rounded-2xl bg-white border-2 border-gray-200 hover:border-riara-300 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_32px_-8px_rgba(124,58,237,0.15)]">
                {/* Top accent bar */}
                <div className="w-10 h-1.5 rounded-full bg-gradient-to-r from-riara-500 to-pink-500 mb-4" />

                <div className="flex items-start gap-4">
                  <span className="flex-shrink-0 w-12 h-12 rounded-xl bg-riara-50 border-2 border-riara-200 flex items-center justify-center text-xl">
                    {benefit.icon}
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-gray-900 font-bold text-base mb-1.5">{benefit.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Section */}
        <div className="mt-20 flex flex-col items-center">
          <div className="relative group">
            {/* Glow rings */}
            <div className="absolute -inset-6 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{
                background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
              }}
            />
            <div className="absolute -inset-1 rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background: "linear-gradient(135deg, #7c3aed, #ec4899, #10b981)",
                backgroundSize: "300% 300%",
                animation: "gradient-shift 4s ease-in-out infinite",
                filter: "blur(8px)",
              }}
            />
            <button
              onClick={() => setShowForm(true)}
              className="relative inline-flex items-center gap-3 px-10 py-4 rounded-full bg-gray-900 text-white font-bold text-lg tracking-wide transition-all duration-300 hover:scale-105 active:scale-95 border-2 border-gray-900 hover:bg-gray-800"
            >
              <span className="relative z-10 flex items-center gap-3">
                Become a Member
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </span>
            </button>
          </div>
          <p className="mt-6 text-gray-500 text-sm text-center max-w-md">
            Open to all Riara University students. No prior experience required — just passion and curiosity.
          </p>
        </div>
      </div>

      {/* Portal modal */}
      {showForm && mounted && createPortal(
        <div className="fixed inset-0 z-[9999]">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setShowForm(false)} />
          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-start justify-center pt-6 sm:pt-12 md:pt-20 pb-12 px-4">
              <div
                className="relative bg-white rounded-2xl shadow-2xl w-full max-w-lg md:max-w-xl border-2 border-gray-200 animate-fade-in-up"
                onClick={(e) => e.stopPropagation()}
              >
                <MembershipForm onClose={() => setShowForm(false)} />
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </section>
  );
}
