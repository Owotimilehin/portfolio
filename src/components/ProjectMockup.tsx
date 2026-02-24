"use client";

import { motion } from "framer-motion";

interface MockupProps {
  type: "dashboard" | "ecommerce" | "membership" | "learning";
  accentColor: string;
}

function DashboardMockup({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" style={{ width: "100%", height: "auto" }}>
      <rect width="800" height="500" rx="12" fill="#111" />
      <rect width="800" height="36" rx="12" fill="#1a1a1a" />
      <circle cx="20" cy="18" r="5" fill="#ff5f57" />
      <circle cx="38" cy="18" r="5" fill="#febc2e" />
      <circle cx="56" cy="18" r="5" fill="#28c840" />
      <rect x="200" y="10" width="400" height="16" rx="8" fill="#0d0d0d" />
      <rect x="0" y="36" width="180" height="464" fill="#0d0d0d" />
      <rect x="16" y="56" width="100" height="12" rx="2" fill={accentColor} opacity="0.8" />
      <rect x="16" y="84" width="148" height="8" rx="2" fill="#333" />
      <rect x="16" y="104" width="120" height="8" rx="2" fill="#333" />
      <rect x="16" y="124" width="140" height="8" rx="2" fill="#333" />
      <rect x="16" y="144" width="100" height="8" rx="2" fill="#333" />
      <rect x="16" y="164" width="130" height="8" rx="2" fill="#333" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={200 + i * 150} y="52" width="130" height="80" rx="8" fill="#1a1a1a" />
          <rect x={216 + i * 150} y="68" width="50" height="6" rx="2" fill="#444" />
          <rect x={216 + i * 150} y="86" width="80" height="16" rx="2" fill={accentColor} opacity={0.3 + i * 0.2} />
          <rect x={216 + i * 150} y="112" width="60" height="6" rx="2" fill="#333" />
        </g>
      ))}
      <rect x="200" y="148" width="380" height="200" rx="8" fill="#1a1a1a" />
      <rect x="216" y="164" width="80" height="8" rx="2" fill="#444" />
      {[0, 1, 2, 3, 4, 5, 6, 7].map((i) => (
        <rect key={i} x={230 + i * 42} y={280 - (40 + Math.sin(i * 0.8) * 60)} width="24" height={40 + Math.sin(i * 0.8) * 60} rx="4" fill={accentColor} opacity={0.3 + (i % 3) * 0.25} />
      ))}
      <rect x="596" y="148" width="188" height="200" rx="8" fill="#1a1a1a" />
      <rect x="612" y="164" width="60" height="8" rx="2" fill="#444" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="612" y={188 + i * 30} width="156" height="22" rx="4" fill="#222" />
          <rect x="620" y={194 + i * 30} width={80 - i * 12} height="10" rx="2" fill={accentColor} opacity={0.8 - i * 0.12} />
        </g>
      ))}
      <rect x="200" y="364" width="584" height="120" rx="8" fill="#1a1a1a" />
      <rect x="216" y="380" width="60" height="6" rx="2" fill="#444" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x="216" y={400 + i * 26} width="552" height="1" fill="#222" />
          <rect x="216" y={408 + i * 26} width="80" height="6" rx="2" fill="#333" />
          <rect x="320" y={408 + i * 26} width="120" height="6" rx="2" fill="#2a2a2a" />
          <rect x="680" y={405 + i * 26} width="56" height="14" rx="7" fill={accentColor} opacity="0.2" />
        </g>
      ))}
    </svg>
  );
}

