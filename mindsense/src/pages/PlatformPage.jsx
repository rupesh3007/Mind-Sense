import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

export default function PlatformPage() {
  const [stress, setStress] = useState(42);
  const [mood, setMood] = useState(1);

  useEffect(() => {
    const t = setInterval(() => {
      setStress((prev) => Math.max(20, Math.min(80, prev + (Math.random() - 0.48) * 8)));
      setMood(Math.floor(Math.random() * 3));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const moods      = ["😊", "😐", "😟"];
  const moodColors = ["var(--green)", "var(--yellow)", "var(--red)"];
  const moodLabels = ["Positive", "Neutral", "Stressed"];
  const risk       = stress < 35 ? "LOW" : stress < 60 ? "MEDIUM" : "HIGH";
  const riskColor  = risk === "LOW" ? "var(--green)" : risk === "MEDIUM" ? "var(--yellow)" : "var(--red)";

  const aiSuggestions = [
    "Take a 10-minute mindfulness break 🧘",
    "Reduce late-night screen usage 🌙",
    "Engage in 20 minutes of physical activity 🏃",
    "Talk to a peer or counselor if stress continues 💬",
  ];

  const screenTimeData = [3.2, 5.8, 4.1, 6.9, 7.2, 5.3, 4.8];
  const days           = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  return (
    <div style={{ padding: "120px 24px 80px", maxWidth: 1300, margin: "0 auto" }}>
      <FadeUp>
        <Tag>Student Wellbeing Platform</Tag>
        <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.8rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8, marginBottom:8 }}>
          Behavioral Intelligence <span className="gradient-text">Dashboard</span>
        </h1>
        <p style={{ color:"var(--muted)", marginBottom:40, fontFamily:"var(--font-body)" }}>
          Real-time wellbeing monitoring — Student ID: STU-20241203 · Last sync: 2 min ago
        </p>
      </FadeUp>

      {/* Top 3 cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:20, marginBottom:24 }}>

        {/* Emotional Status */}
        <FadeUp>
          <GlassCard hover={false}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:16 }}>EMOTIONAL STATUS</div>
            <div style={{ textAlign:"center", padding:"20px 0" }}>
              <motion.div
                key={mood}
                initial={{ scale:0.5, opacity:0 }}
                animate={{ scale:1, opacity:1 }}
                transition={{ type:"spring", stiffness:200 }}
                style={{ fontSize:"4rem", marginBottom:8 }}
              >{moods[mood]}</motion.div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"1.1rem", fontWeight:700, color:moodColors[mood] }}>{moodLabels[mood]}</div>
            </div>
            <div style={{ marginTop:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--muted)" }}>Stress Level</span>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:moodColors[mood] }}>{Math.round(stress)}%</span>
              </div>
              <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:3, height:6, overflow:"hidden" }}>
                <motion.div animate={{ width:`${stress}%` }} transition={{ duration:1 }} style={{ height:"100%", borderRadius:3, background:`linear-gradient(90deg, var(--green), ${riskColor})` }} />
              </div>
            </div>
          </GlassCard>
        </FadeUp>

        {/* Digital Behavior */}
        <FadeUp delay={0.1}>
          <GlassCard hover={false}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:16 }}>DIGITAL BEHAVIOR</div>
            {[
              { label:"Screen Time Today",  value:"6h 24m",  icon:"📱", bar:72 },
              { label:"Activity Frequency", value:"High",    icon:"🔥", bar:85 },
              { label:"Interaction Level",  value:"Moderate",icon:"💬", bar:54 },
            ].map((item, i) => (
              <div key={item.label} style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:5 }}>
                  <span style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", color:"var(--muted)" }}>{item.icon} {item.label}</span>
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", fontWeight:500 }}>{item.value}</span>
                </div>
                <div style={{ background:"rgba(255,255,255,0.05)", borderRadius:3, height:4 }}>
                  <motion.div
                    initial={{ width:0 }}
                    whileInView={{ width:`${item.bar}%` }}
                    transition={{ delay:i * 0.2, duration:1 }}
                    style={{ height:"100%", borderRadius:3, background:"linear-gradient(90deg, var(--cyan), var(--cyan2))" }}
                  />
                </div>
              </div>
            ))}
          </GlassCard>
        </FadeUp>

        {/* Risk Score */}
        <FadeUp delay={0.2}>
          <GlassCard hover={false} style={{ borderColor:`${riskColor}44` }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:16 }}>RISK SCORE</div>
            <div style={{ textAlign:"center", padding:"16px 0" }}>
              <div style={{ position:"relative", width:120, height:120, margin:"0 auto 12px" }}>
                <svg viewBox="0 0 120 120" style={{ transform:"rotate(-90deg)" }}>
                  <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="10" />
                  <motion.circle
                    cx="60" cy="60" r="48" fill="none"
                    stroke={riskColor} strokeWidth="10" strokeLinecap="round"
                    strokeDasharray={`${2 * Math.PI * 48}`}
                    animate={{ strokeDashoffset:`${2 * Math.PI * 48 * (1 - stress / 100)}` }}
                    transition={{ duration:1.5 }}
                  />
                </svg>
                <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
                  <div style={{ fontFamily:"var(--font-head)", fontSize:"1.6rem", fontWeight:800, color:riskColor }}>{Math.round(stress)}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)" }}>/100</div>
                </div>
              </div>
              <motion.div
                key={risk}
                animate={{ scale:[1.2,1] }}
                transition={{ duration:0.3 }}
                style={{ display:"inline-block", fontFamily:"var(--font-head)", fontWeight:800, fontSize:"1.1rem", color:riskColor, padding:"6px 20px", borderRadius:6, background:`${riskColor}18`, border:`1px solid ${riskColor}44`, letterSpacing:"0.1em" }}
              >{risk} RISK</motion.div>
            </div>
          </GlassCard>
        </FadeUp>
      </div>

      {/* Bottom 2 cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>

        {/* Screen Time Chart */}
        <FadeUp delay={0.3}>
          <GlassCard hover={false}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:20 }}>WEEKLY SCREEN TIME (hrs)</div>
            <div style={{ display:"flex", gap:10, alignItems:"flex-end", height:120 }}>
              {screenTimeData.map((h, i) => (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:6 }}>
                  <motion.div
                    initial={{ height:0 }}
                    whileInView={{ height:`${(h / 8) * 100}px` }}
                    transition={{ delay:i * 0.07, duration:0.8 }}
                    className="chart-bar"
                    style={{ width:"100%", background: h > 6 ? "linear-gradient(180deg, var(--red), rgba(239,68,68,0.3))" : "linear-gradient(180deg, var(--cyan), rgba(0,212,200,0.3))" }}
                  />
                  <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>{days[i]}</span>
                </div>
              ))}
            </div>
          </GlassCard>
        </FadeUp>

        {/* AI Suggestions */}
        <FadeUp delay={0.4}>
          <GlassCard hover={false}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:16 }}>💡 AI SUGGESTIONS</div>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {aiSuggestions.map((s, i) => (
                <motion.div
                  key={s}
                  initial={{ opacity:0, x:20 }}
                  whileInView={{ opacity:1, x:0 }}
                  viewport={{ once:true }}
                  transition={{ delay:i * 0.1 }}
                  style={{ padding:"10px 14px", background:"rgba(0,212,200,0.05)", border:"1px solid rgba(0,212,200,0.12)", borderRadius:8, fontFamily:"var(--font-body)", fontSize:"0.82rem" }}
                >{s}</motion.div>
              ))}
            </div>
          </GlassCard>
        </FadeUp>
      </div>
    </div>
  );
}
