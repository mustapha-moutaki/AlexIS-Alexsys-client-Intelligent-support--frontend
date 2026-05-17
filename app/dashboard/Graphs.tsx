"use client";
import CardSkeleton from "@/components/ui/CardSkeleton";
import { getStatsForGraphs } from "@/src/features/auth/services/dashaboard.service";
import React, { useEffect, useState } from "react";

// ─── TYPES ────────────────────────────────────────────────────────────────────
interface AgentLoad {
  fullName: string;
  load: number;
  resolved: number;
}
interface DayValue {
  day: string;
  avgMinutes?: number;
  score?: string;
  created?: number;
  resolved?: number;
}
interface GraphStats {
  agentLoad: AgentLoad[];
  resolutionTimeTrend: DayValue[];
  satisfactionTrend: DayValue[];
  ticketDistribution: null | { label: string; count: number }[];
  weeklyTickets: DayValue[];
}

// ─── MOCK DATA (matches your API shape) ───────────────────────────────────────
const MOCK: GraphStats = {
  agentLoad: [
    { fullName: "Sarah Johnson", load: 5, resolved: 1 },
    { fullName: "Xaviera Heath", load: 2, resolved: 1 },
    { fullName: "Valentine Olsen", load: 0, resolved: 0 },
  ],
  resolutionTimeTrend: [{ day: "Wed", avgMinutes: 1330 }],
  satisfactionTrend: [{ day: "Wed", score: "3.0000000000000000" }],
  ticketDistribution: null,
  weeklyTickets: [
    { day: "Wed", created: 3, resolved: 2 },
    { day: "Sat", created: 3, resolved: 0 },
    { day: "Sun", created: 1, resolved: 0 },
  ],
};

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const T = {
  bg: "#f5f6f8",
  surface: "#ffffff",
  surfaceUp: "#f0f2f5",
  border: "#e2e5ec",
  borderGlow: "#d0d5e0",
  accent: "#4f6ef7",
  accentSoft: "rgba(79,110,247,0.10)",
  accentGlow: "rgba(79,110,247,0.25)",
  green: "#16a34a",
  greenSoft: "rgba(22,163,74,0.10)",
  amber: "#d97706",
  amberSoft: "rgba(217,119,6,0.10)",
  rose: "#e11d48",
  roseSoft: "rgba(225,29,72,0.10)",
  violet: "#7c3aed",
  violetSoft: "rgba(124,58,237,0.10)",
  text: "#111827",
  textSub: "#4b5563",
  textMuted: "#9ca3af",
  white: "#ffffff",
};
// ─── HELPERS ──────────────────────────────────────────────────────────────────
const fmtMinutes = (m: number) => {
  const h = Math.floor(m / 60);
  const min = m % 60;
  return h > 0 ? `${h}h ${min}m` : `${min}m`;
};

const lerp = (a: number, b: number, t: number) => a + (b - a) * t;

// ─── SHARED CARD ──────────────────────────────────────────────────────────────
const Card = ({
  title,
  accent = T.accent,
  children,
  span = 1,
}: {
  title: string;
  accent?: string;
  children: React.ReactNode;
  span?: number;
}) => (
  <div
    style={{
      background: T.surface,
      border: `1px solid ${T.border}`,
      borderRadius: "16px",
      padding: "1.5rem",
      display: "flex",
      flexDirection: "column",
      gap: "1.25rem",
      gridColumn: span > 1 ? `span ${span}` : undefined,
      position: "relative",
      overflow: "hidden",
    }}
  >
    {/* top accent bar */}
    <div
      style={{
        position: "absolute",
        top: 0,
        left: "1.5rem",
        right: "1.5rem",
        height: "2px",
        background: `linear-gradient(90deg, ${accent}, transparent)`,
        borderRadius: "0 0 4px 4px",
      }}
    />
    <p
      style={{
        margin: 0,
        fontSize: "11px",
        fontWeight: 700,
        letterSpacing: "0.1em",
        textTransform: "uppercase",
        color: T.textMuted,
        fontFamily: "'DM Mono', monospace",
      }}
    >
      {title}
    </p>
    {children}
  </div>
);

