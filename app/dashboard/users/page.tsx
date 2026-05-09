// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { useUsers } from "@/src/hooks/useUsers";
// import UserList from "@/src/shared/components/forms/UserList";
// import SimpleSpinner from "@/components/ui/SimpleSpinner";
// import SelectRoleModal from "@/src/shared/components/modals/SelectRoleModal";
// import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
// import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";

// export default function ManageUsersPage() {
//   const router = useRouter();
//   const [page, setPage] = useState(1);
//   const [sortBy, setSortBy] = useState("id");
//   const [direction, setDirection] = useState<"asc" | "desc">("asc");
//   const [role, setRole] = useState("");
//   const [includeDeleted, setIncludeDeleted] = useState(false);
//   const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

//   const { data, isLoading, isError, error, refetch } = useUsers({
//     page: page,
//     sortBy,
//     direction,
//     role,
//     includeDeleted,
//   });

//   if (isLoading) {
//     return(
//         <SimpleSpinner />

//     )
//   }

//   if (isError || !data) {
//     return (
//       <div className="h-full flex flex-col items-center justify-center gap-4 text-white">
//         <p className="opacity-50">Error: {error?.message}</p>
//         <button onClick={() => refetch()} className="px-6 py-2 rounded-lg bg-[#51c2de] text-black font-bold">Retry</button>
//       </div>
//     );
//   }

  
//   const A = "#51c2de", DIM = "#ffffff61";

//   const handleViewUser = (userId: number) => {
//     router.push(`/dashboard/users/${userId}`);
//   };

//   return (
   
//     <div className="flex flex-col h-full w-full px-6 py-4 gap-4 overflow-hidden">
//       {/* 1. BREADCRUMBS (Now in Page) */}
//       <div className="flex items-center gap-1.5 flex-shrink-0" style={{ color: DIM, fontSize: 10 }}>
//         <span style={{ color: "rgba(255,255,255,0.65)" }}>
//           <Breadcrumbs
//           items={[
//             { name: "Dashboard", route: "/dashboard" },
//             { name: "Manage users", route: "/dashboard/users" },
//           ]}
//         />
//           </span>
//       </div>

//       {/* 2. HEADER SECTION (Now in Page) */}
//       <div className="flex items-center justify-between flex-shrink-0">
        
//         <div className="flex gap-2 items-center">

//            <ButtonGoBack/> 
//         <div>
         
//           <h1 className="font-bold tracking-tight text-white" style={{ fontSize: 18 }}>
            
//             Manage users</h1>
//           <p style={{ color: DIM, fontSize: 11 }}>Found {data.totalElements} registered users</p>
//         </div>



//         </div>

//         <button className="flex items-center gap-1.5 rounded-lg font-semibold transition-all hover:brightness-110 active:scale-95" style={{ background: A, color: "#0d0014", fontSize: 11, padding: "8px 16px" }}
//         onClick={()=> setIsRoleModalOpen(true)}
//         >
//           <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
//             <line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>
//           </svg>
//           Add user
//         </button>
//       </div>
        

//       {/* 3. TABLE COMPONENT */}
//       <UserList
//         users={data.content}
//         totalElements={data.totalElements}
//         totalPages={data.totalPages}
//         currentPage={page}
//         onPageChange={setPage}
//         currentRole={role}
//         onRoleChange={(r) => { setRole(r); setPage(1); }}
//         sortBy={sortBy}
//         setSortBy={setSortBy}
//         direction={direction}
//         setDirection={setDirection}
//         includeDeleted={includeDeleted}
//         setIncludeDeleted={setIncludeDeleted}
//         onViewUser={handleViewUser}
//       />

//       <SelectRoleModal
//         isOpen={isRoleModalOpen} 
//         onClose={() => setIsRoleModalOpen(false)} 
//       />

//     </div>
  
//   );
// }
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useUsers } from "@/src/hooks/useUsers";
import UserList from "@/src/shared/components/forms/UserList";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import SelectRoleModal from "@/src/shared/components/modals/SelectRoleModal";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";

export default function ManageUsersPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [sortBy, setSortBy] = useState("id");
  const [direction, setDirection] = useState<"asc" | "desc">("asc");
  const [role, setRole] = useState("");
  const [includeDeleted, setIncludeDeleted] = useState(false);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);

  const { data, isLoading, isError, error, refetch } = useUsers({
    page,
    sortBy,
    direction,
    role,
    includeDeleted,
  });

  if (isLoading) return <SimpleSpinner />;

  if (isError || !data) {
    return (
      <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
        <p style={{ fontSize: "13px", color: "#9ca3af" }}>Error: {error?.message}</p>
        <button
          onClick={() => refetch()}
          style={{ padding: "7px 18px", borderRadius: "6px", background: "#4f6ef7", color: "#fff", fontSize: "13px", fontWeight: 500, border: "none", cursor: "pointer" }}
        >
          Retry
        </button>
      </div>
    );
  }

  const handleViewUser = (userId: number) => {
    router.push(`/dashboard/users/${userId}`);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", width: "100%", gap: "1.25rem", overflow: "hidden" }}>

      {/* Breadcrumbs */}
      <div style={{ fontSize: "11px", color: "#9ca3af", flexShrink: 0 }}>
        <Breadcrumbs
          items={[
            { name: "Dashboard", route: "/dashboard" },
            { name: "Manage users", route: "/dashboard/users" },
          ]}
        />
      </div>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <ButtonGoBack />
          <div>
            <h1 style={{ fontSize: "1.0625rem", fontWeight: 700, color: "#111827", margin: 0, letterSpacing: "-0.01em" }}>
              Users overview
            </h1>
            <p style={{ fontSize: "11px", color: "#9ca3af", margin: "2px 0 0" }}>
              {data.totalElements.toLocaleString()} registered users
            </p>
          </div>
        </div>

<div style={{display: "flex", gap: "10px"}}>

<button
  onClick={() => window.location.href = "/dashboard/users/advanced-settings"} 
  style={{
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "7px 14px",
    borderRadius: "6px",
    background: "#51c2de",
    color: "#ffffff",
    fontSize: "12px",
    fontWeight: 600,
    border: "none",
    cursor: "pointer",
    transition: "opacity 0.15s",
  }}
  onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.88")}
  onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
>
  {/* Settings Gear Icon SVG */}
  <svg 
    width="14" 
    height="14" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2.5" 
    strokeLinecap="round" 
    strokeLinejoin="round"
  >
    <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
  Advanced Settings
</button>

{/* add user button */}
        <button
          onClick={() => setIsRoleModalOpen(true)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            padding: "7px 14px",
            borderRadius: "6px",
            background: "#4f6ef7",
            color: "#ffffff",
            fontSize: "12px",
            fontWeight: 600,
            border: "none",
            cursor: "pointer",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.88")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <line x1="12" y1="5" x2="12" y2="19" />
            <line x1="5" y1="12" x2="19" y2="12" />
          </svg>
          Add User
        </button>
</div>
      </div>

      {/* Table */}
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
        onViewUser={handleViewUser}
      />

      <SelectRoleModal
        isOpen={isRoleModalOpen}
        onClose={() => setIsRoleModalOpen(false)}
      />
    </div>
  );
}