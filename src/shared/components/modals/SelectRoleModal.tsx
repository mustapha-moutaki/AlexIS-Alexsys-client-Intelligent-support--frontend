"use client";
import React from "react";
import { XMarkIcon, ShieldCheckIcon, UserIcon, IdentificationIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

const BRAND      = "#4f6ef7";
const BRAND_T    = "rgba(79,110,247,0.08)";
const BORDER     = "#e8eaed";
const TEXT       = "#111827";
const TEXT_SUB   = "#6b7280";
const TEXT_MUTED = "#9ca3af";
const WHITE      = "#ffffff";
const BG         = "#f5f6f8";

const ROLES = [
  { id: 1, title: "Admin",  desc: "Full system access & controls", icon: ShieldCheckIcon,   iconColor: BRAND,    iconBg: "rgba(79,110,247,0.08)",  iconBorder: `1px solid rgba(79,110,247,0.18)` },
  { id: 2, title: "Agent",  desc: "Support & ticket management",   icon: IdentificationIcon, iconColor: "#7c3aed", iconBg: "rgba(139,92,246,0.08)", iconBorder: `1px solid rgba(139,92,246,0.18)` },
  { id: 3, title: "Client", desc: "Basic user features",           icon: UserIcon,           iconColor: "#0891b2", iconBg: "rgba(6,182,212,0.08)",  iconBorder: `1px solid rgba(6,182,212,0.18)`  },
];

export default function SelectRoleModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const router = useRouter();
  const [selectedRole, setSelectedRole] = React.useState<number>(3);

  if (!isOpen) return null;

  const handleConfirm = (roleId: number) => {
    router.push(`/dashboard/users/create?roleId=${roleId}`);
    onClose();
  };

  return (
    <>
      <style>{`
        @keyframes modalIn {
          from { opacity: 0; transform: translate(-50%, -50%) translateY(16px) scale(0.97); }
          to   { opacity: 1; transform: translate(-50%, -50%) translateY(0) scale(1); }
        }
        @keyframes rowIn {
          from { opacity: 0; transform: translateY(8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: "fixed", inset: 0, background: "rgba(15,20,40,0.35)", backdropFilter: "blur(4px)", WebkitBackdropFilter: "blur(4px)", zIndex: 50 }}
      />

      {/* Modal */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "fixed", top: "50%", left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: 52, width: 420,
          background: WHITE,
          border: `1px solid ${BORDER}`,
          borderRadius: "12px",
          boxShadow: "0 8px 40px rgba(0,0,0,0.1), 0 2px 8px rgba(0,0,0,0.06)",
          padding: "20px",
          animation: "modalIn 0.28s cubic-bezier(0.22,1,0.36,1) both",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          style={{ position: "absolute", top: 14, right: 14, width: 26, height: 26, borderRadius: "6px", background: BG, border: `1px solid ${BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: TEXT_MUTED, padding: 0, transition: "all 0.15s" }}
          onMouseEnter={e => { e.currentTarget.style.background = BORDER; e.currentTarget.style.color = TEXT; }}
          onMouseLeave={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = TEXT_MUTED; }}
        >
          <XMarkIcon style={{ width: 13, height: 13, strokeWidth: 2.5 }} />
        </button>

        {/* Header */}
        <div style={{ marginBottom: "16px" }}>
          <h2 style={{ fontSize: "15px", fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.01em" }}>Assign Role</h2>
          <p style={{ fontSize: "11px", color: TEXT_MUTED, margin: "3px 0 0" }}>Select account permission level</p>
        </div>

        {/* Role cards */}
        <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginBottom: "16px" }}>
          {ROLES.map((role, i) => {
            const isSelected = selectedRole === role.id;
            const Icon = role.icon;
            return (
              <div
                key={role.id}
                onClick={() => setSelectedRole(role.id)}
                style={{
                  display: "flex", alignItems: "center", gap: "12px",
                  padding: "11px 13px", borderRadius: "8px", cursor: "pointer",
                  border: isSelected ? `1px solid rgba(79,110,247,0.35)` : `1px solid ${BORDER}`,
                  background: isSelected ? BRAND_T : WHITE,
                  transition: "all 0.15s",
                  animation: `rowIn 0.25s ease ${i * 0.05}s both`,
                }}
                onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = BG; }}
                onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = WHITE; }}
              >
                {/* Icon */}
                <div style={{ width: 34, height: 34, borderRadius: "8px", flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: role.iconBg, border: role.iconBorder }}>
                  <Icon style={{ width: 16, height: 16, color: role.iconColor, strokeWidth: 1.8 }} />
                </div>

                {/* Text */}
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: "13px", fontWeight: 600, color: isSelected ? BRAND : TEXT, margin: 0, transition: "color 0.15s" }}>{role.title}</p>
                  <p style={{ fontSize: "10px", color: TEXT_MUTED, margin: "1px 0 0" }}>{role.desc}</p>
                </div>

                {/* Radio */}
                <div style={{ width: 15, height: 15, borderRadius: "50%", border: `1.5px solid ${isSelected ? BRAND : BORDER}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "border-color 0.15s" }}>
                  {isSelected && <div style={{ width: 7, height: 7, borderRadius: "50%", background: BRAND }} />}
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", paddingTop: "12px", borderTop: `1px solid ${BORDER}` }}>
          <button
            onClick={onClose}
            style={{ padding: "6px 14px", borderRadius: "6px", fontSize: "12px", fontWeight: 500, color: TEXT_SUB, background: "transparent", border: `1px solid ${BORDER}`, cursor: "pointer", transition: "all 0.15s" }}
            onMouseEnter={e => { e.currentTarget.style.background = BG; e.currentTarget.style.color = TEXT; }}
            onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT_SUB; }}
          >
            Cancel
          </button>
          <button
            onClick={() => handleConfirm(selectedRole)}
            style={{ padding: "6px 18px", borderRadius: "6px", fontSize: "12px", fontWeight: 600, color: WHITE, background: BRAND, border: "none", cursor: "pointer", transition: "opacity 0.15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Confirm
          </button>
        </div>
      </div>
    </>
  );
}