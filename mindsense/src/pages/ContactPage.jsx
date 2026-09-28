import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";

export default function ContactPage() {
  const [form, setForm] = useState({ name:"", email:"", role:"student", message:"" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const inputStyle = {
    width:"100%", padding:"10px 14px",
    background:"rgba(255,255,255,0.03)",
    border:"1px solid rgba(255,255,255,0.08)",
    borderRadius:8, color:"var(--text)",
    fontFamily:"var(--font-body)", fontSize:"0.875rem", outline:"none",
  };

  return (
    <div className="page-container" style={{ padding:"120px 24px 80px", maxWidth:1100, margin:"0 auto" }}>

      <FadeUp>
        <div style={{ textAlign:"center", marginBottom:60 }}>
          <Tag>Get in Touch</Tag>
          <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.8rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
            Contact <span className="gradient-text">MindSense</span>
          </h1>
        </div>
      </FadeUp>

      <div className="responsive-grid responsive-grid--contact" style={{ display:"grid", gridTemplateColumns:"1fr 1.4fr", gap:40 }}>

        {/* Info */}
        <FadeUp>
          <div>
            <GlassCard style={{ marginBottom:20 }}>
              <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", marginBottom:12 }}>PROJECT INFO</div>
              <h3 style={{ fontFamily:"var(--font-head)", fontWeight:700, marginBottom:6 }}>MindSense</h3>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--muted)", marginBottom:12 }}>Hackathon | 2025 · AI &amp; ML Track</p>
              <p style={{ fontFamily:"var(--font-body)", fontSize:"0.82rem", color:"var(--muted)", lineHeight:1.6 }}>
                AI-Powered Behavioral Intelligence System for Student Mental Health — Built by passionate engineers committed to ethical AI.
              </p>
            </GlassCard>
            {[
              { icon:"📧", label:"Email",       val:"team@mindsense.ai"      },
              { icon:"🏫", label:"Institution", val:"Hackathon | 2025 Submission" },
              { icon:"🔒", label:"Privacy",     val:"DPDP Act Compliant"      },
            ].map((c) => (
              <div key={c.label} style={{ display:"flex", gap:14, alignItems:"center", padding:"12px 0", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ fontSize:"1.2rem" }}>{c.icon}</span>
                <div>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>{c.label}</div>
                  <div style={{ fontFamily:"var(--font-body)", fontSize:"0.85rem" }}>{c.val}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeUp>

        {/* Form */}
        <FadeUp delay={0.2}>
          <GlassCard hover={false} style={{ padding:"32px" }}>
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div key="success" initial={{ opacity:0, scale:0.9 }} animate={{ opacity:1, scale:1 }} exit={{ opacity:0 }} style={{ textAlign:"center", padding:"40px 0" }}>
                  <div style={{ fontSize:"3rem", marginBottom:16 }}>✅</div>
                  <h3 style={{ fontFamily:"var(--font-head)", fontSize:"1.3rem", fontWeight:700, marginBottom:8, color:"var(--green)" }}>Message Sent!</h3>
                  <p style={{ color:"var(--muted)", fontFamily:"var(--font-body)" }}>We'll get back to you within 24 hours.</p>
                </motion.div>
              ) : (
                <motion.div key="form" initial={{ opacity:0 }} animate={{ opacity:1 }}>
                  <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", marginBottom:20 }}>SEND A MESSAGE</div>
                  <form onSubmit={handleSubmit} style={{ display:"flex", flexDirection:"column", gap:16 }}>
                    {[
                      { key:"name",  label:"Full Name",      type:"text",  placeholder:"Your name"          },
                      { key:"email", label:"Email Address",  type:"email", placeholder:"your@email.com"     },
                    ].map((f) => (
                      <div key={f.key}>
                        <label style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>{f.label.toUpperCase()}</label>
                        <input type={f.type} placeholder={f.placeholder} value={form[f.key]} onChange={(e) => setForm({ ...form, [f.key]:e.target.value })}
                          style={inputStyle}
                          onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,200,0.4)")}
                          onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                        />
                      </div>
                    ))}
                    <div>
                      <label style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>ROLE</label>
                      <select value={form.role} onChange={(e) => setForm({ ...form, role:e.target.value })}
                        style={{ ...inputStyle, background:"var(--surface)" }}
                      >
                        <option value="student">Student</option>
                        <option value="counselor">Counselor</option>
                        <option value="admin">Institution Admin</option>
                        <option value="judge">SIH Judge</option>
                        <option value="other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.1em", display:"block", marginBottom:6 }}>MESSAGE</label>
                      <textarea placeholder="Your message..." rows={4} value={form.message} onChange={(e) => setForm({ ...form, message:e.target.value })}
                        style={{ ...inputStyle, resize:"vertical" }}
                        onFocus={(e) => (e.target.style.borderColor = "rgba(0,212,200,0.4)")}
                        onBlur={(e)  => (e.target.style.borderColor = "rgba(255,255,255,0.08)")}
                      />
                    </div>
                    <button type="submit" className="btn-primary" style={{ marginTop:4 }}>Send Message →</button>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </GlassCard>
        </FadeUp>

      </div>
    </div>
  );
}
