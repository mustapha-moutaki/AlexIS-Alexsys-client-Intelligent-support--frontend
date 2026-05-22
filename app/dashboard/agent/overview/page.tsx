"use client";

import React from "react";
import { useAgentDashboardOverview } from "@/src/hooks/useAgentDashboarOverview";
import { Ticket, Clock, ShieldCheck, UserCheck, Activity, RefreshCcw } from "lucide-react";

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
  successTint: "rgba(22, 163, 74, 0.08)",
  warning:    "#d97706",
  warningTint: "rgba(217, 119, 6, 0.08)",
};

// ─── Base Styles ──────────────────────────────────────────────────────────────
const card: React.CSSProperties = {
  background: C.white,
  border: `1px solid ${C.border}`,
  borderRadius: "12px",
  padding: "1.5rem",
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
};

const sectionLabel: React.CSSProperties = {
  fontSize: "10px",
  fontWeight: 600,
  letterSpacing: "0.05em",
  textTransform: "uppercase",
  color: C.textMuted,
  display: "flex",
  alignItems: "center",
  gap: "6px",
};

// ─── Atoms ────────────────────────────────────────────────────────────────────
const KPI = ({ label, value, icon: Icon, color }: { label: string; value: any; icon: any; color: string }) => (
  <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
    <div style={{ 
        background: `${color}15`, 
        color: color, 
        padding: "10px", 
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    }}>
      <Icon size={20} />
    </div>
    <div style={{ display: "flex", flexDirection: "column" }}>
      <span style={{ fontSize: "12px", color: C.textSub, fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: "1.25rem", fontWeight: 700, color: C.text }}>{value}</span>
    </div>
  </div>
);

const Badge = ({ status }: { status: string }) => {
  const isAvailable = status === "AVAILABLE";
  return (
    <span style={{
      display: "inline-flex",
      alignItems: "center",
      gap: "6px",
      padding: "4px 12px",
      borderRadius: "99px",
      fontSize: "11px",
      fontWeight: 600,
      background: isAvailable ? C.successTint : C.borderLight,
      color: isAvailable ? C.success : C.textSub,
      border: `1px solid ${isAvailable ? "rgba(22,163,74,0.2)" : C.border}`,
    }}>
      <span style={{ 
          width: 6, height: 6, borderRadius: "50%", 
          background: isAvailable ? C.success : C.textMuted,
          animation: isAvailable ? "pulse 2s infinite" : "none" 
      }} />
      {status}
    </span>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
export default function DashboardAgentOverview() {
  const { data, isLoading, error } = useAgentDashboardOverview();

  if (isLoading) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "60vh", gap: "1rem" }}>
        <RefreshCcw size={32} className="animate-spin" style={{ color: C.brand }} />
        <p style={{ color: C.textSub, fontSize: "14px" }}>Synchronizing dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", background: C.white, borderRadius: "12px", border: `1px solid ${C.border}` }}>
        <p style={{ color: C.textSub, fontSize: "14px" }}>Error: {error.message}</p>
      </div>
    );
  }

  const stats = data;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "10px" }}>
      
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
        <div>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, color: C.text, margin: 0 }}>Agent Dashboard</h1>
          <p style={{ fontSize: "13px", color: C.textMuted, marginTop: "4px" }}>
            Real-time performance metrics and status.
          </p>
        </div>
        <Badge status={stats.availabilityStatus} />
      </div>

      {/* Primary Stats Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
        
        {/* Active Workload */}
        <div style={card}>
          <span style={sectionLabel}>
            <Ticket size={12} /> Workload
          </span>
          <KPI 
            label="Active Tickets" 
            value={stats.activeTicketCount} 
            icon={Ticket} 
            color={C.brand} 
          />
          <p style={{ fontSize: "11px", color: C.textMuted, marginTop: "auto" }}>
            Currently assigned to your queue
          </p>
        </div>

        {/* Speed Metric */}
        <div style={card}>
          <span style={sectionLabel}>
            <Clock size={12} /> Efficiency
          </span>
          <KPI 
            label="Avg. Resolution" 
            value={`${stats.avgResolutionTimeMin} min`} 
            icon={Clock} 
            color={C.success} 
          />
          <p style={{ fontSize: "11px", color: C.textMuted, marginTop: "auto" }}>
            Average time to close tickets
          </p>
        </div>

        {/* Identity/Role */}
        <div style={card}>
          <span style={sectionLabel}>
            <ShieldCheck size={12} /> Specialization
          </span>
          <KPI 
            label="Domain Expert" 
            value={stats.specialization} 
            icon={ShieldCheck} 
            color="#8b5cf6" 
          />
          <p style={{ fontSize: "11px", color: C.textMuted, marginTop: "auto" }}>
            Primary technical focus area
          </p>
        </div>
      </div>

      {/* Secondary Row */}
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: "1.5rem" }}>
        <div style={card}>
          <span style={sectionLabel}>Session Details</span>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0", borderBottom: `1px solid ${C.borderLight}` }}>
            <span style={{ fontSize: "13px", color: C.textSub }}>Current Assignment</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>Primary Queue</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", padding: "8px 0" }}>
            <span style={{ fontSize: "13px", color: C.textSub }}>System Priority</span>
            <span style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>High</span>
          </div>
        </div>

        <div style={{ ...card, background: "transparent", borderStyle: "dashed", justifyContent: "center", alignItems: "center" }}>
          <div style={{ textAlign: "center" }}>
            <UserCheck size={24} style={{ color: C.textMuted, marginBottom: "8px" }} />
            <div style={{ fontSize: "12px", color: C.textMuted }}>Presence verified via</div>
            <div style={{ fontSize: "13px", fontWeight: 600, color: C.text }}>Agent Protocol v1.4</div>
          </div>
        </div>
      </div>

      {/* Footer Info */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "1rem" }}>
         <div style={{ display: "flex", alignItems: "center", gap: "6px", color: C.textMuted, fontSize: "11px" }}>
            <Activity size={12} />
            Data synced: {data.timestamp}
         </div>
         <span style={{ fontSize: "11px", color: C.textMuted }}>Path: {data.path}</span>
      </div>

      <style jsx global>{`
        @keyframes pulse {
          0% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0.7); }
          70% { transform: scale(1); box-shadow: 0 0 0 6px rgba(22, 163, 74, 0); }
          100% { transform: scale(0.95); box-shadow: 0 0 0 0 rgba(22, 163, 74, 0); }
        }
      `}</style>
    </div>
  );
}