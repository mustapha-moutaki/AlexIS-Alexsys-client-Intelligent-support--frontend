"use client";
import React from "react";

// ─── Fake Data ────────────────────────────────────────────────────────────────
const data = {
  totalClients: 3847,
  totalClientsToDay: 24,
  activeClients: 2190,
  avgSatisfactionScore: 4.3,
  lowSatisfactionClient: 47,
  totalAgents: 58,
  totalAvailableAgents: 31,
  totalBusyAgents: 21,
  overloadAgents: 6,
  averageResolutionTime: 204,
  avgPerformanceRating: 4.1,
  bestAgent: "Sarah K.",
  totalTickets: 12540,
  totalActiveTickets: 1823,
  totalResolvedTickets: 8914,
  totalClosedTickets: 1803,
  highPriorityTickets: 342,
  totalTicketsToday: 187,
  totalCategories: 14,
  countMyOpenTickets: 43,
  countMyInProgressTickets: 61,
  ticketsNeedingAttention: 9,
  avgLoadPerAgent: 4.2,
};

// ─── Style Tokens ─────────────────────────────────────────────────────────────
const cardStyle: React.CSSProperties = {
  background: "#131316",
  border: "1.5px solid rgba(255,255,255,0.05)",
  borderRadius: "1rem",
  padding: "1rem",
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

// ─── Helper Components ────────────────────────────────────────────────────────
const Divider = () => <hr style={{ border: "none", borderTop: "1px solid rgba(255,255,255,0.05)", margin: "0.5rem 0" }} />;

const KPI = ({ label, value, sub, color }: any) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.35)" }}>{label}</span>
    <span style={{ fontSize: "1.2rem", fontWeight: 700, color: color || "#fff" }}>{value}</span>
    {sub && <span style={{ fontSize: "9px", color: "rgba(255,255,255,0.25)" }}>{sub}</span>}
  </div>
);

const MiniStat = ({ label, value, color }: any) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: "11px", color: "rgba(255,255,255,0.4)" }}>{label}</span>
    <span style={{ fontSize: "11px", fontWeight: 600, color: color || "#fff" }}>{value}</span>
  </div>
);

const ProgressBar = ({ pct, color }: any) => (
  <div style={{ height: 4, borderRadius: 4, background: "rgba(255,255,255,0.05)", overflow: "hidden", marginTop: 4 }}>
    <div style={{ width: `${pct}%`, height: "100%", background: color }} />
  </div>
);

const MiniCard = ({ label, value, color, bg }: any) => (
  <div style={{ background: bg, padding: "8px", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.05)" }}>
    <div style={{ fontSize: "9px", color: "rgba(255,255,255,0.4)" }}>{label}</div>
    <div style={{ fontSize: "1rem", fontWeight: 700, color }}>{value}</div>
  </div>
);

const Pill = ({ text, color, bg }: any) => (
  <span style={{ padding: "2px 8px", borderRadius: "12px", fontSize: "9px", fontWeight: 700, color, background: bg }}>
    {text}
  </span>
);

// ─── Main Component ───────────────────────────────────────────────────────────
export default function Overview() {
  const fmtTime = (m: number) => `${Math.floor(m / 60)}h ${m % 60}m`;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      {/* Title */}
      <div>
        <h1 style={{ fontSize: "1.4rem", fontWeight: 700, margin: 0 }}>Dashboard Overview</h1>
        <p style={{ fontSize: "12px", color: "rgba(255,255,255,0.3)", margin: "4px 0 0" }}>
          Real-time metrics for April 30, 2026
        </p>
      </div>

      {/* Row 1: 3 Column KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem" }}>
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Clients</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <KPI label="Total" value={data.totalClients.toLocaleString()} sub="Lifetime" />
            <KPI label="New Today" value={`+${data.totalClientsToDay}`} color="#34d9a5" />
          </div>
          <Divider />
          <MiniStat label="Active Now" value={data.activeClients.toLocaleString()} color="#60a5fa" />
          <MiniStat label="At Risk" value={data.lowSatisfactionClient} color="#f87171" />
        </div>

        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Agents</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
            <KPI label="Total Staff" value={data.totalAgents} />
            <KPI label="Available" value={data.totalAvailableAgents} color="#34d9a5" />
          </div>
          <Divider />
          <MiniStat label="Average Load" value={`${data.avgLoadPerAgent} tickets`} />
          <MiniStat label="Busy" value={data.totalBusyAgents} color="#f5c542" />
        </div>

        <div style={cardStyle}>
          <div style={sectionTitleStyle}>Satisfaction</div>
          <KPI label="CSAT Score" value={`${data.avgSatisfactionScore}/5`} />
          <ProgressBar pct={(data.avgSatisfactionScore / 5) * 100} color="linear-gradient(90deg, #7C3AED, #51c2de)" />
          <div style={{ marginTop: "8px" }}>
            <MiniStat label="Resolution Time" value={fmtTime(data.averageResolutionTime)} />
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: "8px" }}>
              <span style={{ fontSize: "10px", color: "rgba(255,255,255,0.3)" }}>Top Performer</span>
              <Pill text={data.bestAgent} color="#fff" bg="#371450" />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "1rem" }}>
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>System Health</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "10px" }}>
            <MiniCard label="High Priority" value={data.highPriorityTickets} color="#f87171" bg="rgba(248,113,113,0.05)" />
            <MiniCard label="Resolved Today" value={data.totalTicketsToday} color="#34d9a5" bg="rgba(52,217,165,0.05)" />
            <MiniCard label="Categories" value={data.totalCategories} color="#60a5fa" bg="rgba(96,165,250,0.05)" />
          </div>
        </div>
        <div style={cardStyle}>
          <div style={sectionTitleStyle}>My Tasks</div>
          <MiniStat label="Pending" value={data.countMyOpenTickets} color="#f5c542" />
          <MiniStat label="In Progress" value={data.countMyInProgressTickets} color="#60a5fa" />
          <Divider />
          <MiniStat label="Needs Attention" value={data.ticketsNeedingAttention} color="#f87171" />
        </div>
      </div>
    </div>
  );
}