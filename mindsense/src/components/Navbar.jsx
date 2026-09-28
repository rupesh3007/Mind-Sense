import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const NAV_ITEMS = [
  { label: "Home", page: "home" },
  { label: "Platform", page: "platform" },
  { label: "AI Engine", page: "ai-engine" },
  { label: "Dashboard", page: "dashboard" },
  { label: "Smart Alerts", page: "alerts" },
  { label: "Privacy", page: "privacy" },
  { label: "Contact", page: "contact" },
];

export default function Navbar({
  page,
  setPage,
  isAdminAuthenticated,
  onLogout,
  onAdminClick,
}) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleAdminNav = () => {
    if (onAdminClick) {
      onAdminClick();
    } else if (isAdminAuthenticated) {
      setPage("admin");
    } else {
      setPage("login");
    }
  };

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: "0 24px",
        height: 68,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: scrolled ? "rgba(4,7,15,0.92)" : "transparent",
        backdropFilter: scrolled ? "blur(20px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,212,200,0.1)" : "none",
        transition: "all 0.4s",
      }}
    >
      {/* Logo */}
      <button
        onClick={() => setPage("home")}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            borderRadius: 8,
            background: "linear-gradient(135deg, #00d4c8, #00a8ff)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: 16,
            color: "#000",
          }}
        >
          M
        </div>
        <span
          style={{
            fontFamily: "var(--font-head)",
            fontWeight: 800,
            fontSize: "1.1rem",
            color: "var(--text)",
            letterSpacing: "-0.02em",
          }}
        >
          Mind<span style={{ color: "var(--cyan)" }}>Sense</span>
        </span>
      </button>

      {/* Desktop Nav */}
      <div style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => setPage(item.page)}
            className={`nav-link ${page === item.page ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        {isAdminAuthenticated ? (
          <>
            <button
              className="btn-primary"
              onClick={() => setPage("admin")}
              style={{
                padding: "8px 16px",
                fontSize: "0.75rem",
                display: "flex",
                alignItems: "center",
                gap: 6,
                background:
                  page === "admin"
                    ? "linear-gradient(135deg,#00d4c8,#00a8ff)"
                    : "rgba(0, 212, 200, 0.15)",
                color: page === "admin" ? "#000" : "var(--cyan)",
                border: "1px solid rgba(0, 212, 200, 0.4)",
              }}
            >
              <span>🛡️</span> Admin Panel
            </button>
            <button
              onClick={onLogout}
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.1)",
                color: "var(--muted)",
                padding: "8px 12px",
                borderRadius: 8,
                fontSize: "0.72rem",
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
              }}
            >
              Exit
            </button>
          </>
        ) : (
          <>
            <button
              className="btn-ghost"
              onClick={() => setPage("login")}
              style={{ padding: "8px 16px", fontSize: "0.75rem" }}
            >
              Login
            </button>
            <button
              className="btn-primary"
              onClick={handleAdminNav}
              style={{ padding: "8px 16px", fontSize: "0.75rem" }}
            >
              Admin
            </button>
          </>
        )}
      </div>
    </motion.nav>
  );
}
