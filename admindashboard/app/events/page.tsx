"use client";

import { useEffect, useState } from "react";
import AdminPageShell from "@/components/AdminPageShell";
import { EventRecord, createEvent, getEvents } from "@/lib/api";

export default function EventsPage() {
  const [events, setEvents] = useState<EventRecord[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [eventType, setEventType] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [registrationLink, setRegistrationLink] = useState("");
  const [maxParticipants, setMaxParticipants] = useState(0);
  const [status, setStatus] = useState("Upcoming");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadEvents() {
      try {
        const response = await getEvents();
        setEvents(response.data || []);
      } catch {
        setError("Unable to load events.");
      } finally {
        setLoading(false);
      }
    }

    loadEvents();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      await createEvent({
        name,
        description,
        eventType,
        date,
        time,
        location,
        bannerImage,
        registrationLink,
        maxParticipants: maxParticipants || undefined,
        status,
      });
      const response = await getEvents();
      setEvents(response.data || []);
      setName("");
      setDate("");
      setTime("");
      setLocation("");
      setDescription("");
      setEventType("");
      setBannerImage("");
      setRegistrationLink("");
      setMaxParticipants(0);
      setStatus("Upcoming");
    } catch {
      setError("Unable to create event.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <AdminPageShell title="Events" description="Create and manage SLIC events backed by Appwrite.">
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <section className="glass-card rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-900">Event schedule</h2>
            <span className="text-xs text-gray-500">{events.length} events</span>
          </div>
          {loading ? (
            <p className="text-sm text-gray-500">Loading events…</p>
          ) : (
            <div className="space-y-3">
              {events.map((item) => (
                <div key={item.$id} className="rounded-xl border border-gray-100 bg-white p-4 shadow-sm">
                  <div className="flex items-center justify-between gap-3">
                    <p className="text-sm font-semibold text-gray-900">{item.name}</p>
                    <span className="text-[11px] text-gray-500">{new Date(item.date).toLocaleDateString()}</span>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">{item.location}</p>
                  <p className="mt-3 text-[11px] text-gray-500 line-clamp-2">{item.description}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="glass-card rounded-xl p-5">
          <h2 className="text-sm font-semibold text-gray-900 mb-4">Create Event</h2>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-xs text-gray-500">Event name</label>
              <input
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Startup Bootcamp"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Date</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Event type</label>
              <input
                value={eventType}
                onChange={(event) => setEventType(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="Workshop, Conference, Hackathon"
              />
            </div>
            <div className="grid gap-3 lg:grid-cols-2">
              <div>
                <label className="text-xs text-gray-500">Location</label>
                <input
                  value={location}
                  onChange={(event) => setLocation(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                  placeholder="Campus Hall"
                  required
                />
              </div>
              <div>
                <label className="text-xs text-gray-500">Time</label>
                <input
                  type="time"
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                  className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                />
              </div>
            </div>
            <div>
              <label className="text-xs text-gray-500">Description</label>
              <textarea
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                rows={4}
                placeholder="Describe the event"
                required
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Banner image URL</label>
              <input
                value={bannerImage}
                onChange={(event) => setBannerImage(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Registration link</label>
              <input
                type="url"
                value={registrationLink}
                onChange={(event) => setRegistrationLink(event.target.value)}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="https://..."
              />
            </div>
            <div>
              <label className="text-xs text-gray-500">Max participants</label>
              <input
                type="number"
                min={0}
                value={maxParticipants}
                onChange={(event) => setMaxParticipants(Number(event.target.value))}
                className="mt-1 w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none focus:border-riara-400"
                placeholder="100"
              />
            </div>
            {error && <p className="text-sm text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-xl bg-riara-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-riara-400 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Add Event"}
            </button>
          </form>
        </section>
      </div>
    </AdminPageShell>
  );
}