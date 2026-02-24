"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Sparkles, Brain, MessageSquare, Code2, Globe, Shield, CreditCard, Zap,
  FileCode, Monitor, Table, Database, Filter, FileText, Layers, Container,
  Cloud, Cpu, type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const iconMap: Record<string, LucideIcon> = {
  Sparkles, Brain, MessageSquare, Code2, Globe, Shield, CreditCard, Zap,
  FileCode, Monitor, Table, Database, Filter, FileText, Layers, Container,
  Cloud, Cpu,
};

function SkillBar({ level, color }: { level: number; color: string }) {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(barRef.current, {
        width: "0%",
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: barRef.current,
          start: "top 95%",
          toggleActions: "play none none none",
        },
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div style={{
      width: "100%", height: 4, borderRadius: 2,
      background: "rgba(255,255,255,0.06)",
      overflow: "hidden",
    }}>
      <div
        ref={barRef}
        style={{
          width: `${level}%`,
          height: "100%",
          borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}88)`,
        }}
      />
    </div>
  );
}

function CategorySection({ category }: { category: typeof skillCategories[0] }) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".skill-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0,
          duration: 0.7,
          delay: i * 0.08,
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
    <div ref={sectionRef} style={{ marginBottom: 72 }}>
      {/* Category header */}
      <div className="skill-reveal" style={{
        display: "flex", alignItems: "center", gap: 16,
        marginBottom: 24,
      }}>
        <span style={{
          width: 32, height: 2, borderRadius: 1,
          background: category.color,
        }} />
        <h3 style={{
          fontSize: 13, fontFamily: "monospace", fontWeight: 600,
          letterSpacing: "0.2em", textTransform: "uppercase",
          color: category.color,
        }}>
          {category.category}
        </h3>
      </div>

      {/* Skill cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
        gap: 16,
      }}>
        {category.skills.map((skill) => {
          const SkillIcon = iconMap[skill.icon] || Sparkles;
          return (
            <div
              key={skill.name}
              className="skill-reveal"
              style={{
                padding: 28, borderRadius: 20,
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
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 14 }}>
                <div style={{
                  width: 42, height: 42, borderRadius: 12,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  background: `${category.color}10`,
                  color: category.color,
                  flexShrink: 0,
                }}>
                  <SkillIcon size={20} />
                </div>
                <div style={{ flex: 1 }}>
                  <h4 style={{ fontSize: 15, fontWeight: 600, color: "#fff", marginBottom: 4 }}>
                    {skill.name}
                  </h4>
                  <SkillBar level={skill.level} color={category.color} />
                </div>
              </div>

              <p style={{
                fontSize: 13, color: "rgba(255,255,255,0.3)",
                lineHeight: 1.7, paddingLeft: 56,
              }}>
                {skill.description}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function Skills() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const headers = sectionRef.current!.querySelectorAll(".skills-header");
      headers.forEach((item, i) => {
        gsap.from(item, {
          y: 50, opacity: 0,
          duration: 0.8,
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

  const totalSkills = skillCategories.reduce((sum, cat) => sum + cat.skills.length, 0);

  return (
    <section ref={sectionRef} id="skills" style={{
      background: "#000", padding: "120px 0",
      position: "relative", overflow: "hidden",
      zIndex: 3,
    }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "20%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000, height: 1000, borderRadius: "50%",
        background: "rgba(37,99,235,0.03)",
        filter: "blur(250px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Section header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <p className="skills-header" style={{
            fontSize: 11, fontFamily: "monospace", fontWeight: 600,
            letterSpacing: "0.3em", textTransform: "uppercase",
            color: "#2563EB", marginBottom: 24,
          }}>
            Skills &amp; Tools
          </p>
          <h2 className="skills-header" style={{
            fontSize: "clamp(36px, 6vw, 72px)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            color: "#fff",
            lineHeight: 0.95,
            marginBottom: 20,
          }}>
            The toolkit<span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
          </h2>
          <p className="skills-header" style={{
            fontSize: "clamp(15px, 2vw, 18px)",
            color: "rgba(255,255,255,0.25)",
            maxWidth: 500,
            margin: "0 auto",
            lineHeight: 1.6,
          }}>
            AI-accelerated workflow meets battle-tested backend expertise.
          </p>
        </div>

        {/* Quick stats */}
        <div className="skills-header" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 48, marginBottom: 80, flexWrap: "wrap",
        }}>
          {[
            { value: String(totalSkills), label: "Core Skills" },
            { value: String(skillCategories.length), label: "Domains" },
            { value: "4+", label: "Years Shipping" },
            { value: "AI+", label: "Human Craft" },
          ].map((stat, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 700,
                color: "#2563EB",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: 4,
              }}>
                {stat.value}
              </div>
              <p style={{
                fontSize: 11, fontFamily: "monospace",
                letterSpacing: "0.15em", textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Skill categories */}
        {skillCategories.map((cat, i) => (
          <CategorySection key={cat.category} category={cat} />
        ))}
      </div>
    </section>
  );
}
