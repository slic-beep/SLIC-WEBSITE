import Link from "next/link";

interface PageHeaderProps {
  eyebrow: string;
  title: string;
  subtitle: string;
  breadcrumb: string;
}

export default function PageHeader({ eyebrow, title, subtitle, breadcrumb }: PageHeaderProps) {
  return (
    <section className="relative bg-gray-50 border-b border-gray-100 overflow-hidden">
      <div className="absolute inset-0 hero-grid opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-riara-100 blur-[120px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <nav aria-label="Breadcrumb" className="mb-6">
          <ol className="flex items-center gap-2 text-sm text-gray-500">
            <li>
              <Link href="/" className="hover:text-riara-500 transition-colors duration-200">
                Home
              </Link>
            </li>
            <li aria-hidden="true" className="text-gray-400">/</li>
            <li className="text-gray-700 font-medium">{breadcrumb}</li>
          </ol>
        </nav>

        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-riara-400 mb-4">
          {eyebrow}
        </span>
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
          {title}
        </h1>
        <p className="text-base md:text-lg text-gray-600 leading-relaxed max-w-2xl">
          {subtitle}
        </p>
      </div>
    </section>
  );
}
