import { useState, useEffect } from "react";

const texts = [
  "Open Source Contributor",
  "Full-Stack Developer",
  "Problem Solver",
  "Always Building",
];

export default function RotatingBadge({ items = texts, interval = 2200 }) {
  const [current, setCurrent] = useState(0);
  const [state, setState] = useState("active"); // "active" | "exit"

  useEffect(() => {
    const timer = setInterval(() => {
      // 1. trigger exit animation
      setState("exit");

      // 2. after exit completes, swap text and enter
      setTimeout(() => {
        setCurrent((prev) => (prev + 1) % items.length);
        setState("active");
      }, 350);
    }, interval);

    return () => clearInterval(timer);
  }, [items, interval]);

  return (
    <div style={styles.pill}>
      <span style={styles.dot} />
      <span
        key={current}
        style={{
          ...styles.text,
          ...(state === "active" ? styles.enter : styles.exitAnim),
        }}
      >
        {items[current]}
      </span>
    </div>
  );
}

const styles = {
  pill: {
    display: "inline-flex",
    alignItems: "center",
    gap: "10px",
    background: "rgba(255,255,255,0.06)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "100px",
    padding: "10px 22px",
    backdropFilter: "blur(12px)",
    WebkitBackdropFilter: "blur(12px)",
    minWidth: "240px",
    justifyContent: "center",
    width: "50px",
  },
  dot: {
    display: "inline-block",
    width: "8px",
    height: "8px",
    borderRadius: "50%",
    background: "#22c55e",
    flexShrink: 0,
    boxShadow: "0 0 8px rgba(34,197,94,0.8)",
  },
  text: {
    fontFamily: "sans-serif",
    fontSize: "13px",
    fontWeight: 700,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: "0.03em",
    whiteSpace: "nowrap",
    transition: "opacity 0.35s ease, transform 0.35s ease",
  },
  enter: {
    opacity: 1,
    transform: "translateY(0px)",
  },
  exitAnim: {
    opacity: 0,
    transform: "translateY(-10px)",
  },
};