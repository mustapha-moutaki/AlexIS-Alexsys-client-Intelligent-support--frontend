"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { getUserById } from "@/src/features/auth/services/user.service";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import {
  User, Mail, Phone, Shield, Settings,
  MapPin, Activity, Zap, Star, ArrowLeft,
} from "lucide-react";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";

import { useUserById } from "@/src/hooks/useUsers";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";


const A = "#51c2de";
const DIM = "#ffffff61";
const BORDER = "1px solid rgba(255,255,255,0.08)";
const GLASS = "rgba(255,255,255,0.03)";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: user, isLoading, isError, error } = useUserById(id!)

  if (isLoading) return <SimpleSpinner />;

  if (isError || !user) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-white">
        <p className="opacity-50">Error: {error?.message ?? "User not found"}</p>
        <button onClick={() => router.back()} className="px-6 py-2 rounded-lg bg-[#51c2de] text-black font-bold text-sm">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full w-full px-6 py-4 gap-4 overflow-y-auto" style={{ color: "white" }}>
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
        {/* button go back */}
        <ButtonGoBack />
        <div>
          <h1 className="font-bold tracking-tight text-white" style={{ fontSize: 18 }}>User Profile</h1>
          <p style={{ color: DIM, fontSize: 11 }}>Viewing details for {user.firstName} {user.lastName}</p>
        </div>
      </div>

      {/* Content Grid */}
      <div className="flex gap-4 flex-1 min-h-0">

        {/* Left: Profile Card */}
        <div
          className="flex flex-col items-center rounded-2xl p-6 gap-4 flex-shrink-0"
          style={{ width: 280, background: GLASS, border: BORDER }}
        >
          {/* Avatar */}
          <div className="relative">
            <div className="w-20 h-20 rounded-full border-2 border-white/15 p-1">
              <div className="w-full h-full rounded-full bg-gradient-to-br from-sky-400/20 to-purple-500/20 flex items-center justify-center">
                <User size={32} className="text-white/70" />
              </div>
            </div>
            <div className="absolute bottom-0 right-0 w-5 h-5 bg-green-500 border-2 border-[#0a0a0b] rounded-full" />
          </div>

          <div className="text-center">
            <h2 className="text-lg font-bold">{user.firstName} {user.lastName}</h2>
            <p className="text-sky-400 text-xs font-medium">@{user.username}</p>
          </div>

          {/* Role Badge */}
          <span
            className="rounded-lg text-xs font-semibold"
            style={{
              padding: "4px 14px",
              background: user.role === "SUPER_ADMIN" ? "rgba(192,132,252,0.15)" : "rgba(81,194,222,0.12)",
              color: user.role === "SUPER_ADMIN" ? "#c084fc" : A,
              border: `1px solid ${user.role === "SUPER_ADMIN" ? "#c084fc33" : "#51c2de33"}`,
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
            className="mt-auto w-full py-2.5 rounded-xl font-semibold text-xs transition-all hover:brightness-110 active:scale-95"
            style={{ background: A, color: "#0d0014" }}
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
            <StatCard icon={<Shield size={16} />} title="Security" value="High" trend="Encrypted" />
            <StatCard icon={<Star size={16} />} title="Membership" value="Gold" trend="Active" />
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-2 gap-3 flex-1">
            <InfoCard title="Account Information">
              <InfoRow label="User ID" value={String(user.id)} />
              <InfoRow label="Username" value={user.username || "—"} />
              <InfoRow label="Email" value={user.email} />
              <InfoRow label="Role" value={user.role} />
            </InfoCard>

            <InfoCard title="Security & Access">
              <InfoRow label="Status" value="Active" valueColor="#4ade80" />
              <InfoRow label="2FA" value="Enabled" valueColor="#4ade80" />
              <InfoRow label="Last Login" value="—" />
              <InfoRow label="Sessions" value="1 active" />
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---- Sub-components ---- */

function DetailRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center gap-2.5 px-3 py-2 rounded-lg" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.05)" }}>
      <span className="text-sky-400/50">{icon}</span>
      <div className="flex flex-col truncate">
        <span style={{ fontSize: 8, color: "#ffffff40", textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</span>
        <span className="truncate" style={{ fontSize: 11, color: "rgba(255,255,255,0.75)" }}>{value}</span>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, trend }: { icon: React.ReactNode; title: string; value: string; trend: string }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: GLASS, border: BORDER }}>
      <div className="flex items-center justify-between">
        <div className="p-2 rounded-xl bg-sky-500/10 text-sky-400">{icon}</div>
        <span className="text-[8px] font-bold text-green-400 bg-green-400/10 px-1.5 py-0.5 rounded-md">{trend}</span>
      </div>
      <div>
        <p style={{ fontSize: 9, color: "#ffffff40", textTransform: "uppercase", letterSpacing: "0.05em" }}>{title}</p>
        <p className="text-lg font-semibold text-white">{value}</p>
      </div>
    </div>
  );
}

function InfoCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: GLASS, border: BORDER }}>
      <h3 className="text-xs font-semibold uppercase tracking-wider" style={{ color: A }}>{title}</h3>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InfoRow({ label, value, valueColor }: { label: string; value: string; valueColor?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5" style={{ borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
      <span style={{ fontSize: 11, color: "#ffffff50" }}>{label}</span>
      <span style={{ fontSize: 11, color: valueColor ?? "rgba(255,255,255,0.8)", fontWeight: 500 }}>{value}</span>
    </div>
  );
}
