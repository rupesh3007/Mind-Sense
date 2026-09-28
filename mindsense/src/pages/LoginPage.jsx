import { useState } from "react";
import { motion } from "framer-motion";

export default function LoginPage({
  setPage,
  initialRole = "student",
  setIsAdminAuthenticated,
  redirectReason,
}) {
  const [role, setRole] = useState(initialRole);
  const [form, setForm] = useState({ id: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");

    if (!form.id.trim() || !form.password.trim()) {
      setError("Please enter your ID/Email and password.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      if (role === "admin") {
        if (setIsAdminAuthenticated) {
          setIsAdminAuthenticated(true);
          try {
            sessionStorage.setItem("mindsense_admin_auth", "true");
          } catch (e) {}
        }
        setPage("admin");
      } else {
        setPage("platform");
      }
    }, 1000);
  };

  const inputStyle = {
    width: "100%",
    padding: "10px 14px",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: 8,
    color: "var(--text)",
    fontFamily: "var(--font-body)",
    fontSize: "0.875rem",
    outline: "none",
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 50%, rgba(0,212,200,0.05) 0%, transparent 60%)",
        }}
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="glass-card"
        style={{
          width: "100%",
          maxWidth: 420,
          padding: "40px",
          position: "relative",
        }}
      >
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 12,
              background: "linear-gradient(135deg,#00d4c8,#00a8ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: 22,
              color: "#000",
              margin: "0 auto 12px",
            }}
          >
            M
          </div>
          <h1
            style={{
              fontFamily: "var(--font-head)",
              fontWeight: 800,
              fontSize: "1.4rem",
            }}
          >
            Welcome to MindSense
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.8rem",
              color: "var(--muted)",
              marginTop: 4,
            }}
          >
            Secure access to the platform
          </p>
        </div>

        {/* Verification banner if redirected */}
        {redirectReason && role === "admin" && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(0, 212, 200, 0.08)",
              border: "1px solid rgba(0, 212, 200, 0.25)",
              borderRadius: 8,
              marginBottom: 20,
              fontFamily: "var(--font-mono)",
              fontSize: "0.72rem",
              color: "var(--cyan)",
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <span>🔐</span> {redirectReason}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div
            style={{
              padding: "10px 14px",
              background: "rgba(255, 75, 75, 0.1)",
              border: "1px solid rgba(255, 75, 75, 0.3)",
              borderRadius: 8,
              marginBottom: 16,
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--red)",
            }}
          >
            {error}
          </div>
        )}

        {/* Role Toggle */}
        <div
          style={{
            display: "flex",
            gap: 8,
            marginBottom: 24,
            padding: 4,
            background: "rgba(255,255,255,0.03)",
            borderRadius: 10,
            border: "1px solid rgba(255,255,255,0.06)",
          }}
        >
          {["student", "admin"].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => {
                setRole(r);
                setError("");
              }}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 7,
                border: "none",
                cursor: "pointer",
                fontFamily: "var(--font-head)",
                fontSize: "0.8rem",
                fontWeight: 700,
                letterSpacing: "0.05em",
                textTransform: "capitalize",
                background:
                  role === r
                    ? "linear-gradient(135deg,var(--cyan),var(--cyan2))"
                    : "transparent",
                color: role === r ? "#000" : "var(--muted)",
                transition: "all 0.3s",
              }}
            >
              {r === "student" ? "🎓 " : "⚙️ "}
              {r.charAt(0).toUpperCase() + r.slice(1)} Login
            </button>
          ))}
        </div>

        {/* Form */}
        <form
          onSubmit={handleLogin}
          style={{ display: "flex", flexDirection: "column", gap: 14 }}
        >
          {[
            {
              key: "id",
              label:
                role === "student" ? "Student ID / Email" : "Admin Email",
              placeholder:
                role === "student"
                  ? "STU-XXXXXX or email"
                  : "admin@institution.edu",
              type: "text",
            },
            {
              key: "password",
              label: "Password",
              placeholder: "••••••••••••",
              type: "password",
            },
          ].map((f) => (
            <div key={f.key}>
              <label
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "0.62rem",
                  color: "var(--muted)",
                  letterSpacing: "0.1em",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                {f.label.toUpperCase()}
              </label>
              <input
                type={f.type}
                placeholder={f.placeholder}
                value={form[f.key]}
                onChange={(e) =>
                  setForm({ ...form, [f.key]: e.target.value })
                }
                style={inputStyle}
                onFocus={(e) =>
                  (e.target.style.borderColor = "rgba(0,212,200,0.4)")
                }
                onBlur={(e) =>
                  (e.target.style.borderColor = "rgba(255,255,255,0.08)")
                }
              />
            </div>
          ))}

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="button"
              style={{
                background: "none",
                border: "none",
                color: "var(--cyan)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                cursor: "pointer",
              }}
            >
              Forgot Password?
            </button>
          </div>

          <motion.button
            type="submit"
            className="btn-primary"
            style={{
              marginTop: 4,
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? (
              <motion.span
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                style={{
                  display: "inline-block",
                  width: 14,
                  height: 14,
                  border: "2px solid #000",
                  borderTopColor: "transparent",
                  borderRadius: "50%",
                }}
              />
            ) : (
              `Verify & Sign In as ${
                role.charAt(0).toUpperCase() + role.slice(1)
              } →`
            )}
          </motion.button>
        </form>

        <div style={{ textAlign: "center", marginTop: 20 }}>
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.65rem",
              color: "var(--muted)",
            }}
          >
            🔐 Verified Administrator Access Only · DPDP Act Compliant
          </span>
        </div>
      </motion.div>
    </div>
  );
}
