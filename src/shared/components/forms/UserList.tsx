"use client";
import { useState } from "react";

const ROLES = ["All roles", "SUPER_ADMIN", "ADMIN", "AGENT", "CLIENT"];

const AVATAR_PALETTE = [
  { bg: "rgba(99, 102, 241, 0.1)",  color: "#6366f1" },
  { bg: "rgba(139, 92, 246, 0.1)", color: "#8b5cf6" },
  { bg: "rgba(20, 184, 166, 0.1)",  color: "#14b8a6" },
  { bg: "rgba(245, 158, 11, 0.1)",  color: "#f59e0b" },
];

const BRAND      = "#4f46e5"; // Professional Indigo
const BRAND_T    = "rgba(79, 70, 229, 0.08)"; // 8% Brand Tint
const BORDER     = "#e2e8f0";
const BORDER_L   = "#f1f5f9";
const TEXT       = "#1e293b";
const TEXT_SUB   = "#475569";
const TEXT_MUTED = "#94a3b8";
const BG_SUBTLE  = "#f8fafc";
const WHITE      = "#ffffff";
const SUCCESS    = "#10b981";
const DANGER     = "#ef4444";

const selectStyle: React.CSSProperties = {
  background: WHITE,
  border: `1px solid ${BORDER}`,
  color: TEXT,
  fontSize: "12px",
  fontWeight: 500,
  padding: "5px 28px 5px 12px",
  outline: "none",
  borderRadius: "6px",
  cursor: "pointer",
  appearance: "none",
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 10px center",
  backgroundSize: "14px",
};

const thStyle: React.CSSProperties = {
  // padding: "12px 16px",
  fontSize: "11px",
  fontWeight: 600,
  textTransform: "uppercase",
  letterSpacing: "0.025em",
  color: TEXT_MUTED,
  textAlign: "left",
  background: BG_SUBTLE,
  borderBottom: `1px solid ${BORDER}`,
};

const tdStyle: React.CSSProperties = {
  padding: "12px 16px",
  fontSize: "13px",
  color: TEXT_SUB,
  borderBottom: `1px solid ${BORDER_L}`,
  verticalAlign: "middle",
};

interface UserListProps {
  users: any[];
  totalElements: number;
  totalPages: number;
  currentPage: number;
  onPageChange: (p: number) => void;
  currentRole: string;
  onRoleChange: (r: string) => void;
  sortBy: string;
  setSortBy: (val: string) => void;
  direction: "asc" | "desc";
  setDirection: (val: "asc" | "desc") => void;
  includeDeleted: boolean;
  setIncludeDeleted: (val: boolean) => void;
  onViewUser?: (userId: number) => void;
}