// ─── 1. WEEKLY TICKETS BAR CHART ─────────────────────────────────────────────
const WeeklyTicketsChart = ({ data }: { data: DayValue[] }) => {
  const maxVal = Math.max(...data.flatMap((d) => [d.created ?? 0, d.resolved ?? 0]), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
      <div style={{ display: "flex", gap: "1rem" }}>
        {[
          { label: "Created", color: T.accent },
          { label: "Resolved", color: T.green },
        ].map((l) => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
            <span style={{ fontSize: 11, color: T.textSub, fontFamily: "'DM Mono', monospace" }}>{l.label}</span>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: "10px", height: 120 }}>
        {data.map((d, i) => (
          <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px", height: "100%" }}>
            <div style={{ flex: 1, width: "100%", display: "flex", alignItems: "flex-end", gap: "3px" }}>
              <div
                style={{
                  flex: 1,
                  height: `${((d.created ?? 0) / maxVal) * 100}%`,
                  background: `linear-gradient(180deg, ${T.accent}, ${T.accentSoft})`,
                  borderRadius: "4px 4px 0 0",
                  minHeight: 2,
                  position: "relative",
                  boxShadow: `0 0 10px ${T.accentGlow}`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 9,
                    color: T.accent,
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.created}
                </span>
              </div>
              <div
                style={{
                  flex: 1,
                  height: `${((d.resolved ?? 0) / maxVal) * 100}%`,
                  background: `linear-gradient(180deg, ${T.green}, ${T.greenSoft})`,
                  borderRadius: "4px 4px 0 0",
                  minHeight: 2,
                  position: "relative",
                  boxShadow: `0 0 10px rgba(52,211,153,0.3)`,
                }}
              >
                <span
                  style={{
                    position: "absolute",
                    top: -18,
                    left: "50%",
                    transform: "translateX(-50%)",
                    fontSize: 9,
                    color: T.green,
                    fontFamily: "'DM Mono', monospace",
                    whiteSpace: "nowrap",
                  }}
                >
                  {d.resolved}
                </span>
              </div>
            </div>
            <span style={{ fontSize: 10, color: T.textMuted, fontFamily: "'DM Mono', monospace" }}>{d.day}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 2. WEEKLY TICKETS AREA / LINE CHART ─────────────────────────────────────
const WeeklyAreaChart = ({ data }: { data: DayValue[] }) => {
  const W = 300, H = 80;
  const allVals = data.flatMap((d) => [d.created ?? 0, d.resolved ?? 0]);
  const maxVal = Math.max(...allVals, 1);

  const pts = (key: "created" | "resolved") =>
    data.map((d, i) => {
      const x = data.length === 1 ? W / 2 : (i / (data.length - 1)) * W;
      const y = H - ((d[key] ?? 0) / maxVal) * H;
      return [x, y] as [number, number];
    });

  const polyline = (points: [number, number][]) =>
    points.map(([x, y]) => `${x},${y}`).join(" ");

  const area = (points: [number, number][]) => {
    if (points.length === 0) return "";
    const first = points[0];
    const last = points[points.length - 1];
    return `${first[0]},${H} ${polyline(points)} ${last[0]},${H}`;
  };

  const created = pts("created");
  const resolved = pts("resolved");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ width: "100%", height: 100 }}>
      <defs>
        <linearGradient id="ga1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.accent} stopOpacity="0.4" />
          <stop offset="100%" stopColor={T.accent} stopOpacity="0" />
        </linearGradient>
        <linearGradient id="ga2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={T.green} stopOpacity="0.4" />
          <stop offset="100%" stopColor={T.green} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area(created)} fill="url(#ga1)" />
      <polygon points={area(resolved)} fill="url(#ga2)" />
      <polyline points={polyline(created)} fill="none" stroke={T.accent} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <polyline points={polyline(resolved)} fill="none" stroke={T.green} strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      {created.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={T.accent} />
      ))}
      {resolved.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r="3" fill={T.green} />
      ))}
    </svg>
  );
};

