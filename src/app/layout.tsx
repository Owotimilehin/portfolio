import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://owoigbe-timilehin.vercel.app"),
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
    url: "https://owoigbe-timilehin.vercel.app",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Owoigbe Timilehin — Vibe Coder | Backend Engineer",
    description:
      "AI-accelerated development. Production-grade backend systems.",
    images: ["/opengraph-image"],
  },
  verification: {
    google: "s1hpOl6zOvc036b_j0BuCPlLdI_r0LcXZ9iQ2VE9iHo",
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/icon",
    apple: "/apple-icon",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Owoigbe Timilehin",
              jobTitle: "Backend Engineer & Vibe Coder",
              url: "https://owoigbe-timilehin.vercel.app",
              sameAs: [
                "https://github.com/owotimilehin",
                "https://linkedin.com/in/owotimilehin",
              ],
              knowsAbout: [
                "Laravel",
                "PHP",
                "Next.js",
                "TypeScript",
                "PostgreSQL",
                "REST API Design",
                "Docker",
                "AI-Accelerated Development",
              ],
            }),
          }}
        />
      </body>
    </html>
  );
}
