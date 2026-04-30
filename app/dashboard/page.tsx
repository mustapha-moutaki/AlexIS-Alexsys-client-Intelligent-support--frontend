"use client";
import React from "react";
import { Search, MoreHorizontal } from "lucide-react";

const Shimmer = ({ style }) => (
  <div
    style={{
      background: "linear-gradient(90deg, #1a1a1e 25%, #242429 50%, #1a1a1e 75%)",
      backgroundSize: "200% 100%",
      animation: "shimmer 1.5s infinite linear",
      ...style,
    }}
  />
);

const card = {
  background: "#131316",
  border: "0.0625rem solid rgba(255,255,255,0.05)",
  borderRadius: "1rem",
};

const ChartSkeleton = () => (
  <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <Shimmer style={{ width: "30%", height: "0.875rem", borderRadius: "0.25rem" }} />
      <Shimmer style={{ width: "15%", height: "0.875rem", borderRadius: "0.25rem" }} />
    </div>
    <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: "2%", paddingTop: "0.625rem" }}>
      {[60, 40, 80, 50, 90, 70, 45].map((h, i) => (
        <Shimmer key={i} style={{ flex: 1, height: `${h}%`, borderRadius: "0.25rem 0.25rem 0 0" }} />
      ))}
    </div>
  </div>
);

export default function DashboardSkeleton() {
  return (
    <div
      style={{
        fontFamily: "'DM Sans', sans-serif",
        height: "95%", // Fits parent height by 95%
        width: "95%",
        margin: "auto",
        background: "#0d0d10",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // No overflow, no scroll
        borderRadius: "1rem",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;900&display=swap');
        @keyframes shimmer {
          0%   { background-position: -200% 0; }
          100% { background-position:  200% 0; }
        }
      `}</style>

      {/* Content Area */}
      <div 
        style={{ 
          flex: 1, 
          display: "flex",
          flexDirection: "column",
          padding: "1.5rem", 
          paddingBottom: "3.75rem", 
          width: "100%",
          maxWidth: "100%", 
          margin: "0 auto",
          overflow: "hidden", // Ensures internal content doesn't force a scroll
        }}
      >
        {/* Top bar */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "2rem", height: "2rem", borderRadius: "0.625rem",
              background: "linear-gradient(135deg, #7C3AED, #4C1D95)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <svg width="1rem" height="1rem" viewBox="0 0 24 24" fill="white">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
              </svg>
            </div>
            <span style={{ fontWeight: 900, fontSize: "1.125rem", letterSpacing: "-0.03rem" }}>Cryptoin</span>
          </div>

          <div style={{ flex: 1, maxWidth: "25rem", marginInline: "2rem" }}>
            <div style={{
              display: "flex", alignItems: "center", gap: "0.5rem",
              padding: "0.625rem 1rem", borderRadius: "0.75rem",
              background: "rgba(255,255,255,0.03)",
              border: "0.0625rem solid rgba(255,255,255,0.08)",
            }}>
              <Search size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
              <Shimmer style={{ flex: 1, height: "0.625rem", borderRadius: "0.25rem" }} />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <Shimmer style={{ width: "6rem", height: "2.25rem", borderRadius: "0.625rem" }} />
            <Shimmer style={{ width: "2.25rem", height: "2.25rem", borderRadius: "50%" }} />
          </div>
        </div>

        {/* Header */}
        <div style={{ marginBottom: "1.5rem", flexShrink: 0 }}>
          <h1 style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: "0.5rem" }}>Dashboard Overview</h1>
          <Shimmer style={{ width: "12rem", height: "0.875rem", borderRadius: "0.25rem" }} />
        </div>

        {/* Dashboard Grid - Set to shrink if needed */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "1fr 2fr", 
          gap: "1.25rem", 
          marginBottom: "1.25rem",
          minHeight: 0,
          flexShrink: 1 
        }}>
           {/* Balance Card */}
           <div style={{ ...card, padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Shimmer style={{ width: "40%", height: "0.75rem", borderRadius: "0.25rem" }} />
              <MoreHorizontal size={18} style={{ color: "rgba(255,255,255,0.2)" }} />
            </div>
            <Shimmer style={{ width: "70%", height: "2rem", borderRadius: "0.5rem" }} />
            <div style={{ display: "flex", gap: "0.5rem" }}>
               <Shimmer style={{ width: "3.75rem", height: "1.5rem", borderRadius: "0.375rem" }} />
               <Shimmer style={{ width: "3.75rem", height: "1.5rem", borderRadius: "0.375rem" }} />
            </div>
          </div>

          {/* Statistics Card */}
          <div style={{ ...card, padding: "1.5rem" }}>
             <ChartSkeleton />
          </div>
        </div>

        {/* Table Placeholder - Set flex to 1 and min-height 0 to fit remaining space without scrolling */}
        <div style={{ ...card, padding: "1.5rem", flex: 1, minHeight: 0, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
           <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.25rem", flexShrink: 0 }}>
              <Shimmer style={{ width: "9rem", height: "1rem", borderRadius: "0.25rem" }} />
              <Shimmer style={{ width: "5rem", height: "1rem", borderRadius: "0.25rem" }} />
           </div>
           
           <div style={{ display: "flex", flexDirection: "column", height: "100%", justifyContent: "space-around" }}>
             {[1, 2, 3, 4, 5].map((i) => (
               <div key={i} style={{ 
                 display: "flex", 
                 gap: "1rem", 
                 padding: "0.5rem 0", 
                 borderBottom: i === 5 ? "none" : "0.0625rem solid rgba(255,255,255,0.05)" 
               }}>
                  <Shimmer style={{ width: "2rem", height: "2rem", borderRadius: "0.5rem", flexShrink: 0 }} />
                  <Shimmer style={{ flex: 2, height: "1rem", borderRadius: "0.25rem", alignSelf: "center" }} />
                  <Shimmer style={{ flex: 1, height: "1rem", borderRadius: "0.25rem", alignSelf: "center" }} />
                  <Shimmer style={{ flex: 1, height: "1rem", borderRadius: "0.25rem", alignSelf: "center" }} />
               </div>
             ))}
           </div>
        </div>
      </div>
    </div>
  );
}