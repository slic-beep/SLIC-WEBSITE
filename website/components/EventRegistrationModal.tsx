"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { submitApplication } from "@/lib/api";
import { useToast } from "./Toast";

interface EventRegistrationModalProps {
  event: Record<string, unknown>;
  onClose: () => void;
}

export default function EventRegistrationModal({ event, onClose }: EventRegistrationModalProps) {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const eventName = String(event.title || event.name || "SLIC Event");
  const eventDate = String(event.date || "Date TBD");
  const registrationLink = String(event.registrationLink || "");

  // Lock body scroll while the modal is open, and close on Escape.
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (form.phoneNumber && !/^\+?[\d\s\-()]{7,}$/.test(form.phoneNumber)) {
      errs.phoneNumber = "Enter a valid phone number";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitting(true);
    try {
      await submitApplication({
        name: form.name,
        email: form.email,
        program: eventName,
        applicationType: "Event Registration",
        description: `Registered for "${eventName}" on ${eventDate}.`,
        phoneNumber: form.phoneNumber,
      });
      setSubmitted(true);
      toast(`Registered for ${eventName}!`, "success");
    } catch (err) {
      toast(err instanceof Error ? err.message : "Registration failed. Please try again.", "error");
    } finally {
      setSubmitting(false);
    }
  }

  function update(field: string, value: string) {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: "" }));
  }

  const inputBase =
    "w-full px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 bg-white border-2 focus:outline-none " +
    "border-gray-300 focus:border-riara-500 focus:ring-1 focus:ring-riara-500/20 hover:border-gray-400";
  const inputError =
    "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-50/30";

  function inputClass(field: string) {
    return `${inputBase}${errors[field] ? inputError : ""}`;
  }

  return createPortal(
    <div className="fixed inset-0 z-[9999]">
      {/* Backdrop — closes the modal on outside click */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

      {/* Full-screen scroll container — any click outside the card also closes */}
      <div className="absolute inset-0 overflow-y-auto" onClick={onClose}>
        <div className="flex min-h-full items-start justify-center pt-6 sm:pt-12 md:pt-20 pb-12 px-4">
          <div
            className="relative bg-white rounded-2xl shadow-2xl w-full max-w-md border-2 border-gray-200 animate-fade-in-up"
            onClick={(e) => e.stopPropagation()}
          >
            {submitted ? (
              <div className="p-10 text-center">
                <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center">
                  <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-2">You're Registered!</h3>
                <p className="text-gray-500 text-sm mb-8">
                  Thanks, {form.name.split(" ")[0] || "innovator"}! We've received your registration for{" "}
                  <span className="font-semibold text-gray-700">{eventName}</span>.
                </p>
                <button
                  onClick={onClose}
                  className="inline-flex items-center justify-center w-full px-8 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all active:scale-[0.97] border-2 border-gray-900"
                >
                  Close
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
                <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-2xl shrink-0">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">Register for Event</h3>
                    <p className="text-xs text-gray-500 mt-0.5">{eventName}</p>
                  </div>
                  <button
                    type="button"
                    onClick={onClose}
                    className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all active:scale-90"
                    aria-label="Close"
                  >
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div className="flex-1 px-6 py-6 space-y-3.5 overflow-y-auto bg-white">
                  {/* Event summary */}
                  <div className="rounded-xl border-2 border-riara-100 bg-riara-50/50 p-4">
                    <p className="text-xs font-semibold text-riara-500 uppercase tracking-wider mb-1">Event Details</p>
                    <p className="text-sm font-semibold text-gray-900">{eventName}</p>
                    <p className="text-xs text-gray-500 mt-1">{eventDate}</p>
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Full Name</label>
                    <input
                      type="text"
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      className={`mt-1.5 ${inputClass("name")}`}
                      placeholder="e.g. John Doe"
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-500 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</label>
                    <input
                      type="email"
                      value={form.email}
                      onChange={(e) => update("email", e.target.value)}
                      className={`mt-1.5 ${inputClass("email")}`}
                      placeholder="john@riarauniversity.ac.ke"
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-500 font-medium">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">Phone (optional)</label>
                    <input
                      type="tel"
                      value={form.phoneNumber}
                      onChange={(e) => update("phoneNumber", e.target.value)}
                      className={`mt-1.5 ${inputClass("phoneNumber")}`}
                      placeholder="+254 7XX XXX XXX"
                    />
                    {errors.phoneNumber && <p className="mt-1 text-xs text-red-500 font-medium">{errors.phoneNumber}</p>}
                  </div>

                  {registrationLink && (
                    <a
                      href={registrationLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 text-xs font-semibold text-riara-500 hover:text-riara-600 underline underline-offset-2 transition-colors"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                      Open official registration page
                    </a>
                  )}
                </div>

                <div className="px-6 py-4 border-t-2 border-gray-200 bg-gray-50 rounded-b-2xl shrink-0">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 py-3 rounded-xl border-2 border-gray-300 text-gray-600 text-sm font-semibold hover:border-gray-400 hover:text-gray-800 transition-all active:scale-[0.98]"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] py-3 rounded-xl bg-gradient-to-r from-riara-500 to-pink-400 text-white text-sm font-bold hover:shadow-lg hover:shadow-riara-500/30 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span className="flex items-center justify-center gap-2">
                          <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Registering...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          Register Now
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                          </svg>
                        </span>
                      )}
                    </button>
                  </div>
                  <p className="text-center text-xs text-gray-400 mt-3">
                    Press <kbd className="rounded border border-gray-300 bg-white px-1.5 py-0.5 text-[10px] font-semibold text-gray-500">Esc</kbd> to close
                  </p>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
