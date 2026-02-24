"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { personalInfo } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      if (titleRef.current) {
        gsap.from(titleRef.current, {
          y: 80, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: titleRef.current, start: "top 80%", end: "top 50%", scrub: 1 },
        });
      }
      if (textRef.current) {
        gsap.from(textRef.current, {
          y: 60, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: textRef.current, start: "top 85%", end: "top 55%", scrub: 1 },
        });
      }
      if (skillsRef.current) {
        gsap.from(skillsRef.current, {
          y: 40, opacity: 0, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: skillsRef.current, start: "top 85%", end: "top 60%", scrub: 1 },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ background: "#000", padding: "120px 0", position: "relative", overflow: "hidden" }}>
      {/* Background glow */}
      <div style={{
        position: "absolute", top: "50%", right: "-10%",
        transform: "translateY(-50%)",
        width: 800, height: 800, borderRadius: "50%",
        background: "rgba(139,92,246,0.03)",
        filter: "blur(200px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <p style={{
          fontSize: 11, fontFamily: "monospace", fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#2563EB", marginBottom: 24, textAlign: "center",
        }}>
          About
        </p>

        <h2 ref={titleRef} style={{
          fontSize: "clamp(36px, 6vw, 72px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#fff",
          lineHeight: 0.95,
          textAlign: "center",
          marginBottom: 40,
        }}>
          Vibe Coder
          <span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
          <br />
          <span style={{ fontSize: "clamp(20px, 3vw, 36px)", color: "rgba(255,255,255,0.25)", fontWeight: 500 }}>
            Backend hands-on.
          </span>
        </h2>

        <p ref={textRef} style={{
          fontSize: "clamp(16px, 2vw, 20px)",
          color: "rgba(255,255,255,0.35)",
          lineHeight: 1.8,
          textAlign: "center",
          maxWidth: 680,
          margin: "0 auto 48px",
        }}>
          I ride the wave of AI-accelerated development while keeping my hands dirty in real production systems. Laravel APIs, payment integrations, SSO auth, queue-driven architectures. The vibe is fast, the code is solid, the systems scale.
        </p>

        {/* Skills — minimal pills */}
        <div ref={skillsRef} style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          justifyContent: "center",
        }}>
          {personalInfo.skills.slice(0, 8).map((skill) => (
            <span key={skill} style={{
              fontSize: 12, fontWeight: 500,
              padding: "8px 18px", borderRadius: 9999,
              background: "rgba(255,255,255,0.03)",
              color: "rgba(255,255,255,0.35)",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
