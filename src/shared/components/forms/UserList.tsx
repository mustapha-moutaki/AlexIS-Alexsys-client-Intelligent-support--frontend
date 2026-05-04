"use client";
import { useState } from "react";

const ROLES = ["All roles", "SUPER_ADMIN", "ADMIN", "AGENT", "CLIENT"];
const COL = "32px 2fr 1fr 0.8fr 0.9fr 1.4fr 100px";
const AVATAR_PALETTE = [
  { bg: "rgba(81,194,222,0.18)", color: "#51c2de" },
  { bg: "rgba(55,20,80,0.60)", color: "#c084fc" },
  { bg: "rgba(6,182,212,0.15)", color: "#22d3ee" },
  { bg: "rgba(99,102,241,0.18)", color: "#818cf8" },
];

const A = "#51c2de", AB = "rgba(81,194,222,0.12)", AB2 = "rgba(81,194,222,0.04)", BDR = "1px solid rgba(255,255,255,0.07)", DIM = "#ffffff61";

const selectStyleBase = {
  background: "rgba(255,255,255,0.05)",
  border: "1px solid rgba(255,255,255,0.1)",
  color: "#51c2de",
  fontSize: "11px",
  padding: "4px 24px 4px 10px",
  outline: "none",
  borderRadius: "6px",
  cursor: "pointer",
  appearance: "none" as const,
  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' stroke='%2351c2de' stroke-width='2' stroke-linecap='round' stroke-linejoin='round' viewBox='0 0 24 24'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E")`,
  backgroundRepeat: "no-repeat",
  backgroundPosition: "right 8px center",
  backgroundSize: "12px",
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
}

