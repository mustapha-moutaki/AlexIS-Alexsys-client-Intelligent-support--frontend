"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  Ticket, AlertCircle, CheckCircle2, Clock, 
  Plus, X, ChevronRight
} from "lucide-react";

// Types & Constants
import { TicketResponse } from "@/src/types/TicketResponse";
import { priorities } from "@/src/shared/constants/priority";

// Hooks
import { 
  useDeleteTicketByAdmin, 
  useTickets, 
  useUpdateTicketAssignedToByAdmin, 
  useUpdateTicketPriorityByAdmin, 
  useUpdateTicketStatusByAdmin 
} from "@/src/hooks/useTickets";
import { useAgentById, useAgents } from "@/src/hooks/useAgent";

// Components
import TicketsListForAdmin from "@/src/shared/components/forms/ticket-forms/admin/TicketsListForAdmin";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import AgentDetailsModal from "@/src/shared/components/modals/AgentDetailsModal";
import AgentUpdateModal from "@/src/shared/components/modals/AgentUpdateModal";

export default function AdminTicketsPage() {
  const router = useRouter();

  // ---  Pagination State ---
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  // ---  UI/Modal States ---
  const [selectedTicket, setSelectedTicket] = useState<TicketResponse | null>(null);
  const [statusUpdateData, setStatusUpdateData] = useState<{id: string, status: string} | null>(null);
  const [priorityUpdateData, setPriorityUpdateData] = useState<{id: string, priority: string} | null>(null);
  const [assignedUpdateData, setAssignedUpdateData] = useState<{id: string, assignedToId: string} | null>(null);
  const [agentDetailsId, setAgentDetailsId] = useState<string | null>(null);

  // --- 3. Data Fetching & Mutations ---
  const { data, isLoading, isError } = useTickets({ 
    page: page - 1, 
    size: pageSize 
  });

  const { mutate: updateStatusMutation, isPending: isUpdatingStatus } = useUpdateTicketStatusByAdmin();
  const { mutate: updatePriorityMutation, isPending: isUpdatingPriority } = useUpdateTicketPriorityByAdmin();
  const { mutate: deleteMutation, isPending: deleteIsPending, isSuccess: deleteIsSuccess, error: deleteError } = useDeleteTicketByAdmin();
  const { mutate: updateAgentMutation, isPending: isUpdatingAgent } = useUpdateTicketAssignedToByAdmin();

  const { data: agents } = useAgentById(agentDetailsId || "");
  const {data:agentsList, isLoading:isAgentsListLoading} = useAgents();


  // --- 4. Side Effects ---
  useEffect(() => {
    if (deleteIsSuccess) toast.success("Ticket deleted successfully");
    if (deleteError) toast.error("Failed to delete ticket");
  }, [deleteIsSuccess, deleteError]);

  // ---  Event Handlers ---
  
  // Open Modal Handlers
  const handleOpenStatusModal = (id: string, status: string) => setStatusUpdateData({ id, status });
  const handleOpenPriorityModal = (id: string, priority: string) => setPriorityUpdateData({ id, priority });
  const handleOpenAgentModal = (agentId: string) => setAgentDetailsId(agentId);
  const handleOpenUpdateAgentModal = (id: string, assignedToId: string) => setAssignedUpdateData({ id, assignedToId });
  // Action Handlers
  const handleUpdateStatus = (newStatus: string) => {
    if (!statusUpdateData) return;
    updateStatusMutation({ id: statusUpdateData.id, status: newStatus }, {
      onSuccess: () => {
        setStatusUpdateData(null);
      }
    });
  };

  const handleUpdatePriority = (newPriority: string) => {
    if (!priorityUpdateData) return;
    updatePriorityMutation({ id: priorityUpdateData.id, priority: newPriority }, {
      onSuccess: () => {
        toast.success("Priority updated successfully");
        setPriorityUpdateData(null);
      }
    });
  };

  const handleUpdateAgent = (newAgentId: string) => {
    if (!assignedUpdateData) return;
    updateAgentMutation({ id: assignedUpdateData.id, assignedToId: newAgentId }, {
      onSuccess: () => {
        setAssignedUpdateData(null);
      }
    });
  };
  const handleDeleteTicketByAdmin = (id: string) => deleteMutation({ id });

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        
        {/* Header Section */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <ButtonGoBack />
            <div className="flex flex-col">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Tickets</h1>
              <p className="text-sm text-slate-400 mt-0.5">Manage and monitor all support tickets</p>
            </div>
          </div>
          <button 
            onClick={() => router.push("/dashboard/admin/tickets/new")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-200"
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>

        {/* Dashboard Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Ticket} color="bg-indigo-500" label="Total Tickets" value={(data as any)?.totalElements || 0} sub="All time" />
          <StatCard icon={AlertCircle} color="bg-emerald-500" label="Open" value={800} sub="Needs attention" />
          <StatCard icon={Clock} color="bg-orange-500" label="In Progress" value={400} sub="Being handled" />
          <StatCard icon={CheckCircle2} color="bg-blue-500" label="Closed" value={200} sub="Resolved" />
        </div>

        {/* Main List Table */}
        <div className="space-y-4">
          <h2 className="text-base font-bold text-slate-700">All Tickets</h2>
          <TicketsListForAdmin 
            content={data} 
            onViewTicket={setSelectedTicket}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
            onDeleteTicketByAdmin={handleDeleteTicketByAdmin}
            onOpenStatusModal={handleOpenStatusModal}
            onOpenPriorityModal={handleOpenPriorityModal}
            onOpenAgentModal={handleOpenAgentModal} 
            onOpenUpdateAgentModal={handleOpenUpdateAgentModal} 
          />
        </div>
      </main>

      {/* --- Modals Overlay Section --- */}
      
      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}

      {statusUpdateData && (
        <StatusUpdateModal 
          currentStatus={statusUpdateData.status}
          onClose={() => setStatusUpdateData(null)}
          onConfirm={handleUpdateStatus}
          isLoading={isUpdatingStatus}
        />
      )}

      {priorityUpdateData && (
        <PriorityUpdateModal
          currentPriority={priorityUpdateData.priority}
          onClose={() => setPriorityUpdateData(null)}
          onConfirm={handleUpdatePriority}
          isLoading={isUpdatingPriority}
        />
      )}

      {agentDetailsId && (
        <AgentDetailsModal
          agentId={agentDetailsId}
          onClose={() => setAgentDetailsId(null)}
        />
      )}

      {assignedUpdateData && (
        <AgentUpdateModal
          currentAssignedToId={assignedUpdateData.assignedToId}
          onClose={() => setAssignedUpdateData(null)}
          onConfirm={handleUpdateAgent}
          isLoading={false}
          agents={(agentsList as any)?.content ?? agentsList}
        />
      )}
    </div>
  );
}

