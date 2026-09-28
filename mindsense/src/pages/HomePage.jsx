import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

export default function HomePage({ setPage }) {
  const [typedIndex, setTypedIndex] = useState(0);
  const words = ["Stress", "Anxiety", "Burnout", "Overload"];

  useEffect(() => {
    const t = setInterval(() => setTypedIndex((i) => (i + 1) % words.length), 2500);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: "94%",  label: "Detection Accuracy" },
    { value: "2.4s", label: "Real-time Analysis"  },
    { value: "10K+", label: "Students Protected"  },
    { value: "0",    label: "Privacy Breaches"    },
  ];

  const problems = [
    { icon: "📈", title: "Rising Student Stress",      desc: "1 in 3 students experience clinical-level stress during academic terms, often going undetected." },
    { icon: "📱", title: "Digital Overload",            desc: "Excessive screen time and unhealthy digital patterns are major contributors to mental fatigue." },
    { icon: "🔕", title: "No Early Detection",          desc: "Traditional systems lack proactive mechanisms to identify emotional distress before it escalates." },
    { icon: "🫥", title: "Silent Mental Health Crisis", desc: "Most students never seek help — early, automated detection changes this equation." },
  ];

  const solutions = [
    { icon: "🧠", title: "AI Behavior Analysis",  desc: "Deep learning models analyse behavioral signals to understand emotional states." },
    { icon: "📊", title: "Pattern Recognition",    desc: "Tracks emotional and activity patterns across time to identify deviation." },
    { icon: "⚡", title: "Risk Scoring Engine",    desc: "Proprietary algorithm converts behavioral data into Low / Medium / High risk scores." },
    { icon: "🔔", title: "Smart Alerts",           desc: "AI-generated alerts reach counselors with zero raw data exposure." },
  ];

  const benefits = [
    { icon: "✅", label: "Early stress detection",    color: "var(--green)"  },
    { icon: "🔐", label: "Privacy-first architecture", color: "var(--cyan)"   },
    { icon: "⚡", label: "Real-time insights",         color: "var(--yellow)" },
    { icon: "🤖", label: "No human monitoring",        color: "var(--violet)" },
  ];

  return (
    <div style={{ minHeight: "100vh" }}>

      {/* ── HERO ── */}
      <section
        className="grid-bg"
        style={{ minHeight: "100vh", display: "flex", alignItems: "center", paddingTop: 100, paddingBottom: 80, position: "relative", overflow: "hidden" }}
      >
        {/* Glow orbs */}
        <div style={{ position:"absolute", top:"20%", left:"10%", width:400, height:400, borderRadius:"50%", background:"radial-gradient(circle, rgba(0,212,200,0.08) 0%, transparent 70%)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:"10%", right:"5%", width:500, height:500, borderRadius:"50%", background:"radial-gradient(circle, rgba(124,58,237,0.06) 0%, transparent 70%)", pointerEvents:"none" }} />

        <div className="responsive-grid responsive-grid--hero" style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px", width:"100%", display:"grid", gridTemplateColumns:"1fr 1fr", gap:60, alignItems:"center" }}>

          {/* Left copy */}
          <div>
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ duration:0.8 }}>
              <Tag>Hackathon | 2025</Tag>
              <h1 style={{ fontFamily:"var(--font-head)", fontSize:"3.8rem", fontWeight:800, lineHeight:1.1, marginBottom:20, marginTop:8, letterSpacing:"-0.03em" }}>
                Detect Student{" "}
                <AnimatePresence mode="wait">
                  <motion.span
                    key={typedIndex}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    exit={{ opacity:0, y:-20 }}
                    transition={{ duration:0.4 }}
                    className="gradient-text"
                  >{words[typedIndex]}</motion.span>
                </AnimatePresence>
                <br />Before It's Too Late
              </h1>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"1.05rem", lineHeight:1.7, color:"var(--muted)", marginBottom:36, maxWidth:480 }}>
                An AI-powered behavioral intelligence system for early detection of student stress using encrypted, privacy-preserving analytics.
              </p>
              <div style={{ display:"flex", gap:14 }}>
                <button className="btn-primary" onClick={() => setPage("dashboard")}>View Dashboard →</button>
                <button className="btn-ghost"   onClick={() => setPage("ai-engine")}>See How It Works</button>
              </div>

              {/* Stats row */}
              <div className="responsive-grid responsive-grid--stats" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginTop:48 }}>
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity:0, y:20 }}
                    animate={{ opacity:1, y:0 }}
                    transition={{ delay:0.6 + i * 0.1, duration:0.6 }}
                    style={{ textAlign:"center" }}
                  >
                    <div style={{ fontFamily:"var(--font-head)", fontSize:"1.6rem", fontWeight:800, color:"var(--cyan)" }}>{s.value}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.08em" }}>{s.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity:0, scale:0.9 }}
            animate={{ opacity:1, scale:1 }}
            transition={{ duration:1, delay:0.3 }}
            style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}
          >
            <div className="float" style={{ position:"relative", width:320, height:320 }}>
              {/* Central brain */}
              <div className="glow-cyan" style={{ width:160, height:160, borderRadius:"50%", background:"linear-gradient(135deg,rgba(0,212,200,0.15),rgba(0,168,255,0.1))", border:"2px solid rgba(0,212,200,0.4)", position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"3rem" }}>
                🧠
              </div>
              {/* Rings */}
              {[200, 260, 320].map((size, i) => (
                <div key={size} style={{ width:size, height:size, borderRadius:"50%", border:`1px solid rgba(0,212,200,${0.15 - i*0.04})`, position:"absolute", top:"50%", left:"50%", transform:"translate(-50%,-50%)" }} />
              ))}
              {/* Orbiting nodes */}
              {[
                { emoji:"🔐", cls:"orbit-1" },
                { emoji:"⚡", cls:"orbit-2" },
                { emoji:"📊", cls:"orbit-3" },
              ].map((n) => (
                <div key={n.cls} style={{ position:"absolute", top:"50%", left:"50%", transformOrigin:"0 0" }} className={n.cls}>
                  <div style={{ width:38, height:38, borderRadius:"50%", background:"rgba(0,212,200,0.1)", border:"1px solid rgba(0,212,200,0.4)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1rem", marginLeft:-19, marginTop:-19 }}>
                    {n.emoji}
                  </div>
                </div>
              ))}
            </div>

            {/* Scan line */}
            <div style={{ position:"absolute", width:320, height:320, overflow:"hidden", borderRadius:"50%", top:"50%", left:"50%", transform:"translate(-50%,-50%)", pointerEvents:"none" }}>
              <div className="scan-line" />
            </div>

            {/* Risk badge */}
            <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.2 }} className="glass-card" style={{ position:"absolute", right:-20, top:"25%", padding:"10px 16px", minWidth:150 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", marginBottom:4 }}>RISK SCORE</div>
              <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                {[["LOW","var(--green)"],["MED","var(--yellow)"],["HIGH","var(--red)"]].map(([l,c]) => (
                  <div key={l} style={{ padding:"3px 8px", borderRadius:4, fontSize:"0.65rem", fontFamily:"var(--font-mono)", fontWeight:500, background:`${c}18`, color:c, border:`1px solid ${c}44` }}>{l}</div>
                ))}
              </div>
            </motion.div>

            {/* Encrypted badge */}
            <motion.div initial={{ opacity:0, x:-30 }} animate={{ opacity:1, x:0 }} transition={{ delay:1.4 }} className="glass-card" style={{ position:"absolute", left:-30, bottom:"25%", padding:"10px 16px" }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", marginBottom:4 }}>ENCRYPTED</div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"0.8rem", fontWeight:700, color:"var(--cyan)" }}>AES-256 ✓</div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ── PROBLEM ── */}
      <section style={{ padding:"100px 24px", maxWidth:1200, margin:"0 auto" }}>
        <FadeUp>
          <div style={{ textAlign:"center", marginBottom:60 }}>
            <Tag>The Problem</Tag>
            <h2 style={{ fontFamily:"var(--font-head)", fontSize:"2.6rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
              The Silent Crisis in Student Mental Health
            </h2>
          </div>
        </FadeUp>
        <div className="responsive-grid responsive-grid--2" style={{ display:"grid", gridTemplateColumns:"repeat(2,1fr)", gap:24 }}>
          {problems.map((p, i) => (
            <FadeUp key={p.title} delay={i * 0.1}>
              <GlassCard>
                <div style={{ display:"flex", gap:16, alignItems:"flex-start" }}>
                  <div style={{ fontSize:"2rem", flexShrink:0 }}>{p.icon}</div>
                  <div>
                    <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"1rem", marginBottom:6 }}>{p.title}</h3>
                    <p style={{ fontFamily:"var(--font-body)", fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.6 }}>{p.desc}</p>
                  </div>
                </div>
              </GlassCard>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── SOLUTION ── */}
      <section style={{ padding:"80px 24px", background:"rgba(0,212,200,0.02)", borderTop:"1px solid var(--border)", borderBottom:"1px solid var(--border)" }}>
        <div style={{ maxWidth:1200, margin:"0 auto" }}>
          <FadeUp>
            <div style={{ textAlign:"center", marginBottom:60 }}>
              <Tag>Our Solution</Tag>
              <h2 style={{ fontFamily:"var(--font-head)", fontSize:"2.6rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
                How <span className="gradient-text">MindSense</span> Works
              </h2>
            </div>
          </FadeUp>
          <div className="responsive-grid responsive-grid--4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:20 }}>
            {solutions.map((s, i) => (
              <FadeUp key={s.title} delay={i * 0.12}>
                <GlassCard style={{ textAlign:"center" }}>
                  <div style={{ fontSize:"2.2rem", marginBottom:12 }}>{s.icon}</div>
                  <div style={{ width:32, height:2, background:"var(--cyan)", margin:"0 auto 12px" }} />
                  <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", marginBottom:8 }}>{s.title}</h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", color:"var(--muted)", lineHeight:1.6 }}>{s.desc}</p>
                </GlassCard>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ── BENEFITS + CTA ── */}
      <section className="responsive-grid responsive-grid--cta" style={{ padding:"100px 24px", maxWidth:1200, margin:"0 auto", display:"grid", gridTemplateColumns:"1fr 1fr", gap:80, alignItems:"center" }}>
        <FadeUp>
          <Tag>Key Benefits</Tag>
          <h2 style={{ fontFamily:"var(--font-head)", fontSize:"2.4rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8, marginBottom:32 }}>
            Why MindSense<br />is Effective
          </h2>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {benefits.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity:0, x:-20 }}
                whileInView={{ opacity:1, x:0 }}
                viewport={{ once:true }}
                transition={{ delay:i * 0.1 }}
                style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 16px", background:"rgba(255,255,255,0.02)", borderRadius:10, border:"1px solid rgba(255,255,255,0.05)" }}
              >
                <span style={{ fontSize:"1.3rem" }}>{b.icon}</span>
                <span style={{ fontFamily:"var(--font-body)", fontSize:"0.95rem", fontWeight:500 }}>{b.label}</span>
                <div style={{ marginLeft:"auto", width:8, height:8, borderRadius:"50%", background:b.color }} />
              </motion.div>
            ))}
          </div>
        </FadeUp>

        <FadeUp delay={0.2}>
          <GlassCard className="glow-cyan" style={{ textAlign:"center", padding:"48px 32px" }}>
            <div style={{ fontSize:"3rem", marginBottom:16 }}>🚀</div>
            <h3 style={{ fontFamily:"var(--font-head)", fontSize:"1.6rem", fontWeight:800, marginBottom:12 }}>
              Ready to See It in Action?
            </h3>
            <p style={{ fontFamily:"var(--font-body)", color:"var(--muted)", marginBottom:28, lineHeight:1.6 }}>
              Explore the live dashboard, AI engine, and real-time alert system — all powered by privacy-preserving intelligence.
            </p>
            <div style={{ display:"flex", gap:12, justifyContent:"center", flexWrap:"wrap" }}>
              <button className="btn-primary" onClick={() => setPage("dashboard")}>View Dashboard</button>
              <button className="btn-ghost"   onClick={() => setPage("ai-engine")}>AI Engine</button>
            </div>
          </GlassCard>
        </FadeUp>
      </section>

    </div>
  );
}
