"use client";

import { useParams, useRouter } from "next/navigation";
import { getUserById } from "@/src/features/auth/services/user.service";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import {
  User, Mail, Phone, Shield, Settings,
  MapPin, Activity, Zap, Star, ArrowLeft,
} from "lucide-react";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useUserById } from "@/src/hooks/useUsers";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";

// LIGHT MODE THEME CONSTANTS
const ACCENT = "#3eaec9"; // Deeper cyan for better contrast on white
const DIM = "#64748b";    // Slate-500
const BORDER = "1px solid #e2e8f0"; // Slate-200
const CARD_BG = "#ffffff";
const PAGE_BG = "#f8fafc"; // Slate-50

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: user, isLoading, isError, error } = useUserById(id!);

  if (isLoading) return <SimpleSpinner />;

  if (isError || !user) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 bg-[#f8fafc]">
        <p className="text-slate-400">Error: {error?.message ?? "User not found"}</p>
        <button 
          onClick={() => router.back()} 
          className="px-6 py-2 rounded-lg bg-[#51c2de] text-white font-bold text-sm shadow-lg shadow-cyan-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-4 gap-4 overflow-y-auto bg-[#f8fafc]" style={{ color: "#1e293b" }}>
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: "Dashboard", route: "/dashboard" },
          { name: "Manage users", route: "/dashboard/users" },
          { name: `${user.firstName} ${user.lastName}` },
        ]}
      />

      {/* Back button + Title */}
      <div className="flex items-center gap-3 flex-shrink-0">
        <ButtonGoBack />
        <div>
          <h1 className="font-bold tracking-tight text-slate-800" style={{ fontSize: 18 }}>User Profile</h1>
          <p style={{ color: DIM, fontSize: 11 }}>Viewing details for {user.firstName} {user.lastName}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex gap-4 flex-1 min-h-0">

        {/* Left: Profile Card */}
        <div
          className="flex flex-col items-center rounded-2xl p-6 gap-4 flex-shrink-0 shadow-sm shadow-slate-200/60"
          style={{ width: 280, background: CARD_BG, border: BORDER }}
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-slate-100 p-1 bg-slate-50 shadow-inner">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-100 to-indigo-50 flex items-center justify-center">
                <User size={32} className="text-sky-500/70" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-white rounded-full shadow-sm" />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold text-slate-800">{user.firstName} {user.lastName}</h2>
            <p className="text-sky-600 text-xs font-semibold">@{user.username}</p>
          </div>

          {/* Role Badge */}
          <span
            className="rounded-lg text-[10px] font-bold uppercase tracking-wider"
            style={{
              padding: "4px 14px",
              background: user.role === "SUPER_ADMIN" ? "#f5f3ff" : "#ecfeff",
              color: user.role === "SUPER_ADMIN" ? "#7c3aed" : ACCENT,
              border: `1px solid ${user.role === "SUPER_ADMIN" ? "#ddd6fe" : "#cffafe"}`,
            }}
          >
            {user.role}
          </span>

          {/* Contact Details */}
          <div className="w-full space-y-2 mt-2">
            <DetailRow icon={<Mail size={13} />} label="Email" value={user.email} />
            <DetailRow icon={<Phone size={13} />} label="Phone" value={user.phoneNumber || "—"} />
            <DetailRow icon={<MapPin size={13} />} label="Location" value="—" />
          </div>

          {/* Edit button */}
          <button
            className="mt-auto w-full py-2.5 rounded-xl font-bold text-xs transition-all hover:bg-[#45b6d1] active:scale-95 shadow-md shadow-cyan-100"
            style={{ background: "#51c2de", color: "white" }}
          >
            Edit Profile
          </button>
        </div>

        {/* Right: Stats + Info */}
        <div className="flex-1 flex flex-col gap-4 min-h-0">

          {/* Stats Row */}
          <div className="grid grid-cols-4 gap-3 flex-shrink-0">
            <StatCard icon={<Activity size={16} />} title="Activity" value="24" trend="+12%" />
            <StatCard icon={<Zap size={16} />} title="Performance" value="98.2%" trend="Stable" />
            <StatCard icon={<Shield size={16} />} title="Security" value="High" trend="Safe" />
            <StatCard icon={<Star size={16} />} title="Membership" value="Gold" trend="Active" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            <InfoCard title="Account Information">
              <InfoRow label="User ID" value={String(user.id)} />
              <InfoRow label="Username" value={user.username || "—"} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Role" value={user.role || ""} />
            </InfoCard>

            <InfoCard title="Security & Access">
              <InfoRow label="Status" value="Active" valueColor="#16a34a" />
              <InfoRow label="2FA" value="Enabled" valueColor="#16a34a" />
              <InfoRow label="Last Login" value="2 hours ago" />
              <InfoRow label="Sessions" value="1 active" />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub-components (Light Mode Refined) ---- */

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg bg-slate-50 border border-slate-100">
      <span className="text-sky-500">{icon}</span>
      <div className="flex flex-col truncate">
        <span style={{ fontSize: 8, color: "#94a3b8", textTransform: "uppercase", letterSpacing: "0.06em", fontWeight: 700 }}>{label}</span>
        <span className="truncate" style={{ fontSize: 11, color: "#334155", fontWeight: 500 }}>{value}</span>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3 bg-white border border-slate-200 shadow-sm shadow-slate-100">
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-xl bg-sky-50 text-sky-500 border border-sky-100">{icon}</div>
        <span className="text-[8px] font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-md border border-green-100">{trend}</span>
      </div>
      <div>
        <p style={{ fontSize: 9, color: "#64748b", textTransform: "uppercase", letterSpacing: "0.05em", fontWeight: 600 }}>{title}</p>
        <p className="text-lg font-bold text-slate-800">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-5 flex flex-col gap-4 bg-white border border-slate-200 shadow-sm shadow-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">{title}</h3>
      <div className="space-y-1">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between py-2 border-bottom border-slate-50">
      <span style={{ fontSize: 11, color: "#64748b", fontWeight: 500 }}>{label}</span>
      <span style={{ fontSize: 11, color: valueColor ?? "#1e293b", fontWeight: 600 }}>{value}</span>
    </div>
  );
}