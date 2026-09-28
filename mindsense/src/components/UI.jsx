import { motion } from "framer-motion";

export const Tag = ({ children }) => (
  <span className="section-tag">{children}</span>
);

export const FadeUp = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    className={className}
  >
    {children}
  </motion.div>
);

export const GlassCard = ({ children, className = "", hover = true, style = {} }) => (
  <motion.div
    whileHover={hover ? { y: -4, borderColor: "rgba(0,212,200,0.3)" } : {}}
    transition={{ duration: 0.3 }}
    className={`glass-card p-6 ${className}`}
    style={{ padding: "1.5rem", cursor: hover ? "pointer" : "default", ...style }}
  >
    {children}
  </motion.div>
);

const particles = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  left: `${Math.random() * 100}%`,
  duration: `${8 + Math.random() * 12}s`,
  delay: `${Math.random() * 8}s`,
  size: Math.random() > 0.7 ? 3 : 2,
}));

export const Particles = () => {
  return (
    <div className="particle-layer" style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
      {particles.map((p) => (
        <div
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            animationDuration: p.duration,
            animationDelay: p.delay,
            width: p.size,
            height: p.size,
            opacity: 0.4,
          }}
        />
      ))}
    </div>
  );
};
