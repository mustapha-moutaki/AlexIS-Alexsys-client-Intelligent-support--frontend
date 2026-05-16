"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  Calendar, User, Paperclip, MessageSquare, Clock,
  ExternalLink, Shield, Tag, ChevronLeft, Download, FileText,
  PlusIcon,
  X,
  Send,
  ArrowUpRight
} from "lucide-react";
import { useTicketByIdByAdmin } from "@/src/hooks/useTickets";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import useAuthStore from "@/src/store/authStore";
import toast from "react-hot-toast";
import { useCreateComment } from "@/src/hooks/useComment";

// --- Configuration Mappings (Consistent with your previous request) ---
const STATUS_CONFIG: Record<string, { label: string; className: string }> = {
  OPEN: { label: "Open", className: "bg-emerald-50 text-emerald-700 border-emerald-200" },
  ASSIGNED: { label: "Assigned", className: "bg-cyan-50 text-cyan-700 border-cyan-200" },
  IN_PROGRESS: { label: "In Progress", className: "bg-blue-50 text-blue-700 border-blue-200" },
  RESOLVED: { label: "Resolved", className: "bg-teal-50 text-teal-700 border-teal-200" },
  CLOSED: { label: "Closed", className: "bg-slate-100 text-slate-500 border-slate-200" },
  REOPEN: { label: "Reopened", className: "bg-amber-50 text-amber-700 border-amber-200" },
};

const ISSUE_TYPE_CONFIG: Record<string, { label: string; className: string }> = {
  BUG: { label: "Bug", className: "bg-red-50 text-red-600 border-red-200" },
  REQUEST: { label: "Request", className: "bg-blue-50 text-blue-600 border-blue-200" },
  INCIDENT: { label: "Incident", className: "bg-orange-50 text-orange-600 border-orange-200" },
  UI: { label: "UI", className: "bg-pink-50 text-pink-600 border-pink-200" },
  UX: { label: "UX", className: "bg-indigo-50 text-indigo-600 border-indigo-200" },
  OTHER: { label: "Other", className: "bg-slate-50 text-slate-600 border-slate-200" },
};