export default function UserList({ 
  users, totalElements, totalPages, currentPage, onPageChange, 
  currentRole, onRoleChange, sortBy, setSortBy, direction, 
  setDirection, includeDeleted, setIncludeDeleted 
}: UserListProps) {
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState<number[]>([]);

  const toggleSelect = (id: number) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const toggleAll = () =>
    setSelected(selected.length === users.length ? [] : users.map((u) => u.id));

  return (
    <div className="flex flex-col h-full w-full overflow-hidden" style={{ color: "white" }}>
        
        {/* Main Table Container */}
        <div className="rounded-2xl flex flex-col flex-1 overflow-hidden" style={{ border: BDR, background: "rgba(255,255,255,0.01)" }}>
          
          {/* Toolbar */}
          <div className="flex flex-col gap-3 flex-shrink-0" style={{ borderBottom: BDR, background: AB2, padding: "12px 14px" }}>
            
            {/* Top row: Search & Role Tabs */}
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg flex-1" style={{ background: "#ffffff09", border: "1px solid rgba(255,255,255,0.09)", padding: "5px 10px" }}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke={DIM} strokeWidth="2.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
                    <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search name or email..." className="bg-transparent outline-none w-full" style={{ color: "rgba(255,255,255,0.85)", fontSize: 11 }} />
                </div>

                <div className="flex items-center gap-0.5">
                {ROLES.map((r) => (
                    <button
                        key={r}
                        onClick={() => { onRoleChange(r === "All roles" ? "" : r); onPageChange(1); }}
                        className="rounded-lg font-medium transition-all"
                        style={{
                            fontSize: 10, padding: "5px 10px",
                            ...( (currentRole === "" && r === "All roles") || currentRole === r
                                ? { background: AB, color: A, border: "1px solid rgba(81,194,222,0.28)" }
                                : { background: "transparent", color: DIM, border: "1px solid transparent" })
                        }}
                    >
                        {r === "All roles" ? "All" : r.replace('_', ' ')}
                    </button>
                ))}
                </div>
            </div>

            {/* Bottom row: Sort, Direction, Inclusion */}
            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                    <span style={{ fontSize: 10, color: DIM, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Sort by</span>
                    <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} style={selectStyleBase}>
                        <option value="id" style={{ background: "#21212b", color: "white" }}>ID</option>
                        <option value="firstName" style={{ background: "#21212b", color: "white" }}>First Name</option>
                        <option value="lastName" style={{ background: "#21212b", color: "white" }}>Last Name</option>
                        <option value="email" style={{ background: "#21212b", color: "white" }}>Email</option>
                    </select>
                </div>

                <div className="flex items-center gap-2">
                    <span style={{ fontSize: 10, color: DIM, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Order</span>
                    <select value={direction} onChange={(e) => setDirection(e.target.value as any)} style={selectStyleBase}>
                        <option value="asc" style={{background:"#21212b"}}>Ascending</option>
                        <option value="desc" style={{background:"#21212b"}}>Descending</option>
                    </select>
                </div>

                <div className="h-4 w-px" style={{ background: "rgba(255,255,255,0.1)" }} />

                <button 
                  onClick={() => setIncludeDeleted(!includeDeleted)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg transition-all"
                  style={{ 
                    fontSize: 10, 
                    border: BDR,
                    background: includeDeleted ? "rgba(248,113,113,0.1)" : "transparent",
                    color: includeDeleted ? "#f87171" : DIM
                  }}
                >
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: includeDeleted ? "#f87171" : "rgba(255,255,255,0.2)" }} />
                    Show Deleted
                </button>
            </div>
          </div>

          {/* Table Content */}
          <div className="grid flex-shrink-0" style={{ gridTemplateColumns: COL, color: "rgba(81,194,222,0.5)", borderBottom: BDR, background: "rgba(81,194,222,0.03)", padding: "8px 14px", fontSize: 10, fontWeight: 600, textTransform: "uppercase" }}>
            <div className="flex items-center"><input type="checkbox" checked={selected.length === users.length && users.length > 0} onChange={toggleAll} style={{ width: 12, height: 12 }} className="accent-[#51c2de]" /></div>
            <div>User</div><div>Role</div><div>Status</div><div>Phone</div><div>Email</div><div style={{ textAlign: "right" }}>Actions</div>
          </div>

          <div className="flex flex-col flex-1 overflow-y-auto">
            {users.length === 0 ? (
                <div className="flex-1 flex items-center justify-center flex-col gap-2 opacity-30">
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1"><circle cx="12" cy="12" r="10"/><path d="M16 16s-1.5-2-4-2-4 2-4 2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
                    <span style={{ fontSize: 12 }}>No users found</span>
                </div>
            ) : users.map((user, i) => {
              const av = AVATAR_PALETTE[user.id % AVATAR_PALETTE.length];
              return (
                <div key={user.id} className="grid items-center flex-shrink-0 hover:bg-white/[0.02] transition-colors" style={{ gridTemplateColumns: COL, borderBottom: "1px solid rgba(255,255,255,0.04)", padding: "10px 14px" }}>
                  <div className="flex items-center"><input type="checkbox" checked={selected.includes(user.id)} onChange={() => toggleSelect(user.id)} className="accent-[#51c2de]" /></div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full flex items-center justify-center font-bold" style={{ width: 28, height: 28, background: av.bg, color: av.color, fontSize: 10, border: `1px solid ${av.color}33` }}>
                      {user.firstName[0]}{user.lastName[0]}
                    </div>
                    <div className="flex flex-col truncate">
                      <span style={{ fontSize: 12, fontWeight: 500 }}>{user.firstName} {user.lastName}</span>
                      <span style={{ fontSize: 9, color: DIM }}>@{user.username}</span>
                    </div>
                  </div>
                  <div><span className="rounded-md" style={{ fontSize: 9, padding: "3px 8px", background: user.role === "SUPER_ADMIN" ? "rgba(192,132,252,0.15)" : AB, color: user.role === "SUPER_ADMIN" ? "#c084fc" : A, border: `1px solid ${user.role === "SUPER_ADMIN" ? "#c084fc33" : "#51c2de33"}` }}>{user.role}</span></div>
                  <div><span style={{ color: "#4ade80", fontSize: 11, display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: 5, height: 5, background: '#4ade80', borderRadius: '50%' }} />Active</span></div>
                  <div style={{ color: DIM, fontSize: 11 }}>{user.phoneNumber}</div>
                  <div className="truncate" style={{ color: "rgba(81,194,222,0.58)", fontSize: 11 }}>{user.email}</div>
                  <div className="flex justify-end gap-1.5">
                     <button title="View Details" className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 26, height: 26, background: AB, color: A, border: "1px solid rgba(81,194,222,0.2)" }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                     </button>
                     <button title="Block User" className="flex items-center justify-center rounded-lg transition-all hover:scale-110" style={{ width: 26, height: 26, background: "rgba(255,255,255,0.03)", color: DIM, border: BDR }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="4.93" y1="4.93" x2="19.07" y2="19.07"/></svg>
                     </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination Footer */}
          <div className="flex items-center justify-between flex-shrink-0" style={{ borderTop: BDR, background: AB2, padding: "10px 14px" }}>
            <span style={{ color: DIM, fontSize: 11 }}>Page <b style={{ color: "white" }}>{currentPage}</b> of {totalPages}</span>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onPageChange(currentPage - 1)} 
                disabled={currentPage === 1}
                className="rounded-lg px-4 py-1.5 font-medium transition-all" 
                style={{ fontSize: 11, background: "transparent", color: currentPage === 1 ? "rgba(255,255,255,0.1)" : "white", border: BDR }}
              >Previous</button>
              
              <button 
                onClick={() => onPageChange(currentPage + 1)} 
                disabled={currentPage === totalPages}
                className="rounded-lg px-4 py-1.5 font-bold transition-all hover:scale-[1.02]" 
                style={{ fontSize: 11, background: currentPage === totalPages ? "transparent" : A, color: currentPage === totalPages ? "rgba(255,255,255,0.1)" : "#0d0014", border: currentPage === totalPages ? BDR : "none" }}
              >Next</button>
            </div>
          </div>
        </div>
    </div>
  );
}