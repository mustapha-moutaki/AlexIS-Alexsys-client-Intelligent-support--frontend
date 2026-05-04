"use client";

import { useState } from "react";
import { useUsers } from "@/src/hooks/useUsers";
import UserList from "@/src/shared/components/forms/UserList";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import SelectRoleModal from "@/src/shared/components/modals/SelectRoleModal";

export default function ManageUsersPage() {
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [role, setRole] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useUsers({
    page: page,
    sortBy,
    direction,
    role,
    includeDeleted,
  });

  if (isLoading) {
    return(
        <SimpleSpinner />
       
    )
  }

  if (isError || !data) {
    return (
      <div className="h-full flex flex-col items-center justify-center gap-4 text-white">
        <p className="opacity-50">Error: {error?.message}</p>
        <button onClick={() => refetch()} className="px-6 py-2 rounded-lg bg-[#51c2de] text-black font-bold">Retry</button>
      </div>
    );
  }

  
  const A = "#51c2de", DIM = "#ffffff61";

  return (
    <div className="flex flex-col h-full w-full px-6 py-4 gap-4 overflow-hidden">
      {/* 1. BREADCRUMBS (Now in Page) */}
      <div className="flex items-center gap-1.5 flex-shrink-0" style={{ color: DIM, fontSize: 10 }}>
        <span>Dashboard</span>
        <span style={{ color: "rgba(255,255,255,0.2)" }}>›</span>
        <span style={{ color: "rgba(255,255,255,0.65)" }}>Manage users</span>
      </div>

      {/* 2. HEADER SECTION (Now in Page) */}
      <div className="flex items-center justify-between flex-shrink-0">
        <div>
          <h1 className="font-bold tracking-tight text-white" style={{ fontSize: 18 }}>Manage users</h1>
          <p style={{ color: DIM, fontSize: 11 }}>Found {data.totalElements} registered users</p>
        </div>

        <button className="flex items-center gap-1.5 rounded-lg font-semibold transition-all hover:brightness-110 active:scale-95" style={{ background: A, color: "#0d0014", fontSize: 11, padding: "8px 16px" }}
        onClick={()=> setIsRoleModalOpen(true)}
        >
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
            <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
          </svg>
          Add user
        </button>
        
      </div>
        

      {/* 3. TABLE COMPONENT */}
      <UserList
        users={data.content}
        totalElements={data.totalElements}
        totalPages={data.totalPages}
        currentPage={page}
        onPageChange={setPage}
        currentRole={role}
        onRoleChange={(r) => { setRole(r); setPage(1); }}
        sortBy={sortBy}
        setSortBy={setSortBy}
        direction={direction}
        setDirection={setDirection}
        includeDeleted={includeDeleted}
        setIncludeDeleted={setIncludeDeleted}
      />


      <SelectRoleModal
        isOpen={isRoleModalOpen} 
        onClose={() => setIsRoleModalOpen(false)} 
      />

    </div>
  );
}