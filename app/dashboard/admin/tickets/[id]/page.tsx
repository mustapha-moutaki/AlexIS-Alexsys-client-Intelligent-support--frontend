"use client";
import React from "react";
import { useParams } from "next/navigation";
import { 
  Calendar, User, Paperclip, MessageSquare, Clock, 
  ExternalLink, Shield, Tag, ChevronLeft, Download, FileText 
} from "lucide-react";
import { useTicketByIdByAdmin } from "@/src/hooks/useTickets";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";

// --- Configuration Mappings (Consistent with your previous request) ---
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  OPEN:        { label: "Open",        className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ASSIGNED:    { label: "Assigned",    className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-50 text-blue-700 border-blue-200" },
  RESOLVED:    { label: "Resolved",    className: "bg-teal-50 text-teal-700 border-teal-200" },
  CLOSED:      { label: "Closed",      className: "bg-slate-100 text-slate-500 border-slate-200" },
  REOPEN:      { label: "Reopened",    className: "bg-amber-50 text-amber-700 border-amber-200" },
};

const ISSUE_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  BUG:      { label: "Bug",      className: "bg-red-50 text-red-600 border-red-200" },
  REQUEST:  { label: "Request",  className: "bg-blue-50 text-blue-600 border-blue-200" },
  INCIDENT: { label: "Incident", className: "bg-orange-50 text-orange-600 border-orange-200" },
  UI:       { label: "UI",       className: "bg-pink-50 text-pink-600 border-pink-200" },
  UX:       { label: "UX",       className: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  OTHER:    { label: "Other",    className: "bg-slate-50 text-slate-600 border-slate-200" },
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id;
  const { data: ticket, isLoading, isError, error } = useTicketByIdByAdmin(Number(ticketId));

  if (isLoading) return <div className="flex justify-center items-center min-h-[400px]"><SimpleSpinner /></div>;
  if (isError || !ticket) return <div className="p-8 text-red-500">Error: {error?.message || "Ticket not found"}</div>;

  const statusStyle = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.OPEN;
  const typeStyle = ISSUE_TYPE_CONFIG[ticket.issueType] || ISSUE_TYPE_CONFIG.OTHER;

  return (
    <div className="w-full min-h-screen bg-white font-sans pb-20">
            <div className="w-full px-6 py-4">
                <Breadcrumbs 
      items={[
        { name: "Dashboard", route: "/dashboard" },
        { name: "Tickets", route: "/dashboard/admin/tickets" },
        { name: `TICKET-${ticket.id}`, route: `/dashboard/admin/tickets/${ticket.id}` },
      ]}
      />
            </div>

      {/* 1. TOP NAVIGATION BAR */}
      <div className="w-full px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
      
        <div className="flex items-center gap-4">
          <ButtonGoBack />
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <span className="text-slate-400 font-mono text-sm">TICKET-{ticket.id}</span>
          <h1 className="text-lg font-bold text-slate-900 truncate max-w-md">{ticket.title}</h1>
        </div>
        <div className="flex items-center gap-3">
            <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.className}`}>
                {statusStyle.label}
            </span>
        </div>
      </div>

      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* LEFT COLUMN: MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Description Section */}
            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
              <div className="prose prose-slate max-w-none">
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                  {ticket.description}
                </p>
              </div>
            </section>

            {/* Attachments Section */}
            <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <Paperclip size={16} /> Attachments ({ticket.attachments?.length || 0})
              </h3>
            {ticket.attachments?.length > 0 && (
              <section>
               
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ticket.attachments.map((file) => (
                    <div key={file.id} className="flex items-center justify-between p-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors group">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
                          <FileText size={20} />
                        </div>
                        <div className="overflow-hidden">
                          <p className="text-sm font-medium text-slate-800 truncate">{file.fileName}</p>
                          <p className="text-[10px] text-slate-400 uppercase font-bold">{file.fileType}</p>
                        </div>
                      </div>
                      <a href={file.fileUrl} target="_blank" className="p-2 text-slate-400 hover:text-blue-600 transition-colors">
                        <Download size={18} />
                      </a>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Comments Section */}
            <section className="pt-8 border-t border-slate-100">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2">
                <MessageSquare size={16} /> Discussion ({ticket.comments?.length || 0})
              </h3>
              
              <div className="space-y-6">
                {ticket.comments?.map((comment) => (
                  <div key={comment.id} className="flex gap-4">
                    <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 font-bold shrink-0 border border-slate-200 overflow-hidden">
                      {comment.authorName || "Unknown"}
                    </div>
                    <div className="flex-1 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-bold text-slate-900 text-sm">{comment.authorName || "Unknown"}</span>
                        <span className="text-xs text-slate-400 flex items-center gap-1">
                          <Clock size={12} /> {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-slate-700 text-sm leading-normal">
                        {comment.content}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Empty State for Comments */}
                {(!ticket.comments || ticket.comments.length === 0) && (
                    <div className="text-center py-10 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                        <p className="text-slate-400 text-sm italic">No comments yet.</p>
                    </div>
                )}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR METADATA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-8">
              
              {/* Properties */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Properties</h3>
                
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Tag size={14}/> Type</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${typeStyle.className}`}>
                    {typeStyle.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Shield size={14}/> Priority</span>
                  <span className={`text-sm font-bold ${ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'text-red-600' : 'text-slate-700'}`}>
                    {ticket.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Layers size={14}/> Category</span>
                  <span className="text-sm font-bold text-slate-700">{ticket.category.name}</span>
                </div>
              </div>

              {/* People */}
              <div className="space-y-4 pt-6 border-t border-slate-200/50">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">People</h3>
                
                <div className="space-y-3">
                    <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400 font-bold uppercase">Client</span>
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <div className="h-2 w-2 bg-blue-500 rounded-full" /> {ticket.clientName} 
                            <button className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded font-semibold text-slate-800 flex items-center gap-2" onClick={()=>{alert("this feature is not integrated yet")}}>View profile</button>
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-[11px] text-slate-400 font-bold uppercase">Assigned To</span>
                        <span className="text-sm font-semibold text-slate-800 flex items-center gap-2">
                            <User size={14} className="text-slate-400"/> {ticket.assignedToName || "Unassigned"}
                            <button className="text-sm bg-blue-500 text-white px-2 py-0.5 rounded font-semibold text-slate-800 flex items-center gap-2" onClick={()=>{alert("this feature is not integrated yet")}}>View profile</button>
                        </span>
                    </div>
                </div>
              </div>

              {/* Timeline */}
              <div className="space-y-4 pt-6 border-t border-slate-200/50">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Timeline</h3>
                <div className="space-y-3">
                    <TimelineItem label="Assigned At" date={ticket.assignedAt} />
                    <TimelineItem label="Resolved At" date={ticket.resolvedAt} />
                    <TimelineItem label="Closed At" date={ticket.closedAt} />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Helper component for timeline dates
function TimelineItem({ label, date }: { label: string; date: string | null }) {
    return (
        <div className="flex justify-between items-center text-xs">
            <span className="text-slate-500">{label}</span>
            <span className="font-mono text-slate-700">{date ? new Date(date).toLocaleDateString() : "—"}</span>
        </div>
    );
}

// Sub-icons for category and priority
const Layers = ({ size, className }: { size: number; className?: string }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><polygon points="12 2 2 7 12 12 22 7 12 2" /><polyline points="2 17 12 22 22 17" /><polyline points="2 12 12 17 22 12" /></svg>
);