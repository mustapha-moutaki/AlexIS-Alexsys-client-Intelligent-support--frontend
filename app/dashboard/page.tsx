
"use client";
import React, { useState, useRef, useEffect } from "react";
import { Search } from "lucide-react";
import useAuthStore from "@/src/store/authStore";
import FieldSkeleton from "@/components/ui/FieldSkeleton";

// ─── Stats IMPORT ────────────────────────────────────────────────────────────
import { useAdminDashboardOverview } from "@/src/hooks/useAdminDashboardOverview";


// ─── PAGE IMPORTS ────────────────────────────────────────────────────────────
import Overview from "./Overview";
import Graphs from "./Graphs";
import Details from "./Details";
import Reports from "./Reports";
// import DashboardSkeleton from "@/src/shared/components/ui/DashboardSkeleton";

// ─── LIQUID NAVBAR COMPONENT ──────────────────────────────────────────────────
const navItems = ["Overview", "Graphs", "Details", "Reports"];

function SectionNavbar({ activeIndex, setActiveIndex }: { activeIndex: number, setActiveIndex: (i: number) => void }) {
  const [hovered, setHovered] = useState<number | null>(null);
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0 });
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const index = hovered !== null ? hovered : activeIndex;
    const el = refs.current[index];
    const nav = navRef.current;
    if (!el || !nav) return;
    
    const navRect = nav.getBoundingClientRect();
    const elRect = el.getBoundingClientRect();
    setPillStyle({ left: elRect.left - navRect.left, width: elRect.width });
  }, [activeIndex, hovered]);

  return (
    <div style={{ position: "relative" }}>
      {/* Liquid Gooey Filter */}
      <svg style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="7" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -10" result="goo" />
          </filter>
        </defs>
      </svg>
      {/*  sesction navbar */}
<div
  ref={navRef}
  style={{
    position: "relative",
    display: "inline-flex",
    gap: 6,
    padding: 6,
    borderRadius: 18,
    background: "linear-gradient(135deg, #03000552, #ffffff05)",
    backdropFilter: "blur(18px)",
    WebkitBackdropFilter: "blur(18px)",
    border: "1px solid rgba(255,255,255,0.12)",
    boxShadow: "0 12px 40px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.08)",
    overflow: "hidden",
  }}
>
  {/* soft glow layer */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      background: "radial-gradient(circle at top left, rgba(81,194,222,0.18), transparent 60%)",
      pointerEvents: "none",
    }}
  />

  {/* Liquid Pill */}
  <div
    style={{
      position: "absolute",
      inset: 0,
      filter: "url(#goo)",
      pointerEvents: "none",
    }}
  >
    <div
      style={{
        position: "absolute",
        top: 6,
        left: pillStyle.left,
        width: pillStyle.width,
        height: "calc(100% - 12px)",
        borderRadius: 14,
      
        background:
          hovered !== null
            ? "linear-gradient(135deg, rgba(81,194,222,0.35), rgba(81,194,222,0.15))"
            : "linear-gradient(135deg, #51c2de11, rgba(103, 23, 161, 0))",
        boxShadow:
          hovered !== null
            ? "0 0 18px rgba(81,194,222,0.35)"
            : "0 0 18px rgba(58, 112, 237, 0.57)",
        border: "1px solid rgba(255,255,255,0.12)",
        transition: "all 0.45s cubic-bezier(0.4, 0, 0.2, 1)",
      }}
    />
  </div>

  {navItems.map((label, i) => {
    const icons = [
      <svg key="0" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#51C2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
      <svg key="1" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#51C2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 3v18h18"/><path d="m19 9-5 5-4-4-3 3"/></svg>,
      <svg key="2" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#51C2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
      <svg key="3" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#51C2DE" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/></svg>
    ];

    return (
      <button
        key={label}
        ref={(el) => (refs.current[i] = el)}
        onClick={() => setActiveIndex(i)}
        onMouseEnter={() => setHovered(i)}
        onMouseLeave={() => setHovered(null)}
        style={{
          position: "relative",
          zIndex: 2,
          cursor: "pointer",
          padding: "9px 22px",
          borderRadius: 14,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: "0.2px",
          color: activeIndex === i || hovered === i ? "#51C2DE" : "rgba(255,255,255,0.45)",
          background: "transparent",
          border: "none",
          outline: "none",
          display: "flex",
          alignItems: "center",
          gap: 8,
          transition: "all 0.25s ease",
          transform: hovered === i ? "translateY(-1px)" : "translateY(0)",
        }}
      >
        {icons[i]}
        {label}
      </button>
    );
  })}
