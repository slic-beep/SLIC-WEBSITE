import { siteConfig } from "@/lib/constants";

export default function Footer() {
  return (
    <footer className="relative border-t border-gray-100 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-riara-500 to-pink-400 flex items-center justify-center text-white font-bold text-sm">
                S
              </div>
              <span className="font-bold text-lg text-gray-900">SLIC</span>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed max-w-sm mb-6">
              {siteConfig.description}
            </p>
            <p className="text-xs text-gray-400">
              &copy; {new Date().getFullYear()} {siteConfig.fullName}. All rights reserved.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[
                { label: "About", href: "/#about" },
                { label: "Programs", href: "/programs" },
                { label: "Innovation Hub", href: "/projects" },
                { label: "Events", href: "/events" },
                { label: "Leadership", href: "/leadership" },
                { label: "Partners", href: "/partners" },
              ].map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-sm text-gray-500 hover:text-riara-500 transition-colors duration-200"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-gray-900 font-semibold text-sm mb-4">Connect</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href={siteConfig.socials.twitter}
                  className="text-sm text-gray-500 hover:text-riara-500 transition-colors duration-200"
                >
                  Twitter / X
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.linkedin}
                  className="text-sm text-gray-500 hover:text-riara-500 transition-colors duration-200"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.instagram}
                  className="text-sm text-gray-500 hover:text-riara-500 transition-colors duration-200"
                >
                  Instagram
                </a>
              </li>
              <li>
                <a
                  href={siteConfig.socials.github}
                  className="text-sm text-gray-500 hover:text-riara-500 transition-colors duration-200"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="bg-gradient-to-r from-transparent via-gray-200 to-transparent h-px mt-12 mb-6" />
        <p className="text-xs text-gray-400 text-center">
          Built with ❤️ by the SLIC Media Team — {siteConfig.university}
        </p>
      </div>
    </footer>
  );
}
