"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/lib/api";
import { useToast } from "./Toast";
import { useAuth } from "@/lib/auth-context";

interface MembershipFormProps {
  onClose: () => void;
}

const faculties = [
  "School of Business",
  "School of Education",
  "School of Law",
  "School of Computing & ICT",
  "School of International Relations",
  "School of Journalism & Media",
];

const years = ["1st Year", "2nd Year", "3rd Year", "4th Year", "5th Year", "Alumni"];
const membershipTypes = ["Student", "Alumni", "Faculty"];

function FormField({
  children,
  label,
  error,
}: {
  children: React.ReactNode;
  label?: string;
  error?: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-xs font-semibold text-gray-600 uppercase tracking-wider">{label}</label>
      )}
      {children}
      {error && (
        <p className="flex items-center gap-1 text-red-500 text-xs font-medium">
          <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 8v4M12 16h.01" strokeLinecap="round" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

const inputBase =
  "w-full px-3.5 py-2.5 rounded-lg text-sm transition-all duration-200 " +
  "bg-white border-2 focus:outline-none ";

const inputNormal =
  "border-gray-300 focus:border-riara-500 focus:ring-1 focus:ring-riara-500/20 hover:border-gray-400";

const inputError =
  "border-red-400 focus:border-red-500 focus:ring-1 focus:ring-red-500/20 bg-red-50/30";

export default function MembershipForm({ onClose }: MembershipFormProps) {
  const router = useRouter();
  const { toast } = useToast();
  const { login } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phoneNumber: "",
    studentId: "",
    faculty: "",
    course: "",
    yearOfStudy: "",
    skills: "",
    interests: "",
    membershipType: "Student",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  function validate() {
    const errs: Record<string, string> = {};
    if (!form.fullName.trim()) errs.fullName = "Full name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Invalid email address";
    if (!form.password) errs.password = "Password is required";
    else if (form.password.length < 8) errs.password = "Password must be at least 8 characters";
    if (form.password !== form.confirmPassword) errs.confirmPassword = "Passwords do not match";
    if (!form.faculty) errs.faculty = "Please select your faculty";
    if (!form.course.trim()) errs.course = "Course is required";
    if (!form.yearOfStudy) errs.yearOfStudy = "Year of study is required";
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
      const skills = form.skills.split(",").map((s) => s.trim()).filter(Boolean);
      const interests = form.interests.split(",").map((s) => s.trim()).filter(Boolean);

      const res = await register({
        fullName: form.fullName,
        email: form.email,
        password: form.password,
        phoneNumber: form.phoneNumber,
        studentId: form.studentId,
        faculty: form.faculty,
        course: form.course,
        yearOfStudy: form.yearOfStudy,
        skills,
        interests,
        membershipType: form.membershipType,
      });

      if (res.data?.session) {
        try { await login(form.email, form.password); } catch { /* ignore */ }
      }

      setSubmitted(true);
      onClose();
      toast("Account created! You're now logged in.", "success");
      // Take the new member straight to their dashboard.
      setTimeout(() => router.push("/member/dashboard"), 1200);
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

  function inputClass(field: string) {
    return `${inputBase}${errors[field] ? inputError : inputNormal}`;
  }

  if (submitted) {
    return (
      <div className="p-10 text-center animate-fade-in-up">
        <div className="mx-auto mb-5 w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Welcome to SLIC!</h3>
        <p className="text-gray-500 text-sm mb-8 max-w-xs mx-auto">
          Your account has been created successfully. Start exploring the innovation hub.
        </p>
        <a
          href="/member/dashboard"
          className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all active:scale-[0.97] border-2 border-gray-900"
        >
          Go to Dashboard
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col max-h-[90vh]">
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-6 py-4 border-b-2 border-gray-200 bg-gray-50 rounded-t-2xl shrink-0">
        <div>
          <h3 className="text-lg font-bold text-gray-900">Join SLIC</h3>
          <p className="text-xs text-gray-500 mt-0.5">Fill in your details to get started</p>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-200 rounded-lg transition-all active:scale-90"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 px-6 py-6 space-y-7 overflow-y-auto bg-white">
        {/* Account Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-riara-100 border-2 border-riara-300 flex items-center justify-center text-[11px] font-bold text-riara-600">1</span>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Account Details</h4>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="space-y-3.5">
            <FormField label="Full Name" error={errors.fullName}>
              <input
                type="text"
                value={form.fullName}
                onChange={(e) => update("fullName", e.target.value)}
                className={inputClass("fullName")}
                placeholder="e.g. John Doe"
              />
            </FormField>
            <FormField label="Email" error={errors.email}>
              <input
                type="email"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                className={inputClass("email")}
                placeholder="john@riarauniversity.ac.ke"
              />
            </FormField>
            <div className="grid grid-cols-2 gap-3">
              <FormField label="Password" error={errors.password}>
                <input
                  type="password"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                  className={inputClass("password")}
                  placeholder="Min. 8 characters"
                />
              </FormField>
              <FormField label="Confirm" error={errors.confirmPassword}>
                <input
                  type="password"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  className={inputClass("confirmPassword")}
                  placeholder="Repeat password"
                />
              </FormField>
            </div>
          </div>
        </div>

        {/* Academic Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-pink-100 border-2 border-pink-300 flex items-center justify-center text-[11px] font-bold text-pink-600">2</span>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Academic Info</h4>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <FormField label="Phone" error={errors.phoneNumber}>
              <input
                type="tel"
                value={form.phoneNumber}
                onChange={(e) => update("phoneNumber", e.target.value)}
                className={inputClass("phoneNumber")}
                placeholder="+254 7XX XXX XXX"
              />
            </FormField>
            <FormField label="Student ID">
              <input
                type="text"
                value={form.studentId}
                onChange={(e) => update("studentId", e.target.value)}
                className={`${inputBase}${inputNormal}`}
                placeholder="e.g. S12345"
              />
            </FormField>
            <FormField label="Faculty" error={errors.faculty}>
              <select
                value={form.faculty}
                onChange={(e) => update("faculty", e.target.value)}
                className={inputClass("faculty")}
              >
                <option value="">Select faculty</option>
                {faculties.map((f) => (<option key={f} value={f}>{f}</option>))}
              </select>
            </FormField>
            <FormField label="Course" error={errors.course}>
              <input
                type="text"
                value={form.course}
                onChange={(e) => update("course", e.target.value)}
                className={inputClass("course")}
                placeholder="e.g. BSc. Computer Science"
              />
            </FormField>
            <FormField label="Year of Study" error={errors.yearOfStudy}>
              <select
                value={form.yearOfStudy}
                onChange={(e) => update("yearOfStudy", e.target.value)}
                className={inputClass("yearOfStudy")}
              >
                <option value="">Select year</option>
                {years.map((y) => (<option key={y} value={y}>{y}</option>))}
              </select>
            </FormField>
            <FormField label="Membership">
              <select
                value={form.membershipType}
                onChange={(e) => update("membershipType", e.target.value)}
                className={`${inputBase}${inputNormal}`}
              >
                {membershipTypes.map((t) => (<option key={t} value={t}>{t}</option>))}
              </select>
            </FormField>
          </div>
        </div>

        {/* Skills & Interests Section */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <span className="flex-shrink-0 w-6 h-6 rounded-lg bg-green-100 border-2 border-green-300 flex items-center justify-center text-[11px] font-bold text-green-600">3</span>
            <h4 className="text-sm font-bold text-gray-700 uppercase tracking-wider">Skills & Interests</h4>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          <div className="space-y-3.5">
            <FormField label="Skills">
              <input
                type="text"
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                className={`${inputBase}${inputNormal}`}
                placeholder="e.g. Design, Coding, Public Speaking"
              />
              <p className="text-[11px] text-gray-400 mt-1">Separate with commas</p>
            </FormField>
            <FormField label="Interests">
              <input
                type="text"
                value={form.interests}
                onChange={(e) => update("interests", e.target.value)}
                className={`${inputBase}${inputNormal}`}
                placeholder="e.g. AI, Business, Sustainability"
              />
              <p className="text-[11px] text-gray-400 mt-1">Separate with commas</p>
            </FormField>
          </div>
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="px-6 py-4 border-t-2 border-gray-200 bg-gray-50 rounded-b-2xl shrink-0">
        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 rounded-xl bg-gray-900 text-white text-sm font-bold hover:bg-gray-800 transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed border-2 border-gray-900"
        >
          {submitting ? (
            <span className="flex items-center justify-center gap-2">
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
              Creating account...
            </span>
          ) : (
            <span className="flex items-center justify-center gap-2">
              Create Account
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </span>
          )}
        </button>
        <p className="text-center text-xs text-gray-400 mt-3">
          Already a member?{" "}
          <a href="/login" className="text-gray-900 font-bold hover:underline transition-colors">
            Sign in
          </a>
        </p>
      </div>
    </form>
  );
}
