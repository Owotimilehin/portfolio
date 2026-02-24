"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const homeLinks = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const isProjectPage = pathname.startsWith("/projects/");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
          transition: "all 0.5s ease",
          background: scrolled ? "rgba(0,0,0,0.8)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,0.06)" : "1px solid transparent",
        }}
      >
        <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
            {/* Left side */}
            <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
              {isProjectPage && (
                <Link href="/" style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  color: "rgba(255,255,255,0.5)", textDecoration: "none",
                  fontSize: 13, transition: "color 0.3s",
                }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.5)"; }}
                >
                  <ArrowLeft size={14} /> Back
                </Link>
              )}
              <Link href="/" style={{
                fontSize: 18, fontWeight: 600, color: "#fff",
                textDecoration: "none", letterSpacing: "-0.02em",
              }}>
                OT<span style={{ color: "#2563EB" }}>.</span>
              </Link>
            </div>

            {/* Desktop nav */}
            <div className="hidden md:flex" style={{ alignItems: "center", gap: 32 }}>
              {!isProjectPage && homeLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  style={{
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    textDecoration: "none", transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                >
                  {link.label}
                </a>
              ))}
              {isProjectPage && (
                <Link
                  href="/#work"
                  style={{
                    fontSize: 13, color: "rgba(255,255,255,0.45)",
                    textDecoration: "none", transition: "color 0.3s",
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.color = "#fff"; }}
                  onMouseLeave={(e) => { e.currentTarget.style.color = "rgba(255,255,255,0.45)"; }}
                >
                  All Projects
                </Link>
              )}
              <a
                href={isProjectPage ? "/#contact" : "#contact"}
                style={{
                  fontSize: 13, fontWeight: 500,
                  background: "rgba(255,255,255,0.08)",
                  color: "rgba(255,255,255,0.7)",
                  padding: "8px 20px", borderRadius: 9999,
                  textDecoration: "none",
                  border: "1px solid rgba(255,255,255,0.06)",
                  transition: "all 0.3s",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.15)"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "rgba(255,255,255,0.08)"; }}
              >
                Get in Touch
              </a>
            </div>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden"
              style={{ padding: 8, color: "#fff", background: "none", border: "none", cursor: "pointer" }}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: "fixed", inset: 0, zIndex: 40,
              background: "rgba(0,0,0,0.95)", backdropFilter: "blur(24px)",
              paddingTop: 80, paddingLeft: 32, paddingRight: 32,
            }}
            className="md:hidden"
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
              {isProjectPage && (
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
                  <Link href="/" onClick={() => setMobileOpen(false)} style={{
                    display: "flex", alignItems: "center", gap: 8,
                    fontSize: 28, fontWeight: 500, color: "#fff", textDecoration: "none", padding: "12px 0",
                  }}>
                    <ArrowLeft size={20} /> Home
                  </Link>
                </motion.div>
              )}
              {!isProjectPage && homeLinks.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08 }}
                  style={{ fontSize: 28, fontWeight: 500, color: "#fff", textDecoration: "none", padding: "12px 0" }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={isProjectPage ? "/#contact" : "#contact"}
                onClick={() => setMobileOpen(false)}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center",
                  fontSize: 16, background: "#2563EB", color: "#fff",
                  padding: "16px 32px", borderRadius: 9999,
                  textDecoration: "none", marginTop: 24,
                }}
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
