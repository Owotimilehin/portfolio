"use client";

import { motion } from "framer-motion";
import { techCategories } from "@/lib/data";

const fadeUp = { initial: { opacity: 0, y: 40 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true as const, margin: "-80px" as const }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } };
const stagger = (i: number) => ({ ...fadeUp, transition: { ...fadeUp.transition, delay: i * 0.08 } });

export function TechStack() {
  return (
    <section id="stack" style={{ background: "#000", padding: "96px 0", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 600, height: 600, borderRadius: "50%", background: "rgba(37,99,235,0.05)", filter: "blur(200px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", position: "relative" }}>
        <motion.div {...fadeUp} style={{ textAlign: "center", marginBottom: 80 }}>
          <p style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.3em", textTransform: "uppercase", color: "#2563EB", marginBottom: 20 }}>
            Technology
          </p>
          <h2 style={{ fontSize: "clamp(32px, 5vw, 56px)", fontWeight: 700, letterSpacing: "-0.03em", color: "#fff", lineHeight: 1.05 }}>
            Built with<br />
            <span style={{ color: "rgba(255,255,255,0.25)" }}>precision.</span>
          </h2>
        </motion.div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 20 }}>
          {techCategories.map((cat, i) => (
            <motion.div key={cat.category} {...stagger(i)} style={{
              padding: 28, borderRadius: 16,
              background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)",
            }}>
              <h3 style={{ fontSize: 11, fontFamily: "monospace", fontWeight: 600, letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.2)", marginBottom: 24 }}>
                {cat.category}
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                {cat.items.map((item) => (
                  <div key={item} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#2563EB" }} />
                    <span style={{ fontSize: 14, fontWeight: 500, color: "rgba(255,255,255,0.55)" }}>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
