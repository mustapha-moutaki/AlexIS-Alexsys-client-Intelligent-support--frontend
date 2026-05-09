"use client";
import React from "react";
import { useAdminDashboardOverview } from "@/src/hooks/useAdminDashboardOverview";
import DashboardSkeleton from "@/src/shared/components/ui/DashboardSkeleton";

// ─── Tokens ───────────────────────────────────────────────────────────────────
const C = {
  brand:      "#4f6ef7",
  brandTint:  "rgba(79, 110, 247, 0.08)",
  border:     "#e8eaed",
  borderLight:"#f1f3f5",
  text:       "#111827",
  textSub:    "#6b7280",
  textMuted:  "#9ca3af",
  bg:         "#f5f6f8",
  white:      "#ffffff",
  success:    "#16a34a",
  successTint:"rgba(22, 163, 74, 0.08)",
  danger:     "#dc2626",
  dangerTint: "rgba(220, 38, 38, 0.08)",
  warning:    "#d97706",
  warningTint:"rgba(217, 119, 6, 0.08)",
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

const divider: React.CSSProperties = {
  border: "none",
  borderTop: `1px solid ${C.borderLight}`,
  margin: "0",
};

// ─── Atoms ────────────────────────────────────────────────────────────────────
const Divider = () => <hr style={divider} />;

const KPI = ({
  label,
  value,
  sub,
  color,
}: {
  label: string;
  value: React.ReactNode;
  sub?: string;
  color?: string;
}) => (
  <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
    <span style={{ fontSize: "11px", fontWeight: 500, color: C.textMuted }}>{label}</span>
    <span
      style={{
        fontSize: "1.375rem",
        fontWeight: 700,
        color: color ?? C.text,
        letterSpacing: "-0.025em",
        lineHeight: 1.2,
      }}
    >
      {value}
    </span>
    {sub && (
      <span style={{ fontSize: "10px", color: C.textMuted }}>{sub}</span>
    )}
  </div>
);

const Row = ({
  label,
  value,
  color,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
}) => (
  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
    <span style={{ fontSize: "12px", color: C.textSub }}>{label}</span>
    <span style={{ fontSize: "12px", fontWeight: 600, color: color ?? C.text }}>{value}</span>
  </div>
);

const Bar = ({ pct, color }: { pct: number; color?: string }) => (
  <div
    style={{
      height: 4,
      borderRadius: 99,
      background: C.borderLight,
      overflow: "hidden",
    }}
  >
    <div
      style={{
        width: `${Math.min(pct, 100)}%`,
        height: "100%",
        background: color ?? C.brand,
        borderRadius: 99,
        transition: "width 0.4s ease",
      }}
    />
  </div>
);

const Chip = ({
  label,
  value,
  color = C.text,
  tint = C.bg,
}: {
  label: string;
  value: React.ReactNode;
  color?: string;
  tint?: string;
}) => (
  <div
    style={{
      background: tint,
      border: `1px solid ${C.border}`,
      borderRadius: "6px",
      padding: "10px 12px",
      display: "flex",
      flexDirection: "column",
      gap: "3px",
    }}
  >
    <span style={{ fontSize: "10px", fontWeight: 500, color: C.textMuted }}>{label}</span>
    <span style={{ fontSize: "1rem", fontWeight: 700, color }}>{value}</span>
  </div>
);

const Badge = ({ text }: { text: string }) => (
  <span
    style={{
      display: "inline-block",
      padding: "3px 8px",
      borderRadius: "4px",
      fontSize: "11px",
      fontWeight: 600,
      background: C.brandTint,
      color: C.brand,
      border: `1px solid rgba(79,110,247,0.15)`,
    }}
  >
    {text}
  </span>
);

const StatCell = ({ label, value }: { label: string; value: React.ReactNode }) => (
  <div style={{ textAlign: "center" }}>
    <div style={{ fontSize: "10px", color: C.textMuted, marginBottom: "2px" }}>{label}</div>
    <div style={{ fontWeight: 700, fontSize: "13px", color: C.text }}>{value}</div>
  </div>
);

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Overview() {

  const fmtTime = (m: number) => {
  const hours = Math.floor(m / 60);
  const minutes = (m % 60).toFixed(2).replace(".", ",");
  
  return `${hours}h ${minutes}m`;
};
  const { data, isLoading, isError, refetch } = useAdminDashboardOverview();

  if (isLoading) return <DashboardSkeleton />;

  if (isError)
    return (
      <div style={{ padding: "3rem", textAlign: "center" }}>
        <p style={{ color: C.textSub, fontSize: "14px", marginBottom: "1rem" }}>
          Failed to load dashboard data.
        </p>
        <button
          onClick={() => refetch()}
          style={{
            padding: "7px 18px",
            background: C.brand,
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontSize: "13px",
            fontWeight: 500,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </div>
    );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>

      {/* Page Header */}
      <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between" }}>
        <div>
          <h1 style={{ fontSize: "1.125rem", fontWeight: 700, color: C.text, margin: 0 }}>
            Overview
          </h1>
          <p style={{ fontSize: "12px", color: C.textMuted, margin: "3px 0 0" }}>
            April 30, 2026 — Daily summary
          </p>
        </div>
        <span
          style={{
            fontSize: "11px",
            color: C.textMuted,
            background: C.white,
            border: `1px solid ${C.border}`,
            padding: "4px 10px",
            borderRadius: "5px",
          }}
        >
          Live
        </span>
      </div>

      {/* Row 1: Primary KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1rem" }}>

        {/* Client Engagement */}
        <div style={card}>
          <span style={sectionLabel}>Client Engagement</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <KPI label="Total Clients" value={data?.totalClients.toLocaleString()} sub="Lifetime" />
            <KPI label="New Today" value={`+${data?.totalClientsToDay}`} color={C.success} />
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row label="Active Now" value={data?.activeClients.toLocaleString()} color={C.brand} />
            <Row label="At Risk" value={data?.lowSatisfactionClient} color={C.danger} />
          </div>
        </div>

        {/* Agent Utilization */}
        <div style={card}>
          <span style={sectionLabel}>Agent Utilization</span>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
            <KPI label="Total Staff" value={data?.totalAgents} />
            <KPI label="Available" value={data?.totalAvailableAgents} color={C.success} />
          </div>
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row label="Avg. Load" value={`${data?.avgLoadPerAgent} tickets`} />
            <Row label="Busy" value={data?.totalBusyAgents} color={C.warning} />
          </div>
        </div>

        {/* Service Quality */}
        <div style={card}>
          <span style={sectionLabel}>Service Quality</span>
          <KPI
            label="CSAT Score"
            value={`${(data?.avgSatisfactionScore ?? 0) / 5} / 5`}
          />
          <Bar pct={((data?.avgSatisfactionScore ?? 0) / 5) * 100} />
          <Divider />
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row
              label="Avg. Resolution"
              value={fmtTime(Number(data?.averageResolutionTime))}
            />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span style={{ fontSize: "12px", color: C.textSub }}>Top Performer</span>
              <Badge text={data?.bestAgent ?? "—"} />
            </div>
          </div>
        </div>
      </div>

      {/* Row 2: Secondary */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1rem" }}>

        {/* System Health */}
        <div style={card}>
          <span style={sectionLabel}>System Health & Performance</span>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: "8px",
            }}
          >
            <Chip
              label="High Priority"
              value={data?.highPriorityTickets}
              color={C.danger}
              tint={C.dangerTint}
            />
            <Chip
              label="Resolved Today"
              value={data?.totalTicketsToday}
              color={C.success}
              tint={C.successTint}
            />
            <Chip label="Categories" value={data?.totalCategories} />
            <Chip
              label="Avg Rating"
              value={data?.avgPerformanceRating}
              color={C.brand}
              tint={C.brandTint}
            />
            <Chip
              label="Overloaded"
              value={data?.overloadAgents}
              color={C.warning}
              tint={C.warningTint}
            />
          </div>
        </div>

        {/* Management Console */}
        <div style={card}>
          <span style={sectionLabel}>Management Console</span>
          <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <Row label="Pending Tasks" value={data?.countMyOpenTickets} color={C.warning} />
            <Row label="In Progress" value={data?.countMyInProgressTickets} color={C.brand} />
          </div>
          <Divider />
          <Row label="Requires Action" value={data?.ticketsNeedingAttention} color={C.danger} />
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
            <StatCell label="Active" value={data?.totalActiveTickets} />
            <StatCell label="Resolved" value={data?.totalResolvedTickets} />
            <StatCell label="Closed" value={data?.totalClosedTickets} />
          </div>
        </div>
      </div>
    </div>
  );
}