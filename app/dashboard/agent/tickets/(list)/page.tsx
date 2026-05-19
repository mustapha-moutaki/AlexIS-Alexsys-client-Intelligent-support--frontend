"use client";

import { useState, useMemo } from "react";
import { 
  Ticket, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  Filter, 
  RefreshCcw, 
  Search, 
  Eye, 
  Settings2,
  MessageSquare,
  Paperclip,
  Tag
} from "lucide-react";
import { ticketStatus } from "@/src/shared/constants/ticketStatus";
import { useTicketsByAgent } from "@/src/hooks/useTickets";

export default function AgentTicketsPage() {
  const [statusFilter, setStatusFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // 1. Pass the statusFilter state to the hook. 
  // Based on your service code, "" will trigger the 'else' (no params) block.
  const { data: tickets = [], isLoading, refetch } = useTicketsByAgent(statusFilter);

  // 2. Fixed useMemo to use the correct variable "tickets"
  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket: any) => {
      const searchStr = searchQuery.toLowerCase();
      const idStr = String(ticket.id).toLowerCase();
      const titleStr = (ticket.title || "").toLowerCase();
      return idStr.includes(searchStr) || titleStr.includes(searchStr);
    });
  }, [tickets, searchQuery]);

  // --- Helpers ---
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "OPEN": return "bg-blue-50 text-blue-700 border-blue-100";
      case "ASSIGNED": return "bg-purple-50 text-purple-700 border-purple-100";
      case "IN_PROGRESS": return "bg-orange-50 text-orange-700 border-orange-100";
      case "RESOLVED": return "bg-emerald-50 text-emerald-700 border-emerald-100";
      case "CLOSED": return "bg-slate-50 text-slate-600 border-slate-200";
      default: return "bg-gray-50 text-gray-600 border-gray-100";
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Agent Workspace</h1>
          <p className="text-sm text-slate-400 mt-0.5">Manage and resolve your assigned support tickets</p>
        </div>
        <button 
          onClick={() => refetch()}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-slate-600 bg-white hover:bg-slate-50 rounded-xl border border-slate-200 transition shadow-sm disabled:opacity-50"
        >
          <RefreshCcw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </button>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
        <div className="flex-1 min-w-[280px] relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input 
            type="text"
            placeholder="Search by ID or title..."
            className="w-full pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 transition"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
            <Filter className="w-4 h-4" />
            Status:
          </div>
          <select 
            className="bg-slate-50 border border-slate-200 text-slate-700 text-sm font-semibold rounded-xl px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="">All Statuses</option>
            {ticketStatus.map((status) => (
              <option key={status.value} value={status.value}>{status.label}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Ticket Details</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Type & Priority</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase">Activity</th>
                <th className="px-6 py-4 text-right text-xs font-bold text-slate-500 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr>
                   <td colSpan={5} className="px-6 py-10 text-center text-slate-400">Loading tickets...</td>
                </tr>
              ) : filteredTickets.length > 0 ? (
                filteredTickets.map((ticket: any) => (
                  <tr key={ticket.id} className="group hover:bg-slate-50/80 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-800">#{ticket.id}</span>
                        <span className="text-xs text-slate-500 font-medium truncate max-w-[200px]">{ticket.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-1.5 text-xs font-bold text-slate-600">
                          <Tag className="w-3 h-3 text-indigo-400" />
                          {ticket.issueType}
                        </div>
                        <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-tight">{ticket.priority}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase border ${getStatusStyle(ticket.status)}`}>
                        {ticket.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4 text-slate-400">
                        <div className="flex items-center gap-1">
                          <MessageSquare className="w-4 h-4" />
                          <span className="text-xs font-bold">{ticket.commentCount || 0}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Paperclip className="w-4 h-4" />
                          <span className="text-xs font-bold">{ticket.attachmentCount || 0}</span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button 
                          onClick={() => console.log("View", ticket.id)}
                          className="p-2 bg-slate-50 hover:bg-indigo-50 text-slate-500 hover:text-indigo-600 rounded-lg border border-slate-100 transition shadow-sm"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => console.log("Status", ticket.id)}
                          className="p-2 bg-slate-50 hover:bg-orange-50 text-slate-500 hover:text-orange-600 rounded-lg border border-slate-100 transition shadow-sm"
                        >
                          <Settings2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400">
                    No tickets found matches your criteria
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}