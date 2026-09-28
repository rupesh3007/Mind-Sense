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

export default function Navbar({ page, setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const nextScrolled = window.scrollY > 20;
      setScrolled((current) => current === nextScrolled ? current : nextScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="site-nav"
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
        onClick={() => { setPage("home"); setMenuOpen(false); }}
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
      <div className="desktop-nav" style={{ display: "flex", alignItems: "center", gap: 28 }}>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.page}
            onClick={() => { setPage(item.page); setMenuOpen(false); }}
            className={`nav-link ${page === item.page ? "active" : ""}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Auth Buttons */}
      <div className="nav-auth" style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <button
          className="btn-ghost"
          onClick={() => setPage("login")}
          style={{ padding: "8px 16px", fontSize: "0.75rem" }}
        >
          Login
        </button>
      </div>

      <button
        type="button"
        className="mobile-menu-toggle"
        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        <span />
        <span />
        <span />
      </button>

      {menuOpen && (
        <div id="mobile-navigation" className="mobile-nav-menu">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.page}
              className={`nav-link mobile-nav-link ${page === item.page ? "active" : ""}`}
              onClick={() => { setPage(item.page); setMenuOpen(false); }}
            >
              {item.label}
            </button>
          ))}
          <button className="nav-link mobile-nav-link" onClick={() => { setPage("login"); setMenuOpen(false); }}>Login</button>
        </div>
      )}
    </motion.nav>
  );
}