export default function TicketDetailPage() {
  const params = useParams();
  const ticketId = params.id;
  const { data: ticket, isLoading, isError, error } = useTicketByIdByAdmin(Number(ticketId));
  const [isAddCommentOpened, setIsAddCommentOpened] = useState(false);
  const [currentUser, setCurrentUser] = useState<any | null>(null)
  const user = useAuthStore((state) => state.user)
  const [content, setContnet] = useState<string>("");
  const router = useRouter();
  const [isUploadOpened, setIsUploadOpened] = useState(false);
const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const { mutate, isPending } = useCreateComment(Number(ticketId), content);

  useEffect(() => {
    if (user) {
      setCurrentUser(user);
    }
  }, [user]);

  const handleOpenCloseComment = () => {
    setIsAddCommentOpened(!isAddCommentOpened);
  }



  const handleAddComment = (ticketId: number) => {
    console.log(ticketId, content);

    if (!content.trim()) return;
    mutate({ ticketId, content });
    setContnet("");
  };





  const formatTimestamp = (dateString: any) => {
    const date = new Date(dateString);
    const today = new Date();

    const isToday = date.toDateString() === today.toDateString();

    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    if (isToday) {
      return `Today, ${time}`;
    } else {
      // Returns format like "Oct 24, 10:30 AM"
      return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`;
    }
  };

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
            {/* Attachments Section */}
<section className="pt-8 border-t border-slate-100">
  <div className="flex items-center justify-between mb-6">
    <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
      <Paperclip size={14} /> 
      Attachments ({ticket.attachments?.length || 0})
    </h3>

    {!isUploadOpened && (
      <button
        className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
        onClick={() => setIsUploadOpened(true)}
      >
        <PlusIcon size={16} />
        New Attachment
      </button>
    )}
  </div>

  {/* NEW UPLOAD INPUT AREA */}
  {isUploadOpened && (
    <div className="mb-6 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30 animate-in fade-in slide-in-from-top-2">
      <div className="flex flex-col items-center justify-center">
        <label className="flex flex-col items-center justify-center w-full cursor-pointer group">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <div className="p-3 bg-white rounded-full shadow-sm border border-slate-100 mb-3 group-hover:scale-110 transition-transform">
              <Paperclip size={20} className="text-slate-400 group-hover:text-slate-600" />
            </div>
            <p className="text-sm font-semibold text-slate-600">
              {selectedFile ? selectedFile.name : "Click to select a file"}
            </p>
            <p className="text-xs text-slate-400 mt-1">PNG, JPG or PDF only</p>
          </div>
          <input 
            type="file" 
            className="hidden" 
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
          />
        </label>

        <div className="flex gap-3 mt-4 w-full justify-center">
          <button
            className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-slate-600 transition-colors"
            onClick={() => {
              setIsUploadOpened(false);
              setSelectedFile(null);
            }}
          >
            Cancel
          </button>
          <button
            disabled={!selectedFile}
            className={`flex items-center gap-2 px-5 py-2 rounded-xl text-sm font-bold transition-all shadow-sm ${
              selectedFile 
              ? "bg-slate-900 text-white hover:bg-slate-800" 
              : "bg-slate-200 text-slate-400 cursor-not-allowed"
            }`}
            onClick={() => {
              // Handle your upload logic here
              console.log("Uploading:", selectedFile);
              // After success:
              // setIsUploadOpened(false);
              // setSelectedFile(null);
            }}
          >
            <Send size={14} />
            Upload File
          </button>
        </div>
      </div>
    </div>
  )}

  {ticket.attachments?.length > 0 ? (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
      {ticket.attachments.map((file) => (
        <div 
          key={file.id} 
          className="flex items-center justify-between p-3 border border-slate-100 bg-slate-50/30 rounded-2xl hover:bg-white hover:border-slate-200 hover:shadow-sm transition-all group"
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="p-2.5 bg-white border border-slate-100 text-slate-400 rounded-xl group-hover:text-slate-600 transition-colors">
              <FileText size={20} />
            </div>
            
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-slate-700 truncate max-w-[180px]">
                {file.fileName}
              </p>
              <div className="flex items-center gap-2 text-[10px] text-slate-400 font-medium">
                <span className="uppercase">{file.fileType.split('/')[1]}</span>
                <span>•</span>
                <span>{formatTimestamp(file.uploadedAt)}</span>
              </div>
            </div>
          </div>

          <a 
            href={file.fileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2 text-slate-400 hover:text-slate-900 hover:bg-white rounded-lg transition-all"
          >
            <Download size={18} />
          </a>
        </div>
      ))}
    </div>
  ) : (
    !isUploadOpened && (
      <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
        <p className="text-slate-400 text-sm italic">No attachments found.</p>
      </div>
    )
  )}
</section>

            {/* Comments Section */}

            <section className="pt-8 border-t border-slate-100">
              {/* Header Section */}
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} />
                  Discussion ({ticket.comments?.length || 0})
                </h3>

                {!isAddCommentOpened && (
                  <button
                    className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold transition-colors"
                    onClick={handleOpenCloseComment}
                  >
                    <PlusIcon size={16} />
                    New Note
                  </button>
                )}
              </div>

              {/* 
      SCROLLABLE SECTION 
      Logic: If comments > 5, apply fixed height and scroll.
  */}
              <div
                className={`pr-2 transition-all duration-300 ${ticket.comments?.length > 5
                    ? "max-h-[500px] overflow-y-auto"
                    : "max-h-fit overflow-visible"
                  } 
    [&::-webkit-scrollbar]:w-1.5
    [&::-webkit-scrollbar-track]:bg-transparent
    [&::-webkit-scrollbar-thumb]:bg-slate-200
    [&::-webkit-scrollbar-thumb]:rounded-full
    hover:[&::-webkit-scrollbar-thumb]:bg-slate-300`}
              >
                <div className="space-y-6">
                  {ticket.comments?.map((comment) => {
                    const isMine = comment.authorId === user?.id;

                    return (
                      <div
                        key={comment.id}
                        className={`flex gap-3 ${isMine ? "flex-row" : "flex-row-reverse"}`}
                      >
                        {/* Avatar */}
                        <div className={`h-8 w-8 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 border ${isMine
                            ? "bg-slate-900 border-slate-900 text-white"
                            : "bg-slate-50 border-slate-200 text-slate-500"
                          }`}>
                          {isMine
                            ? (currentUser?.firstName?.charAt(0) || "M")
                            : (comment.authorName?.charAt(0) || "U")}
                        </div>

                        {/* Content Wrapper */}
                        <div className={`max-w-[75%] flex flex-col ${isMine ? "items-start" : "items-end"}`}>
                          {/* Metadata */}
                          <div className="flex items-center gap-2 mb-1.5 px-1">
                            <span className="text-xs font-semibold text-slate-700">
                              {isMine ? "You" : (comment.authorName || "Unknown")}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap">
                              {formatTimestamp(comment.createdAt)}
                            </span>
                          </div>

                          {/* Message Bubble */}
                          <div
                            className={`p-3 rounded-2xl text-sm leading-relaxed border ${isMine
                                ? "bg-slate-100 text-slate-800 border-slate-200 rounded-tl-none"
                                : "bg-white text-slate-600 border-slate-100 shadow-sm rounded-tr-none"
                              }`}
                          >
                            {comment.content}
                          </div>
                        </div>
                      </div>
                    );
                  })}

                  {/* Empty State */}
                  {(!ticket.comments || ticket.comments.length === 0) && (
                    <div className="text-center py-10 border-2 border-dashed border-slate-100 rounded-2xl">
                      <p className="text-slate-400 text-sm italic">No notes yet.</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Add Comment Input Area - Always visible at bottom when opened */}
              {isAddCommentOpened && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <div className="relative group">
                    <textarea
                      rows={3}
                      className="w-full border border-slate-200 rounded-xl p-4 text-sm focus:border-slate-400 focus:outline-none transition-all placeholder:text-slate-300 bg-slate-50/50 resize-none"
                      placeholder="Type a note..."
                      value={content}
                      onChange={(e) => setContnet(e.target.value)}
                      autoFocus
                    />

                    <div className="flex justify-end gap-2 mt-3">
                      <button
                        className="px-4 py-2 text-sm font-semibold text-slate-400 hover:text-slate-600 transition-colors"
                        onClick={handleOpenCloseComment}
                      >
                        Cancel
                      </button>
                      <button
                        className="flex items-center gap-2 bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold hover:bg-slate-800 transition-all shadow-md active:scale-95"
                        onClick={() => handleAddComment(ticket.id)}
                      >
                        <Send size={14} />
                        Post Note
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* RIGHT COLUMN: SIDEBAR METADATA */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/50 rounded-2xl border border-slate-100 p-6 space-y-8">

              {/* Properties */}
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Properties</h3>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Tag size={14} /> Type</span>
                  <span className={`px-2 py-0.5 rounded text-[11px] font-bold border ${typeStyle.className}`}>
                    {typeStyle.label}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Shield size={14} /> Priority</span>
                  <span className={`text-sm font-bold ${ticket.priority === 'HIGH' || ticket.priority === 'URGENT' ? 'text-red-600' : 'text-slate-700'}`}>
                    {ticket.priority}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-500 flex items-center gap-2"><Layers size={14} /> Category</span>
                  <span className="text-sm font-bold text-slate-700">{ticket.category.name}</span>
                </div>
              </div>

              {/* People */}
              <div className="space-y-4 pt-6 border-t border-slate-200/50">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">People</h3>

                <div className="space-y-3">
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Client
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <User size={14} className="text-slate-400" />
                        {ticket.clientName || "Unassigned"}
                      </div>

                      {ticket.clientId && (
                        <button
                          onClick={() => router.push(`/dashboard/users/${ticket.clientId}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200"
                          title="View profile"
                        >
                          <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                      Assigned To
                    </span>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 bg-slate-50 px-2 py-1 rounded-lg border border-slate-100">
                        <User size={14} className="text-slate-400" />
                        {ticket.assignedToName || "Unassigned"}
                      </div>

                      {ticket.assignedToId && (
                        <button
                          onClick={() => router.push(`/dashboard/users/${ticket.assignedToId}`)}
                          className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-md transition-colors border border-transparent hover:border-slate-200"
                          title="View profile"
                        >
                          <ArrowUpRight size={14} />
                        </button>
                      )}
                    </div>
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