import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

const alerts = [
  { id:"ALT-001", type:"High Stress Indicator",        desc:"Risk score exceeded 75 threshold. Sustained high-stress behavioral patterns detected.", severity:"HIGH",   time:"2 min ago", student:"STU-03X", status:"ACTIVE"    },
  { id:"ALT-002", type:"Emotional Deviation Detected", desc:"Significant shift from baseline emotional indicators over 72-hour window.",              severity:"MEDIUM", time:"18 min ago",student:"STU-07X", status:"ACTIVE"    },
  { id:"ALT-003", type:"Sudden Activity Drop",         desc:"Activity frequency dropped 68% below weekly average. Potential disengagement.",          severity:"MEDIUM", time:"1h ago",    student:"STU-12X", status:"REVIEWING" },
  { id:"ALT-004", type:"Late-Night Usage Pattern",     desc:"Screen activity detected between 2–5 AM for 4 consecutive nights.",                      severity:"LOW",    time:"3h ago",    student:"STU-19X", status:"RESOLVED"  },
  { id:"ALT-005", type:"Prolonged Social Isolation",   desc:"Zero peer-interaction signals detected across 5-day span.",                              severity:"HIGH",   time:"6h ago",    student:"STU-02X", status:"ESCALATED" },
];

const sc = (s) => ({ HIGH:"var(--red)", MEDIUM:"var(--yellow)", LOW:"var(--green)" }[s]);
const stc = (s) => ({ ACTIVE:"var(--red)", REVIEWING:"var(--yellow)", RESOLVED:"var(--green)", ESCALATED:"var(--violet)" }[s]);

export default function AlertsPage() {
  return (
    <div className="page-container" style={{ padding:"120px 24px 80px", maxWidth:1200, margin:"0 auto" }}>

      <FadeUp>
        <div className="mobile-stack alert-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40 }}>
          <div>
            <Tag>Intelligent Alert System</Tag>
            <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.6rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
              Smart <span className="gradient-text">Alerts</span>
            </h1>
            <p style={{ color:"var(--muted)", marginTop:6, fontFamily:"var(--font-body)" }}>AI-generated alerts · No raw data transmitted · Privacy-preserved</p>
          </div>
          <div className="glass-card" style={{ padding:"12px 20px", display:"flex", gap:16 }}>
            {[["HIGH","var(--red)","2"],["MEDIUM","var(--yellow)","2"],["LOW","var(--green)","1"]].map(([l,c,n]) => (
              <div key={l} style={{ textAlign:"center" }}>
                <div style={{ fontFamily:"var(--font-head)", fontSize:"1.3rem", fontWeight:800, color:c }}>{n}</div>
                <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)" }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </FadeUp>

      {/* How it works */}
      <FadeUp delay={0.1}>
        <div className="responsive-grid responsive-grid--4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:32 }}>
          {[
            { icon:"👁",  label:"Continuous Monitoring", desc:"AI monitors behavioral signals 24/7" },
            { icon:"🔍", label:"Pattern Analysis",       desc:"Detects abnormal behavioral changes" },
            { icon:"⚡", label:"Auto Generation",        desc:"Alerts created without human review" },
            { icon:"🔔", label:"Secure Dispatch",        desc:"Counselors notified — no raw data"   },
          ].map((item) => (
            <GlassCard key={item.label} style={{ textAlign:"center", padding:"16px" }}>
              <div style={{ fontSize:"1.5rem", marginBottom:8 }}>{item.icon}</div>
              <div style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"0.85rem", marginBottom:4 }}>{item.label}</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"0.75rem", color:"var(--muted)" }}>{item.desc}</div>
            </GlassCard>
          ))}
        </div>
      </FadeUp>

      {/* Alert feed */}
      <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
        {alerts.map((alert, i) => (
          <FadeUp key={alert.id} delay={i * 0.08}>
            <motion.div
              className="glass-card"
              style={{ padding:"20px 24px", borderLeft:`3px solid ${sc(alert.severity)}`, ...(alert.severity==="HIGH"&&alert.status==="ACTIVE"?{boxShadow:"0 0 20px rgba(239,68,68,0.12)"}:{}) }}
              whileHover={{ x:4 }}
              transition={{ duration:0.2 }}
            >
              <div className="mobile-stack alert-row" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
                <div style={{ flex:1 }}>
                  <div style={{ display:"flex", gap:10, alignItems:"center", marginBottom:6 }}>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", fontWeight:600, padding:"2px 8px", borderRadius:4, background:`${sc(alert.severity)}18`, color:sc(alert.severity), border:`1px solid ${sc(alert.severity)}44` }}>{alert.severity}</span>
                    <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>{alert.id}</span>
                    {alert.severity==="HIGH"&&alert.status==="ACTIVE"&&(
                      <motion.span animate={{ opacity:[1,0,1] }} transition={{ repeat:Infinity, duration:1 }} style={{ width:6, height:6, borderRadius:"50%", background:"var(--red)", display:"inline-block" }} />
                    )}
                  </div>
                  <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, fontSize:"1rem", marginBottom:4 }}>{alert.type}</h3>
                  <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--muted)" }}>{alert.desc}</p>
                </div>
                <div style={{ textAlign:"right", flexShrink:0, marginLeft:24 }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", padding:"3px 10px", borderRadius:4, background:`${stc(alert.status)}18`, color:stc(alert.status), border:`1px solid ${stc(alert.status)}44`, marginBottom:6 }}>{alert.status}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>{alert.time}</div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", marginTop:2 }}>Student: {alert.student}</div>
                </div>
              </div>
            </motion.div>
          </FadeUp>
        ))}
      </div>

    </div>
  );
}
