"use client";
import React, { useState } from "react";
import FloatingSidebar from "@/src/shared/components/layout/FloatingSidebar";
import Navbar from "@/src/shared/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="relative flex h-screen w-full bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* 1. Atmospheric Background (Glows) */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        {/* base dark center */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at center, rgba(6,6,10,0.90) 0%, rgba(3,3,5,0.95) 45%, #000 100%)",
          }}
        />

        {/* top-left cyan glow — pinned to corner */}
        <div
          className="absolute -top-90 -left-90"
          style={{
            width: 900,
            height: 900,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(81,194,222,0.72) 0%, rgba(81,194,222,0.42) 18%, rgba(81,194,222,0.16) 40%, rgba(81,194,222,0.04) 65%, transparent 80%)",
            filter: "blur(16px)",
          }}
        />

        {/* cyan rays — long thin beams across center */}
        <div
          className="absolute top-0 left-0"
          style={{
            width: 1100,
            height: 1100,
            background:
              "conic-gradient(from 200deg, transparent 0deg, rgba(81,194,222,0.10) 8deg, transparent 18deg, rgba(81,194,222,0.08) 26deg, transparent 38deg, rgba(81,194,222,0.07) 46deg, transparent 60deg, rgba(81,194,222,0.06) 68deg, transparent 85deg, rgba(81,194,222,0.04) 95deg, transparent 120deg, transparent 360deg)",
            borderRadius: "9999px",
            filter: "blur(20px)",
            transform: "rotate(-10deg)",
            transformOrigin: "top left",
          }}
        />

        {/* right purple glow — pinned to right edge */}
        <div
          className="absolute top-1/2 -right-90"
          style={{
            width: 860,
            height: 860,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, #9930e0b8 0%, #7a1fbb85 1%, rgba(90,20,144,0.28) 42%, rgba(55,20,80,0.08) 65%, transparent 80%)",
            filter: "blur(18px)",
          }}
        />

        {/* bottom subtle cyan balance */}
        <div
          className="absolute -bottom-20 left-1/4"
          style={{
            width: 600,
            height: 400,
            borderRadius: "9999px",
            background:
              "radial-gradient(circle, rgba(81,194,222,0.14) 0%, rgba(81,194,222,0.05) 45%, transparent 72%)",
            filter: "blur(40px)",
          }}
        />

        {/* soft vignette */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(0,0,0,0.08), rgba(0,0,0,0.40))",
          }}
        />
      </div>

      {/* 2. Floating Sidebar */}
      <FloatingSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      {/* 3. Main Content Wrapper */}
      <div
        className="relative z-10 flex flex-col flex-1 transition-all duration-500 ease-in-out"
        style={{
          paddingLeft: "100px",
          paddingRight: "24px",
        }}
      >
        <Navbar />

      <main className="mt-4 flex-1 mb-6 rounded-[32px] bg-white/[0.02] backdrop-blur-xl border border-white/10 p-1 min-h-[calc(100vh-100px)]"
        style={{
          boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.18), 0 32px 80px 0 rgba(0,0,0,0.40), 0 2px 8px 0 rgba(81,194,222,0.07), inset 0 1px 0 rgba(255,255,255,0.06)",
        }}
      >
          {children}
          {/* Toast container */}
          <Toaster position="top-right" />
        </main>
      </div>
    </div>
  );
}