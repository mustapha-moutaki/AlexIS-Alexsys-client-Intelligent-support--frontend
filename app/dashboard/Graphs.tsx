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

const C = {
  brand:      "#4f6ef7",
  success:    "#16a34a",
  border:     "#e8eaed",
  borderLight:"#f1f3f5",
  text:       "#111827",
  textSub:    "#6b7280",
  textMuted:  "#9ca3af",
  bg:         "#f5f6f8",
  white:      "#ffffff",
};

// ─── STYLES ──────────────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: C.white,
  border: `1px solid ${C.border}`,
  borderRadius: "8px",
  padding: "1.25rem 1.375rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.875rem",
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: C.textMuted,
};

// ─── SUB-COMPONENTS (Simplified) ──────────────────────────────────────────────
const BarChart = () => {
  const max = Math.max(...weeklyTickets.flatMap((d) => [d.created, d.resolved]));
  return (
    <div style={{ height: "100px", width: "100%", display: "flex", alignItems: "flex-end", gap: "6%" }}>
      {weeklyTickets.map((d, i) => (
        <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "2px", height: "100%" }}>
          <div style={{ flex: 1, height: `${(d.created / max) * 100}%`, background: C.brand, borderRadius: "2px" }} />
          <div style={{ flex: 1, height: `${(d.resolved / max) * 100}%`, background: C.success, borderRadius: "2px" }} />
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
      <polyline points={points} fill="none" stroke={C.success} strokeWidth="2" strokeLinejoin="round" />
    </svg>
  );
};

const DonutChart = () => {
  const radius = 15, circ = 2 * Math.PI * radius;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
      <svg width="50" height="50" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} fill="none" stroke={C.borderLight} strokeWidth="5" />
        <circle cx="20" cy="20" r={radius} fill="none" stroke={C.brand} strokeWidth="5" strokeDasharray={`${0.7 * circ} ${circ}`} strokeLinecap="round" transform="rotate(-90 20 20)" />
      </svg>
      <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
        <div style={{ fontSize: "11px", color: C.brand, fontWeight: 500 }}>Active: 1,823</div>
        <div style={{ fontSize: "11px", color: C.success, fontWeight: 500 }}>Resolved: 8,914</div>
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
        <div style={{ display: "flex", gap: "10px", marginBottom: "5px", fontSize: "10px", fontWeight: 500 }}>
          <span style={{ color: C.brand }}>● Created</span>
          <span style={{ color: C.success }}>● Resolved</span>
        </div>
        <BarChart />
      </div>

      {/* 2. Satisfaction Trend */}
      <div style={cardStyle}>
        <div style={sectionTitleStyle}>Satisfaction Trend</div>
        <div style={{ display: "flex", alignItems: "baseline", gap: "5px" }}>
          <span style={{ fontSize: "1.5rem", fontWeight: 700, color: C.text }}>4.3</span>
          <span style={{ fontSize: "10px", color: C.success, fontWeight: 500 }}>↑ 12% vs last week</span>
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