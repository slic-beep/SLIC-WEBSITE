"use client";

import { useEffect, useRef, useState } from "react";
import { getPublicLeadership } from "@/lib/api";
import SectionHeader from "./SectionHeader";
import ViewAllButton from "./ViewAllButton";

const gradientPairs = [
  ["#7c3aed", "#7c3aed"],
  ["#7c3aed", "#ec4899"],
  ["#ec4899", "#34d399"],
  ["#34d399", "#7c3aed"],
  ["#7c3aed", "#ec4899"],
  ["#7c3aed", "#34d399"],
  ["#ec4899", "#7c3aed"],
  ["#34d399", "#7c3aed"],
];

const socialIcon = (platform: "linkedin" | "twitter") => {
  if (platform === "linkedin") {
    return (
      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
      </svg>
    );
  }
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  );
};

interface LeadershipSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
}

export default function LeadershipSection({
  limit = 4,
  showViewAll = true,
  showHeader = true,
}: LeadershipSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [leaders, setLeaders] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadLeaders() {
      try {
        const result = await getPublicLeadership();
        setLeaders(result?.data ?? []);
      } catch (err) {
        setError("Unable to load the team right now.");
      } finally {
        setLoading(false);
      }
    }

    loadLeaders();
  }, []);

  useEffect(() => {
    if (loading || !sectionRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll<HTMLElement>(".team-card");
            cards.forEach((card, i) => {
              setTimeout(() => {
                card.classList.remove("opacity-0", "translate-y-8");
                card.classList.add("opacity-100", "translate-y-0");
              }, i * 100);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [loading, leaders.length]);

  const displayedLeaders = leaders.slice(0, limit);

  return (
    <section id="leadership" className="relative py-24 bg-white overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <SectionHeader
            label="Leadership"
            title="Meet Our Team"
            subtitle="Dedicated student leaders driving innovation and impact across Riara University."
            align="center"
          />
        )}

        {loading ? (
          <div className="mt-16 text-center py-12 text-gray-500">Loading team…</div>
        ) : error ? (
          <div className="mt-16 text-center py-12 text-gray-500">{error}</div>
        ) : displayedLeaders.length === 0 ? (
          <div className="mt-16 text-center py-12 text-gray-500">
            Our leadership team will be announced soon.
          </div>
        ) : (
          <>
            <div
              ref={sectionRef}
              className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {displayedLeaders.map((member, index) => {
                const [gradFrom, gradTo] = gradientPairs[index % gradientPairs.length];
                const name = String(member.name || "Team Member");
                const role = String(member.role || "");
                const bio = String(member.bio || "");
                const image = String(member.image || "");
                const linkedin = String(member.socialLinkedin || "");
                const twitter = String(member.socialTwitter || "");
                const initial = name.charAt(0).toUpperCase();

                return (
                  <div
                    key={(member.$id as string) || index}
                    className="team-card opacity-0 translate-y-8 transition-all duration-500 ease-out"
                  >
                    <div className="glass-card rounded-2xl p-6 flex flex-col items-center text-center h-full group">
                      {/* Avatar / Photo */}
                      <div
                        className="w-20 h-20 rounded-full flex items-center justify-center text-white text-2xl font-bold mb-4 transition-transform duration-300 group-hover:scale-110 overflow-hidden"
                        style={
                          image
                            ? undefined
                            : { background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }
                        }
                      >
                        {image ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img src={image} alt={name} className="w-full h-full object-cover" />
                        ) : (
                          initial
                        )}
                      </div>

                      {/* Role Badge */}
                      {role && (
                        <span
                          className="inline-block text-[10px] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-3"
                          style={{
                            color: gradFrom,
                            border: `1px solid ${gradFrom}33`,
                            background: `${gradFrom}11`,
                          }}
                        >
                          {role}
                        </span>
                      )}

                      {/* Name */}
                      <h3 className="text-gray-900 font-semibold text-lg mb-2">{name}</h3>

                      {/* Bio */}
                      {bio && (
                        <p className="text-gray-600 text-sm leading-relaxed mb-5 flex-1">{bio}</p>
                      )}

                      {/* Social Icons */}
                      {(linkedin || twitter) && (
                        <div className="flex items-center gap-3">
                          {linkedin && (
                            <a
                              href={linkedin}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-riara-500 hover:bg-riara-100 transition-all duration-300"
                              aria-label={`${name} LinkedIn`}
                            >
                              {socialIcon("linkedin")}
                            </a>
                          )}
                          {twitter && (
                            <a
                              href={twitter}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-riara-500 hover:bg-riara-100 transition-all duration-300"
                              aria-label={`${name} Twitter`}
                            >
                              {socialIcon("twitter")}
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {showViewAll && leaders.length > limit && (
              <div className="mt-14 text-center">
                <ViewAllButton href="/leadership" label="View Full Team" />
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
