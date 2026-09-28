import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

const pillars = [
  { icon:"🔐", title:"AES-256 Encryption",    desc:"Military-grade end-to-end encryption on all data streams. Keys never leave the device." },
  { icon:"👤", title:"Anonymous Processing",   desc:"Identity is stripped at the point of collection. All analysis runs on tokenized identifiers." },
  { icon:"🚫", title:"Zero Human Access",      desc:"No administrator, developer, or counselor can access raw behavioral data. Ever." },
  { icon:"🧠", title:"AI-Only Analysis",       desc:"Pattern analysis is exclusively machine-executed. Humans only receive processed, aggregate insights." },
  { icon:"🌐", title:"Federated Architecture", desc:"Models train locally. Only encrypted weight updates leave the device — never raw data." },
  { icon:"📜", title:"DPDP Compliant",         desc:"Built in full compliance with India's Digital Personal Data Protection Act, 2023." },
];

const flowNodes = [
  { label:"Student Device",   sublabel:"Data Source",  icon:"📱" },
  { label:"Local Encrypt",    sublabel:"AES-256",       icon:"🔐" },
  { label:"Anonymous Token",  sublabel:"ID Stripped",   icon:"👤" },
  { label:"AI Analysis",      sublabel:"On-Server",     icon:"🧠" },
  { label:"Risk Score Only",  sublabel:"Output",        icon:"📊" },
  { label:"Counselor Alert",  sublabel:"No Raw Data",   icon:"🔔" },
];

export default function PrivacyPage() {
  return (
    <div className="page-container" style={{ padding:"120px 24px 80px", maxWidth:1100, margin:"0 auto" }}>

      <FadeUp>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <Tag>Privacy &amp; Security</Tag>
          <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.8rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
            Privacy <span className="gradient-text">First</span>
          </h1>
          <p style={{ color:"var(--muted)", maxWidth:500, margin:"12px auto 0", fontFamily:"var(--font-body)", lineHeight:1.6 }}>
            MindSense was architected with privacy as a first principle — not an afterthought.
          </p>
          {/* Bold statement */}
          <motion.div
            initial={{ opacity:0, scale:0.95 }}
            whileInView={{ opacity:1, scale:1 }}
            viewport={{ once:true }}
            transition={{ duration:0.8, delay:0.2 }}
            style={{ margin:"32px auto 0", maxWidth:600, padding:"24px 32px", background:"linear-gradient(135deg,rgba(0,212,200,0.08),rgba(124,58,237,0.08))", border:"1px solid rgba(0,212,200,0.25)", borderRadius:16 }}
          >
            <p style={{ fontFamily:"var(--font-head)", fontSize:"1.5rem", fontWeight:800, background:"linear-gradient(135deg,var(--cyan),var(--violet))", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text", lineHeight:1.3 }}>
              "We analyze patterns,<br />not people."
            </p>
          </motion.div>
        </div>
      </FadeUp>

      {/* Pillars grid */}
      <div className="responsive-grid responsive-grid--3" style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:20 }}>
        {pillars.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1}>
            <GlassCard style={{ textAlign:"center" }}>
              <div style={{ fontSize:"2.2rem", marginBottom:12 }}>{p.icon}</div>
              <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.95rem", marginBottom:8 }}>{p.title}</h3>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", color:"var(--muted)", lineHeight:1.6 }}>{p.desc}</p>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      {/* Data flow diagram */}
      <FadeUp delay={0.4}>
        <div style={{ marginTop:48 }}>
          <GlassCard hover={false} style={{ padding:"32px" }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.15em", marginBottom:24, textAlign:"center" }}>PRIVACY FLOW ARCHITECTURE</div>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:0, flexWrap:"wrap" }}>
              {flowNodes.map((node, i, arr) => (
                <div key={node.label} style={{ display:"flex", alignItems:"center" }}>
                  <div style={{ textAlign:"center", padding:"8px 12px" }}>
                    <div style={{ width:52, height:52, borderRadius:12, background:"rgba(0,212,200,0.08)", border:"1px solid rgba(0,212,200,0.2)", display:"flex", alignItems:"center", justifyContent:"center", fontSize:"1.3rem", margin:"0 auto 6px" }}>{node.icon}</div>
                    <div style={{ fontFamily:"var(--font-head)", fontSize:"0.7rem", fontWeight:700, marginBottom:2 }}>{node.label}</div>
                    <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)" }}>{node.sublabel}</div>
                  </div>
                  {i < arr.length - 1 && (
                    <motion.div
                      initial={{ scaleX:0 }}
                      whileInView={{ scaleX:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:i * 0.15 }}
                      style={{ width:28, height:1, background:"linear-gradient(90deg,var(--cyan),var(--violet))", transformOrigin:"left", opacity:0.6 }}
                    />
                  )}
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </FadeUp>

    </div>
  );
}
