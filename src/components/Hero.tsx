"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function RotatingCircleText({ text, size }: { text: string; size: number }) {
  const radius = size / 2 - 12;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ animation: "spin-slow 20s linear infinite" }}>
      <defs>
        <path
          id="circlePath"
          d={`M ${size / 2}, ${size / 2} m -${radius}, 0 a ${radius},${radius} 0 1,1 ${radius * 2},0 a ${radius},${radius} 0 1,1 -${radius * 2},0`}
        />
      </defs>
      <text fill="rgba(255,255,255,0.2)" fontSize="11" fontFamily="monospace" fontWeight="600" letterSpacing="3">
        <textPath href="#circlePath">{text}</textPath>
      </text>
    </svg>
  );
}

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const exploreRef = useRef<HTMLAnchorElement>(null);
  const touchRef = useRef<HTMLAnchorElement>(null);

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
          { opacity: 0, x: -30 },
          { opacity: 1, x: 0, duration: 1 }, 0.8)
        .fromTo(circleRef.current,
          { opacity: 0, scale: 0.8 },
          { opacity: 1, scale: 1, duration: 1.2, ease: "power2.out" }, 0.6);

      // ── SCROLL-DRIVEN EXIT — second half of 200dvh ──
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "40% top",
          end: "bottom top",
          scrub: 1,
        },
      });

      scrollTl
        .fromTo(badgeRef.current, { opacity: 1, y: 0 }, { opacity: 0, y: 60, duration: 0.3, ease: "none", immediateRender: false }, 0)
        .fromTo(headlineRef.current, { opacity: 1, y: 0, scale: 1 }, { opacity: 0, y: 120, scale: 0.95, duration: 1, ease: "none", immediateRender: false }, 0)
        .fromTo(subRef.current, { opacity: 1, x: 0 }, { opacity: 0, x: -60, duration: 0.6, ease: "none", immediateRender: false }, 0.1)
        .fromTo(circleRef.current, { opacity: 1, scale: 1 }, { opacity: 0, scale: 0.6, duration: 0.6, ease: "none", immediateRender: false }, 0.05);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  // CTA Fade Up — fires once when buttons scroll into view
  useEffect(() => {
    const explore = exploreRef.current;
    const touch = touchRef.current;
    const cta = ctaRef.current;
    if (!explore || !touch || !cta) return;

    gsap.set([explore, touch], { opacity: 0, y: 30 });

    const st = ScrollTrigger.create({
      trigger: cta,
      start: "top 95%",
      once: true,
      onEnter: () => {
        gsap.fromTo([explore, touch],
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: "power3.out" }
        );
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{
        position: "relative",
        minHeight: "140dvh",
        background: "#000",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {/* ── FRAME 1: Full viewport hero ── */}
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

        {/* Center content */}
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
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', 'Inter', sans-serif",
              letterSpacing: "-0.04em",
              lineHeight: 0.9,
              color: "#fff",
            }}
          >
            Vibe it.
            <br />
            <span className="text-shimmer">Build it.</span>
            <br />
            Ship it.
          </h1>

          {/* Animated scroll indicator */}
          <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
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

        {/* Left side subtitle */}
        <p
          ref={subRef}
          style={{
            position: "absolute",
            left: 32,
            bottom: 48,
            fontSize: 13,
            fontWeight: 400,
            letterSpacing: "0.04em",
            color: "rgba(255,255,255,0.2)",
            lineHeight: 1.7,
            maxWidth: 280,
            textAlign: "left",
          }}
        >
          AI-accelerated development.
          <br />
          Production-grade backend systems.
        </p>

        {/* Right side rotating circle */}
        <div
          ref={circleRef}
          style={{
            position: "absolute",
            right: 32,
            bottom: 32,
            width: 160,
            height: 160,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <RotatingCircleText
            text="VIBE CODING · BACKEND ENGINEERING · VIBE CODING · BACKEND ENGINEERING · "
            size={160}
          />
          <div style={{
            position: "absolute",
            width: 8, height: 8,
            borderRadius: "50%",
            background: "#2563EB",
          }} />
        </div>
      </div>

      {/* ── FRAME 2: CTA buttons — below the hero viewport, scrolls into view ── */}
      <div
        ref={ctaRef}
        style={{
          position: "relative",
          zIndex: 10,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: 16,
          paddingTop: 80,
          paddingBottom: 80,
        }}
      >
        <a
          ref={exploreRef}
          href="#work"
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "#fff", color: "#000",
            padding: "14px 32px", borderRadius: 9999,
            fontSize: 14, fontWeight: 600,
            textDecoration: "none",
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "#2563EB"; e.currentTarget.style.color = "#fff"; e.currentTarget.style.transform = "scale(1.05)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "#fff"; e.currentTarget.style.color = "#000"; e.currentTarget.style.transform = "scale(1)"; }}
        >
          Explore Work
        </a>
        <a
          ref={touchRef}
          href="#contact"
          style={{
            display: "inline-flex", alignItems: "center",
            color: "rgba(255,255,255,0.6)",
            border: "1px solid rgba(255,255,255,0.15)",
            padding: "14px 32px", borderRadius: 9999,
            fontSize: 14, fontWeight: 500,
            textDecoration: "none",
            transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
            whiteSpace: "nowrap",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.3)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)"; }}
        >
          Get in Touch
        </a>
      </div>

    </section>
  );
}
