"use client";

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

export default function UnauthorizedPage() {
  const searchParams = useSearchParams();
  const errorMessage = searchParams.get("message") || "You don't have permission to access this resource.";

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#f8fafc",
      padding: "24px",
    }}>
      <div style={{
        maxWidth: "480px",
        width: "100%",
        textAlign: "center",
        background: "#ffffff",
        borderRadius: "16px",
        padding: "48px 32px",
        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
      }}>
        <div style={{
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          background: "#fef3c7",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "0 auto 24px",
        }}>
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
            <line x1="12" y1="8" x2="12" y2="12"/>
            <line x1="12" y1="16" x2="12.01" y2="16"/>
          </svg>
        </div>

        <h1 style={{ fontSize: "72px", fontWeight: 800, color: "#f59e0b", margin: "0 0 8px" }}>
          403
        </h1>

        <h2 style={{ fontSize: "24px", fontWeight: 700, color: "#1e293b", margin: "0 0 12px" }}>
          Access Forbidden
        </h2>

        <p style={{ fontSize: "16px", color: "#64748b", margin: "0 0 32px", lineHeight: 1.6 }}>
          {errorMessage}
        </p>

        <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
          <Link href="/" style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", background: "#6366f1", color: "#fff",
            borderRadius: "8px", textDecoration: "none",
            fontSize: "14px", fontWeight: 600,
          }}>
            Go Home
          </Link>

          <button onClick={() => window.history.back()} style={{
            display: "inline-flex", alignItems: "center", gap: "8px",
            padding: "12px 24px", background: "#f1f5f9", color: "#475569",
            borderRadius: "8px", border: "1px solid #e2e8f0",
            fontSize: "14px", fontWeight: 600, cursor: "pointer",
          }}>
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
}