// ─── 3. SATISFACTION TREND ────────────────────────────────────────────────────
const SatisfactionChart = ({ data }: { data: DayValue[] }) => {
  const scores = data.map((d) => parseFloat(d.score ?? "0"));
  const maxScore = 5;
  const avg = scores.length ? scores.reduce((a, b) => a + b, 0) / scores.length : 0;
  const pct = (avg / maxScore) * 100;

  // Star rating
  const stars = Array.from({ length: 5 }, (_, i) => {
    const fill = Math.min(Math.max(avg - i, 0), 1);
    return fill;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: "8px" }}>
        <span style={{ fontSize: "2.5rem", fontWeight: 800, color: T.text, lineHeight: 1, fontFamily: "'DM Mono', monospace" }}>
          {avg.toFixed(1)}
        </span>
        <span style={{ fontSize: 12, color: T.textSub }}>/ 5.0</span>
      </div>

      {/* Star strip */}
      <div style={{ display: "flex", gap: "4px" }}>
        {stars.map((fill, i) => (
          <svg key={i} width="20" height="20" viewBox="0 0 20 20">
            <defs>
              <linearGradient id={`star-${i}`}>
                <stop offset={`${fill * 100}%`} stopColor={T.amber} />
                <stop offset={`${fill * 100}%`} stopColor={T.textMuted} />
              </linearGradient>
            </defs>
            <polygon
              points="10,1 12.9,7 19.5,7.6 14.5,12.1 16.2,18.5 10,15 3.8,18.5 5.5,12.1 0.5,7.6 7.1,7"
              fill={`url(#star-${i})`}
            />
          </svg>
        ))}
      </div>

      {/* Score per day */}
      <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
        {data.map((d, i) => {
          const s = parseFloat(d.score ?? "0");
          const w = (s / maxScore) * 100;
          return (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <span style={{ fontSize: 10, color: T.textMuted, width: 28, fontFamily: "'DM Mono', monospace" }}>{d.day}</span>
              <div style={{ flex: 1, height: 6, background: T.surfaceUp, borderRadius: 99 }}>
                <div
                  style={{
                    height: "100%",
                    width: `${w}%`,
                    background: `linear-gradient(90deg, ${T.amber}, ${T.green})`,
                    borderRadius: 99,
                    boxShadow: `0 0 8px ${T.amberSoft}`,
                  }}
                />
              </div>
              <span style={{ fontSize: 10, color: T.amber, fontFamily: "'DM Mono', monospace", width: 28 }}>{s.toFixed(1)}</span>
            </div>
          );
        })}
      </div>

      {/* Gauge arc */}
      <div style={{ display: "flex", justifyContent: "center" }}>
        <svg width="120" height="64" viewBox="0 0 120 64">
          <path d="M10,60 A50,50 0 0,1 110,60" fill="none" stroke={T.surfaceUp} strokeWidth="10" strokeLinecap="round" />
          <path
            d="M10,60 A50,50 0 0,1 110,60"
            fill="none"
            stroke={T.amber}
            strokeWidth="10"
            strokeLinecap="round"
            strokeDasharray={`${(pct / 100) * 157} 157`}
            style={{ filter: `drop-shadow(0 0 6px ${T.amber})` }}
          />
          <text x="60" y="56" textAnchor="middle" fontSize="11" fill={T.textSub} fontFamily="'DM Mono', monospace">
            {pct.toFixed(0)}%
          </text>
        </svg>
      </div>
    </div>
  );
};

