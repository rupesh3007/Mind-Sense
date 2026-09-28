export default function Footer({ setPage }) {
  const cols = [
    {
      title: "Platform",
      links: [["Home","home"],["Dashboard","dashboard"],["AI Engine","ai-engine"],["Smart Alerts","alerts"]],
    },
    {
      title: "Security",
      links: [["Privacy Policy","privacy"],["Encryption","privacy"],["Data Policy","privacy"]],
    },
    {
      title: "Access",
      links: [["Student Login","login"],["Contact Us","contact"]],
    },
  ];

  return (
    <footer style={{ borderTop: "1px solid var(--border)", padding: "48px 24px 32px", marginTop: 80 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="responsive-grid responsive-grid--footer" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 40, marginBottom: 40 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 7,
                background: "linear-gradient(135deg, #00d4c8, #00a8ff)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "var(--font-head)", fontWeight: 800, fontSize: 14, color: "#000",
              }}>M</div>
              <span style={{ fontFamily: "var(--font-head)", fontWeight: 800, fontSize: "1rem" }}>
                Mind<span style={{ color: "var(--cyan)" }}>Sense</span>
              </span>
            </div>
            <p style={{ fontFamily: "var(--font-body)", fontSize: "0.8rem", color: "var(--muted)", lineHeight: 1.6, maxWidth: 260 }}>
              AI-Powered Behavioral Intelligence System for early detection of student stress. Privacy-first. Research-backed.
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)", marginTop: 12 }}>
              Hackathon | 2025
            </p>
          </div>

          {/* Link columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--cyan)", letterSpacing: "0.15em", marginBottom: 14 }}>
                {col.title.toUpperCase()}
              </div>
              {col.links.map(([label, pg]) => (
                <button
                  key={label}
                  onClick={() => setPage(pg)}
                  style={{ display: "block", background: "none", border: "none", color: "var(--muted)", fontFamily: "var(--font-body)", fontSize: "0.82rem", cursor: "pointer", marginBottom: 8, textAlign: "left", transition: "color 0.2s" }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--cyan)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
                >{label}</button>
              ))}
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="footer-bottom" style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>
            © 2025 MindSense · All rights reserved · Built for 2025
          </span>
          <span style={{ fontFamily: "var(--font-mono)", fontSize: "0.65rem", color: "var(--muted)" }}>
            We analyze patterns, not people. 🔐
          </span>
        </div>
      </div>
    </footer>
  );
}