function EcommerceMockup({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" style={{ width: "100%", height: "auto" }}>
      <rect width="800" height="500" rx="12" fill="#0d0d0d" />
      <rect width="800" height="36" rx="12" fill="#1a1a1a" />
      <circle cx="20" cy="18" r="5" fill="#ff5f57" />
      <circle cx="38" cy="18" r="5" fill="#febc2e" />
      <circle cx="56" cy="18" r="5" fill="#28c840" />
      <rect x="30" y="52" width="80" height="12" rx="2" fill={accentColor} opacity="0.8" />
      <rect x="300" y="54" width="60" height="8" rx="2" fill="#444" />
      <rect x="380" y="54" width="60" height="8" rx="2" fill="#444" />
      <rect x="460" y="54" width="60" height="8" rx="2" fill="#444" />
      <rect x="700" y="50" width="70" height="16" rx="8" fill={accentColor} opacity="0.3" />
      <rect x="30" y="84" width="740" height="160" rx="12" fill="#1a1a1a" />
      <rect x="60" y="120" width="200" height="14" rx="2" fill="#fff" opacity="0.9" />
      <rect x="60" y="144" width="280" height="8" rx="2" fill="#666" />
      <rect x="60" y="162" width="240" height="8" rx="2" fill="#666" />
      <rect x="60" y="190" width="100" height="32" rx="16" fill={accentColor} />
      <rect x="520" y="100" width="200" height="130" rx="8" fill="#222" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={30 + i * 190} y="264" width="170" height="220" rx="10" fill="#1a1a1a" />
          <rect x={38 + i * 190} y="272" width="154" height="120" rx="6" fill="#222" />
          <rect x={38 + i * 190} y="404" width="100" height="8" rx="2" fill="#555" />
          <rect x={38 + i * 190} y="420" width="60" height="6" rx="2" fill="#333" />
          <rect x={38 + i * 190} y="440" width="80" height="14" rx="2" fill={accentColor} opacity="0.7" />
        </g>
      ))}
    </svg>
  );
}

function MembershipMockup({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" style={{ width: "100%", height: "auto" }}>
      <rect width="800" height="500" rx="12" fill="#040D19" />
      <rect width="800" height="36" rx="12" fill="#0B1D33" />
      <circle cx="20" cy="18" r="5" fill="#ff5f57" />
      <circle cx="38" cy="18" r="5" fill="#febc2e" />
      <circle cx="56" cy="18" r="5" fill="#28c840" />
      <rect x="30" y="52" width="120" height="14" rx="2" fill={accentColor} opacity="0.8" />
      <rect x="700" y="50" width="70" height="20" rx="10" fill={accentColor} />
      <rect x="30" y="86" width="350" height="20" rx="2" fill="#fff" opacity="0.9" />
      <rect x="30" y="116" width="280" height="8" rx="2" fill="#6B88A8" />
      <rect x="30" y="134" width="320" height="8" rx="2" fill="#6B88A8" />
      <rect x="440" y="80" width="330" height="190" rx="16" fill="url(#memberCard)" />
      <defs>
        <linearGradient id="memberCard" x1="440" y1="80" x2="770" y2="270">
          <stop offset="0%" stopColor={accentColor} stopOpacity="0.4" />
          <stop offset="100%" stopColor={accentColor} stopOpacity="0.1" />
        </linearGradient>
      </defs>
      <rect x="460" y="100" width="80" height="10" rx="2" fill="#fff" opacity="0.8" />
      <circle cx="480" cy="150" r="24" fill="#fff" opacity="0.15" />
      <rect x="520" y="138" width="120" height="10" rx="2" fill="#fff" opacity="0.6" />
      <rect x="520" y="156" width="80" height="6" rx="2" fill="#fff" opacity="0.3" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={30 + i * 140} y="170" width="120" height="80" rx="10" fill="#0B2040" />
          <rect x={46 + i * 140} y="186" width="60" height="20" rx="2" fill={accentColor} opacity={0.5 + i * 0.15} />
          <rect x={46 + i * 140} y="218" width="80" height="6" rx="2" fill="#3B5A7A" />
        </g>
      ))}
      <rect x="30" y="280" width="740" height="200" rx="12" fill="#0B1D33" />
      <rect x="50" y="300" width="100" height="10" rx="2" fill="#4B6B8A" />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect x="50" y={326 + i * 30} width="700" height="1" fill="#1B3050" />
          <circle cx="66" cy={342 + i * 30} r="8" fill={accentColor} opacity="0.2" />
          <rect x="84" y={338 + i * 30} width="140" height="8" rx="2" fill="#4B6B8A" />
          <rect x="260" y={338 + i * 30} width="200" height="8" rx="2" fill="#2B4A6A" />
        </g>
      ))}
    </svg>
  );
}

