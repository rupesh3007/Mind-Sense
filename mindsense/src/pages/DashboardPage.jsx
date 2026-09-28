import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { Tag, FadeUp, GlassCard } from "../components/UI";
import { createItem, fetchItems, deleteItem, API_BASE_URL } from "../api/itemsApi";

const students = [
  { id:"STU-001", risk:"LOW",    stress:28, emotion:"😊", screenTime:"4h 12m" },
  { id:"STU-002", risk:"MEDIUM", stress:55, emotion:"😐", screenTime:"7h 45m" },
  { id:"STU-003", risk:"HIGH",   stress:78, emotion:"😟", screenTime:"9h 03m" },
  { id:"STU-004", risk:"LOW",    stress:22, emotion:"😊", screenTime:"3h 30m" },
  { id:"STU-005", risk:"MEDIUM", stress:61, emotion:"😐", screenTime:"6h 58m" },
];

const rc = (r) => r === "LOW" ? "var(--green)" : r === "MEDIUM" ? "var(--yellow)" : "var(--red)";

export default function DashboardPage() {
  const [items, setItems] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(true);
  const [itemsError, setItemsError] = useState("");
  const [form, setForm] = useState({ title: "", amount: "", category: "" });
  const [saving, setSaving] = useState(false);

  const loadItems = useCallback(async () => {
    setItemsError("");
    setItemsLoading(true);
    try {
      const data = await fetchItems();
      setItems(data);
    } catch (e) {
      setItemsError(e.message || "Could not load items");
      setItems([]);
    } finally {
      setItemsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadItems();
  }, [loadItems]);

  async function handleAddItem(e) {
    e.preventDefault();
    setItemsError("");
    const amountNum = Number(form.amount);
    if (!form.title.trim() || !form.category.trim() || Number.isNaN(amountNum)) {
      setItemsError("Fill title, a valid amount, and category.");
      return;
    }
    setSaving(true);
    try {
      await createItem({
        title: form.title.trim(),
        amount: amountNum,
        category: form.category.trim(),
      });
      setForm({ title: "", amount: "", category: "" });
      await loadItems();
    } catch (err) {
      setItemsError(err.message || "Could not save item");
    } finally {
      setSaving(false);
    }
  }

  async function handleDeleteItem(id) {
    setItemsError("");
    try {
      await deleteItem(id);
      await loadItems();
    } catch (err) {
      setItemsError(err.message || "Could not delete item");
    }
  }

  return (
    <div className="page-container" style={{ padding:"120px 24px 80px", maxWidth:1300, margin:"0 auto" }}>

      <FadeUp>
        <div className="mobile-stack dashboard-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", marginBottom:40 }}>
          <div>
            <Tag>Live Analytics</Tag>
            <h1 style={{ fontFamily:"var(--font-head)", fontSize:"2.6rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
              Institution <span className="gradient-text">Dashboard</span>
            </h1>
            <p style={{ color:"var(--muted)", marginTop:6, fontFamily:"var(--font-body)" }}>Aggregated insights · No personal data displayed</p>
          </div>
          <div style={{ display:"flex", gap:8, alignItems:"center" }}>
            <div style={{ width:8, height:8, borderRadius:"50%", background:"var(--green)", boxShadow:"0 0 8px var(--green)" }} />
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--green)" }}>LIVE</span>
          </div>
        </div>
      </FadeUp>

      {/* Summary cards */}
      <div className="responsive-grid responsive-grid--4" style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:16, marginBottom:28 }}>
        {[
          { label:"Total Monitored", value:"2,847", icon:"👥", change:"+12 today",         color:"var(--cyan)"   },
          { label:"High Risk",       value:"43",    icon:"🔴", change:"↑ 3 from yesterday", color:"var(--red)"    },
          { label:"Medium Risk",     value:"312",   icon:"🟡", change:"→ Stable",            color:"var(--yellow)" },
          { label:"Alerts Sent",     value:"18",    icon:"🔔", change:"Today",               color:"var(--violet)" },
        ].map((card, i) => (
          <FadeUp key={card.label} delay={i * 0.1}>
            <GlassCard>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
                <span style={{ fontSize:"1.3rem" }}>{card.icon}</span>
                <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>{card.change}</span>
              </div>
              <div style={{ fontFamily:"var(--font-head)", fontSize:"2rem", fontWeight:800, color:card.color }}>{card.value}</div>
              <div style={{ fontFamily:"var(--font-body)", fontSize:"0.8rem", color:"var(--muted)", marginTop:2 }}>{card.label}</div>
            </GlassCard>
          </FadeUp>
        ))}
      </div>

      {/* Table */}
      <FadeUp delay={0.4}>
        <GlassCard hover={false} style={{ padding:0, overflow:"hidden" }}>
          <div style={{ padding:"20px 24px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--cyan)", letterSpacing:"0.15em" }}>STUDENT RISK OVERVIEW</span>
            <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)" }}>IDs anonymized · Data encrypted</span>
          </div>
          <div style={{ overflowX:"auto" }}>
            <table style={{ width:"100%", borderCollapse:"collapse" }}>
              <thead>
                <tr style={{ borderBottom:"1px solid var(--border)" }}>
                  {["Student ID","Emotion","Stress %","Screen Time","Risk Level","Action"].map((h) => (
                    <th key={h} style={{ padding:"12px 24px", textAlign:"left", fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.1em", fontWeight:500 }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {students.map((s, i) => (
                  <motion.tr
                    key={s.id}
                    initial={{ opacity:0, y:10 }}
                    whileInView={{ opacity:1, y:0 }}
                    viewport={{ once:true }}
                    transition={{ delay:i * 0.08 }}
                    style={{ borderBottom:"1px solid rgba(255,255,255,0.03)" }}
                    whileHover={{ background:"rgba(0,212,200,0.03)" }}
                  >
                    <td style={{ padding:"14px 24px", fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"var(--cyan)" }}>{s.id}</td>
                    <td style={{ padding:"14px 24px", fontSize:"1.2rem" }}>{s.emotion}</td>
                    <td style={{ padding:"14px 24px" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <div style={{ width:60, height:4, background:"rgba(255,255,255,0.05)", borderRadius:2, overflow:"hidden" }}>
                          <motion.div
                            initial={{ width:0 }}
                            whileInView={{ width:`${s.stress}%` }}
                            transition={{ delay:i*0.1, duration:0.8 }}
                            style={{ height:"100%", borderRadius:2, background:rc(s.risk) }}
                          />
                        </div>
                        <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.75rem", color:rc(s.risk) }}>{s.stress}%</span>
                      </div>
                    </td>
                    <td style={{ padding:"14px 24px", fontFamily:"var(--font-mono)", fontSize:"0.8rem" }}>{s.screenTime}</td>
                    <td style={{ padding:"14px 24px" }}>
                      <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", padding:"4px 10px", borderRadius:4, fontWeight:600, background:`${rc(s.risk)}18`, color:rc(s.risk), border:`1px solid ${rc(s.risk)}44` }}>{s.risk}</span>
                    </td>
                    <td style={{ padding:"14px 24px" }}>
                      <button style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", padding:"4px 12px", background:"transparent", border:"1px solid rgba(0,212,200,0.2)", borderRadius:4, color:"var(--cyan)", cursor:"pointer" }}>
                        {s.risk === "HIGH" ? "Alert Sent ✓" : "View Details"}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>
      </FadeUp>

      {/* API-backed records: POST (add), GET (list), DELETE — see ../api/itemsApi.js */}
      <FadeUp delay={0.5}>
        <div style={{ marginTop: 48 }}>
          <div style={{ marginBottom: 20 }}>
            <Tag>API data</Tag>
            <h2 style={{ fontFamily:"var(--font-head)", fontSize:"1.8rem", fontWeight:800, letterSpacing:"-0.02em", marginTop:8 }}>
              Records from <span className="gradient-text">backend</span>
            </h2>
            <p style={{ color:"var(--muted)", marginTop:6, fontFamily:"var(--font-body)", fontSize:"0.85rem" }}>
              Connected to Express at <span style={{ fontFamily:"var(--font-mono)", color:"var(--cyan)" }}>{API_BASE_URL}</span>
            </p>
            <p style={{ color:"var(--muted)", marginTop:10, fontFamily:"var(--font-body)", fontSize:"0.78rem", lineHeight:1.6, maxWidth:640 }}>
              If the red error box appears below: the page still loads, but the API is unreachable. Follow the checklist in the message (dev server URL, backend <code style={{ fontFamily:"var(--font-mono)", fontSize:"0.85em" }}>npm start</code>, MongoDB, then test <code style={{ fontFamily:"var(--font-mono)", fontSize:"0.85em" }}>{API_BASE_URL}/health</code>).
            </p>
          </div>

          <GlassCard hover={false} style={{ marginBottom: 20 }}>
            <div style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--cyan)", letterSpacing:"0.12em", marginBottom: 12 }}>POST /api/items</div>
            <form className="responsive-grid responsive-grid--form" onSubmit={handleAddItem} style={{ display:"grid", gridTemplateColumns:"1fr 120px 1fr auto", gap:12, alignItems:"end" }}>
              <div>
                <label style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)", marginBottom:4 }}>TITLE</label>
                <input
                  value={form.title}
                  onChange={(ev) => setForm((f) => ({ ...f, title: ev.target.value }))}
                  placeholder="e.g. Counseling session"
                  style={{ width:"100%", padding:"10px 12px", borderRadius:6, border:"1px solid var(--border)", background:"rgba(0,0,0,0.25)", color:"var(--text)", fontFamily:"var(--font-body)", fontSize:"0.85rem" }}
                />
              </div>
              <div>
                <label style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)", marginBottom:4 }}>AMOUNT</label>
                <input
                  type="number"
                  step="any"
                  value={form.amount}
                  onChange={(ev) => setForm((f) => ({ ...f, amount: ev.target.value }))}
                  placeholder="0"
                  style={{ width:"100%", padding:"10px 12px", borderRadius:6, border:"1px solid var(--border)", background:"rgba(0,0,0,0.25)", color:"var(--text)", fontFamily:"var(--font-body)", fontSize:"0.85rem" }}
                />
              </div>
              <div>
                <label style={{ display:"block", fontFamily:"var(--font-mono)", fontSize:"0.6rem", color:"var(--muted)", marginBottom:4 }}>CATEGORY</label>
                <input
                  value={form.category}
                  onChange={(ev) => setForm((f) => ({ ...f, category: ev.target.value }))}
                  placeholder="e.g. Wellness"
                  style={{ width:"100%", padding:"10px 12px", borderRadius:6, border:"1px solid var(--border)", background:"rgba(0,0,0,0.25)", color:"var(--text)", fontFamily:"var(--font-body)", fontSize:"0.85rem" }}
                />
              </div>
              <button
                type="submit"
                disabled={saving}
                style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", padding:"10px 18px", borderRadius:6, border:"none", background:"var(--cyan)", color:"#021014", fontWeight:700, cursor: saving ? "wait" : "pointer", opacity: saving ? 0.7 : 1 }}
              >
                {saving ? "Saving…" : "Add"}
              </button>
            </form>
          </GlassCard>

          <GlassCard hover={false} style={{ padding:0, overflow:"hidden" }}>
            <div style={{ padding:"16px 24px", borderBottom:"1px solid var(--border)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontFamily:"var(--font-mono)", fontSize:"0.7rem", color:"var(--cyan)", letterSpacing:"0.12em" }}>GET /api/items</span>
              <button
                type="button"
                onClick={() => loadItems()}
                style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", padding:"6px 12px", borderRadius:4, border:"1px solid rgba(0,212,200,0.25)", background:"transparent", color:"var(--cyan)", cursor:"pointer" }}
              >
                Refresh
              </button>
            </div>
            {itemsError ? (
              <div
                role="alert"
                style={{
                  margin:"12px 16px 16px",
                  padding:"14px 16px",
                  borderRadius:8,
                  border:"1px solid rgba(239,68,68,0.4)",
                  background:"rgba(239,68,68,0.1)",
                  color:"#fecaca",
                  fontFamily:"var(--font-body)",
                  fontSize:"0.82rem",
                  lineHeight:1.55,
                  whiteSpace:"pre-wrap",
                }}
              >
                {itemsError}
              </div>
            ) : null}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse" }}>
                <thead>
                  <tr style={{ borderBottom:"1px solid var(--border)" }}>
                    {["Title", "Amount", "Category", "DELETE /api/items/:id"].map((h) => (
                      <th key={h} style={{ padding:"12px 24px", textAlign:"left", fontFamily:"var(--font-mono)", fontSize:"0.65rem", color:"var(--muted)", letterSpacing:"0.08em", fontWeight:500 }}>{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {itemsLoading ? (
                    <tr>
                      <td colSpan={4} style={{ padding:"24px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>Loading…</td>
                    </tr>
                  ) : items.length === 0 ? (
                    <tr>
                      <td colSpan={4} style={{ padding:"24px", color:"var(--muted)", fontFamily:"var(--font-body)" }}>No items yet. Add one above.</td>
                    </tr>
                  ) : (
                    items.map((row) => (
                      <motion.tr
                        key={row._id}
                        initial={{ opacity:0, y:6 }}
                        animate={{ opacity:1, y:0 }}
                        style={{ borderBottom:"1px solid rgba(255,255,255,0.03)" }}
                      >
                        <td style={{ padding:"14px 24px", fontFamily:"var(--font-body)", fontSize:"0.9rem" }}>{row.title}</td>
                        <td style={{ padding:"14px 24px", fontFamily:"var(--font-mono)", fontSize:"0.85rem", color:"var(--cyan)" }}>{row.amount}</td>
                        <td style={{ padding:"14px 24px", fontFamily:"var(--font-mono)", fontSize:"0.8rem", color:"var(--muted)" }}>{row.category}</td>
                        <td style={{ padding:"14px 24px" }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteItem(row._id)}
                            style={{ fontFamily:"var(--font-mono)", fontSize:"0.65rem", padding:"6px 12px", borderRadius:4, border:"1px solid rgba(239,68,68,0.35)", background:"rgba(239,68,68,0.08)", color:"var(--red)", cursor:"pointer" }}
                          >
                            Delete
                          </button>
                        </td>
                      </motion.tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </GlassCard>
        </div>
      </FadeUp>

    </div>
  );
}
