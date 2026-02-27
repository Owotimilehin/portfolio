"use client";

import { useEffect, useRef } from "react";
import {
  Shield, Users, Brain, Bell, FileText, BarChart3, CreditCard, IdCard,
  Newspaper, AlertTriangle, GraduationCap, Settings, DollarSign, Palette,
  ShoppingBag, Building, Sparkles, BookOpen, Play, Award, MessageSquare,
  ExternalLink, ArrowRight, ArrowLeft, type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CodePlayer } from "./CodePlayer";
import type { Project } from "@/lib/data";
import { projects } from "@/lib/data";
import Link from "next/link";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  Shield, Users, Brain, Bell, FileText, BarChart3, CreditCard, IdCard,
  Newspaper, AlertTriangle, GraduationCap, Settings, DollarSign, Palette,
  ShoppingBag, Building, Sparkles, BookOpen, Play, Award, MessageSquare,
};


function Icon(name: string) {
  return iconMap[name] || Shield;
}

/* ───────────────────────────────────────────
   SECTION 1: IMMERSIVE HERO
   ─────────────────────────────────────────── */
function ProjectHero({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaBtnRef = useRef<HTMLDivElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── ENTRANCE (on load) ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .fromTo(headRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2 }, 0.4)
        .fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 }, 0.7)
        .fromTo(ctaBtnRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 }, 1);

      // Mockup fades up on scroll into view
      gsap.from(mockupRef.current, {
        y: 60, opacity: 0, scale: 0.95,
        duration: 1, ease: "power3.out",
        scrollTrigger: {
          trigger: mockupRef.current,
          start: "top 90%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative",
      background: "#000",
      overflow: "hidden",
      zIndex: 1,
    }}>
      {/* Big gradient glow */}
      <div style={{
        position: "absolute",
        top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1200, height: 800,
        borderRadius: "50%",
        background: project.accentColor,
        filter: "blur(250px)",
        opacity: 0.08,
        pointerEvents: "none",
      }} />

      {/* Text content */}
      <div style={{
        position: "relative", zIndex: 10,
        textAlign: "center",
        padding: "140px 24px 60px",
        maxWidth: 1100, margin: "0 auto",
      }}>
        {/* Badge */}
        <div ref={badgeRef}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.2em", textTransform: "uppercase",
            padding: "8px 20px", borderRadius: 9999,
            color: project.accentColor,
            background: `${project.accentColor}10`,
            border: `1px solid ${project.accentColor}20`,
            marginBottom: 40,
          }}>
            <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.accentColor }} />
            Project {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* Headline */}
        <h1
          ref={headRef}
          style={{
            fontSize: "clamp(48px, 10vw, 120px)",
            fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
            letterSpacing: "-0.04em",
            lineHeight: 0.9,
            color: "#fff",
            marginBottom: 24,
          }}
        >
          {project.headline}
        </h1>

        {/* Subtitle */}
        <p
          ref={subRef}
          style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.3)",
            maxWidth: 500,
            margin: "0 auto 40px",
            lineHeight: 1.6,
          }}
        >
          {project.title}
        </p>

        {project.liveUrl && (
          <div ref={ctaBtnRef}>
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: project.accentColor, color: "#fff",
                padding: "14px 32px", borderRadius: 9999,
                fontSize: 14, fontWeight: 600, textDecoration: "none",
                transition: "all 0.4s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "scale(1)"; }}
            >
              View Live <ExternalLink size={14} />
            </a>
          </div>
        )}
      </div>

      {/* Mockup — in flow, below text */}
      <div ref={mockupRef} style={{
        position: "relative",
        zIndex: 5,
        width: "min(90vw, 900px)",
        margin: "0 auto",
        padding: "0 24px 100px",
      }}>
        <CodePlayer projectId={project.id} accentColor={project.accentColor} />
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 2: THE CHALLENGE
   ─────────────────────────────────────────── */
function ChallengeSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".challenge-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0a0a0a", padding: "120px 0", position: "relative", zIndex: 2 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div className="challenge-reveal" style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: project.accentColor, marginBottom: 20,
          }}>
            The Challenge
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "#fff", lineHeight: 0.95,
          }}>
            Problems <span style={{ color: "rgba(255,255,255,0.15)" }}>solved.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {project.problems.map((problem, i) => (
            <div key={i} className="challenge-reveal" style={{
              display: "flex", alignItems: "flex-start", gap: 16,
              padding: 24, borderRadius: 16,
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
            }}>
              <span style={{
                minWidth: 32, height: 32, borderRadius: 10,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 13, fontWeight: 700, fontFamily: "monospace",
                background: `${project.accentColor}12`,
                color: project.accentColor,
              }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <p style={{ fontSize: 15, color: "rgba(255,255,255,0.45)", lineHeight: 1.7 }}>{problem}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 3: FEATURES
   ─────────────────────────────────────────── */
function FeaturesSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".feature-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 50, opacity: 0,
          duration: 0.7,
          delay: i * 0.06,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "120px 0", position: "relative", overflow: "hidden", zIndex: 3 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: project.accentColor, filter: "blur(300px)",
        opacity: 0.04, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div className="feature-reveal" style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: project.accentColor, marginBottom: 20,
          }}>
            What I Built
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "#fff", lineHeight: 0.95,
          }}>
            Key <span style={{ color: "rgba(255,255,255,0.15)" }}>features.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 20,
        }}>
          {project.features.map((feature, i) => {
            const FeatureIcon = Icon(feature.icon);
            return (
              <div key={i} className="feature-reveal" style={{
                padding: 32, borderRadius: 20,
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.04)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
                  e.currentTarget.style.transform = "translateY(-4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(255,255,255,0.02)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.05)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                <div style={{
                  width: 48, height: 48, borderRadius: 14,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${project.accentColor}10`,
                  color: project.accentColor,
                  marginBottom: 24,
                }}>
                  <FeatureIcon size={22} />
                </div>
                <h4 style={{ fontSize: 17, fontWeight: 600, color: "#fff", marginBottom: 10 }}>
                  {feature.title}
                </h4>
                <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", lineHeight: 1.7 }}>
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 4: ARCHITECTURE + TECH
   ─────────────────────────────────────────── */
function TechSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".tech-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 30, opacity: 0,
          duration: 0.6,
          delay: i * 0.05,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 92%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0a0a0a", padding: "120px 0", position: "relative", zIndex: 4 }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }} className="lg:!grid-cols-2">
          {/* Tech Stack */}
          <div>
            <p className="tech-reveal" style={{
              fontSize: 11, fontFamily: "monospace", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", marginBottom: 32,
            }}>
              Technology Stack
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {project.techStack.map((tech, i) => (
                <div key={i} className="tech-reveal" style={{
                  display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "14px 20px", borderRadius: 12,
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.04)",
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 8, height: 8, borderRadius: "50%", background: project.accentColor }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.7)" }}>{tech.name}</span>
                  </div>
                  <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.2)" }}>{tech.category}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Architecture */}
          <div>
            <p className="tech-reveal" style={{
              fontSize: 11, fontFamily: "monospace", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", marginBottom: 32,
            }}>
              Architecture
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {project.architecturePoints.map((point, i) => (
                <div key={i} className="tech-reveal" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                  <span style={{
                    minWidth: 32, height: 32, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                    background: `${project.accentColor}10`,
                    color: project.accentColor,
                  }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.4)", lineHeight: 1.7, paddingTop: 6 }}>
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 5: IMPACT METRICS
   ─────────────────────────────────────────── */
function MetricsSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".metric-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0, scale: 0.95,
          duration: 0.7,
          delay: i * 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: item,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: "#000", padding: "120px 0",
      position: "relative", overflow: "hidden", zIndex: 5,
    }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600, height: 600, borderRadius: "50%",
        background: project.accentColor, filter: "blur(200px)",
        opacity: 0.04, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: project.accentColor, marginBottom: 20,
          }}>
            Impact
          </p>
          <h2 style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "#fff", lineHeight: 0.95,
          }}>
            By the <span style={{ color: "rgba(255,255,255,0.15)" }}>numbers.</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
          gap: 32,
        }}>
          {project.metrics.map((metric, i) => (
            <div key={i} className="metric-reveal" style={{ textAlign: "center", padding: "40px 0" }}>
              <div style={{
                fontSize: "clamp(48px, 6vw, 80px)",
                fontWeight: 700, color: project.accentColor,
                letterSpacing: "-0.04em",
                marginBottom: 8,
                lineHeight: 1,
              }}>
                {metric.value}
              </div>
              <p style={{
                fontSize: 11, fontFamily: "monospace",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                {metric.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 6: NEXT PROJECT CTA
   ─────────────────────────────────────────── */
function NextProjectCTA({ project, index }: { project: Project; index: number }) {
  const nextIndex = (index + 1) % projects.length;
  const nextProject = projects[nextIndex];
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ctaRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(ctaRef.current, {
        y: 60, opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: ctaRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "#000", padding: "120px 0 80px", position: "relative", zIndex: 6 }}>
      {/* Divider */}
      <div style={{
        height: 1, maxWidth: 1100, margin: "0 auto 80px",
        background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.06), transparent)",
      }} />

      <div ref={ctaRef} style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", textAlign: "center" }}>
        <p style={{
          fontSize: 11, fontFamily: "monospace", fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "rgba(255,255,255,0.2)", marginBottom: 24,
        }}>
          Next Project
        </p>

        <Link href={`/projects/${nextProject.id}`} style={{ textDecoration: "none", display: "block" }}>
          <h3 style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700, letterSpacing: "-0.04em",
            color: nextProject.accentColor,
            lineHeight: 0.95, marginBottom: 16,
            transition: "opacity 0.3s",
            cursor: "pointer",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = "0.7"; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
          >
            {nextProject.headline}
          </h3>
          <p style={{ fontSize: 14, color: "rgba(255,255,255,0.25)", marginBottom: 32 }}>
            {nextProject.title}
          </p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 14, fontWeight: 500,
            color: nextProject.accentColor,
          }}>
            View Project <ArrowRight size={16} />
          </div>
        </Link>

        {/* Back to all */}
        <div style={{ marginTop: 64 }}>
          <Link href="/#work" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontSize: 13, color: "rgba(255,255,255,0.3)",
            textDecoration: "none", transition: "color 0.3s",
          }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.3)"; }}
          >
            <ArrowLeft size={14} /> All Projects
          </Link>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 1100, margin: "80px auto 0",
        padding: "24px 24px", borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "center",
      }}>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.08)" }}>
          &copy; {new Date().getFullYear()} Owoigbe Timilehin
        </span>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   MAIN PROJECT PAGE
   ─────────────────────────────────────────── */
export function ProjectPage({ project, index }: { project: Project; index: number }) {
  return (
    <>
      <ProjectHero project={project} index={index} />
      <ChallengeSection project={project} />
      <FeaturesSection project={project} />
      <TechSection project={project} />
      <MetricsSection project={project} />
      <NextProjectCTA project={project} index={index} />
    </>
  );
}
