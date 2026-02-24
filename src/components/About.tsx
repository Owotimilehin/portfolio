"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";
import { Briefcase, GraduationCap, MapPin } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const items = sectionRef.current!.querySelectorAll(".about-reveal");
      items.forEach((item, i) => {
        gsap.from(item, {
          y: 40, opacity: 0,
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

  return (
    <section ref={sectionRef} id="about" style={{ background: "#0a0a0a", padding: "120px 0", position: "relative", overflow: "hidden", zIndex: 4 }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", right: "-10%",
        transform: "translateY(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "rgba(139,92,246,0.03)",
        filter: "blur(200px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        {/* Label */}
        <p className="about-reveal" style={{
          fontSize: 11, fontFamily: "monospace", fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#2563EB", marginBottom: 24, textAlign: "center",
        }}>
          About Me
        </p>

        {/* Name — big and clear */}
        <h2 className="about-reveal" style={{
          fontSize: "clamp(40px, 7vw, 80px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 0.95,
          textAlign: "center",
          marginBottom: 12,
        }}>
          {personalInfo.name}
        </h2>

        {/* Title */}
        <p className="about-reveal" style={{
          fontSize: "clamp(16px, 2.5vw, 24px)",
          fontWeight: 500,
          color: "#2563EB",
          textAlign: "center",
          marginBottom: 8,
        }}>
          {personalInfo.title} <span style={{ color: "rgba(255,255,255,0.2)" }}>|</span> <span style={{ color: "rgba(255,255,255,0.4)" }}>{personalInfo.subtitle}</span>
        </p>

        {/* Location */}
        <div className="about-reveal" style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: 6, marginBottom: 40,
        }}>
          <MapPin size={14} color="rgba(255,255,255,0.25)" />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.25)" }}>{personalInfo.location}</span>
        </div>

        {/* Bio */}
        <p className="about-reveal" style={{
          fontSize: "clamp(16px, 2vw, 19px)",
          color: "rgba(255,255,255,0.4)",
          lineHeight: 1.8,
          textAlign: "center",
          maxWidth: 720,
          margin: "0 auto 56px",
        }}>
          {personalInfo.bio}
        </p>

        {/* Experience + Education cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20 }} className="lg:!grid-cols-2">
          {/* Experience */}
          <div className="about-reveal" style={{
            padding: 32, borderRadius: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(37,99,235,0.1)", color: "#2563EB",
              }}>
                <Briefcase size={18} />
              </div>
              <div>
                <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>{personalInfo.experience.company}</h3>
                <p style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.3)" }}>
                  {personalInfo.experience.role} &middot; {personalInfo.experience.period}
                </p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {personalInfo.experience.highlights.slice(0, 4).map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#2563EB", marginTop: 8, flexShrink: 0 }} />
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.35)", lineHeight: 1.6 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="about-reveal" style={{
            padding: 32, borderRadius: 20,
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 12,
                display: "flex", alignItems: "center", justifyContent: "center",
                background: "rgba(139,92,246,0.1)", color: "#8B5CF6",
              }}>
                <GraduationCap size={18} />
              </div>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "#fff" }}>Education</h3>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {personalInfo.education.map((edu, i) => (
                <div key={i}>
                  <p style={{ fontSize: 15, fontWeight: 500, color: "rgba(255,255,255,0.65)" }}>{edu.institution}</p>
                  <p style={{ fontSize: 14, color: "rgba(255,255,255,0.3)", marginTop: 2 }}>{edu.degree}</p>
                  <p style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.15)", marginTop: 6 }}>{edu.period}</p>
                </div>
              ))}
            </div>

            {/* Waystream projects */}
            <div style={{ marginTop: 32, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,0.06)" }}>
              <p style={{ fontSize: 12, fontFamily: "monospace", fontWeight: 600, color: "rgba(255,255,255,0.2)", letterSpacing: "0.15em", textTransform: "uppercase", marginBottom: 16 }}>
                Waystream Projects
              </p>
              {["Waypod — Podcast platform", "Waystream Live — Streaming platform", "Waystream SSO — Cross-platform auth"].map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                  <span style={{ width: 4, height: 4, borderRadius: "50%", background: "#10B981", flexShrink: 0 }} />
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.35)" }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