</div>
    </div>
  );
}

// ─── MAIN DASHBOARD ───────────────────────────────────────────────────────────
export default function Dashboard() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = navItems[activeIndex];

  // fetch user data from zustand store
  const [isExistUser, setIsExistUser] = useState(false);

  const user = useAuthStore((state)=> state.user);

  useEffect(() => {
  setIsExistUser(!!user);
}, [user]);




  // Logic to determine which page component to display
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
    <div style={{ 
      fontFamily: "'DM Sans', sans-serif", 
      height: "85vh", 
      width: "100%", 
      background: "#0d0d10", 
      color: "#fff", 
      display: "flex", 
      flexDirection: "column", 
      overflow: "hidden" 
    }}>
      {/* Styles for scrollbar removal and animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700;900&display=swap');
        
        /* Hide scrollbar for Chrome, Safari and Opera */
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }

        /* Hide scrollbar for IE, Edge and Firefox */
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Persistent Header Section */}
      <header style={{ 
        display: "flex", 
        alignItems: "center", 
        justifyContent: "space-between", 
        padding: "1rem 1.5rem",
        borderBottom: "1px solid rgba(255,255,255,0.05)"
      }}>
        {/* Search */}
        <div style={{ flex: 1, maxWidth: "20rem" }}>
          <div style={{ 
            display: "flex", 
            alignItems: "center", 
            gap: "0.6rem", 
            padding: "0.5rem 0.8rem", 
            borderRadius: "0.75rem", 
            background: "rgba(255,255,255,0.03)", 
            border: "1px solid rgba(255,255,255,0.07)" 
          }}>
            <Search size={14} style={{ color: "rgba(255,255,255,0.3)" }} />
            <input 
              type="text" 
              placeholder="Search components..." 
              style={{ background: "none", border: "none", outline: "none", color: "#fff", fontSize: 13, width: "100%" }}
            />
          </div>
        </div>

        {/* Liquid Navbar */}
        <SectionNavbar activeIndex={activeIndex} setActiveIndex={setActiveIndex} />

        {/* User Profile */}
        <div style={{ display: "flex", gap: 15, alignItems: "center" }}>
          <div style={{ textAlign: "right" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#fff" }}>

              {isExistUser ? user?.firstName+" "+user?.lastName : <FieldSkeleton/>}
              
              </div>
            

            <div style={{ fontSize: 9, color: "#34d9a5" }}>● Online</div>
          </div>
          {user?.profilePicture ? (
  <img
    src={user.profilePicture}
    alt="profile"
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      objectFit: "cover",
    }}
  />
) : (
  <div
    style={{
      width: 30,
      height: 30,
      borderRadius: "50%",
      background: "linear-gradient(135deg, #000000, #371450)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: 12,
      fontWeight: 700,
      color: "white",
    }}
  >
    {user?.firstName?.charAt(0)?.toUpperCase() || "U"}
  </div>
)}
        </div>
        </header>

      {/* Main Content Area (Scrollable but no visible scrollbar) */}
      <main className="hide-scrollbar" style={{ 
        flex: 1, 
        overflowY: "auto", 
        padding: "1.5rem",
        // height:"80vh"
      }}>
        {/* The 'key' ensures a fresh fade animation when switching tabs */}
        <div key={activeTab} style={{ animation: "fadeIn 0.4s ease-out" }}>
          {renderPage()}
        </div>
      </main>
    </div>
  );
}