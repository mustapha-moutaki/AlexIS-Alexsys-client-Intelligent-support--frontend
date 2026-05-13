"use client";

import { useState } from "react";
import {
  Ticket, AlertCircle, CheckCircle2, Clock, AlertTriangle,
  Plus, RefreshCw, Settings2, BarChart3, Users, TrendingUp, X
} from "lucide-react";
import { TicketResponse } from "@/src/types/TicketResponse";
import TicketsListForAdmin from "@/src/shared/components/forms/ticket-forms/admin/TicketsListForAdmin";
import { useTickets } from "@/src/hooks/useTickets";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useRouter } from "next/navigation";

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
          />
        </div>
      </main>

      {selectedTicket && (
        <TicketDetailModal ticket={selectedTicket} onClose={() => setSelectedTicket(null)} />
      )}
    </div>
  );
}