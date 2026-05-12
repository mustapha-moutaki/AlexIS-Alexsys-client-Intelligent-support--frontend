"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import useAuthStore from "@/src/store/authStore";
import FieldSkeleton from "@/components/ui/FieldSkeleton";

import { useAdminDashboardOverview } from "@/src/hooks/useAdminDashboardOverview";

import Overview from "./Overview";
import Graphs from "./Graphs";
import Details from "./Details";
import Reports from "./Reports";

const navItems = ["Overview", "Graphs", "Details", "Reports"];

const BRAND      = "#51C2DE";
const BRAND_TINT = "rgba(81,194,222,0.09)";
const BRAND_BDR  = "rgba(81,194,222,0.22)";

const NAV_ICONS = [
  // Overview
  <svg key="0" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
  // Graphs
  <svg key="1" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
  // Details
  <svg key="2" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
  // Reports
  <svg key="3" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/></svg>,
];

function SectionNavbar({
  activeIndex,
  setActiveIndex,
}: {
  activeIndex: number;
  setActiveIndex: (i: number) => void;
}) {
  return (
    <nav
      className="flex items-center gap-0.5"
      style={{
        background: "#F9FAFB",
        border: "1px solid #E5E7EB",
        borderRadius: "0.375rem",
        padding: "3px",
      }}
    >
      {navItems.map((label, i) => {
        const isActive = activeIndex === i;
        return (
          <button
            key={label}
            onClick={() => setActiveIndex(i)}
            className="flex items-center gap-1.5 rounded transition-all cursor-pointer"
            style={{
              padding: "5px 12px",
              fontSize: 12,
              fontWeight: isActive ? 600 : 500,
              color: isActive ? "#0E7B96" : "#6B7280",
              background: isActive ? "#FFFFFF" : "transparent",
              border: isActive ? `1px solid ${BRAND_BDR}` : "1px solid transparent",
              boxShadow: isActive ? "0 1px 2px rgba(0,0,0,0.06)" : "none",
            }}
          >
            <span style={{ color: isActive ? BRAND : "#9CA3AF" }}>{NAV_ICONS[i]}</span>
            {label}
          </button>
        );
      })}
    </nav>
  );
}

export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = navItems[activeIndex];
  const [isExistUser, setIsExistUser] = useState(false);
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    setIsExistUser(!!user);
  }, [user]);

  const renderPage = () => {
    switch (activeTab) {
      case "Overview": return <Overview />;
      case "Graphs":   return <Graphs />;
      case "Details":  return <Details />;
      case "Reports":  return <Reports />;
      default:         return <Overview />;
    }
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 0, height: "100%" }}>
      {/* Inner page header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 0 20px 0",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        {/* Left: search */}
        {/* <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "#FFFFFF",
            border: "1px solid #E5E7EB",
            borderRadius: "0.375rem",
            padding: "6px 10px",
            minWidth: 200,
          }}
        >
          <Search size={13} style={{ color: "#9CA3AF", flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Search..."
            style={{
              background: "none",
              border: "none",
              outline: "none",
              color: "#111827",
              fontSize: 12,
              width: "100%",
            }}
          />
        </div> */}

        {/* Center: tab nav */}
        <SectionNavbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        {/* Right: user info */}
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: "#111827" }}>
              {isExistUser ? user?.firstName + " " + user?.lastName : <FieldSkeleton />}
            </div>
            <div style={{ fontSize: 10, color: "#10B981", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3 }}>
              <span style={{ display: "inline-block", width: 5, height: 5, borderRadius: "50%", background: "#10B981" }} />
              Online
            </div>
          </div>
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="profile"
              style={{ width: 30, height: 30, borderRadius: "50%", objectFit: "cover", border: "2px solid #E5E7EB" }}
            />
          ) : (
            <div
              style={{
                width: 30,
                height: 30,
                borderRadius: "50%",
                background: BRAND_TINT,
                border: `2px solid ${BRAND_BDR}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 12,
                fontWeight: 700,
                color: BRAND,
              }}
            >
              {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
            </div>
          )}
        </div>
      </div>

      {/* Tab content */}
      <div key={activeTab} style={{ animation: "fadeIn 0.3s ease-out", flex: 1 }}>
        <style>{`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(6px); }
            to   { opacity: 1; transform: translateY(0); }
          }
        `}</style>
        {renderPage()}
      </div>
    </div>
  );
}