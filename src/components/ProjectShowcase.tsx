"use client";

import { useEffect, useRef } from "react";
import { ArrowRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/lib/data";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const projectMeta: Record<string, { tagline: string; visual: string }> = {
  compassio: { tagline: "Healthcare meets precision.", visual: "#10B981" },
  runacos: { tagline: "Community, connected.", visual: "#3B82F6" },
  n9ja: { tagline: "Luxury, redefined.", visual: "#C5A253" },
  zyonel: { tagline: "Learn. Build. Ship.", visual: "#8B5CF6" },
};

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cardRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  const meta = projectMeta[project.id] || { tagline: project.headline, visual: project.accentColor };

  return (
    <div ref={cardRef}>
      <Link href={`/projects/${project.id}`} style={{ textDecoration: "none", display: "block" }}>
        <div
          style={{
            position: "relative",
            padding: "48px 40px",
            borderRadius: 24,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
            overflow: "hidden",
            cursor: "pointer",
            transition: "background 0.5s cubic-bezier(0.22, 1, 0.36, 1), border-color 0.5s cubic-bezier(0.22, 1, 0.36, 1), transform 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)";
            e.currentTarget.style.transform = "translateY(-4px)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.02)";
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)";
            e.currentTarget.style.transform = "translateY(0)";
          }}
        >
          {/* Background glow */}
          <div style={{
            position: "absolute",
            top: "50%", right: "-5%",
            transform: "translateY(-50%)",
            width: 400, height: 400,
            borderRadius: "50%",
            background: meta.visual,
            filter: "blur(180px)",
            opacity: 0.06,
            pointerEvents: "none",
          }} />

          <div style={{ position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr", gap: 32, alignItems: "center" }} className="md:!grid-cols-2">
            {/* Text side */}
            <div>
              <span style={{
                display: "inline-block",
                fontSize: 11, fontFamily: "monospace", fontWeight: 600,
                letterSpacing: "0.2em", textTransform: "uppercase",
                color: meta.visual,
                marginBottom: 16,
              }}>
                {String(index + 1).padStart(2, "0")}
              </span>

              <h3 style={{
                fontSize: "clamp(28px, 4vw, 48px)",
                fontWeight: 700,
                letterSpacing: "-0.03em",
                lineHeight: 1,
                color: "#fff",
                marginBottom: 12,
              }}>
                {meta.tagline}
              </h3>

              <p style={{
                fontSize: 14,
                color: "rgba(255,255,255,0.3)",
                marginBottom: 24,
                lineHeight: 1.6,
                maxWidth: 360,
              }}>
                {project.title}
              </p>

              <div style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontSize: 14,
                fontWeight: 500,
                color: meta.visual,
              }}>
                View Project <ArrowRight size={16} />
              </div>
            </div>

            {/* Visual side */}
            <div style={{
              position: "relative",
              aspectRatio: "4/3",
              borderRadius: 16,
              background: "#0a0a0a",
              overflow: "hidden",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <div style={{
                position: "absolute", inset: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg viewBox="0 0 400 300" fill="none" style={{ width: "100%", height: "100%" }}>
                  <rect width="400" height="300" fill="#0a0a0a" />
                  <circle cx={200 + index * 15} cy={150} r={120} fill={meta.visual} opacity={0.04} />
                  <circle cx={200 + index * 15} cy={150} r={60} fill={meta.visual} opacity={0.08} />

                  {index === 0 && <>
                    <rect x="185" y="80" width="30" height="140" rx="6" fill={meta.visual} opacity="0.3" />
                    <rect x="130" y="135" width="140" height="30" rx="6" fill={meta.visual} opacity="0.3" />
                    {[0,1,2].map(j => <rect key={j} x={140+j*50} y={220+j*5} width={120-j*30} height="8" rx="4" fill={meta.visual} opacity={0.15-j*0.03} />)}
                  </>}
                  {index === 1 && <>
                    <circle cx="200" cy="130" r="24" fill={meta.visual} opacity="0.2" />
                    <circle cx="140" cy="190" r="16" fill={meta.visual} opacity="0.15" />
                    <circle cx="260" cy="190" r="16" fill={meta.visual} opacity="0.15" />
                    <circle cx="160" cy="90" r="12" fill={meta.visual} opacity="0.1" />
                    <circle cx="240" cy="90" r="12" fill={meta.visual} opacity="0.1" />
                    <line x1="200" y1="130" x2="140" y2="190" stroke={meta.visual} strokeWidth="2" opacity="0.15" />
                    <line x1="200" y1="130" x2="260" y2="190" stroke={meta.visual} strokeWidth="2" opacity="0.15" />
                    <line x1="200" y1="130" x2="160" y2="90" stroke={meta.visual} strokeWidth="2" opacity="0.15" />
                    <line x1="200" y1="130" x2="240" y2="90" stroke={meta.visual} strokeWidth="2" opacity="0.15" />
                  </>}
                  {index === 2 && <>
                    <polygon points="200,60 280,150 200,240 120,150" fill="none" stroke={meta.visual} strokeWidth="2" opacity="0.25" />
                    <polygon points="200,90 250,150 200,210 150,150" fill={meta.visual} opacity="0.08" />
                    <line x1="200" y1="60" x2="200" y2="240" stroke={meta.visual} strokeWidth="1" opacity="0.1" />
                    <line x1="120" y1="150" x2="280" y2="150" stroke={meta.visual} strokeWidth="1" opacity="0.1" />
                  </>}
                  {index === 3 && <>
                    {[0,1,2,3,4].map(j => (
                      <rect key={j} x={100+j*45} y={220-j*35} width="35" height={35+j*35} rx="4" fill={meta.visual} opacity={0.08+j*0.04} />
                    ))}
                    <circle cx="300" cy="80" r="20" fill={meta.visual} opacity="0.15" />
                  </>}
                </svg>
              </div>

              <div style={{
                position: "absolute", inset: 0,
                background: "linear-gradient(135deg, rgba(255,255,255,0.03) 0%, transparent 50%, rgba(255,255,255,0.01) 100%)",
                pointerEvents: "none",
              }} />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export function ProjectShowcase() {
  const titleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" style={{ background: "#000", position: "relative", zIndex: 2, padding: "0 0 120px" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        {/* Section title */}
        <div ref={titleRef} style={{ textAlign: "center", paddingTop: 120, paddingBottom: 80 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#2563EB", marginBottom: 20,
          }}>
            Selected Work
          </p>
          <h2 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#fff",
            lineHeight: 0.95,
          }}>
            Vibed &amp; shipped.
            <br />
            <span style={{ color: "rgba(255,255,255,0.15)" }}>Battle-tested.</span>
          </h2>
        </div>

        {/* Project cards — simple vertical stack */}
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
