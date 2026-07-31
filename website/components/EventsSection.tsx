"use client";

import { useEffect, useState } from "react";
import { getPublicEvents } from "@/lib/api";
import ViewAllButton from "./ViewAllButton";
import EventRegistrationModal from "./EventRegistrationModal";

const categoryColors: Record<string, string> = {
  Bootcamp: "bg-riara-500/20 text-riara-400 border border-riara-500/30",
  Exposure: "bg-purple-500/20 text-purple-300 border border-purple-500/30",
  Workshop: "bg-pink-500/20 text-pink-300 border border-pink-500/30",
  Summit: "bg-green-500/20 text-green-400 border border-green-500/30",
  Hackathon: "bg-amber-500/20 text-amber-300 border border-amber-500/30",
  Talk: "bg-riara-500/20 text-riara-300 border border-riara-500/30",
};

interface EventsSectionProps {
  limit?: number;
  showViewAll?: boolean;
  showHeader?: boolean;
}

export default function EventsSection({
  limit = 4,
  showViewAll = true,
  showHeader = true,
}: EventsSectionProps) {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const [events, setEvents] = useState<Array<Record<string, unknown>>>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvent, setSelectedEvent] = useState<Record<string, unknown> | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const result = await getPublicEvents();
        setEvents(result?.data ?? []);
      } catch (err) {
        setError("Unable to load events right now.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  const upcomingEvents = events.filter((event) => (event.status as string) === "Upcoming");
  const pastEvents = events.filter((event) => (event.status as string) !== "Upcoming");
  const displayedEvents = (activeTab === "upcoming" ? upcomingEvents : pastEvents).slice(0, limit);
  const totalForTab = activeTab === "upcoming" ? upcomingEvents.length : pastEvents.length;

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {showHeader && (
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold gradient-text mb-4">
              Events & Activities
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stay connected with our innovation ecosystem through workshops,
              hackathons, summits, and networking opportunities.
            </p>
          </div>
        )}

        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-xl bg-gray-100 p-1 border border-gray-200">
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "upcoming"
                  ? "bg-white text-riara-500 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Upcoming
            </button>
            <button
              onClick={() => setActiveTab("past")}
              className={`px-6 py-2.5 rounded-lg text-sm font-medium transition-all duration-300 ${
                activeTab === "past"
                  ? "bg-white text-riara-500 shadow-sm"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              Past Events
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-16 text-gray-500">Loading events…</div>
        ) : error ? (
          <div className="text-center py-16 text-gray-500">{error}</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {displayedEvents.map((event, index) => (
                <div
                  key={(event.$id as string) || index}
                  className="glass-card rounded-2xl p-6 animate-fade-in-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <p className="text-sm font-bold text-gray-700 mb-3">
                    {String(event.date || "TBD")}
                  </p>

                  <span
                    className={`inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 ${
                      categoryColors[String(event.eventType || "Workshop")] ||
                      "bg-zinc-500/20 text-zinc-300 border border-zinc-500/30"
                    }`}
                  >
                    {String(event.eventType || "Workshop")}
                  </span>

                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {String(event.title || "SLIC Event")}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                    {String(event.description || "More details coming soon.")}
                  </p>

                  <p className="text-xs text-gray-500 flex items-center gap-1.5 mb-4">
                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {String(event.location || "Location to be announced")}
                  </p>

                  {activeTab === "upcoming" && (
                    <button
                      onClick={() => setSelectedEvent(event)}
                      className="w-full py-2.5 rounded-xl bg-gradient-to-r from-riara-500 to-pink-400 text-white text-sm font-semibold hover:shadow-[0_0_20px_rgba(124,58,237,0.3)] transition-all duration-300"
                    >
                      Register Now
                    </button>
                  )}
                </div>
              ))}
            </div>

            {displayedEvents.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">
                  {activeTab === "upcoming"
                    ? "No upcoming events scheduled. Check back soon!"
                    : "No past events yet."}
                </p>
              </div>
            )}

            {showViewAll && totalForTab > limit && (
              <div className="mt-14 text-center">
                <ViewAllButton href="/events" label="View All Events" />
              </div>
            )}
          </>
        )}
      </div>

      {selectedEvent && (
        <EventRegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </section>
  );
}
