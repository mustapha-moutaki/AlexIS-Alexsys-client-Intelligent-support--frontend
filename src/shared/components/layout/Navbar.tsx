"use client";

import { Bell, Settings, User } from "lucide-react";

const BRAND = "#51C2DE";

export default function Navbar() {
  return (
    <header
      className="flex items-center justify-between w-full flex-shrink-0"
      style={{
        height: 56,
        background: "#FFFFFF",
        borderBottom: "1px solid #E5E7EB",
        padding: "0 24px",
      }}
    >
      {/* Left: page breadcrumb / context label */}
      <div className="flex items-center gap-2">
        <div
          className="rounded-sm"
          style={{ width: 4, height: 16, background: BRAND }}
        />
        <span
          className="font-semibold uppercase tracking-widest"
          style={{ fontSize: 11, color: "#9CA3AF" }}
        >
          Dashboard
        </span>
      </div>

      {/* Right: actions */}
      <div className="flex items-center gap-1">
        {/* Notifications */}
        <button
          className="flex items-center justify-center rounded-md transition-colors hover:bg-gray-100"
          style={{ width: 34, height: 34, color: "#6B7280" }}
          aria-label="Notifications"
        >
          <Bell size={15} />
        </button>

        {/* Settings */}
        <button
          className="flex items-center gap-1.5 rounded-md transition-colors hover:bg-gray-100"
          style={{ height: 34, padding: "0 10px", color: "#6B7280", fontSize: 13, fontWeight: 500 }}
        >
          <Settings size={14} />
          <span>Settings</span>
        </button>

        {/* Divider */}
        <div style={{ width: 1, height: 20, background: "#E5E7EB", margin: "0 6px" }} />

        {/* User avatar */}
        <button
          className="flex items-center justify-center rounded-full transition-colors hover:bg-gray-100"
          style={{ width: 32, height: 32 }}
          aria-label="User account"
        >
          <div
            className="rounded-full flex items-center justify-center"
            style={{
              width: 28,
              height: 28,
              background: "rgba(81,194,222,0.10)",
              border: "1px solid rgba(81,194,222,0.25)",
            }}
          >
            <User size={13} style={{ color: BRAND }} />
          </div>
        </button>
      </div>
    </header>
  );
}