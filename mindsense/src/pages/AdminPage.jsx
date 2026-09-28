import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

const useCases = [
  {
    icon: "📝",
    title: "Exam Stress Detection",
    desc: "During high-pressure exam periods, MindSense flags students showing clinical stress patterns, enabling proactive counselor outreach before breakdowns occur.",
  },
  {
    icon: "📱",
    title: "Online Addiction Prevention",
    desc: "Behavioral models identify compulsive usage patterns early — triggering healthy digital usage nudges before dependency sets in.",
  },
  {
    icon: "🫂",
    title: "Emotional Isolation Alerts",
    desc: "A sudden drop in social digital engagement is detected and flagged, helping institutions identify students who may be withdrawing emotionally.",
  },
  {
    icon: "🆘",
    title: "Suicide Prevention Support",
    desc: "Multi-modal risk signals — sleep disruption, social withdrawal, erratic activity — are combined into a composite early-warning score to aid timely intervention.",
  },
];

const teamData = [
  {
    icon: "🤖",
    title: "AI & ML Research",
    desc: "Built on proven research in LSTM temporal modeling and behavioral biometrics.",
  },
  {
    icon: "🔬",
    title: "Digital Mental Health Studies",
    desc: "Aligned with WHO and NIMHANS research on digital behavior and student mental health.",
  },
  {
    icon: "🌐",
    title: "Federated Learning Concepts",
    desc: "Privacy-preserving ML techniques ensure data sovereignty at the student level.",
  },
  {
    icon: "📚",
    title: "Research-Backed Approach",
    desc: "Every component validated against peer-reviewed literature in behavioral psychology and AI.",
  },
];

export default function AdminPage({ setPage, onLogout }) {
  return (
    <div
      style={{
        padding: "110px 24px 80px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {/* ADMIN STATUS & CONTROLS BAR */}
      <FadeUp>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "16px 24px",
            background: "rgba(0, 212, 200, 0.05)",
            border: "1px solid rgba(0, 212, 200, 0.2)",
            borderRadius: 12,
            marginBottom: 40,
            backdropFilter: "blur(10px)",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: "var(--green)",
                boxShadow: "0 0 10px var(--green)",
                display: "inline-block",
              }}
            />
            <div>
              <div
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                }}
              >
                Administrator Control Center
              </div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.7rem",
                  color: "var(--muted)",
                }}
              >
                Authenticated as Institution Administrator
              </div>
            </div>
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button
              onClick={() => (onLogout ? onLogout() : setPage?.("login"))}
              style={{
                background: "rgba(255, 75, 75, 0.1)",
                border: "1px solid rgba(255, 75, 75, 0.3)",
                color: "var(--red)",
                padding: "8px 16px",
                borderRadius: 8,
                cursor: "pointer",
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                fontWeight: 600,
                transition: "all 0.2s",
              }}
              onMouseEnter={(e) =>
                (e.target.style.background = "rgba(255, 75, 75, 0.2)")
              }
              onMouseLeave={(e) =>
                (e.target.style.background = "rgba(255, 75, 75, 0.1)")
              }
            >
              🔒 Log Out Admin
            </button>
          </div>
        </div>
      </FadeUp>

      {/* USE CASES */}
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <Tag>Real-Life Scenarios</Tag>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "2.6rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginTop: 8,
            }}
          >
            Impact in <span className="gradient-text">Action</span>
          </h2>
        </div>
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2,1fr)",
          gap: 20,
          marginBottom: 80,
        }}
      >
        {useCases.map((u, i) => (
          <FadeUp key={u.title} delay={i * 0.1}>
            <GlassCard>
              <div style={{ fontSize: "2rem", marginBottom: 10 }}>{u.icon}</div>
              <h3
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "1rem",
                  marginBottom: 8,
                }}
              >
                {u.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.83rem",
                  color: "var(--muted)",
                  lineHeight: 1.7,
                }}
              >
                {u.desc}
              </p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      {/* RESEARCH FOUNDATION */}
      <FadeUp>
        <div style={{ textAlign: "center", marginBottom: 50 }}>
          <Tag>Research Foundation</Tag>
          <h2
            style={{
              fontFamily: "var(--font-head)",
              fontSize: "2.4rem",
              fontWeight: 800,
              letterSpacing: "-0.02em",
              marginTop: 8,
            }}
          >
            Built on Solid <span className="gradient-text">Science</span>
          </h2>
        </div>
      </FadeUp>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 20,
          marginBottom: 48,
        }}
      >
        {teamData.map((t, i) => (
          <FadeUp key={t.title} delay={i * 0.1}>
            <GlassCard style={{ textAlign: "center" }}>
              <div style={{ fontSize: "1.8rem", marginBottom: 10 }}>
                {t.icon}
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "0.9rem",
                  marginBottom: 6,
                }}
              >
                {t.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.78rem",
                  color: "var(--muted)",
                  lineHeight: 1.5,
                }}
              >
                {t.desc}
              </p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      {/* INSTITUTION VIEW */}
      <FadeUp delay={0.3}>
        <GlassCard
          hover={false}
          className="glow-cyan"
          style={{ padding: "32px" }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 24,
            }}
          >
            <div>
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.65rem",
                  color: "var(--cyan)",
                  letterSpacing: "0.15em",
                  marginBottom: 6,
                }}
              >
                INSTITUTION VIEW · AGGREGATED ONLY
              </div>
              <h3
                style={{
                  fontFamily: "var(--font-head)",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                }}
              >
                Risk Distribution Overview
              </h3>
            </div>
            <div
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.65rem",
                color: "var(--green)",
              }}
            >
              ● LIVE SYSTEM
            </div>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 20,
            }}
          >
            {[
              {
                label: "Low Risk Students",
                value: "78%",
                count: "2,219",
                color: "var(--green)",
              },
              {
                label: "Medium Risk",
                value: "11%",
                count: "312",
                color: "var(--yellow)",
              },
              {
                label: "High Risk",
                value: "1.5%",
                count: "43",
                color: "var(--red)",
              },
            ].map((s) => (
              <div
                key={s.label}
                style={{
                  textAlign: "center",
                  padding: "20px",
                  background: "rgba(255,255,255,0.02)",
                  borderRadius: 10,
                  border: "1px solid rgba(255,255,255,0.05)",
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "2.4rem",
                    fontWeight: 800,
                    color: s.color,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-head)",
                    fontSize: "1rem",
                    fontWeight: 600,
                    marginBottom: 4,
                  }}
                >
                  {s.count}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "0.65rem",
                    color: "var(--muted)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
              textAlign: "center",
              marginTop: 16,
              letterSpacing: "0.05em",
            }}
          >
            ⚠ No personal identifiers displayed · All data aggregated and
            anonymized
          </p>
        </GlassCard>
      </FadeUp>
    </div>
  );
}