// ─── 4. RESOLUTION TIME ───────────────────────────────────────────────────────
const ResolutionTimeChart = ({ data }: { data: DayValue[] }) => {
  const maxMin = Math.max(...data.map((d) => d.avgMinutes ?? 0), 1);
  const thresholds = [
    { label: "Fast", max: 60, color: T.green },
    { label: "Moderate", max: 480, color: T.amber },
    { label: "Slow", max: Infinity, color: T.rose },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
        {thresholds.map((t) => (
          <div key={t.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
            <div style={{ width: 8, height: 8, borderRadius: 2, background: t.color }} />
            <span style={{ fontSize: 10, color: T.textSub, fontFamily: "'DM Mono', monospace" }}>{t.label}</span>
          </div>
        ))}
      </div>

      {data.map((d, i) => {
        const mins = d.avgMinutes ?? 0;
        const zone = thresholds.find((t) => mins <= t.max) ?? thresholds[2];
        const pct = Math.min((mins / maxMin) * 100, 100);
        return (
          <div key={i} style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 11, color: T.textSub, fontFamily: "'DM Mono', monospace" }}>{d.day}</span>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span
                  style={{
                    fontSize: 9,
                    padding: "2px 6px",
                    borderRadius: 99,
                    background: zone.color + "22",
                    color: zone.color,
                    fontFamily: "'DM Mono', monospace",
                    fontWeight: 700,
                  }}
                >
                  {zone.label}
                </span>
                <span style={{ fontSize: 13, fontWeight: 700, color: zone.color, fontFamily: "'DM Mono', monospace" }}>
                  {fmtMinutes(mins)}
                </span>
              </div>
            </div>
            <div style={{ height: 8, background: T.surfaceUp, borderRadius: 99 }}>
              <div
                style={{
                  height: "100%",
                  width: `${pct}%`,
                  background: zone.color,
                  borderRadius: 99,
                  boxShadow: `0 0 10px ${zone.color}55`,
                  transition: "width 0.6s ease",
                }}
              />
            </div>
          </div>
        );
      })}

      {/* Big stat */}
      <div
        style={{
          marginTop: "0.5rem",
          padding: "0.75rem 1rem",
          background: T.surfaceUp,
          borderRadius: 10,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          border: `1px solid ${T.border}`,
        }}
      >
        <span style={{ fontSize: 11, color: T.textSub }}>Avg resolution</span>
        <span style={{ fontSize: "1.4rem", fontWeight: 800, color: T.rose, fontFamily: "'DM Mono', monospace" }}>
          {fmtMinutes(Math.round(data.reduce((a, d) => a + (d.avgMinutes ?? 0), 0) / Math.max(data.length, 1)))}
        </span>
      </div>
    </div>
  );
};

