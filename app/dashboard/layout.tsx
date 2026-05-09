"use client";
import React, { useState } from "react";
import Sidebar from "@/src/shared/components/layout/FloatingSidebar";
import Navbar from "@/src/shared/components/layout/Navbar";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        width: "100%",
        background: "#f5f6f8",
        fontFamily: "'Inter', system-ui, sans-serif",
      }}
    >
      {/* Sidebar */}
      <div
        style={{
          borderRight: "1px solid #e8eaed",
          background: "#ffffff",
          height: "100vh",
          position: "fixed",
          zIndex: 50,
        }}
      >
        <Sidebar isExpanded={isSidebarExpanded} setIsExpanded={setIsSidebarExpanded} />
      </div>

      {/* Main column */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          flex: 1,
          minWidth: 0,
          transition: "margin-left 0.25s ease",
          marginLeft: isSidebarExpanded ? "200px" : "56px",
        }}
      >
        {/* Navbar */}
        <div
          style={{
            background: "#ffffff",
            borderBottom: "1px solid #e8eaed",
            position: "sticky",
            top: 0,
            zIndex: 40,
          }}
        >
          <Navbar />
        </div>

        {/* Page content */}
        <main style={{ flex: 1, overflow: "auto", padding: "2rem 2.5rem" }}>
          <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
            {children}
          </div>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                borderRadius: "6px",
                background: "#1e293b",
                color: "#f8fafc",
                fontSize: "13px",
                padding: "10px 14px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.12)",
              },
            }}
          />
        </main>
      </div>
    </div>
  );
}