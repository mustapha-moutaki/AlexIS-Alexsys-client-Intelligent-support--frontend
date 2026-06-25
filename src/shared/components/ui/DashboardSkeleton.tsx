"use client";
import React from "react";

// 1. The Animation Component
interface ShimmerProps {
  className?: string;
  style?: React.CSSProperties;
}

const Shimmer = ({ className, style }: ShimmerProps) => (
  <div
    className={className}
    style={{
      background: "linear-gradient(90deg, #ffffff 25%, #f5f5f5 50%, #ffffff 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      borderRadius: "0.25rem",
      ...style,
    }}
  />
);

// 2. The Main Skeleton Component
export default function DashboardSkeleton() {
  const cardStyle = {
    background: "transparent",
    border: "1px solid rgba(255,255,255,0.05)",
    borderRadius: "1rem",
    padding: "1.5rem",
  };

  return (
    <div style={{ width: "100%", height: "100%", background: "transparent", color: "#fff", padding: "2rem", fontFamily: "sans-serif" }}>
      {/* Keyframes for the animation */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>

      {/* Header Section */}
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "2rem" }}>
        <div>
          <Shimmer style={{ width: "150px", height: "1.5rem", marginBottom: "0.5rem" }} />
          <Shimmer style={{ width: "100px", height: "0.75rem" }} />
        </div>
        <div style={{ display: "flex", gap: "1rem" }}>
          <Shimmer style={{ width: "100px", height: "2.5rem", borderRadius: "0.5rem" }} />
          <Shimmer style={{ width: "40px", height: "40px", borderRadius: "50%" }} />
        </div>
      </div>

      {/* Top Grid (Stats) */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
        {/* Left Card */}
        <div style={cardStyle}>
          <Shimmer style={{ width: "40%", height: "0.75rem", marginBottom: "1rem" }} />
          <Shimmer style={{ width: "70%", height: "2rem", marginBottom: "1rem" }} />
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <Shimmer style={{ width: "60px", height: "1.5rem" }} />
            <Shimmer style={{ width: "60px", height: "1.5rem" }} />
          </div>
        </div>

        {/* Right Card (Chart bars) */}
        <div style={{ ...cardStyle, display: "flex", alignItems: "flex-end", gap: "10px" }}>
          {[60, 40, 80, 50, 90, 70, 45, 60, 30].map((h, i) => (
            <Shimmer key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "4px 4px 0 0" }} />
          ))}
        </div>
      </div>

      {/* Bottom Table Section */}
      <div style={cardStyle}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem" }}>
          <Shimmer style={{ width: "200px", height: "1rem" }} />
          <Shimmer style={{ width: "80px", height: "1rem" }} />
        </div>

        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ 
            display: "flex", 
            gap: "1rem", 
            padding: "1rem 0", 
            borderBottom: i === 4 ? "none" : "1px solid rgba(255,255,255,0.05)" 
          }}>
            <Shimmer style={{ width: "32px", height: "32px", borderRadius: "8px" }} />
            <Shimmer style={{ flex: 2, height: "1rem" }} />
            <Shimmer style={{ flex: 1, height: "1rem" }} />
            <Shimmer style={{ flex: 1, height: "1rem" }} />
          </div>
        ))}
      </div>
    </div>
  );
}