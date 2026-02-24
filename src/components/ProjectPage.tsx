"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import {
  Shield, Users, Brain, Bell, FileText, BarChart3, CreditCard, IdCard,
  Newspaper, AlertTriangle, GraduationCap, Settings, DollarSign, Palette,
  ShoppingBag, Building, Sparkles, BookOpen, Play, Award, MessageSquare,
  ExternalLink, ArrowRight, ArrowLeft, type LucideIcon,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ProjectMockup } from "./ProjectMockup";
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

const mockupTypeMap: Record<string, "dashboard" | "ecommerce" | "membership" | "learning"> = {
  compassio: "dashboard",
  runacos: "membership",
  n9ja: "ecommerce",
  zyonel: "learning",
};

function Icon(name: string) {
  return iconMap[name] || Shield;
}

/* ───────────────────────────────────────────
   SECTION 1: IMMERSIVE HERO
   ─────────────────────────────────────────── */
function ProjectHero({ project, index }: { project: Project; index: number }) {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const mockupRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Parallax the headline as you scroll
      if (headRef.current) {
        gsap.to(headRef.current, {
          y: -120, opacity: 0, scale: 0.9,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "80% top",
            scrub: 1,
          },
        });
      }

      if (subRef.current) {
        gsap.to(subRef.current, {
          y: -80, opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "20% top",
            end: "60% top",
            scrub: 1,
          },
        });
      }

      // Mockup scales up as you scroll
      if (mockupRef.current) {
        gsap.from(mockupRef.current, {
          scale: 0.8, opacity: 0, y: 100,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "10% top",
            end: "50% top",
            scrub: 1,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      position: "relative",
      minHeight: "250vh",
      background: "#000",
      overflow: "hidden",
    }}>
      <div style={{
        position: "sticky", top: 0,
        height: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
      }}>
        {/* Big gradient glow */}
        <div style={{
          position: "absolute",
          top: "30%", left: "50%",
          transform: "translate(-50%, -50%)",
          width: 1200, height: 800,
          borderRadius: "50%",
          background: project.accentColor,
          filter: "blur(250px)",
          opacity: 0.08,
          pointerEvents: "none",
        }} />

        {/* Content */}
        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 1100, width: "100%" }}>
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
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
          </motion.div>

          {/* Headline */}
          <motion.h1
            ref={headRef}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              fontSize: "clamp(48px, 10vw, 120px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 24,
            }}
          >
            {project.headline}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            ref={subRef}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.8 }}
            style={{
              fontSize: "clamp(15px, 2vw, 18px)",
              color: "rgba(255,255,255,0.3)",
              maxWidth: 500,
              margin: "0 auto 40px",
              lineHeight: 1.6,
            }}
          >
            {project.title}
          </motion.p>

          {project.liveUrl && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
            >
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
            </motion.div>
          )}
        </div>

        {/* Mockup appears on scroll */}
        <div ref={mockupRef} style={{
          position: "absolute",
          bottom: "-5%",
          left: "50%",
          transform: "translateX(-50%)",
          width: "min(90vw, 900px)",
          zIndex: 5,
        }}>
          <ProjectMockup type={mockupTypeMap[project.id] || "dashboard"} accentColor={project.accentColor} />
        </div>
      </div>
    </section>
  );
}

/* ───────────────────────────────────────────
   SECTION 2: THE CHALLENGE — SCROLL REVEAL
   ─────────────────────────────────────────── */
function ChallengeSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 100, opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", end: "top 50%", scrub: 1 },
        });
      }

      if (cardsRef.current) {
        const cards = cardsRef.current.children;
        gsap.from(cards, {
          y: 60, opacity: 0, stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: cardsRef.current, start: "top 80%", end: "top 40%", scrub: 1 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0a0a0a", padding: "120px 0", position: "relative" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: project.accentColor, marginBottom: 20,
          }}>
            The Challenge
          </p>
          <h2 ref={titleRef} style={{
            fontSize: "clamp(32px, 5vw, 56px)",
            fontWeight: 700, letterSpacing: "-0.03em",
            color: "#fff", lineHeight: 0.95,
          }}>
            Problems <span style={{ color: "rgba(255,255,255,0.15)" }}>solved.</span>
          </h2>
        </div>

        <div ref={cardsRef} style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 16,
        }}>
          {project.problems.map((problem, i) => (
            <div key={i} style={{
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
   SECTION 3: FEATURES — PINNED SCROLL
   ─────────────────────────────────────────── */
function FeaturesSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 80, opacity: 0,
          ease: "none",
          scrollTrigger: { trigger: titleRef.current, start: "top 85%", end: "top 55%", scrub: 1 },
        });
      }

      // Animate feature cards
      const cards = sectionRef.current!.querySelectorAll(".feature-card");
      gsap.from(cards, {
        y: 80, opacity: 0, scale: 0.95,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "20% bottom", end: "60% bottom", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#000", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: project.accentColor, filter: "blur(300px)",
        opacity: 0.04, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <div style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: project.accentColor, marginBottom: 20,
          }}>
            What I Built
          </p>
          <h2 ref={titleRef} style={{
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
              <div key={i} className="feature-card" style={{
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
      const items = sectionRef.current!.querySelectorAll(".tech-item");
      gsap.from(items, {
        x: -40, opacity: 0, stagger: 0.06,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "40% 50%", scrub: 1 },
      });

      const archItems = sectionRef.current!.querySelectorAll(".arch-item");
      gsap.from(archItems, {
        x: 40, opacity: 0, stagger: 0.06,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 75%", end: "40% 50%", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: "#0a0a0a", padding: "120px 0" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64 }} className="lg:!grid-cols-2">
          {/* Tech Stack */}
          <div>
            <p style={{
              fontSize: 11, fontFamily: "monospace", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", marginBottom: 32,
            }}>
              Technology Stack
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {project.techStack.map((tech, i) => (
                <div key={i} className="tech-item" style={{
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
            <p style={{
              fontSize: 11, fontFamily: "monospace", fontWeight: 600,
              letterSpacing: "0.3em", textTransform: "uppercase",
              color: "rgba(255,255,255,0.2)", marginBottom: 32,
            }}>
              Architecture
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {project.architecturePoints.map((point, i) => (
                <div key={i} className="arch-item" style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
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
   SECTION 5: IMPACT METRICS — BIG NUMBERS
   ─────────────────────────────────────────── */
function MetricsSection({ project }: { project: Project }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".metric-item");
      gsap.from(items, {
        y: 60, opacity: 0, scale: 0.9,
        stagger: 0.1,
        ease: "none",
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%", end: "top 40%", scrub: 1 },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} style={{
      background: "#000", padding: "120px 0",
      position: "relative", overflow: "hidden",
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
            <div key={i} className="metric-item" style={{ textAlign: "center", padding: "40px 0" }}>
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
        y: 80, opacity: 0,
        ease: "none",
        scrollTrigger: { trigger: ctaRef.current, start: "top 85%", end: "top 55%", scrub: 1 },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <section style={{ background: "#000", padding: "120px 0 80px", position: "relative" }}>
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
