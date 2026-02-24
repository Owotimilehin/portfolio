import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Owoigbe Timilehin — Vibe Coder | Backend Engineer",
  description:
    "Vibe Coder with deep backend hands-on experience. AI-accelerated development meets production-grade systems. Laravel, Next.js, TypeScript, PostgreSQL.",
  keywords: [
    "Vibe Coder",
    "Backend Engineer",
    "Laravel Developer",
    "AI Developer",
    "API Architecture",
    "Full Stack Developer",
    "Lagos Nigeria",
    "Owoigbe Timilehin",
  ],
  openGraph: {
    title: "Owoigbe Timilehin — Vibe Coder | Backend Engineer",
    description:
      "AI-accelerated development. Production-grade backend systems.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">{children}</body>
    </html>
  );
}
