"use client";
import React, { useState } from "react";
import { 
  User, Paperclip, MessageSquare, Shield, Tag, 
  Download, FileText, PlusIcon, Send, Trash2,
  Layers as LayersIcon, Pencil
} from "lucide-react";
import useAuthStore from "@/src/store/authStore";
import { useCreateComment, useDeleteComment, useEditComment } from "@/src/hooks/useComment";
import { useCreateAttachment, useDeleteAttachment } from "@/src/hooks/useAttachment";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";

// --- Configuration Mappings (Same as Admin for consistency) ---
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

export default function TicketDetailsFrorClient({ ticket }: { ticket: any }) {
  const user = useAuthStore((state) => state.user);
  const ticketId = ticket.id;

  // States
  const [isAddCommentOpened, setIsAddCommentOpened] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [isUploadOpened, setIsUploadOpened] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editValue, setEditValue] = useState("");

  // API Hooks (Using the same logic as your Admin page)
  const { mutate: createComment, isPending: isCommentCreating } = useCreateComment(Number(ticketId), commentContent);
  const { mutate: editComment } = useEditComment(ticketId.toString());
  const { mutate: deleteCommentMutation } = useDeleteComment();
  const { mutate: createAttachment, isPending: isAttachmentPending } = useCreateAttachment();
  const { mutate: deleteAttachment } = useDeleteAttachment();

  const handleAddComment = () => {
    if (!commentContent.trim()) return;
    createComment({ ticketId: Number(ticketId), content: commentContent }, {
      onSuccess: () => { setCommentContent(""); setIsAddCommentOpened(false); }
    });
  };

  const handleUpdateComment = (id: string, content: string) => {
    if (!content.trim()) return;
    editComment({ id, content }, {
      onSuccess: () => { setEditingCommentId(null); setEditValue(""); }
    });
  };

  const handleSubmitFile = () => {
    if (!selectedFile) return;
    createAttachment({ file: selectedFile, ticketId: Number(ticketId) }, {
      onSuccess: () => { setSelectedFile(null); setIsUploadOpened(false); }
    });
  };

  const formatTimestamp = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const time = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    return `${date.toLocaleDateString([], { month: 'short', day: 'numeric' })}, ${time}`;
  };

  const statusStyle = STATUS_CONFIG[ticket.status] || STATUS_CONFIG.OPEN;
  const typeStyle = ISSUE_TYPE_CONFIG[ticket.issueType] || ISSUE_TYPE_CONFIG.OTHER;

  return (
    <div className="w-full min-h-screen bg-white font-sans pb-20">
      <div className="w-full px-6 py-4">
        <Breadcrumbs
          items={[
            { name: "Dashboard", route: "/dashboard" },
            { name: "My Tickets", route: "/dashboard/tickets" },
            { name: `TICKET-${ticket.id}`, route: `/dashboard/tickets/${ticket.id}` },
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
                    <PlusIcon size={16} /> Add File
                  </button>
                )}
              </div>

              {isUploadOpened && (
                <div className="mb-6 p-6 border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50/30 text-center">
                  <label className="cursor-pointer group block">
                    <Paperclip size={20} className="mx-auto text-slate-400 mb-2" />
                    <p className="text-sm font-semibold text-slate-600">{selectedFile ? selectedFile.name : "Click to select a file"}</p>
                    <input type="file" className="hidden" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
                  </label>
                  <div className="flex justify-center gap-3 mt-4">
                    <button onClick={() => setIsUploadOpened(false)} className="text-sm text-slate-400">Cancel</button>
                    <button disabled={!selectedFile || isAttachmentPending} onClick={handleSubmitFile} className="bg-slate-900 text-white px-5 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                      {isAttachmentPending ? <SimpleSpinner /> : <Send size={14} />} Upload
                    </button>
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
                      {file.uploadedById === user?.id && (
                        <button onClick={() => deleteAttachment(file.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
                      )}
                      <a href={file.fileUrl} target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-slate-900"><Download size={18} /></a>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* DISCUSSION */}
            <section className="pt-8 border-t border-slate-100">
              <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-6">
                <MessageSquare size={14} /> Discussion ({ticket.comments?.length || 0})
              </h3>
              
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

              <div className="mt-6 border-t pt-6">
                <textarea className="w-full border rounded-xl p-4 text-sm bg-slate-50 outline-none focus:ring-1 ring-slate-200" rows={3} value={commentContent} onChange={(e) => setCommentContent(e.target.value)} placeholder="Type your message here..." />
                <div className="flex justify-end mt-3">
                  <button onClick={handleAddComment} disabled={isCommentCreating || !commentContent.trim()} className="bg-slate-900 text-white px-6 py-2 rounded-xl text-sm font-bold flex items-center gap-2">
                    {isCommentCreating ? <SimpleSpinner /> : <Send size={14} />} Send Message
                  </button>
                </div>
              </div>
            </section>
          </div>

          {/* SIDEBAR */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-slate-50/50 border border-slate-100 rounded-2xl p-6 space-y-8">
              <div className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Ticket Info</h3>
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
                <h3 className="text-[10px] font-black text-slate-400 uppercase mb-4">Assigned Agent</h3>
                <div className="flex items-center justify-between bg-white border p-3 rounded-xl mt-1">
                  <span className="text-sm font-semibold flex items-center gap-2">
                    <User size={16} className="text-slate-400"/> 
                    {ticket.assignedToName || "Waiting for Assignment"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}