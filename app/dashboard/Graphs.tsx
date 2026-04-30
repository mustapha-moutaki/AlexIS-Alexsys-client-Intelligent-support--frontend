"use client";
import React from "react";





const weeklyTickets = [
  { day: "Mon", created: 142, resolved: 118 },
  { day: "Tue", created: 198, resolved: 175 },
  { day: "Wed", created: 165, resolved: 152 },
  { day: "Thu", created: 221, resolved: 189 },
  { day: "Fri", created: 187, resolved: 201 },
  { day: "Sat", created: 93, resolved: 87 },
  { day: "Sun", created: 64, resolved: 71 },
];

const satisfactionTrend = [3.8, 3.9, 4.0, 4.1, 4.0, 4.2, 4.3];

// ─── STYLES ──────────────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: "#131316",
  border: "1.5px solid rgba(255,255,255,0.05)",
  borderRadius: "1rem",
  padding: "1.2rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.5rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "0.65rem",
  fontWeight: 700,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  color: "rgba(255,255,255,0.3)",
  marginBottom: "0.5rem",
};

// ─── SUB-COMPONENTS (Simplified) ──────────────────────────────────────────────
const BarChart = () => {
  const max = Math.max(...weeklyTickets.flatMap((d) => [d.created, d.resolved]));
  return (
    <div style={{ height: "100px", width: "100%", display: "flex", alignItems: "flex-end", gap: "6%" }}>
      {weeklyTickets.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "2px", height: "100%" }}>
          <div style={{ flex: 1, height: `${(d.created / max) * 100}%`, background: "#7C3AED", borderRadius: "2px" }} />
          <div style={{ flex: 1, height: `${(d.resolved / max) * 100}%`, background: "#34d9a5", borderRadius: "2px" }} />
        </div>
      ))}
    </div>
  );
};

const LineChart = () => {
  const W = 100, H = 40;
  const min = Math.min(...satisfactionTrend) - 0.1, max = Math.max(...satisfactionTrend) + 0.1;
  const points = satisfactionTrend.map((v, i) => `${(i / 6) * W},${H - ((v - min) / (max - min)) * H}`).join(" ");
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: "60px" }}>
      <polyline points={points} fill="none" stroke="#34d9a5" strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const DonutChart = () => {
  const radius = 15, circ = 2 * Math.PI * radius;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <svg width="50" height="50" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="5" />
        <circle cx="20" cy="20" r={radius} fill="none" stroke="#60a5fa" strokeWidth="5" strokeDasharray={`${0.7 * circ} ${circ}`} strokeLinecap="round" transform="rotate(-90 20 20)" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "11px", color: "#60a5fa" }}>Active: 1,823</div>
        <div style={{ fontSize: "11px", color: "#34d9a5" }}>Resolved: 8,914</div>
      </div>
    </div>
  );
};

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────
export default function Graphs() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem" }}>
      
      {/* 1. Weekly Performance */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>Weekly Performance</div>
        <div style={{ display: "flex", gap: "10px", marginBottom: "5px", fontSize: "10px" }}>
          <span style={{ color: "#7C3AED" }}>● Created</span>
          <span style={{ color: "#34d9a5" }}>● Resolved</span>
        </div>
        <BarChart />
      </div>

      {/* 2. Satisfaction Trend */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>Satisfaction Trend</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: "#fff" }}>4.3</span>
          <span style={{ fontSize: "10px", color: "#34d9a5" }}>↑ 12% vs last week</span>
        </div>
        <LineChart />
      </div>

      {/* 3. Ticket Distribution */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>Ticket Distribution</div>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
            <DonutChart />
        </div>
      </div>

    </div>
  );
}