"use client";
import React from "react";
import { 
  User, Mail, Phone, Shield, Settings, 
  MapPin, Activity, Zap, Star, bell
} from "lucide-react";

interface UserProfileProps {
  user: any;
  onClose?: () => void;
}




export default function UserProfile({ user, onClose }: UserProfileProps) {
  const BORDER = "1px solid #ffffff1f";
  const GLASS_CARD = "#ffffff08";

  
  return (
    <div
      className="fixed inset-0 z-[998] flex items-center justify-center"
      style={{ background: "#000000ba", backdropFilter: "blur(6px)", borderRadius: "32px" }}
      onClick={onClose}
    >
    <div
      className="relative z-[999] w-full max-w-[90%] group"
      style={{ maxHeight: "50vh"}}
      onClick={(e) => e.stopPropagation()}
    >
      {/* 1. Main Container Window */}
      <div 
        className="relative overflow-hidden backdrop-blur-4xl rounded-[32px] flex flex-col p-5 gap-4 shadow-2xl transition-all duration-500 hover:-translate-y-1"
        style={{ 
          background: "linear-gradient(145deg, rgba(0, 0, 0, 1) 0%, rgba(255,255,255,0.02) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.55)",
        }}
      >
        {/* Close Button */}
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 flex items-center justify-center rounded-full transition-all hover:scale-110 hover:bg-white/10"
            style={{ width: 32, height: 32, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)" }}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        )}
        {/* Top Section: Left 2x2 Grid + Right Tall Profile */}
        <div className="flex-1 flex gap-3 min-h-0">
          
          {/* Left Side: 2x2 Grid */}
          <div className="flex-[2] grid grid-cols-2 grid-rows-2 gap-2">
            <StatCard icon={<Activity size={14} />} title="Recent Activity" value="24 Actions" trend="+12%" />
            <StatCard icon={<Zap size={14} />} title="Performance" value="98.2%" trend="Stable" />
            <StatCard icon={<Shield size={14} />} title="Security Level" value="High" trend="Encrypted" />
            <StatCard icon={<Star size={14} />} title="Membership" value="Gold Tier" trend="Active" />
          </div>

          {/* Right Side: Tall Profile Hero */}
          <div 
            className="flex-1 rounded-[20px] flex flex-col items-center justify-center p-3 text-center"
            style={{ background: GLASS_CARD, border: BORDER }}
          >
            <div className="relative mb-3">
              <div className="w-16 h-16 rounded-full border-2 border-white/20 p-1 backdrop-blur-md">
                <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-purple-500/20 flex items-center justify-center">
                  <User size={28} className="text-white/80" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-[#1a1a1a] rounded-full"></div>
            </div>
            
            <h2 className="text-base font-bold text-white mb-0.5">{user.firstName} {user.lastName}</h2>
            <p className="text-sky-400 text-xs font-medium mb-3">@{user.username}</p>
            
            <div className="w-full space-y-1.5">
               <ProfileDetail icon={<Mail size={12} />} text={user.email} />
               <ProfileDetail icon={<Phone size={12} />} text={user.phoneNumber} />
               <ProfileDetail icon={<MapPin size={12} />} text="New York, USA" />
            </div>

            <button className="mt-4 w-full py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/10 text-white text-xs font-medium transition-all">
              Edit Profile
            </button>
          </div>
        </div>

        {/* Bottom Section */}
        <div 
          className="h-16 flex-shrink-0 rounded-[20px] px-4 py-2 flex items-center justify-between"
          style={{ background: GLASS_CARD, border: BORDER }}
        >
          <div className="flex gap-6">
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Total Balance</p>
              <p className="text-sm font-semibold text-white">$12,450.00</p>
            </div>
            <div className="w-px h-8 bg-white/10" />
            <div>
              <p className="text-[9px] uppercase tracking-widest text-white/40 mb-0.5">Joined Date</p>
              <p className="text-sm font-semibold text-white">Jan 12, 2024</p>
            </div>
          </div>

          <div className="flex gap-2">
             <button className="p-2 rounded-lg bg-white/5 border border-white/10 text-white/60 hover:text-white transition-colors">
                <Settings size={14} />
             </button>
             <button className="px-4 py-2 rounded-lg bg-sky-500 text-[#0d0014] font-bold text-xs hover:scale-105 transition-transform">
                Upgrade Plan
             </button>
          </div>
        </div>

      </div>
    </div>
    </div>
  );
}

// Sub-component for the 2x2 grid cards
function StatCard({ icon, title, value, trend }: any) {
  return (
    <div 
      className="rounded-[16px] p-3 flex flex-col justify-between group hover:bg-white/5 transition-all"
      style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
    >
      <div className="flex items-start justify-between">
        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">
          {icon}
        </div>
        <span className="text-[8px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-md">
          {trend}
        </span>
      </div>
      <div>
        <p className="text-white/40 text-[9px] uppercase tracking-wider mb-0.5">{title}</p>
        <p className="text-base font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

// Sub-component for profile detail rows
function ProfileDetail({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 text-white/70 text-[10px]">
      <span className="text-sky-400/60">{icon}</span>
      <span className="truncate">{text}</span>
    </div>
  );
}