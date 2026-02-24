"use client";

import { motion } from "framer-motion";
import { projects } from "@/lib/data";

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true as const, margin: "-80px" as const }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };

export function ProjectNav() {
  return (
    <section id="projects" style={{ background: "#000", padding: "96px 0" }}>
      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
        <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2563EB", marginBottom: 20 }}>
            Selected Work
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", marginBottom: 20, lineHeight: 1.05 }}>
            Products I&apos;ve<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>engineered.</span>
          </h2>
          <p style={{ fontSize: 16, color: "rgba(255,255,255,0.35)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
            Each project is an immersive deep dive into real-world systems — from
            medical compliance to luxury e-commerce.
          </p>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 16 }}>
          {projects.map((project, i) => (
            <motion.a
              key={project.id}
              href={`#project-${project.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6 }}
              style={{
                position: "relative", padding: 24, borderRadius: 16,
                background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
                textDecoration: "none", overflow: "hidden",
                transition: "border-color 0.4s",
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.12)"; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.06)"; }}
            >
              <span style={{ fontSize: 12, fontFamily: "monospace", color: "rgba(255,255,255,0.15)", display: "block", marginBottom: 12 }}>
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: "rgba(255,255,255,0.85)", marginBottom: 6 }}>
                {project.headline}
              </h3>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.25)" }}>{project.title}</p>
            </motion.a>
          ))}
        </div>
      </div>

      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent)", marginTop: 96 }} />
    </section>
  );
}
