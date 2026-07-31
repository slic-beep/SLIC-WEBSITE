import Link from "next/link";

interface ViewAllButtonProps {
  href: string;
  label?: string;
  className?: string;
}

export default function ViewAllButton({ href, label = "View All", className = "" }: ViewAllButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-riara-500 to-pink-400 text-white text-sm font-semibold hover:shadow-lg hover:shadow-riara-500/30 transition-all duration-300 group ${className}`}
    >
      {label}
      <svg
        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </Link>
  );
}