/**
 * Shared Stat Card Component
 */
function StatCard({ icon: Icon, label, value, sub, color }: any) {
  return (
    <div className="relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow">
      <div className={`absolute -right-4 -top-4 w-20 h-20 rounded-full opacity-10 ${color}`} />
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-1">{label}</p>
          <p className="text-3xl font-bold text-slate-800 leading-none">{value}</p>
          {sub && <p className="text-xs text-slate-400 mt-1.5">{sub}</p>}
        </div>
        <span className={`flex items-center justify-center w-10 h-10 rounded-xl ${color} bg-opacity-15`}>
          <Icon className={`w-5 h-5 ${color.replace("bg-", "text-")}`} />
        </span>
      </div>
    </div>
  );
}

/**
 * Status Update Modal Component
 */
function StatusUpdateModal({ currentStatus, onClose, onConfirm, isLoading }: any) {
  const [selected, setSelected] = useState(currentStatus);
  const statuses = ["OPEN", "ASSIGNED", "IN_PROGRESS", "RESOLVED", "CLOSED", "REOPEN"];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Update Ticket Status</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20}/></button>
        </div>
        <div className="p-6 space-y-2">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => setSelected(status)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all w-full ${
                selected === status 
                ? "border-indigo-600 bg-indigo-50 text-indigo-700" 
                : "border-slate-100 hover:border-slate-200 text-slate-600"
              }`}
            >
              <span className="font-semibold text-sm">{status.replace('_', ' ')}</span>
              {selected === status && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
            </button>
          ))}
        </div>
        <div className="p-6 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl">
            Cancel
          </button>
          <button 
            disabled={isLoading || selected === currentStatus}
            onClick={() => onConfirm(selected)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition shadow-md"
          >
            {isLoading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

/**
 * Priority Update Modal Component
 */
function PriorityUpdateModal({ currentPriority, onClose, onConfirm, isLoading }: any) {
  const [selected, setSelected] = useState(currentPriority);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">Update Ticket Priority</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600"><X size={20} /></button>
        </div>
        <div className="p-6 space-y-3">
          {priorities.map((p: any) => (
            <button
              key={p.value}
              onClick={() => setSelected(p.value)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all w-full ${
                selected === p.value
                  ? "border-indigo-600 bg-indigo-50 text-indigo-700"
                  : "border-slate-100 hover:border-slate-200 text-slate-600"
              }`}
            >
              <span className="font-semibold text-sm">{p.label}</span>
              {selected === p.value && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
            </button>
          ))}
        </div>
        <div className="p-6 bg-slate-50 flex gap-3">
          <button onClick={onClose} className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl">
            Cancel
          </button>
          <button
            disabled={isLoading || selected === currentPriority}
            onClick={() => onConfirm(selected)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition"
          >
            {isLoading ? "Updating..." : "Update Priority"}
          </button>
        </div>
      </div>
    </div>
  );
}

// Placeholder for Detail Modal if not imported
function TicketDetailModal({ ticket, onClose }: any) {
    return null; // Implementation as per your existing file
}