import Link from "next/link";

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 32,
        textAlign: "center",
      }}
    >
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: "#fff",
          marginBottom: 48,
          letterSpacing: "-0.02em",
        }}
      >
        OT<span style={{ color: "#2563EB" }}>.</span>
      </div>
      <div
        style={{
          fontSize: 120,
          fontWeight: 700,
          color: "rgba(255,255,255,0.05)",
          lineHeight: 1,
          letterSpacing: "-0.04em",
        }}
      >
        404
      </div>
      <h1
        style={{
          fontSize: 28,
          fontWeight: 600,
          color: "#fff",
          marginTop: 16,
        }}
      >
        Page not found
      </h1>
      <p
        style={{
          fontSize: 16,
          color: "rgba(255,255,255,0.45)",
          marginTop: 12,
          maxWidth: 400,
        }}
      >
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link
        href="/"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          marginTop: 40,
          fontSize: 14,
          fontWeight: 500,
          color: "#fff",
          background: "rgba(255,255,255,0.08)",
          border: "1px solid rgba(255,255,255,0.1)",
          padding: "12px 28px",
          borderRadius: 9999,
          textDecoration: "none",
          transition: "background 0.3s",
        }}
      >
        Back to Home
      </Link>
    </div>
  );
}
