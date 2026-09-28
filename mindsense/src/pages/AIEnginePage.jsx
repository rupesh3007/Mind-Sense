import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

const steps = [
  { icon:"📥", title:"Data Collection",      desc:"Anonymized behavioral signals collected — app usage, interaction frequency, session timing. No personal content.", color:"#00d4c8" },
  { icon:"🔐", title:"Encryption Layer",      desc:"All data is AES-256 encrypted before transmission. Identity stripped at collection point.", color:"#00a8ff" },
  { icon:"🧠", title:"NLP Sentiment Analysis",desc:"Natural language processing models analyze communication patterns to infer emotional states.", color:"#7c3aed" },
  { icon:"📐", title:"Behavioral Modeling",   desc:"LSTM-based temporal models track deviation from baseline behavioral norms over time.", color:"#f59e0b" },
  { icon:"📊", title:"Deviation Detection",   desc:"Statistical anomaly detection flags significant departures from established behavioral baselines.", color:"#10b981" },
  { icon:"⚠️", title:"Risk Scoring Engine",   desc:"Proprietary scoring algorithm converts multi-modal signals into a 0–100 composite risk index.", color:"#ef4444" },
  { icon:"🔔", title:"Alert Generation",      desc:"AI-generated alerts dispatched to counselors containing only risk scores — never raw data.", color:"#00d4c8" },
];

const techPills = [
  "Python 3.11","TensorFlow 2.x","LSTM Networks","NLP Transformers",
  "Federated Learning","AES-256","WebSockets","React","FastAPI","PostgreSQL",
];

export default function AIEnginePage() {
  return (
    <div style={{ padding:"120px 24px 80px", maxWidth:1200, margin:"0 auto" }}>

      <FadeUp>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <Tag>AI Technology</Tag>
          <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.8rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
            The AI Behind <span className="gradient-text">MindSense</span>
          </h1>
          <p style={{ color:"var(--muted)", maxWidth:500, margin:"12px auto 0", fontFamily:"var(--font-body)", lineHeight:1.6 }}>
            A multi-layer AI pipeline that transforms raw behavioral signals into actionable wellbeing insights — with zero privacy compromise.
          </p>
        </div>
      </FadeUp>

      {/* Pipeline */}
      <div style={{ position:"relative" }}>
        {steps.map((step, i) => (
          <FadeUp key={step.title} delay={i * 0.1}>
            <div style={{ display:"flex", gap:24, marginBottom:16, alignItems:"stretch" }}>
              {/* Icon + connector */}
              <div style={{ display:"flex", flexDirection:"column", alignItems:"center", flexShrink:0 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:`${step.color}18`, border:`2px solid ${step.color}66`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.2rem", flexShrink:0 }}>
                  {step.icon}
                </div>
                {i < steps.length - 1 && (
                  <div style={{ width:1, flex:1, background:`linear-gradient(${step.color}, ${steps[i+1].color})`, opacity:0.3, minHeight:24, marginTop:4 }} />
                )}
              </div>
              {/* Content */}
              <GlassCard style={{ flex:1, padding:"16px 20px" }} hover>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:step.color, letterSpacing:"0.15em" }}>STEP {String(i+1).padStart(2,"0")}</span>
                <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"1rem", margin:"4px 0" }}>{step.title}</h3>
                <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--muted)", lineHeight:1.6 }}>{step.desc}</p>
              </GlassCard>
            </div>
          </FadeUp>
        ))}
      </div>

      {/* Tech Stack */}
      <FadeUp delay={0.5}>
        <div style={{ marginTop:60, textAlign:"center" }}>
          <Tag>Tech Stack</Tag>
          <div style={{ display:"flex", flexWrap:"wrap", gap:10, justifyContent:"center", marginTop:20 }}>
            {techPills.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity:0, scale:0.8 }}
                whileInView={{ opacity:1, scale:1 }}
                viewport={{ once:true }}
                transition={{ delay:i * 0.05 }}
                whileHover={{ scale:1.05 }}
                style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", padding:"6px 14px", borderRadius:6, background:"rgba(0,212,200,0.06)", border:"1px solid rgba(0,212,200,0.2)", color:"var(--cyan)", cursor:"default" }}
              >{tech}</motion.span>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* Federated Learning */}
      <FadeUp delay={0.6}>
        <GlassCard className="glow-cyan" style={{ marginTop:40, padding:"32px", display:"grid", gridTemplateColumns:"auto 1fr", gap:24, alignItems:"center" }}>
          <div style={{ fontSize:"3rem" }}>🌐</div>
          <div>
            <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"1.2rem", marginBottom:6 }}>Federated Learning Architecture</h3>
            <p style={{ fontFamily:"var(--font-body)", fontSize:"0.875rem", color:"var(--muted)", lineHeight:1.6 }}>
              MindSense uses a federated learning paradigm — models train locally on-device and only aggregate weight updates are shared with the central server. Raw behavioral data never leaves the student's device. This approach aligns with GDPR, DPDP Act 2023, and modern privacy standards.
            </p>
          </div>
        </GlassCard>
      </FadeUp>

    </div>
  );
}
