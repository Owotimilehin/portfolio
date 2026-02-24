"use client";

import { motion } from "framer-motion";
import {
  Shield, Users, Brain, Bell, FileText, BarChart3, CreditCard, IdCard,
  Newspaper, AlertTriangle, GraduationCap, Settings, DollarSign, Palette,
  ShoppingBag, Building, Sparkles, BookOpen, Play, Award, MessageSquare,
  ExternalLink, ArrowRight, type LucideIcon,
} from "lucide-react";
import { ProjectMockup } from "./ProjectMockup";
import type { Project } from "@/lib/data";

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

const container = { maxWidth: 1280, margin: "0 auto", padding: "0 24px" } as const;
const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-80px" as const }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const stagger = (i: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.08 } });

export function ProjectSection({ project, index }: { project: Project; index: number }) {
  const Icon = (name: string) => iconMap[name] || Shield;

  return (
    <section id={`project-${project.id}`}>
      {/* ─── PROJECT HERO ─── */}
      <div style={{ background: "#000", minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", overflow: "hidden" }}>
        {/* Gradient bg */}
        <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)", width: 1000, height: 600, borderRadius: "50%", background: project.accentColor, filter: "blur(200px)", opacity: 0.12, pointerEvents: "none" }} />

        <div style={{ ...container, width: "100%", paddingTop: 120, paddingBottom: 120 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 60, alignItems: "center" }} className="lg:!grid-cols-2">
            {/* Text */}
            <div>
              <motion.div {...fadeUp}>
                <span style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase" as const,
                  padding: "8px 16px", borderRadius: 9999,
                  color: project.accentColor, background: `${project.accentColor}12`, border: `1px solid ${project.accentColor}25`,
                  marginBottom: 32,
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: project.accentColor }} />
                  Project {String(index + 1).padStart(2, "0")}
                </span>
              </motion.div>

              <motion.h2 {...stagger(1)} style={{ fontSize: "clamp(36px, 5vw, 64px)", fontWeight: 700, letterSpacing: "-0.03em", lineHeight: 0.95, color: "#fff", marginBottom: 16 }}>
                {project.headline}
              </motion.h2>

              <motion.p {...stagger(2)} style={{ fontSize: 14, fontWeight: 500, letterSpacing: "0.15em", textTransform: "uppercase" as const, color: project.accentColor, marginBottom: 24 }}>
                {project.title}
              </motion.p>

              <motion.p {...stagger(3)} style={{ fontSize: 17, color: "rgba(255,255,255,0.45)", maxWidth: 520, lineHeight: 1.7, marginBottom: 40 }}>
                {project.subtitle}
              </motion.p>

              {project.liveUrl && (
                <motion.div {...stagger(4)}>
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: "inline-flex", alignItems: "center", gap: 8,
                      background: project.accentColor, color: "#fff",
                      padding: "14px 28px", borderRadius: 9999,
                      fontSize: 14, fontWeight: 600, textDecoration: "none",
                    }}
                  >
                    View Live <ExternalLink size={14} />
                  </a>
                </motion.div>
              )}
            </div>

            {/* Mockup */}
            <div>
              <ProjectMockup type={mockupTypeMap[project.id] || "dashboard"} accentColor={project.accentColor} />
            </div>
          </div>
        </div>
      </div>

      {/* ─── PROBLEMS + FEATURES ─── */}
      <div style={{ background: "#111", padding: "96px 0" }}>
        <div style={container}>
          {/* Problems */}
          <div style={{ marginBottom: 80 }}>
            <motion.h3 {...fadeUp} style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 40 }}>
              The Challenge
            </motion.h3>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
              {project.problems.map((problem, i) => (
                <motion.div key={i} {...stagger(i)} style={{
                  display: "flex", alignItems: "flex-start", gap: 16,
                  padding: 20, borderRadius: 12,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                }}>
                  <span style={{
                    minWidth: 28, height: 28, borderRadius: 8,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 12, fontWeight: 700,
                    background: `${project.accentColor}15`, color: project.accentColor,
                  }}>{i + 1}</span>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.6 }}>{problem}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Features */}
          <motion.h3 {...fadeUp} style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 40 }}>
            What I Built
          </motion.h3>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
            {project.features.map((feature, i) => {
              const FeatureIcon = Icon(feature.icon);
              return (
                <motion.div key={i} {...stagger(i)} style={{
                  padding: 28, borderRadius: 16,
                  background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  transition: "background 0.4s, border-color 0.4s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.06)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.03)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
                >
                  <div style={{
                    width: 44, height: 44, borderRadius: 12,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    background: `${project.accentColor}12`, color: project.accentColor,
                    marginBottom: 20,
                  }}>
                    <FeatureIcon size={20} />
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 8 }}>{feature.title}</h4>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{feature.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ─── TECHNICAL DEPTH + METRICS ─── */}
      <div style={{ background: "#000", padding: "96px 0" }}>
        <div style={container}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 64, marginBottom: 80 }} className="lg:!grid-cols-2">
            {/* Architecture */}
            <div>
              <motion.h3 {...fadeUp} style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 40 }}>
                Architecture Decisions
              </motion.h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                {project.architecturePoints.map((point, i) => (
                  <motion.div key={i} {...stagger(i)} style={{ display: "flex", alignItems: "flex-start", gap: 16 }}>
                    <span style={{
                      minWidth: 32, height: 32, borderRadius: 8,
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: 11, fontFamily: "monospace", fontWeight: 700,
                      background: `${project.accentColor}12`, color: project.accentColor,
                    }}>{String(i + 1).padStart(2, "0")}</span>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.45)", lineHeight: 1.7, paddingTop: 6 }}>{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Tech Stack */}
            <div>
              <motion.h3 {...fadeUp} style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)", marginBottom: 40 }}>
                Technology Stack
              </motion.h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {project.techStack.map((tech, i) => (
                  <motion.div key={i} {...stagger(i)} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: 16, borderRadius: 12,
                    background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <span style={{ width: 8, height: 8, borderRadius: "50%", background: project.accentColor }} />
                      <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.75)" }}>{tech.name}</span>
                    </div>
                    <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.2)" }}>{tech.category}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* Impact Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: 32 }}>
            {project.metrics.map((metric, i) => (
              <motion.div key={i} {...stagger(i)} style={{ textAlign: "center", padding: "32px 0" }}>
                <div style={{ fontSize: "clamp(40px, 5vw, 64px)", fontWeight: 700, color: project.accentColor, letterSpacing: "-0.03em", marginBottom: 8 }}>
                  {metric.value}
                </div>
                <p style={{ fontSize: 11, fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "rgba(255,255,255,0.25)" }}>{metric.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)" }} />
    </section>
  );
}
