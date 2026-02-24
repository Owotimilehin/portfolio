"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import { personalInfo } from "@/lib/data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !headlineRef.current) return;

    const ctx = gsap.context(() => {
      gsap.from(headlineRef.current, {
        y: 60, opacity: 0, scale: 0.97,
        duration: 1, ease: "power3.out",
        scrollTrigger: { trigger: headlineRef.current, start: "top 90%", toggleActions: "play none none none" },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="contact" style={{ background: "#000", padding: "160px 0 80px", position: "relative", overflow: "hidden", zIndex: 5 }}>
      {/* Glow */}
      <div style={{
        position: "absolute", top: "40%", left: "50%",
        transform: "translate(-50%, -50%)",
        width: 1000, height: 1000, borderRadius: "50%",
        background: "rgba(37,99,235,0.03)",
        filter: "blur(250px)", pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 24px", textAlign: "center", position: "relative" }}>
        <p style={{
          fontSize: 11, fontFamily: "monospace", fontWeight: 600,
          letterSpacing: "0.3em", textTransform: "uppercase",
          color: "#2563EB", marginBottom: 32,
        }}>
          Contact
        </p>

        <h2 ref={headlineRef} style={{
          fontSize: "clamp(40px, 8vw, 100px)",
          fontWeight: 700,
          letterSpacing: "-0.04em",
          color: "#fff",
          marginBottom: 24,
          lineHeight: 0.9,
        }}>
          Let&apos;s talk<span style={{ color: "rgba(255,255,255,0.15)" }}>.</span>
        </h2>

        <p style={{
          fontSize: 16, color: "rgba(255,255,255,0.25)",
          maxWidth: 400, margin: "0 auto 56px", lineHeight: 1.7,
        }}>
          Open to new projects and partnerships.
        </p>

        {/* Big email CTA */}
        <a
          href={`mailto:${personalInfo.email}`}
          style={{
            display: "inline-flex", alignItems: "center", gap: 10,
            background: "#fff", color: "#000",
            padding: "18px 48px", borderRadius: 9999,
            fontSize: 16, fontWeight: 600, textDecoration: "none",
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          Start a Conversation <ArrowUpRight size={16} />
        </a>

        {/* Subtle links */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 32 }}>
          <a
            href={`mailto:${personalInfo.email}`}
            style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
          >
            {personalInfo.email}
          </a>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />
          <a
            href={`tel:${personalInfo.phone}`}
            style={{ fontSize: 13, color: "rgba(255,255,255,0.25)", textDecoration: "none", transition: "color 0.3s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.25)"; }}
          >
            {personalInfo.phone}
          </a>
        </div>
      </div>

      {/* Footer */}
      <div style={{
        maxWidth: 1280, margin: "120px auto 0",
        padding: "24px 24px", borderTop: "1px solid rgba(255,255,255,0.04)",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <span style={{ fontSize: 12, color: "rgba(255,255,255,0.1)" }}>
          {personalInfo.location}
        </span>
        <span style={{ fontSize: 11, fontFamily: "monospace", color: "rgba(255,255,255,0.08)" }}>
          &copy; {new Date().getFullYear()} {personalInfo.name}
        </span>
      </div>
    </section>
  );
}