// ─── 5. AGENT LOAD — HORIZONTAL BARS ─────────────────────────────────────────
const AgentLoadChart = ({ data }: { data: AgentLoad[] }) => {
  const maxLoad = Math.max(...data.map((a) => a.load + a.resolved), 1);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.875rem" }}>
      {data.map((agent, i) => {
        const total = agent.load + agent.resolved;
        const loadPct = (agent.load / maxLoad) * 100;
        const resolvedPct = (agent.resolved / maxLoad) * 100;
        const initials = agent.fullName
          .split(" ")
          .map((n) => n[0])
          .join("")
          .slice(0, 2);
        const colors = [T.accent, T.violet, T.rose];
        const color = colors[i % colors.length];

        return (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
                background: color + "22",
                border: `2px solid ${color}55`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 700,
                color: color,
                flexShrink: 0,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              {initials}
            </div>
            <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "4px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 12, color: T.text, fontWeight: 500 }}>{agent.fullName}</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <span style={{ fontSize: 10, color: color, fontFamily: "'DM Mono', monospace" }}>
                    {agent.load} open
                  </span>
                  <span style={{ fontSize: 10, color: T.green, fontFamily: "'DM Mono', monospace" }}>
                    {agent.resolved} done
                  </span>
                </div>
              </div>
              {/* Stacked bar */}
              <div style={{ height: 6, background: T.surfaceUp, borderRadius: 99, display: "flex", overflow: "hidden" }}>
                <div
                  style={{
                    width: `${loadPct}%`,
                    background: color,
                    boxShadow: `0 0 8px ${color}55`,
                    transition: "width 0.6s",
                  }}
                />
                <div
                  style={{
                    width: `${resolvedPct}%`,
                    background: T.green,
                    opacity: 0.6,
                    transition: "width 0.6s",
                  }}
                />
              </div>
            </div>
          </div>
        );
      })}

      {/* Summary row */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: "8px",
          marginTop: "0.25rem",
        }}
      >
        {[
          { label: "Agents", value: data.length, color: T.accent },
          { label: "Open", value: data.reduce((a, d) => a + d.load, 0), color: T.rose },
          { label: "Done", value: data.reduce((a, d) => a + d.resolved, 0), color: T.green },
        ].map((s) => (
          <div
            key={s.label}
            style={{
              background: T.surfaceUp,
              border: `1px solid ${T.border}`,
              borderRadius: 8,
              padding: "8px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "2px",
            }}
          >
            <span style={{ fontSize: "1.25rem", fontWeight: 800, color: s.color, fontFamily: "'DM Mono', monospace" }}>
              {s.value}
            </span>
            <span style={{ fontSize: 9, color: T.textMuted, textTransform: "uppercase", letterSpacing: "0.08em" }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── 6. AGENT LOAD — BUBBLE/SCATTER ──────────────────────────────────────────
const AgentBubbleChart = ({ data }: { data: AgentLoad[] }) => {
  const colors = [T.accent, T.violet, T.rose];
  const maxLoad = Math.max(...data.map((a) => a.load), 1);
  const maxRes = Math.max(...data.map((a) => a.resolved), 1);

  return (
    <div style={{ position: "relative" }}>
      <svg viewBox="0 0 260 120" style={{ width: "100%", overflow: "visible" }}>
        {/* Axes */}
        <line x1="30" y1="10" x2="30" y2="100" stroke={T.border} strokeWidth="1" />
        <line x1="30" y1="100" x2="250" y2="100" stroke={T.border} strokeWidth="1" />
        <text x="28" y="8" fontSize="7" fill={T.textMuted} textAnchor="end" fontFamily="'DM Mono', monospace">Resolved</text>
        <text x="252" y="103" fontSize="7" fill={T.textMuted} fontFamily="'DM Mono', monospace">Load</text>

        {data.map((agent, i) => {
          const cx = 30 + ((agent.load / Math.max(maxLoad, 1)) * 200);
          const cy = 100 - ((agent.resolved / Math.max(maxRes, 1)) * 80);
          const r = 8 + (agent.load + agent.resolved) * 2;
          const color = colors[i % colors.length];
          return (
            <g key={i}>
              <circle cx={cx} cy={cy} r={r} fill={color} fillOpacity="0.2" stroke={color} strokeWidth="1.5" />
              <text x={cx} y={cy + 3.5} textAnchor="middle" fontSize="7" fill={color} fontFamily="'DM Mono', monospace" fontWeight="700">
                {agent.fullName.split(" ")[0]}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
};

// ─── 7. TICKET DISTRIBUTION — FALLBACK ───────────────────────────────────────
const TicketDistributionFallback = () => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      gap: "12px",
      padding: "1.5rem 0",
      opacity: 0.6,
    }}
  >
    <svg width="48" height="48" viewBox="0 0 48 48">
      <circle cx="24" cy="24" r="20" fill="none" stroke={T.border} strokeWidth="3" strokeDasharray="6 4" />
      <path d="M24 14 v10 M24 30 v2" stroke={T.textMuted} strokeWidth="2.5" strokeLinecap="round" />
    </svg>
    <p style={{ margin: 0, fontSize: 12, color: T.textMuted, textAlign: "center", lineHeight: 1.5 }}>
      No distribution data available.<br />
      <span style={{ color: T.textMuted, fontSize: 11 }}>API returned null for ticketDistribution.</span>
    </p>
  </div>
);

// ─── 8. WEEKLY TICKETS RADAR (normalized) ────────────────────────────────────
const RadarChart = ({ data }: { data: DayValue[] }) => {
  const N = data.length;
  if (N < 3) return <p style={{ color: T.textMuted, fontSize: 12 }}>Need ≥3 data points for radar</p>;

  const maxVal = Math.max(...data.flatMap((d) => [d.created ?? 0, d.resolved ?? 0]), 1);
  const CX = 80, CY = 80, R = 60;

  const angle = (i: number) => (Math.PI * 2 * i) / N - Math.PI / 2;
  const pt = (val: number, i: number) => {
    const r = (val / maxVal) * R;
    return [CX + r * Math.cos(angle(i)), CY + r * Math.sin(angle(i))];
  };

  const polygon = (vals: number[]) =>
    vals.map((v, i) => pt(v, i).join(",")).join(" ");

  return (
    <svg viewBox="0 0 160 160" style={{ width: "100%", maxHeight: 180 }}>
      {/* Rings */}
      {[0.25, 0.5, 0.75, 1].map((r) => (
        <polygon
          key={r}
          points={data.map((_, i) => {
            const a = angle(i);
            return `${CX + R * r * Math.cos(a)},${CY + R * r * Math.sin(a)}`;
          }).join(" ")}
          fill="none"
          stroke={T.border}
          strokeWidth="0.5"
        />
      ))}

      {/* Spokes */}
      {data.map((_, i) => {
        const [x, y] = [CX + R * Math.cos(angle(i)), CY + R * Math.sin(angle(i))];
        return <line key={i} x1={CX} y1={CY} x2={x} y2={y} stroke={T.border} strokeWidth="0.5" />;
      })}

      {/* Created area */}
      <polygon
        points={polygon(data.map((d) => d.created ?? 0))}
        fill={T.accent}
        fillOpacity="0.2"
        stroke={T.accent}
        strokeWidth="1.5"
      />

      {/* Resolved area */}
      <polygon
        points={polygon(data.map((d) => d.resolved ?? 0))}
        fill={T.green}
        fillOpacity="0.2"
        stroke={T.green}
        strokeWidth="1.5"
      />

      {/* Labels */}
      {data.map((d, i) => {
        const a = angle(i);
        const lx = CX + (R + 14) * Math.cos(a);
        const ly = CY + (R + 14) * Math.sin(a);
        return (
          <text key={i} x={lx} y={ly + 3} textAnchor="middle" fontSize="7" fill={T.textSub} fontFamily="'DM Mono', monospace">
            {d.day}
          </text>
        );
      })}
    </svg>
  );
};

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function DashboardGraphs() {
 const [data, setData] = useState<GraphStats | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
useEffect(() => {
  getStatsForGraphs()
    .then((d) => setData(d))
    .catch((e) => setError(e.message))
    .finally(() => setLoading(false));
}, []);


if (loading) return <div style={{ color: T.textSub, padding: "2rem" }}><CardSkeleton count={6} /></div>;
if (error)   return <div style={{ color: T.rose,    padding: "2rem" }}>Error: {error}</div>;
if (!data)   return null;
  return (
    <div
      style={{
        minHeight: "100vh",
        background: T.bg,
        padding: "2rem",
        fontFamily: "'Inter', sans-serif",
        color: T.text,
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: "2rem" }}>
        <h1
          style={{
            margin: 0,
            fontSize: "1.5rem",
            fontWeight: 800,
            color: T.text,
            letterSpacing: "-0.02em",
          }}
        >
          Dashboard Analytics
        </h1>
        <p style={{ margin: "4px 0 0", fontSize: 13, color: T.textSub }}>
          All graphs from API — {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </p>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
          gap: "1.25rem",
        }}
      >
        {/* 1 */}
        <Card title="Weekly Tickets — Bar Chart" accent={T.accent}>
          <WeeklyTicketsChart data={data.weeklyTickets} />
        </Card>

        {/* 2 */}
        <Card title="Weekly Tickets — Area Chart" accent={T.green}>
          <WeeklyAreaChart data={data.weeklyTickets} />
          <div style={{ display: "flex", gap: "1rem" }}>
            {[
              { label: "Created", color: T.accent },
              { label: "Resolved", color: T.green },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 11, color: T.textSub, fontFamily: "'DM Mono', monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 3 */}
        <Card title="Weekly Tickets — Radar Chart" accent={T.violet}>
          <RadarChart data={data.weeklyTickets} />
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
            {[
              { label: "Created", color: T.accent },
              { label: "Resolved", color: T.green },
            ].map((l) => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: l.color }} />
                <span style={{ fontSize: 10, color: T.textSub, fontFamily: "'DM Mono', monospace" }}>{l.label}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* 4 */}
        <Card title="Satisfaction Trend" accent={T.amber}>
          <SatisfactionChart data={data.satisfactionTrend} />
        </Card>

        {/* 5 */}
        <Card title="Resolution Time" accent={T.rose}>
          <ResolutionTimeChart data={data.resolutionTimeTrend} />
        </Card>

        {/* 6 */}
        <Card title="Agent Load — Bars" accent={T.violet}>
          <AgentLoadChart data={data.agentLoad} />
        </Card>

        {/* 7 */}
        <Card title="Agent Load — Bubble Chart" accent={T.accent}>
          <AgentBubbleChart data={data.agentLoad} />
          <p style={{ margin: 0, fontSize: 10, color: T.textMuted, fontFamily: "'DM Mono', monospace" }}>
            X axis = open tickets · Y axis = resolved · Bubble size = total workload
          </p>
        </Card>

        {/* 8 — null data gracefully */}
        <Card title="Ticket Distribution" accent={T.textMuted}>
          {data.ticketDistribution === null ? (
            <TicketDistributionFallback />
          ) : (
            <p style={{ color: T.textSub }}>Chart here</p>
          )}
        </Card>
      </div>
    </div>
  );
}