"use client";

import React from "react";
import { useClientDashboardOverview } from "@/src/hooks/useClientDashboardOverview";
import DashboardSkeleton from "@/src/shared/components/ui/DashboardSkeleton";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  brand: "#4f6ef7",
  brandTint: "rgba(79, 110, 247, 0.08)",
  border: "#e8eaed",
  borderLight: "#f1f3f5",
  text: "#111827",
  textSub: "#6b7280",
  textMuted: "#9ca3af",
  bg: "#f5f6f8",
  white: "#ffffff",
  success: "#16a34a",
  successTint: "rgba(22, 163, 74, 0.08)",
  danger: "#dc2626",
  dangerTint: "rgba(220, 38, 38, 0.08)",
  warning: "#d97706",
  warningTint: "rgba(217, 119, 6, 0.08)",
};

// ─── Base Styles ──────────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: C.white,
  border: `1px solid ${C.border}`,
  borderRadius: "8px",
  padding: "1.25rem 1.375rem",
  display: "flex",
  flexDirection: "column",
  gap: "0.875rem",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.07em",
  textTransform: "uppercase",
  color: C.textMuted,
};

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Divider = () => <hr style={{ border: "none", borderTop: `1px solid ${C.borderLight}`, margin: "0" }} />;

const KPI = ({ label, value, sub, color }: { label: string; value: React.ReactNode; sub?: string; color?: string }) => (
  <div>
    <p style={{ fontSize: "12px", color: C.textSub, margin: "0 0 4px" }}>{label}</p>
    <div style={{ display: "flex", alignItems: "baseline", gap: "6px" }}>
      <span style={{ fontSize: "1.5rem", fontWeight: 700, color: color || C.text }}>{value}</span>
      {sub && <span style={{ fontSize: "11px", color: C.textMuted }}>{sub}</span>}
    </div>
  </div>
);

const Row = ({ label, value, color }: { label: string; value: React.ReactNode; color?: string }) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: "12px", color: C.textSub }}>{label}</span>
    <span style={{ fontSize: "13px", fontWeight: 600, color: color || C.text }}>{value}</span>
  </div>
);

const Bar = ({ pct, color }: { pct: number; color?: string }) => (
  <div style={{ height: "6px", width: "100%", background: C.bg, borderRadius: "10px", overflow: "hidden" }}>
    <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color || C.brand, borderRadius: "10px" }} />
  </div>
);

const Chip = ({ label, value, color = C.text, tint = C.bg }: { label: string; value: React.ReactNode; color?: string; tint?: string }) => (
  <div style={{ background: tint, padding: "8px 12px", borderRadius: "6px", display: "flex", flexDirection: "column", gap: "2px" }}>
    <span style={{ fontSize: "10px", fontWeight: 600, color: color, textTransform: "uppercase" }}>{label}</span>
    <span style={{ fontSize: "14px", fontWeight: 700, color: color }}>{value}</span>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span style={{ display: "inline-block", padding: "3px 8px", borderRadius: "4px", fontSize: "11px", fontWeight: 600, background: C.brandTint, color: C.brand, border: "1px solid rgba(79,110,247,0.15)" }}>
    {text}
  </span>
);

const StatCell = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "14px", fontWeight: 700, color: C.text }}>{value}</div>
    <div style={{ fontSize: "10px", color: C.textMuted, textTransform: "uppercase" }}>{label}</div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ClientDashboardPage() {
  const { data, isPending, error, refetch } = useClientDashboardOverview();
  const stats = data;

  // Calculate resolution rate safely
  const resolutionRate = stats?.countMyTotalTickets 
    ? (stats.countMyResolvedTickets / stats.countMyTotalTickets) * 100 
    : 0;

  if (isPending) return <DashboardSkeleton />;

  if (error) return (
    <div style={{ padding: "3rem", textAlign: "center" }}>
      <p style={{ color: C.textSub, fontSize: "14px", marginBottom: "1rem" }}>Failed to load dashboard data.</p>
      <button 
        onClick={() => refetch()} 
        style={{ padding: "7px 18px", background: C.brand, color: "#fff", border: "none", borderRadius: "6px", fontSize: "13px", fontWeight: 500, cursor: "pointer" }}
      >
        Retry
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", padding: "1.5rem" }}>
      
      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 700, color: C.text, margin: 0 }}>
            Client Dashboard
          </h1>
          <p style={{ fontSize: "12px", color: C.textMuted, margin: "3px 0 0" }}>
            {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })} — Personal summary
          </p>
        </div>
        <span style={{ fontSize: "11px", color: C.textMuted, background: C.white, border: `1px solid ${C.border}`, padding: "4px 10px", borderRadius: "5px" }}>
          Live
        </span>
      </div>

      {/* Row 1: Key Statistics */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>

        {/* Ticket Overview */}
        <div style={card}>
          <span style={sectionLabel}>Ticket Overview</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <KPI label="Total Requests" value={stats?.countMyTotalTickets} sub="Tickets" />
            <KPI label="Open Now" value={stats?.countMyOpenTickets} color={C.brand} />
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row label="In Progress" value={stats?.countMyInProgressTickets} color={C.warning} />
            <Row label="Resolved" value={stats?.countMyResolvedTickets} color={C.success} />
          </div>
        </div>

        {/* Priority Breakdown */}
        <div style={card}>
          <span style={sectionLabel}>Urgency & Priority</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <KPI label="High Priority" value={stats?.myHighPriorityTickets} color={C.danger} />
            <KPI label="Attention" value={stats?.ticketsNeedingAttention} color={C.warning} />
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row label="Medium Priority" value={stats?.myMediumPriorityTickets} />
            <Row label="Low Priority" value={stats?.myLowPriorityTickets} />
          </div>
        </div>

        {/* Support Progress */}
        <div style={card}>
          <span style={sectionLabel}>Resolution Progress</span>
          <KPI
            label="Overall Resolution"
            value={`${resolutionRate.toFixed(0)}%`}
          />
          <Bar pct={resolutionRate} color={C.success} />
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", color: C.textSub }}>Account Type</span>
              <Badge text="Standard Client" />
            </div>
            <Row 
               label="Member Since" 
               value={stats?.registrationDate ? new Date(stats.registrationDate).toLocaleDateString() : "—"} 
            />
          </div>
        </div>
      </div>

      {/* Row 2: Status Details */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem" }}>

        {/* Priority Detail Chips */}
        <div style={card}>
          <span style={sectionLabel}>Quick Status Access</span>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "8px" }}>
            <Chip 
              label="Critical" 
              value={stats?.myHighPriorityTickets} 
              color={C.danger} 
              tint={C.dangerTint} 
            />
            <Chip 
              label="Active" 
              value={stats?.countMyOpenTickets} 
              color={C.brand} 
              tint={C.brandTint} 
            />
            <Chip 
              label="Completed" 
              value={stats?.myClosedTickets} 
              color={C.success} 
              tint={C.successTint} 
            />
          </div>
        </div>

        {/* Performance Footer */}
        <div style={card}>
          <span style={sectionLabel}>Ticket Summary</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
             <Row label="Tickets Needing Action" value={stats?.ticketsNeedingAttention} color={C.danger} />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
              padding: "10px 0 2px",
              borderTop: `1px solid ${C.borderLight}`,
              marginTop: "2px",
            }}
          >
            <StatCell label="Total" value={stats?.countMyTotalTickets} />
            <StatCell label="Resolved" value={stats?.countMyResolvedTickets} />
            <StatCell label="Closed" value={stats?.myClosedTickets} />
          </div>
        </div>
      </div>
    </div>
  );
}