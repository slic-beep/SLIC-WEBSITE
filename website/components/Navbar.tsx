"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import { useAuth } from "@/lib/auth-context";

const navLinks = [
  { label: "About", href: "/#about" },
  { label: "Programs", href: "/programs" },
  { label: "Innovation Hub", href: "/projects" },
  { label: "Events", href: "/events" },
  { label: "Impact", href: "/#impact" },
  { label: "Leadership", href: "/leadership" },
  { label: "Partners", href: "/partners" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, loading } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-gray-100 text-gray-900"
          : "bg-transparent"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="flex items-center gap-2 group">
          <div className="relative h-8 w-8 overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-gray-200">
            <Image src="/logo.png" alt="SLIC logo" fill className="object-contain p-1" sizes="32px" />
          </div>
          <span className="font-bold text-lg text-gray-900 hidden sm:block">
            SLIC
          </span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3 py-2 text-sm text-white hover:text-gray-900 rounded-lg transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-3">
          <a
            href="/#join"
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-all duration-200"
          >
            Join SLIC
          </a>
          {!loading && (
            isAuthenticated ? (
              <a
                href="/member/dashboard"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/login"
                className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-all duration-200"
              >
                Sign In
              </a>
            )
          )}
          {/* Mobile toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 text-gray-500 hover:text-gray-900"
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`md:hidden transition-all duration-300 overflow-hidden ${
          mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 pb-4 space-y-1 bg-white/95 backdrop-blur-xl border-t border-gray-100">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="block px-4 py-3 text-sm text-white hover:text-gray-900 rounded-lg transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#join"
            onClick={() => setMobileOpen(false)}
            className="block px-4 py-3 text-sm font-medium text-center rounded-lg bg-pink-500 text-white mt-2"
          >
            Join SLIC
          </a>
          {!loading && (
            isAuthenticated ? (
              <a
                href="/member/dashboard"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-center rounded-lg border border-gray-200 text-gray-700"
              >
                Dashboard
              </a>
            ) : (
              <a
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="block px-4 py-3 text-sm font-medium text-center rounded-lg border border-gray-200 text-gray-700"
              >
                Sign In
              </a>
            )
          )}
        </div>
      </div>
    </header>
  );
}
