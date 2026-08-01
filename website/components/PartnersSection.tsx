"use client";

import { useEffect, useRef, useState } from "react";
import { getPublicPartners } from "@/lib/api";
import SectionHeader from "./SectionHeader";
import ViewAllButton from "./ViewAllButton";

const tierColors: Record<string, { text: string; border: string; bg: string }> = {
  "Founding Partner": { text: "text-riara-400", border: "border-riara-400/30", bg: "bg-riara-100" },
  "Innovation Partner": { text: "text-pink-400", border: "border-pink-400/30", bg: "bg-pink-100" },
  "Industry Partner": { text: "text-green-400", border: "border-green-400/30", bg: "bg-green-100" },
  "Ecosystem Partner": { text: "text-pink-400", border: "border-pink-400/30", bg: "bg-pink-100" },
  "Mentorship Partner": { text: "text-riara-300", border: "border-zinc-500/30", bg: "bg-riara-100" },
  "Startup Partner": { text: "text-amber-400", border: "border-amber-400/30", bg: "bg-amber-100" },
};

interface PartnersSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
}

export default function PartnersSection({
  limit = 4,
  showViewAll = true,
  showHeader = true,
}: PartnersSectionProps) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [partners, setPartners] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPartners() {
      try {
        const result = await getPublicPartners();
        setPartners(result?.data ?? []);
      } catch (err) {
        setError('Unable to load partners right now.');
      } finally {
        setLoading(false);
      }
    }

    loadPartners();
  }, []);

  useEffect(() => {
    if (loading || !gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>(".partner-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-12");
                card.classList.add("opacity-100", "translate-y-0");
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(gridRef.current);
    return () => observer.disconnect();
  }, [loading, partners.length]);

  const displayedPartners = partners.slice(0, limit);

  return (
    <section id="partners" className="relative py-24 bg-gray-50 overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-riara-100 blur-[120px] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            label="Partners"
            title="Our Partners"
            subtitle="Collaborating with leading organizations to create meaningful innovation opportunities for students."
            align="center"
          />
        )}

        {loading ? (
          <div className="mt-16 text-center py-12 text-gray-500">Loading partners…</div>
        ) : error ? (
          <div className="mt-16 text-center py-12 text-gray-500">{error}</div>
        ) : (
          <>
            <div ref={gridRef} className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {displayedPartners.map((partner, index) => {
                const colors = tierColors[String(partner.category || "Ecosystem Partner")] || {
                  text: "text-gray-600", border: "border-gray-200", bg: "bg-gray-50",
                };

                return (
                  <div
                    key={(partner.$id as string) || index}
                    className="partner-card opacity-0 translate-y-12 transition-all duration-600 ease-out"
                  >
                    <div className="glass-card rounded-2xl p-7 h-full flex flex-col items-center justify-center text-center group">
                      <div
                        className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl flex items-center justify-center text-xl font-bold mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3 overflow-hidden shadow-sm"
                        style={{
                          background: "linear-gradient(135deg, rgba(124,58,237,0.1), rgba(236,72,153,0.1))",
                          border: "1px solid #e5e7eb",
                          color: "#7c3aed",
                        }}
                      >
                        {String(partner.logo || "") ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={String(partner.logo)} alt={String(partner.name || "Partner")} className="w-full h-full object-contain p-3" />
                        ) : (
                          String(partner.name || "P").charAt(0).toUpperCase()
                        )}
                      </div>

                      <h3 className="text-gray-900 font-semibold text-lg mb-3">
                        {String(partner.name || "Partner")}
                      </h3>

                      <span
                        className={`inline-block text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1.5 rounded-full ${colors.text} ${colors.border} ${colors.bg}`}
                      >
                        {String(partner.category || "Ecosystem Partner")}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>

            {showViewAll && partners.length > limit && (
              <div className="mt-14 text-center">
                <ViewAllButton href="/partners" label="View All Partners" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
