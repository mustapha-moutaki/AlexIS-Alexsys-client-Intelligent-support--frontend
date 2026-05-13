"use client";

import { useState, useMemo } from "react";
import { Eye, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Search, Filter } from "lucide-react";
import { ApiResponse } from "@/src/types/ApiResponse";
import { TicketResponse } from "@/src/types/TicketResponse";
import SimpleSpinner from "@/components/ui/SimpleSpinner";

const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  OPEN:        { label: "Open",        className: "bg-emerald-50 text-emerald-700 border border-emerald-200" },
  ASSIGNED:    { label: "Assigned",    className: "bg-cyan-50 text-cyan-700 border border-cyan-200" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-50 text-blue-700 border border-blue-200" },
  RESOLVED:    { label: "Resolved",    className: "bg-teal-50 text-teal-700 border border-teal-200" },
  CLOSED:      { label: "Closed",      className: "bg-slate-100 text-slate-500 border border-slate-200" },
  REOPEN:      { label: "Reopened",    className: "bg-amber-50 text-amber-700 border border-amber-200" },
};
const PRIORITY_CONFIG: Record<string, { label: string; className: string; dot: string }> = {
  LOW:      { label: "Low",      className: "bg-slate-50 text-slate-500 border border-slate-200",   dot: "bg-slate-400" },
  MEDIUM:   { label: "Medium",   className: "bg-orange-50 text-orange-600 border border-orange-200", dot: "bg-orange-400" },
  HIGH:     { label: "High",     className: "bg-red-50 text-red-600 border border-red-200",         dot: "bg-red-500" },
  CRITICAL: { label: "Critical", className: "bg-rose-100 text-rose-700 border border-rose-300",     dot: "bg-rose-600" },
};

const ISSUE_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  BUG:      { label: "Bug",      className: "bg-red-50 text-red-600 border border-red-200" },
  REQUEST:  { label: "Request",  className: "bg-blue-50 text-blue-600 border border-blue-200" },
  INCIDENT: { label: "Incident", className: "bg-orange-50 text-orange-600 border border-orange-200" },
  UI:       { label: "UI",       className: "bg-pink-50 text-pink-600 border border-pink-200" },
  UX:       { label: "UX",       className: "bg-indigo-50 text-indigo-600 border border-indigo-200" },
  OTHER:    { label: "Other",    className: "bg-slate-50 text-slate-600 border border-slate-200" },
};

const PAGE_SIZE_OPTIONS = [5, 10, 15, 20];
type SortKey = "id" | "title" | "status" | "priority" | "issueType";
type SortDir = "asc" | "desc";

function truncate(text: string, maxChars = 60) {
  return text?.length > maxChars ? text.slice(0, maxChars).trimEnd() + "…" : text;
}

function Badge({ config }: { config: { label: string; className: string; dot?: string } }) {
  if (!config) return null;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${config.className}`}>
      {config.dot && <span className={`w-1.5 h-1.5 rounded-full ${config.dot}`} />}
      {config.label}
    </span>
  );
}

interface TicketsListProps {
  content: any; // This is the Page object returned by your API
  onViewTicket: (ticket: TicketResponse) => void;
  page: number;
  setPage: (p: number) => void;
  pageSize: number;
  setPageSize: (s: number) => void;
  isLoading: boolean;
}


export function TicketsListForAdmin({ content, onViewTicket, page, setPage, pageSize, setPageSize, isLoading }: TicketsListProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [priorityFilter, setPriorityFilter] = useState<string>("ALL");
  const [typeFilter, setTypeFilter] = useState<string>("ALL");
  const [sortKey, setSortKey] = useState<string>("id");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");

  const filtered = useMemo(() => {
    // CRITICAL: Your API response stores the array in 'content' field of the response data
    let data = content?.content ? [...content.content] : [];

    if (search.trim()) {
      const q = search.toLowerCase();
      data = data.filter((t: any) => t.title.toLowerCase().includes(q) || t.description.toLowerCase().includes(q));
    }
    if (statusFilter !== "ALL") data = data.filter((t: any) => t.status === statusFilter);
    if (priorityFilter !== "ALL") data = data.filter((t: any) => t.priority === priorityFilter);
    if (typeFilter !== "ALL") data = data.filter((t: any) => t.issueType === typeFilter);

    return data;
  }, [content, search, statusFilter, priorityFilter, typeFilter]);

  const totalPages = content?.totalPages || 1;

  return (
    <div className="flex flex-col gap-4">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-48">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            placeholder="Search tickets..."
            value={search}
            onChange={e => { setSearch(e.target.value); setPage(1); }}
            className="w-full pl-9 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
          />
        </div>
        <div className="flex items-center gap-2">
            <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }} className="text-sm border border-slate-200 rounded-lg px-3 py-2 bg-white">
                <option value="ALL">All Status</option>
                <option value="OPEN">Open</option>
                <option value="Assigned">Assigned</option>
                <option value="Resolved">Resolved</option>
                <option value="Reopened">Reopened</option>

                <option value="IN_PROGRESS">In Progress</option>
                <option value="CLOSED">Closed</option>
            </select>
            {/* ... Repeat for priority and type ... */}
        </div>
      </div>

      {/* Table */}
      <div className="rounded-xl border border-slate-200 overflow-hidden bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">#ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Title & Description</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Status</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Priority</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-500 uppercase">Type</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading ? (
                <tr><td colSpan={6} className="py-16 text-center text-slate-400"><SimpleSpinner/></td></tr>
              ) :
              filtered.length === 0 ? (
                <tr><td colSpan={6} className="py-16 text-center text-slate-400">No tickets found.</td></tr>
              ) :  (
                filtered.map((ticket: TicketResponse, idx: number) => (
                  <tr key={ticket.id} className={`hover:bg-indigo-50/40 ${idx % 2 === 0 ? "bg-white" : "bg-slate-50/40"}`}>
                    <td className="px-4 py-3.5 font-mono text-xs text-slate-400">#{ticket.id}</td>
                    <td className="px-4 py-3.5">
                      <p className="font-medium text-slate-800 mb-0.5">{ticket.title}</p>
                      <p className="text-xs text-slate-400">{truncate(ticket.description)}</p>
                    </td>
                    <td className="px-4 py-3.5"><Badge config={STATUS_CONFIG[ticket.status]} /></td>
                    <td className="px-4 py-3.5"><Badge config={PRIORITY_CONFIG[ticket.priority]} /></td>
                    <td className="px-4 py-3.5"><Badge config={ISSUE_TYPE_CONFIG[ticket.issueType]} /></td>
                    <td className="px-4 py-3.5 text-right">
                      <button onClick={() => onViewTicket(ticket)} className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-500 hover:bg-indigo-600 hover:text-white transition-all shadow-sm">
                        <Eye className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3 border-t border-slate-200 bg-slate-50">
          <div className="flex items-center gap-2 text-sm text-slate-500">
            <span>Rows:</span>
            <select value={pageSize} onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }} className="border border-slate-200 rounded px-1 py-1">
              {[5, 10, 15, 20].map(s => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-500">Page {page} of {totalPages}</span>
            <button onClick={() => setPage(Math.max(1, page - 1))} disabled={page === 1} className="p-1 border rounded bg-white disabled:opacity-40"><ChevronLeft className="w-4 h-4" /></button>
            <button onClick={() => setPage(Math.min(totalPages, page + 1))} disabled={page === totalPages} className="p-1 border rounded bg-white disabled:opacity-40"><ChevronRight className="w-4 h-4" /></button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TicketsListForAdmin;