"use client";

import { useCreateAdmin } from "@/src/hooks/useAdmin";
import { useCreateAgent } from "@/src/hooks/useAgent";
import { useCreateClient } from "@/src/hooks/useClient";
import CreateAdminForm from "@/src/shared/components/forms/CreateAdminForm";
import CreateAgentForm from "@/src/shared/components/forms/CreateAgentForm";
import CreateClient from "@/src/shared/components/forms/CreateClientForm";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useSearchParams } from "next/navigation";

const BRAND      = "#4f6ef7";
const BRAND_T    = "rgba(79,110,247,0.08)";
const BORDER     = "#e8eaed";
const TEXT       = "#111827";
const TEXT_MUTED = "#9ca3af";
const BG         = "#f5f6f8";
const WHITE      = "#ffffff";

const ROLE_META: Record<string, { label: string; color: string; bg: string; border: string }> = {
  ADMIN:  { label: "Admin",  color: BRAND,    bg: BRAND_T,                    border: "rgba(79,110,247,0.2)"  },
  AGENT:  { label: "Agent",  color: "#7c3aed", bg: "rgba(139,92,246,0.08)",   border: "rgba(139,92,246,0.2)"  },
  CLIENT: { label: "Client", color: "#0891b2", bg: "rgba(6,182,212,0.08)",    border: "rgba(6,182,212,0.2)"   },
};

export default function CreateUserPage() {
  const searchParams = useSearchParams();
  const roleId = searchParams.get("roleId");

  const roleMap: Record<string, string> = { "1": "ADMIN", "2": "AGENT", "3": "CLIENT" };
  const selectedRole = roleMap[roleId || ""] || "UNKNOWN";
  const meta = ROLE_META[selectedRole];

  const adminAction  = useCreateAdmin();
  const agentAction  = useCreateAgent();
  const clientAction = useCreateClient();

  const handleCreateUser = (formData: any) => {
    if (selectedRole === "ADMIN")  adminAction.mutate(formData);
    if (selectedRole === "AGENT")  agentAction.mutate(formData);
    if (selectedRole === "CLIENT") clientAction.mutate(formData);
  };

  const isPending = adminAction.isPending || agentAction.isPending || clientAction.isPending;

  return (
    <main style={{
      height: "100%",
      width: "100%",
      display: "flex",
      gap: "1.25rem",
      padding: "0",
      overflow: "hidden",
      background: "transparent",
    }}>

      {/* ── Form column ── */}
      <div style={{ flex: "1 1 0", minWidth: 0, display: "flex", flexDirection: "column", gap: "0" }}>

        {/* Page header */}
        <div style={{ marginBottom: "1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: "1.0625rem", fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.01em" }}>
                <span style={{display: "flex", alignItems: "center", gap: "1.25rem"}}>
                    
                    <ButtonGoBack/>  Create User
                </span>
            </h1>
            <p style={{ fontSize: "11px", color: TEXT_MUTED, margin: "3px 0 0" }}>
              Fill in the details below to register a new account
            </p>
          </div>

          {/* Role badge */}
          {meta && (
            <span style={{
              fontSize: "11px", fontWeight: 600,
              padding: "4px 12px", borderRadius: "5px",
              color: meta.color, background: meta.bg,
              border: `1px solid ${meta.border}`,
            }}>
              {meta.label}
            </span>
          )}
        </div>

        {/* Form card */}
        <div style={{
          flex: 1,
          minHeight: 0,
          background: WHITE,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          overflow: "auto",
        }}>
          {selectedRole === "ADMIN"   && <CreateAdminForm  onSubmit={handleCreateUser} isLoading={isPending} />}
          {selectedRole === "AGENT"   && <CreateAgentForm  onSubmit={handleCreateUser} isLoading={isPending} />}
          {selectedRole === "CLIENT"  && <CreateClient     onSubmit={handleCreateUser} isLoading={isPending} />}
          {selectedRole === "UNKNOWN" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: TEXT_MUTED, fontSize: "13px" }}>
              No role selected. Please go back and choose a role.
            </div>
          )}
        </div>
      </div>

      {/* ── Sidebar column ── */}
      <div style={{
        width: "260px",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
        gap: "0",
      }}>

        {/* Sidebar header */}
        <div style={{ marginBottom: "1.25rem" }}>
          <h2 style={{ fontSize: "1.0625rem", fontWeight: 700, color: TEXT, margin: 0, letterSpacing: "-0.01em" }}>
            User List
          </h2>
          <p style={{ fontSize: "11px", color: TEXT_MUTED, margin: "3px 0 0" }}>
            Recently registered accounts
          </p>
        </div>

        {/* Sidebar card */}
        <div style={{
          flex: 1,
          minHeight: 0,
          background: WHITE,
          border: `1px solid ${BORDER}`,
          borderRadius: "8px",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          {/* Card toolbar */}
          <div style={{
            padding: "10px 14px",
            borderBottom: `1px solid ${BORDER}`,
            background: BG,
            flexShrink: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <span style={{ fontSize: "10px", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", color: TEXT_MUTED }}>
              All Users
            </span>
            <span style={{ fontSize: "10px", fontWeight: 600, color: BRAND, background: BRAND_T, border: `1px solid rgba(79,110,247,0.2)`, padding: "2px 8px", borderRadius: "4px" }}>
              {/* swap with real count */}0
            </span>
          </div>

          {/* List body */}
          <div style={{ flex: 1, overflowY: "auto", padding: "8px" }}>
            {/* Empty state — replace with real list items */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", gap: "8px", color: TEXT_MUTED, padding: "32px 0" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                <circle cx="9" cy="7" r="4"/>
                <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
              </svg>
              <span style={{ fontSize: "11px" }}>No users yet</span>
            </div>
          </div>
        </div>
      </div>

    </main>
  );
}