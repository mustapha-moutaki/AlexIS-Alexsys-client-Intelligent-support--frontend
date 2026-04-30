"use client";

import { User, Settings, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-center w-full pt-2">
      <nav className="h-11 flex items-center justify-between px-4 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl w-full max-w-4xl transition-all">
        
        {/* Left Side: Brand/Context (Small) */}
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#52C2DE] shadow-[0_0_8px_#52C2DE]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/40">
            Overview
          </span>
        </div>

        {/* Right Side: Icons & Settings */}
        <div className="flex items-center gap-1">
          
          {/* Notifications (Optional extra icon for balance) */}
          <button className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-[#371450]/50 transition-all">
            <Bell size={16} />
          </button>

          {/* Settings Glass Item */}
          <button className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-[#371450] hover:border-[#52C2DE]/20 transition-all group">
            <Settings size={14} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-xs font-medium">Settings</span>
          </button>

          {/* Divider */}
          <div className="w-px h-4 bg-white/10 mx-1" />

          {/* User Account */}
          <button className="flex items-center gap-2 p-1 rounded-full hover:bg-[#371450] transition-all group">
            <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-[#371450] to-[#52C2DE] p-[1px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0b] flex items-center justify-center">
                <User size={14} className="text-white/70" />
              </div>
            </div>
          </button>
          
        </div>
      </nav>
    </header>
  );
}