export default function UserList({
  users, totalElements, totalPages, currentPage, onPageChange,
  currentRole, onRoleChange, sortBy, setSortBy, direction,
  setDirection, includeDeleted, setIncludeDeleted, onViewUser,
}: UserListProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));
  const toggleAll = () =>
    setSelected(selected.length === users.length ? [] : users.map((u) => u.id));

  const filtered = users.filter((u) =>
    search === "" ||
    `${u.firstName} ${u.lastName} ${u.email}`.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: 0, flex: 1, width: "100%" }}>
      <div style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        minHeight: 0,
        border: `1px solid ${BORDER}`,
        borderRadius: "8px",
        background: WHITE,
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.02)",
        overflow: "hidden",
      }}>

        {/* ── Toolbar ── */}
        <div style={{
          flexShrink: 0,
          borderBottom: `1px solid ${BORDER}`,
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          gap: "16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: "12px" }}>
            {/* Search */}
            <div style={{
              display: "flex", alignItems: "center", gap: "10px",
              flex: 1, maxWidth: "400px", background: WHITE, border: `1px solid ${BORDER}`,
              borderRadius: "6px", padding: "6px 12px", focusWithin: { borderColor: BRAND }
            } as any}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={TEXT_MUTED} strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search staff, admins, or clients..."
                style={{ background: "transparent", outline: "none", width: "100%", fontSize: "13px", color: TEXT, border: "none" }}
              />
            </div>

            {/* Role Switcher */}
            <div style={{ display: "flex", background: BG_SUBTLE, padding: "3px", borderRadius: "8px", border: `1px solid ${BORDER_L}` }}>
              {ROLES.map((r) => {
                const active = (currentRole === "" && r === "All roles") || currentRole === r;
                return (
                  <button
                    key={r}
                    onClick={() => { onRoleChange(r === "All roles" ? "" : r); onPageChange(1); }}
                    style={{
                      fontSize: "12px", fontWeight: 600, padding: "6px 12px",
                      borderRadius: "6px", cursor: "pointer", border: "none",
                      background: active ? WHITE : "transparent",
                      color: active ? BRAND : TEXT_MUTED,
                      boxShadow: active ? "0 1px 2px rgba(0,0,0,0.05)" : "none",
                      transition: "all 0.2s",
                    }}
                  >
                    {r === "All roles" ? "All" : r.replace("_", " ")}
                  </button>
                );
              })}
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: 600, color: TEXT_MUTED }}>SORT</span>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyle}>
                  <option value="firstName">Name</option>
                  <option value="email">Email</option>
                  <option value="id">ID</option>
                </select>
                <select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={selectStyle}>
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
            </div>

            <button
              onClick={() => setIncludeDeleted(!includeDeleted)}
              style={{
                display: "flex", alignItems: "center", gap: "8px",
                fontSize: "12px", fontWeight: 500, padding: "6px 12px",
                borderRadius: "6px", cursor: "pointer",
                border: `1px solid ${includeDeleted ? DANGER : BORDER}`,
                background: includeDeleted ? "rgba(239, 68, 68, 0.05)" : WHITE,
                color: includeDeleted ? DANGER : TEXT_SUB,
              }}
            >
              Show Archive
            </button>
          </div>
        </div>

        {/* ── Scrollable Table Area ── */}
        <div style={{ flex: 1, minHeight: 0, overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", tableLayout: "fixed" }}>
            {/* NO WHITESPACE IN COLGROUP TO PREVENT HYDRATION ERROR */}
            <colgroup><col style={{width:"48px"}}/><col style={{width:"25%"}}/><col style={{width:"15%"}}/><col style={{width:"12%"}}/><col style={{width:"18%"}}/><col/><col style={{width:"80px"}}/></colgroup>

            <thead>
              <tr>
                <th style={{ ...thStyle, paddingLeft: "20px" }}>
                  <input
                    type="checkbox"
                    checked={selected.length === users.length && users.length > 0}
                    onChange={toggleAll}
                    style={{ width: 14, height: 14, accentColor: BRAND, cursor: "pointer" }}
                  />
                </th>
                <th style={thStyle}>User</th>
                <th style={thStyle}>Role</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Email</th>
                <th style={{ ...thStyle, textAlign: "right", paddingRight: "20px" }}></th>
              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ padding: "60px 0", textAlign: "center" }}>
                    <span style={{ fontSize: "13px", color: TEXT_MUTED }}>No matching records found</span>
                  </td>
                </tr>
              ) : filtered.map((user) => {
                const av = AVATAR_PALETTE[user.id % AVATAR_PALETTE.length];
                const isSuperAdmin = user.role === "SUPER_ADMIN";
                return (
                  <tr
                    key={user.id}
                    style={{ transition: "background 0.2s" }}
                    onMouseEnter={e => (e.currentTarget.style.background = "#fcfdfe")}
                    onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                  >
                    <td style={{ ...tdStyle, paddingLeft: "20px" }}>
                      <input
                        type="checkbox"
                        checked={selected.includes(user.id)}
                        onChange={() => toggleSelect(user.id)}
                        style={{ width: 14, height: 14, accentColor: BRAND, cursor: "pointer" }}
                      />
                    </td>

                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                        <div style={{
                          width: 32, height: 32, borderRadius: "50%",
                          display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "11px", fontWeight: 700, background: av.bg, color: av.color,
                        }}>
                          {user.firstName[0]}{user.lastName[0]}
                        </div>
                        <div style={{ minWidth: 0 }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: TEXT }}>{user.firstName} {user.lastName}</div>
                          <div style={{ fontSize: "11px", color: TEXT_MUTED }}>@{user.username}</div>
                        </div>
                      </div>
                    </td>

                    <td style={tdStyle}>
                      <span style={{
                        fontSize: "11px", fontWeight: 600, padding: "2px 8px", borderRadius: "4px",
                        background: isSuperAdmin ? "rgba(139, 92, 246, 0.08)" : BRAND_T,
                        color: isSuperAdmin ? "#7c3aed" : BRAND,
                        border: `1px solid ${isSuperAdmin ? "rgba(139, 92, 246, 0.1)" : "rgba(79, 70, 229, 0.1)"}`,
                      }}>
                        {user.role.replace("_", " ")}
                      </span>
                    </td>

                    <td style={tdStyle}>
                      <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: SUCCESS }} />
                        <span style={{ fontSize: "12px", color: TEXT_SUB, fontWeight: 500 }}>Active</span>
                      </div>
                    </td>

                    <td style={tdStyle}>{user.phoneNumber || "—"}</td>
                    <td style={{ ...tdStyle, color: TEXT_MUTED }}>{user.email}</td>

                    <td style={{ ...tdStyle, paddingRight: "20px" }}>
                      <div style={{ display: "flex", justifyContent: "flex-end" }}>
                        <button
                          onClick={() => onViewUser?.(user.id)}
                          style={{
                            padding: "6px", borderRadius: "6px", background: "transparent",
                            border: "none", color: TEXT_MUTED, cursor: "pointer", transition: "all 0.2s"
                          }}
                          onMouseEnter={e => { e.currentTarget.style.background = BRAND_T; e.currentTarget.style.color = BRAND; }}
                          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = TEXT_MUTED; }}
                        >
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* ── Pagination ── */}
        <div style={{
          flexShrink: 0,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          borderTop: `1px solid ${BORDER}`,
          padding: "12px 20px",
          background: WHITE,
        }}>
          <span style={{ fontSize: "13px", color: TEXT_MUTED }}>
            Showing <strong style={{ color: TEXT }}>{users.length}</strong> of {totalElements.toLocaleString()} users
          </span>
          <div style={{ display: "flex", gap: "8px" }}>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              style={{
                fontSize: "13px", fontWeight: 500, padding: "6px 16px", borderRadius: "6px",
                cursor: currentPage === 1 ? "not-allowed" : "pointer",
                background: WHITE, color: TEXT_SUB, border: `1px solid ${BORDER}`,
                opacity: currentPage === 1 ? 0.5 : 1,
              }}
            >
              Previous
            </button>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              style={{
                fontSize: "13px", fontWeight: 500, padding: "6px 16px", borderRadius: "6px",
                cursor: currentPage === totalPages ? "not-allowed" : "pointer",
                background: BRAND, color: WHITE, border: "none",
                opacity: currentPage === totalPages ? 0.5 : 1,
              }}
            >
              Next
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}