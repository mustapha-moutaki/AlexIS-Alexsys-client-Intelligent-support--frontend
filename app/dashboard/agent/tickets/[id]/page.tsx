"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  User, Paperclip, MessageSquare, Shield, Tag, 
  Download, FileText, PlusIcon, Send, ArrowUpRight, Trash2,
  Layers as LayersIcon,
  Pencil
} from "lucide-react";
import { useTicketByIdByAdmin, useTicketByIdForAgent } from "@/src/hooks/useTickets";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import useAuthStore from "@/src/store/authStore";
import { useCreateComment, useDeleteComment, useEditComment } from "@/src/hooks/useComment";
import { useCreateAttachment, useDeleteAttachment } from "@/src/hooks/useAttachment";
import NotFoundComponent from "@/components/404Error";

// --- Configuration Mappings ---
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

export default function TicketPageDetailsForAgent() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id as string;
  
  const user = useAuthStore((state) => state.user);
  const {data:ticket, isLoading:isLoadingTicket, isError:isErrorTicket, error:errorTicket} = useTicketByIdForAgent(Number(ticketId));
  // States
  const [isAddCommentOpened, setIsAddCommentOpened] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isUploadOpened, setIsUploadOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // API Hooks
  const { mutate: createComment, isPending: isCommentCreating } = useCreateComment(Number(ticketId), commentContent);
  const { mutate: editComment, isPending: isEditingComment } = useEditComment(ticketId);
  const { mutate: deleteCommentMutation } = useDeleteComment();
  const { mutate: createAttachment, isPending: isAttachmentPending } = useCreateAttachment();
  const { mutate: deleteAttachment, isPending: isAttachmentDeleting } = useDeleteAttachment();

  const handleAddComment = () => {
    if (!commentContent.trim()) return;
    createComment({ ticketId: Number(ticketId), content: commentContent }, {
      onSuccess: () => {
        setCommentContent("");
        setIsAddCommentOpened(false);
      }
    });
  };

  const handleUpdateComment = (id: string, content: string) => {
    if (!content.trim()) return;
    editComment({ id, content }, {
      onSuccess: () => {
        setEditingCommentId(null);
        setEditValue("");
      }
    });
  };

  const handleDeleteComment = (commentId: number) => {
    if (window.confirm("Are you sure you want to delete this comment?")) {
      deleteCommentMutation(commentId);
    }
  };

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    createAttachment({ file: selectedFile, ticketId: Number(ticketId) }, {
      onSuccess: () => {
        setSelectedFile(null);
        setIsUploadOpened(false);
      }
    });
  };

  const formatTimestamp = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const today = new Date();
    const isToday = date.toDateString() === today.toDateString();
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return isToday ? `Today, ${time}` : `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`;
  };

  if (isLoadingTicket) return <div className="flex justify-center items-center min-h-[400px]"><SimpleSpinner /></div>;
  if (isErrorTicket || !ticket) return <NotFoundComponent error={isErrorTicket ? errorTicket?.message : "Ticket not found"} />

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

      {/* HEADER */}
      <div className="w-full px-6 py-4 border-b border-slate-100 flex items-center justify-between sticky top-0 bg-white/80 backdrop-blur-md z-10">
        <div className="flex items-center gap-4">
          <ButtonGoBack />
          <div className="h-6 w-[1px] bg-slate-200 mx-2" />
          <span className="text-slate-400 font-mono text-sm">TICKET-{ticket.id}</span>
          <h1 className="text-lg font-bold text-slate-900 truncate max-w-md">{ticket.title}</h1>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusStyle.className}`}>
          {statusStyle.label}
        </span>
      </div>

      <div className="w-full px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* MAIN CONTENT */}
          <div className="lg:col-span-8 space-y-10">
            <section>
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Description</h3>
              <p className="text-slate-700 leading-relaxed whitespace-pre-wrap text-lg">
                {ticket.description}
              </p>
            </section>

            {/* ATTACHMENTS */}
            <section className="pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <Paperclip size={14} /> Attachments ({ticket.attachments?.length || 0})
                </h3>
                {!isUploadOpened && (
                  <button onClick={() => setIsUploadOpened(true)} className="flex items-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-50 px-4 py-2 rounded-xl text-sm font-bold">
                    <PlusIcon size={16} /> New Attachment
                  </button>
                )}
              </div>

              {isUploadOpened && (
                <div className="mb-6 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30">
                  <div className="flex flex-col items-center">
                    <label className="cursor-pointer group flex flex-col items-center">
                      <div className="p-3 bg-white rounded-full border border-slate-100 mb-3 group-hover:scale-110 transition-transform">
                        <Paperclip size={20} className="text-slate-400" />
                      </div>
                      <p className="text-sm font-semibold text-slate-600">{selectedFile ? selectedFile.name : "Select a file"}</p>
                      <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                    </label>
                    <div className="flex gap-3 mt-4">
                      <button onClick={() => { setIsUploadOpened(false); setSelectedFile(null); }} className="px-4 py-2 text-sm text-slate-400">Cancel</button>
                      <button 
                        disabled={!selectedFile || isAttachmentPending} 
                        onClick={handleSubmitFile}
                        className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2"
                      >
                        {isAttachmentPending ? <SimpleSpinner /> : <Send size={14} />} Upload
                      </button>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {ticket.attachments?.map((file: any) => (
                  <div key={file.id} className="flex items-center justify-between p-3 border border-slate-100 rounded-2xl hover:bg-slate-50">
                    <div className="flex items-center gap-3 overflow-hidden">
                      <FileText size={20} className="text-slate-400" />
                      <div className="overflow-hidden">
                        <p className="text-sm font-semibold text-slate-700 truncate">{file.fileName}</p>
                        <p className="text-[10px] text-slate-400 uppercase">{formatTimestamp(file.uploadedAt)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
  
  {/* uploaded by */}
  <span className="text-[10px] text-slate-400">
    by {file.uploadedByName}
  </span>

  {/* show delete only for owner */}
  {file.uploadedById === user?.id && (
    <button
      onClick={() => deleteAttachment(file.id)}
      className="text-slate-400 hover:text-red-500"
    >
      <Trash2 size={16} />
    </button>
  )}

  <a
    href={file.fileUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-slate-400 hover:text-slate-900"
  >
    <Download size={18} />
  </a>
</div>
                  </div>
                ))}
              </div>
            </section>

            {/* DISCUSSION */}
            <section className="pt-8 border-t border-slate-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <MessageSquare size={14} /> Discussion ({ticket.comments?.length || 0})
                </h3>
                {!isAddCommentOpened && (
                  <button onClick={() => setIsAddCommentOpened(true)} className="text-slate-600 border border-slate-200 px-4 py-2 rounded-xl text-sm font-bold">
                    + New Note
                  </button>
                )}
              </div>

              <div className="space-y-6">
                {ticket.comments?.map((comment: any) => {
                  const isMine = comment.authorId === user?.id;
                  const isEditing = editingCommentId === comment.id;
                  return (
                    <div key={comment.id} className={`flex gap-3 ${isMine ? "flex-row" : "flex-row-reverse"}`}>
                      <div className="h-8 w-8 rounded-full bg-slate-100 border flex items-center justify-center text-[10px] font-bold">
                        {comment.authorName?.charAt(0) || "U"}
                      </div>
                      <div className={`max-w-[75%] ${isMine ? "items-start" : "items-end"} flex flex-col`}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold">{isMine ? "You" : comment.authorName}</span>
                          <span className="text-[10px] text-slate-400">{formatTimestamp(comment.createdAt)}</span>
                          {isMine && !isEditing && (
                            <button onClick={() => {setEditingCommentId(comment.id); setEditValue(comment.content);}} className="text-slate-400 hover:text-blue-500"><Pencil size={12}/></button>
                          )}
                        </div>
                        {isEditing ? (
                          <div className="w-full bg-white border border-blue-200 p-2 rounded-lg">
                            <textarea className="w-full text-sm outline-none resize-none" value={editValue} onChange={(e) => setEditValue(e.target.value)} />
                            <div className="flex justify-end gap-2 mt-2">
                              <button onClick={() => setEditingCommentId(null)} className="text-[10px] text-slate-400">Cancel</button>
                              <button onClick={() => handleUpdateComment(comment.id.toString(), editValue)} className="text-[10px] text-blue-600 font-bold">Save</button>
                            </div>
                          </div>
                        ) : (
                          <div className={`p-3 rounded-2xl text-sm border ${isMine ? "bg-slate-100 border-slate-200" : "bg-white border-slate-100"}`}>
                            {comment.content}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {isAddCommentOpened && (
                <div className="mt-6 border-t pt-6">
                  <textarea className="w-full border rounded-xl p-4 text-sm bg-slate-50 outline-none" rows={3} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Add a note..." />
                  <div className="flex justify-end gap-3 mt-3">
                    <button onClick={() => setIsAddCommentOpened(false)} className="text-slate-400 text-sm">Cancel</button>
                    <button onClick={handleAddComment} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold">Post Note</button>
                  </div>
                </div>
              )}
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Properties</h3>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><Tag size={14}/> Type</span>
                  <span className={`px-2 py-0.5 rounded font-bold border ${typeStyle.className}`}>{typeStyle.label}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><Shield size={14}/> Priority</span>
                  <span className={`font-bold ${ticket.priority === 'HIGH' ? 'text-red-600' : 'text-slate-700'}`}>{ticket.priority}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-2 text-slate-500"><LayersIcon size={14}/> Category</span>
                  <span className="font-bold">{ticket.category?.name || "General"}</span>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4">People</h3>
                <div className="space-y-4">
                  <PeopleRow label="Client" name={ticket.clientName} id={ticket.clientId}  />
                  {/* <PeopleRow label="Agent" name={ticket.assignedToName} id={ticket.assignedToId}  /> */}
                </div>
              </div>

              <div className="pt-6 border-t border-slate-200">
                <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4">Timeline</h3>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-slate-500">Assigned</span><span>{ticket.assignedAt ? new Date(ticket.assignedAt).toLocaleDateString() : "—"}</span></div>
                  <div className="flex justify-between"><span className="text-slate-500">Resolved</span><span>{ticket.resolvedAt ? new Date(ticket.resolvedAt).toLocaleDateString() : "—"}</span></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function PeopleRow({ label, name, id }: { label: string, name: string | null, id: number | null }) {
  return (
    <div>
      <span className="text-[10px] text-slate-400 font-bold uppercase">{label}</span>
      <div className="flex items-center justify-between bg-white border p-2 rounded-lg mt-1">
        <span className="text-sm font-semibold flex items-center gap-2"><User size={14} className="text-slate-400"/> {name || "Unassigned"}</span>
      </div>
    </div>
  );
}