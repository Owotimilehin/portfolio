"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const scrollHintRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      // ── ENTRANCE ANIMATIONS (on load) ──
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

      tl.fromTo(badgeRef.current,
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.8 }, 0.2)
        .fromTo(headlineRef.current,
          { opacity: 0, y: 60 },
          { opacity: 1, y: 0, duration: 1.2 }, 0.4)
        .fromTo(subRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 1 }, 0.8)
        .fromTo(ctaRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 }, 1.1)
        .fromTo(scrollHintRef.current,
          { opacity: 0 },
          { opacity: 1, duration: 0.8 }, 2);

      // ── SCROLL-DRIVEN EXIT + RETURN (scrub = reversible) ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });

      scrollTl
        .fromTo(badgeRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: 60, duration: 0.3, ease: "none", immediateRender: false }, 0)
        .fromTo(headlineRef.current, { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: 120, scale: 0.95, duration: 1, ease: "none", immediateRender: false }, 0)
        .fromTo(subRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: 80, duration: 0.6, ease: "none", immediateRender: false }, 0.1)
        .fromTo(ctaRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: -60, duration: 0.5, ease: "none", immediateRender: false }, 0.15)
        .fromTo(scrollHintRef.current, { opacity: 1 }, { opacity: 0, duration: 0.3, ease: "none", immediateRender: false }, 0);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "200dvh",
        background: "#000",
        overflow: "hidden",
      }}
    >
      {/* Fixed content container */}
      <div style={{
        position: "sticky",
        top: 0,
        height: "100dvh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}>
        {/* Animated gradient orbs */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div
            className="animate-glow-pulse"
            style={{
              position: "absolute",
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: 1200, height: 1200,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(37,99,235,0.06) 0%, transparent 70%)",
            }}
          />
          <div
            className="animate-float"
            style={{
              position: "absolute",
              top: "20%", right: "20%",
              width: 500, height: 500,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(139,92,246,0.04) 0%, transparent 70%)",
            }}
          />
          <div
            style={{
              position: "absolute",
              bottom: "20%", left: "20%",
              width: 400, height: 400,
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(16,185,129,0.04) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Grid lines */}
        <div
          style={{
            position: "absolute", inset: 0,
            opacity: 0.025, pointerEvents: "none",
            backgroundImage: "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        <div style={{ position: "relative", zIndex: 10, textAlign: "center", padding: "0 24px", maxWidth: 1100 }}>
          {/* Badge */}
          <div
            ref={badgeRef}
            style={{
              display: "inline-flex", alignItems: "center", gap: 12,
              background: "rgba(255,255,255,0.08)", backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "rgba(255,255,255,0.7)", fontSize: 14,
              padding: "10px 24px", borderRadius: 9999, marginBottom: 32,
              fontWeight: 500,
            }}
          >
            <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8 }}>
              <span style={{
                position: "absolute", inset: 0, borderRadius: "50%",
                background: "#10B981", opacity: 0.75,
                animation: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
              }} />
              <span style={{ position: "relative", display: "inline-flex", width: 8, height: 8, borderRadius: "50%", background: "#10B981" }} />
            </span>
            Available to work
          </div>

          {/* Massive headline */}
          <h1
            ref={headlineRef}
            style={{
              fontSize: "clamp(48px, 10vw, 130px)",
              fontWeight: 700,
              letterSpacing: "-0.05em",
              lineHeight: 0.9,
              color: "#fff",
              marginBottom: 24,
            }}
          >
            Vibe it.
            <br />
            <span className="text-shimmer">Build it.</span>
            <br />
            Ship it.
          </h1>

          {/* Subtitle */}
          <p
            ref={subRef}
            style={{
              fontSize: "clamp(16px, 2vw, 20px)",
              color: "rgba(255,255,255,0.3)",
              maxWidth: 540,
              margin: "0 auto 32px",
              lineHeight: 1.6,
              fontWeight: 300,
            }}
          >
            AI-accelerated development. Production-grade backend systems.
          </p>

          {/* CTA */}
          <div
            ref={ctaRef}
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 16, flexWrap: "wrap" }}
          >
            <a
              href="#work"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                background: "#fff", color: "#000",
                padding: "16px 40px", borderRadius: 9999,
                fontSize: 15, fontWeight: 600,
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "scale(1.05)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.transform = "scale(1)"; }}
            >
              Explore Work
            </a>
            <a
              href="#contact"
              style={{
                display: "inline-flex", alignItems: "center",
                color: "rgba(255,255,255,0.6)",
                border: "1px solid rgba(255,255,255,0.15)",
                padding: "16px 40px", borderRadius: 9999,
                fontSize: 15, fontWeight: 500,
                textDecoration: "none",
                transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Scroll hint */}
        <div
          ref={scrollHintRef}
          style={{
            position: "absolute", bottom: 40,
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}
        >
          <span style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.3em", color: "rgba(255,255,255,0.2)", fontWeight: 500 }}>
            Scroll
          </span>
          <div
            style={{
              width: 1, height: 40,
              background: "linear-gradient(to bottom, rgba(255,255,255,0.2), transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}
