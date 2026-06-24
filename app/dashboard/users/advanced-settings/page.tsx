"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  Settings, Plus, Trash2, Pencil, Ban, Eye, 
  ShieldCheck, Users, Search 
} from "lucide-react";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import AdminsList from "@/src/shared/components/forms/AdminsList";
import AgentsList from "@/src/shared/components/forms/AgentsList";
import ClientsList from "@/src/shared/components/forms/ClientsList";
import { useAdmins, useDeleteAdmin } from "@/src/hooks/useAdmin";
import type { User } from "@/src/types/User";
import { Agent } from "http";
import { Client } from "@/src/types/Client";
import { useAgents, useDeleteAgent } from "@/src/hooks/useAgent";
import { useClients, useDeleteClient } from "@/src/hooks/useClient";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import toast from "react-hot-toast";

export default function ManageUsersPage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Manager Admin");
  const [page, setPage] = useState(0);

   const [params, setParams] = useState({
    page: 0,
    size: 10,
    isVip: undefined as boolean | undefined,
    isActive: undefined as boolean | undefined
  });


  const {mutate:mutateAgent,isPending:isPenndingAgent, error:agentError}=useDeleteAgent();
  const {mutate:mutateClient,isPending:isPenndingClient, error:clientError}=useDeleteClient();
  const {mutate:mutateAdmin,isPending:isPenndingAdmin, error:adminError}=useDeleteAdmin();

  const tabs = [
    { name: "Manager Admin", icon: <ShieldCheck size={16} /> },
    { name: "Agents", icon: <Users size={16} /> },
    { name: "Clients", icon: <Users size={16} /> },
  ];


const { data: adminsData, isLoading: isLoadingAdmins } = useAdmins(
    page,
    activeTab === "Manager Admin"
);

const { data: agentsData, isLoading: isLoadingAgents } = useAgents(
    activeTab === "Agents"
);

const { data: clientsData, isLoading: isLoadingClients } = useClients(
    params, 
    activeTab === "Clients"
);

const handleDelete = (id: string) => {
  if (activeTab === "Clients") {
    console.log("Deleting client with id: ", id);
    window.confirm("Are you sure you want to delete this client?");
    mutateClient(id);
    return;
  }

  if (activeTab === "Agents") {
    console.log("Deleting agent with id: ", id);
    window.confirm("Are you sure you want to delete this agent?");
    mutateAgent(id);
    return;
  }

  if (activeTab === "Manager Admin") {
    console.log("Deleting admin with id: ", id);
    window.confirm("Are you sure you want to delete this admin?");
    mutateAdmin(id);
  }
};

if(isLoadingAdmins || isLoadingAgents || isLoadingClients){
  return (
    <SimpleSpinner/>
  )
}
  return (
    <div className="flex flex-col gap-6 p-6 bg-gray-50 min-h-screen font-sans">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: "Dashboard", route: "/dashboard" },
          { name: "users", route: "/dashboard/users" },
          { name: "advanced-settings", route: "/dashboard/users/advanced-settings" },
        ]}
      />

      {/* 2. Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 tracking-tight">Manage Users</h1>
          <p className="text-sm text-gray-500">Control permissions and monitor user activity across all roles.</p>
        </div>

        <div className="flex items-center gap-3">
          {/* Advanced Settings Button */}
          <button
            onClick={() => router.push("/dashboard/users/advanced-settings")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 transition-all"
          >
            <Settings size={14} />
            Advanced Settings
          </button>

          {/* Add User Button */}
          <button
            onClick={() => console.log("Open Modal")}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-blue-600 rounded-md shadow-sm hover:bg-blue-700 transition-all"
          >
            <Plus size={14} />
            Add User
          </button>
        </div>
      </div>

      {/* 3. Role Tabs */}
      <div className="flex items-center gap-8 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.name}
            onClick={() => setActiveTab(tab.name)}
            className={`flex items-center gap-2 pb-4 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab.name
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
            }`}
          >
            {tab.icon}
            {tab.name}
          </button>
        ))}
      </div>

     
     { activeTab === "Manager Admin" && 
         <AdminsList 
      users={adminsData?.content || []} 
      currentPage={adminsData?.number || 0}
      totalPages={adminsData?.totalPages || 0}
      totalElements={adminsData?.totalElements || 0}
      onPageChange={(newPage) => setPage(newPage)}
      onDelete={handleDelete}

    />
     }
     {activeTab === "Agents" && <AgentsList agents={agentsData ?? []} 
      onDelete={handleDelete}
     />}
     
     {activeTab === "Clients" && <ClientsList 
      clients={clientsData?.content || []}
      currentPage={clientsData?.number || 0}
      totalPages={clientsData?.totalPages || 0}
      totalElements={clientsData?.totalElements || 0}
      filters={{ isVip: params.isVip, isActive: params.isActive }}
      
      // Update page
      onPageChange={(newPage) => setParams(prev => ({ ...prev, page: newPage }))}
      
      // Update filters and reset page to 0
      onFilterChange={(newFilters) => setParams(prev => ({ ...prev, ...newFilters, page: 0 }))}
      onDelete={handleDelete}
    />}

    

        
      </div>
  );
}