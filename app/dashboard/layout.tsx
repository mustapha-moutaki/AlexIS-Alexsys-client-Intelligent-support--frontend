"use client";
import React, { useState } from "react";
import FloatingSidebar from "@/src/shared/components/layout/FloatingSidebar";
import Navbar from "@/src/shared/components/layout/Navbar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  // We keep track of the sidebar state here so the content can move with it
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div className="relative flex h-screen w-full bg-[#0a0a0b] text-white overflow-x-hidden">
      {/* 1. Atmospheric Background (Glows) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[10%] -left-[5%] w-[40%] h-[50%] bg-[#371450]/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[10%] w-[30%] h-[40%] bg-[#52C2DE]/10 blur-[100px] rounded-full" />
      </div>

      {/* 2. Floating Sidebar */}
      {/* Pass the state down to the sidebar */}
      <FloatingSidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />

      {/* 3. Main Content Wrapper */}
      <div 
        className="relative z-10 flex flex-col flex-1 transition-all duration-500 ease-in-out"
        style={{ 
          // This creates the "hole" for the sidebar to sit in
          paddingLeft: isSidebarExpanded ? "240px" : "100px",
          paddingRight: "24px" 
        }}
      >
        <Navbar />
        
        <main className="mt-4 flex-1 mb-6 rounded-[32px] bg-white/[0.02] backdrop-blur-md border border-white/10 p-1 shadow-2xl min-h-[calc(100vh-100px)]">
          {children}
        </main>
      </div>
    </div>
  );
}