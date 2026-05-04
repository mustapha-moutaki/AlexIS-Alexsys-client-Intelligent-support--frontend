"use client";

import { User, Settings, Bell } from "lucide-react";

export default function Navbar() {
  return (
    <header className="flex justify-center w-full pt-1.5">
      {/* Reduced height from h-11 to h-10, px-4 to px-3.5, and rounded-2xl to rounded-xl */}
      <nav className="h-10 flex items-center justify-between px-3.5 bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-xl shadow-2xl w-full max-w-4xl transition-all">
        
        {/* Left Side: Brand/Context */}
        <div className="flex items-center gap-1.5">
          {/* Reduced dot from 1.5 to 1 */}
          <div className="w-1 h-1 rounded-full bg-[#52C2DE] shadow-[0_0_8px_#52C2DE]" />
          {/* Reduced text from 11px to 10px */}
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
            Overview
          </span>
        </div>

        {/* Right Side: Icons & Settings */}
        <div className="flex items-center gap-1">
          
          {/* Notifications */}
          <button className="p-1.5 rounded-lg text-white/40 hover:text-white hover:bg-[#371450]/50 transition-all">
            <Bell size={14} /> {/* Reduced from 16 */}
          </button>

          {/* Settings Glass Item */}
          {/* Reduced px-3 to px-2.5, py-1.5 to py-1 */}
          <button className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-white/5 border border-white/5 text-white/60 hover:text-white hover:bg-[#371450] hover:border-[#52C2DE]/20 transition-all group">
            <Settings size={13} className="group-hover:rotate-90 transition-transform duration-500" />
            <span className="text-[11px] font-medium">Settings</span> {/* Reduced from xs (12px) */}
          </button>

          {/* Divider */}
          <div className="w-px h-3.5 bg-white/10 mx-1" />

          {/* User Account */}
          <button className="flex items-center gap-2 p-0.5 rounded-full hover:bg-[#371450] transition-all group">
            {/* Reduced avatar from w-7 h-7 to w-6 h-6 */}
            <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-[#371450] to-[#52C2DE] p-[1px]">
              <div className="w-full h-full rounded-full bg-[#0a0a0b] flex items-center justify-center">
                <User size={12} className="text-white/70" /> {/* Reduced from 14 */}
              </div>
            </div>
          </button>
          
        </div>
      </nav>
    </header>
  );
}