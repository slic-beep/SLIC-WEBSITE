import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { ToastProvider } from "@/components/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "SLIC | Student-Led Innovation Club — Riara University",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
  description:
    "Student-Led Innovation Club at Riara University. Empowering students to transform ideas into projects, startups, and impactful solutions. Innovate. Collaborate. Lead.",
  keywords: [
    "innovation",
    "entrepreneurship",
    "student club",
    "Riara University",
    "startup",
    "technology",
    "SLIC",
  ],
  openGraph: {
    title: "SLIC — Student-Led Innovation Club",
    description:
      "Building the Next Generation of Innovators at Riara University.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <AuthProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
