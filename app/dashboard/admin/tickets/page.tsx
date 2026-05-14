"use client";

import { useEffect, useState } from "react";
import {
  Ticket, AlertCircle, CheckCircle2, Clock, AlertTriangle,
  Plus, RefreshCw, Settings2, BarChart3, Users, TrendingUp, X
} from "lucide-react";
import { TicketResponse } from "@/src/types/TicketResponse";
import TicketsListForAdmin from "@/src/shared/components/forms/ticket-forms/admin/TicketsListForAdmin";
import { useDeleteTicketByAdmin, useTickets, useUpdateTicketPriorityByAdmin, useUpdateTicketStatusByAdmin } from "@/src/hooks/useTickets";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { priorities } from "@/src/shared/constants/priority";
import { useAgentById } from "@/src/hooks/useAgent";
import AgentDetailsModal from "@/src/shared/components/modals/AgentDetailsModal";
// ... StatCard remains exactly the same ...
function StatCard({
  icon: Icon, label, value, sub, color,
}: {
  icon: React.ElementType; label: string; value: string | number; sub?: string; color: string;
}) {
  return (
    <div className={`relative bg-white rounded-2xl border border-slate-200 p-5 shadow-sm overflow-hidden group hover:shadow-md transition-shadow`}>
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
export default function AdminTicketsPage() {
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [selectedTicket, setSelectedTicket] = useState<TicketResponse | null>(null);
  const router = useRouter();
  // Pass current page and size to the hook
  const { data, isLoading, isError } = useTickets({ 
    page: page - 1, 
    size: pageSize 
  });

  const [statusUpdateData, setStatusUpdateData] = useState<{id: string, status: string} | null>(null);
  const { mutate: updateStatusMutation, isPending: isUpdatingStatus } = useUpdateTicketStatusByAdmin();
  const [agentDetailsId, setAgentDetailsId] = useState<string | null>(null);

    const handleOpenStatusModal = (ticketId: string, currentStatus: string) => {
    setStatusUpdateData({ id: ticketId, status: currentStatus });
  };


  const [priorityUpdateData, setPriorityUpdateData] = useState<{id: string, priority: string} | null>(null);


  const handleOpenPriorityModal = (ticketId: string, currentPriority: string)=>{
    setPriorityUpdateData({ id: ticketId, priority: currentPriority });
  }
  

  const handleUpdateStatus = (newStatus: string) => {
    if (statusUpdateData) {
      updateStatusMutation({ id: statusUpdateData.id, status: newStatus }, {
        onSuccess: () => {
          toast.success("Status updated successfully");
          setStatusUpdateData(null); // Close modal
        },
        onError: () => {
          toast.error("Failed to update status");
        }
      });
    }
  };

const handleOpenAgentModal = (agentId: string) => {
  setAgentDetailsId(agentId);
};

  const {mutate:deleteMutation, isPending:deleteIsPending, error:deleteError, isSuccess:deleteIsSuccess} = useDeleteTicketByAdmin();
  const { mutate: updatePriorityMutation, isPending: isUpdatingPriority } = useUpdateTicketPriorityByAdmin();
  const {data:agents, isPending:agentsIsPending, error:agentsError} = useAgentById(agentDetailsId || "");
  const handleDeleteTicketByAdmin = (id:string)=>{
    deleteMutation({id});
  }

  useEffect(() => {
    if(deleteIsSuccess){
      toast.success("Ticket deleted successfully");
    }
    if(deleteError){
      toast.error("Failed to delete ticket");
    }
  }, [deleteIsSuccess, deleteError]);

 
const handleUpdatePriority = (newPriority: string) => {
  if (priorityUpdateData) {
    // replace with your API later
    console.log("update priority:", priorityUpdateData.id, newPriority);

    updatePriorityMutation({id: priorityUpdateData.id, priority: newPriority}, {
      onSuccess: () => {
        setPriorityUpdateData(null);
      }
    });
  }
};

const [assignedUpdateData, setAssignedUpdateData] = useState<{id: string, assignedToId: string} | null>(null);
const handleOpenAssignedModal = (ticketId: string, currentAssignedToId: string)=>{

  setAssignedUpdateData({ id: ticketId, assignedToId: currentAssignedToId });
}

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-4 items-center">
            <ButtonGoBack/>
            <div className="flex flex-col ">
              <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Tickets</h1>
              <p className="text-sm text-slate-400 mt-0.5">Manage and monitor all support tickets</p>
            </div>
            
          </div>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl transition shadow-md shadow-indigo-200"
          onClick={() => router.push("/dashboard/admin/tickets/new")}
          >
            <Plus className="w-4 h-4" /> New Ticket
          </button>
        </div>

        {/* Stats - Using totalElements from your response */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard icon={Ticket} color="bg-indigo-500" label="Total Tickets" value={data?.totalElements || 0} sub="All time" />
          <StatCard icon={AlertCircle} color="bg-emerald-500" label="Open" value={800} sub="Needs attention" />
          <StatCard icon={Clock} color="bg-orange-500" label="In Progress" value={400} sub="Being handled" />
          <StatCard icon={CheckCircle2} color="bg-blue-500" label="Closed" value={200} sub="Resolved" />
        </div>

        {/* Table Section */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base font-bold text-slate-700">All Tickets</h2>
          </div>
          <TicketsListForAdmin 
            content={data} 
            onViewTicket={setSelectedTicket}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            isLoading={isLoading}
            onDeleteTicketByAdmin= {handleDeleteTicketByAdmin}
            onOpenStatusModal = {handleOpenStatusModal}
            onOpenPriorityModal = {handleOpenPriorityModal}
            onOpenAgentModal={handleOpenAgentModal} 
          />

        </div>
      </main>

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
        isLoading={false}
      />
    )}

    {agentDetailsId && (
  <AgentDetailsModal
    agentId={agentDetailsId}
    onClose={() => setAgentDetailsId(null)}
  />
)}
    </div>
  );
}
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
        <div className="p-6 space-y-4">
          <div className="grid grid-cols-1 gap-2">
            {statuses.map((status) => (
              <button
                key={status}
                onClick={() => setSelected(status)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl border-2 transition-all ${
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
        </div>
        <div className="p-6 bg-slate-50 flex gap-3">
          <button 
            disabled={isLoading}
            onClick={onClose} 
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition"
          >
            Cancel
          </button>
          <button 
            disabled={isLoading || selected === currentStatus}
            onClick={() => onConfirm(selected)}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 disabled:opacity-50 transition shadow-md shadow-indigo-100"
          >
            {isLoading ? "Updating..." : "Update Status"}
          </button>
        </div>
      </div>
    </div>
  );
}

function PriorityUpdateModal({
  currentPriority,
  onClose,
  onConfirm,
  isLoading,
}: any) {
  const [selected, setSelected] = useState(currentPriority);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md overflow-hidden">
        
        {/* HEADER */}
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
          <h3 className="text-lg font-bold text-slate-800">
            Update Ticket Priority
          </h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        {/* BODY */}
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

              {selected === p.value && (
                <CheckCircle2 className="w-5 h-5 text-indigo-600" />
              )}
            </button>
          ))}
        </div>

        {/* FOOTER */}
        <div className="p-6 bg-slate-50 flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2.5 text-sm font-semibold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-100 transition"
          >
            Cancel
          </button>

          <button
            disabled={isLoading}
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