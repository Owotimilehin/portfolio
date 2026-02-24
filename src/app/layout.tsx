import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Owoigbe Timilehin — Senior Backend Engineer",
  description:
    "AI-augmented Backend Engineer building scalable platforms for health, commerce, and communities. Laravel, Next.js, TypeScript, PostgreSQL.",
  keywords: [
    "Backend Engineer",
    "Laravel Developer",
    "API Architecture",
    "Full Stack Developer",
    "Lagos Nigeria",
    "Owoigbe Timilehin",
  ],
  openGraph: {
    title: "Owoigbe Timilehin — Senior Backend Engineer",
    description:
      "Building scalable platforms for health, commerce, and communities.",
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