function LearningMockup({ accentColor }: { accentColor: string }) {
  return (
    <svg viewBox="0 0 800 500" fill="none" style={{ width: "100%", height: "auto" }}>
      <rect width="800" height="500" rx="12" fill="#111" />
      <rect width="800" height="36" rx="12" fill="#1a1a1a" />
      <circle cx="20" cy="18" r="5" fill="#ff5f57" />
      <circle cx="38" cy="18" r="5" fill="#febc2e" />
      <circle cx="56" cy="18" r="5" fill="#28c840" />
      <rect x="30" y="52" width="100" height="14" rx="2" fill={accentColor} opacity="0.8" />
      <rect x="680" y="50" width="90" height="20" rx="10" fill={accentColor} />
      <rect x="30" y="84" width="740" height="180" rx="12" fill="#1a1a1a" />
      <rect x="50" y="104" width="60" height="20" rx="10" fill={accentColor} opacity="0.3" />
      <rect x="50" y="138" width="300" height="16" rx="2" fill="#fff" opacity="0.9" />
      <rect x="50" y="164" width="400" height="8" rx="2" fill="#666" />
      <rect x="50" y="182" width="350" height="8" rx="2" fill="#666" />
      <rect x="50" y="210" width="120" height="36" rx="18" fill={accentColor} />
      <rect x="190" y="210" width="120" height="36" rx="18" fill="#333" />
      <rect x="480" y="100" width="270" height="150" rx="8" fill="#222" />
      <circle cx="615" cy="175" r="20" fill={accentColor} opacity="0.5" />
      <polygon points="610,165 630,175 610,185" fill="#fff" opacity="0.8" />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={30 + i * 255} y="284" width="235" height="200" rx="10" fill="#1a1a1a" />
          <rect x={38 + i * 255} y="292" width="219" height="100" rx="6" fill="#222" />
          <rect x={46 + i * 255} y="330" width="40" height="40" rx="20" fill={accentColor} opacity="0.3" />
          <rect x={38 + i * 255} y="404" width="140" height="10" rx="2" fill="#555" />
          <rect x={38 + i * 255} y="422" width="200" height="6" rx="2" fill="#333" />
          <rect x={38 + i * 255} y="444" width="219" height="6" rx="3" fill="#222" />
          <rect x={38 + i * 255} y="444" width={80 + i * 40} height="6" rx="3" fill={accentColor} opacity="0.6" />
        </g>
      ))}
    </svg>
  );
}

export function ProjectMockup({ type, accentColor }: MockupProps) {
  const mockups = {
    dashboard: DashboardMockup,
    ecommerce: EcommerceMockup,
    membership: MembershipMockup,
    learning: LearningMockup,
  };
  const Component = mockups[type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, rotateX: 8 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      style={{ perspective: "1200px", position: "relative" }}
    >
      {/* Glow behind mockup */}
      <div style={{
        position: "absolute",
        inset: -16,
        borderRadius: 16,
        filter: "blur(40px)",
        opacity: 0.2,
        background: accentColor,
        pointerEvents: "none",
      }} />
      <div style={{
        position: "relative",
        borderRadius: 12,
        overflow: "hidden",
        border: "1px solid rgba(255,255,255,0.1)",
        boxShadow: "0 25px 50px -12px rgba(0,0,0,0.5)",
      }}>
        <Component accentColor={accentColor} />
      </div>
    </motion.div>
  );
}
