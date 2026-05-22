"use client";
import React, { useState, useRef } from "react";
import { 
  Send, 
  AlertCircle, 
  Type, 
  AlignLeft, 
  Tag, 
  ShieldAlert, 
  Layers, 
  Paperclip,
  X,
  FileText,
  ImageIcon,
  Upload,
  MessageSquare // Added icon for comment
} from "lucide-react";
import { priorities } from "@/src/shared/constants/priority";
import { issueType } from "@/src/shared/constants/issueType";
import { Category } from "@/src/types/Category";

interface ClientTicketFormData {
  title: string;
  description: string;
  priority: string;
  issueType: string;
  categoryId: string;
  comment: string; // Added comment field
}

export interface CreateClientTicketFormPayload {
  formData: ClientTicketFormData;
  files: File[];
}

interface Props {
  onCreate: (payload: CreateClientTicketFormPayload) => void;
  categories: Category[];
  isPending: boolean;
}

export default function CreateTicketFromClient({ onCreate, categories, isPending }: Props) {
  const [formData, setFormData] = useState<ClientTicketFormData>({
    title: "",
    description: "",
    priority: "",
    issueType: "",
    categoryId: "",
    comment: "", // Initialized empty
  });

  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const ACCEPTED_TYPES = ["image/png", "image/jpeg", "image/jpg", "application/pdf"];
  const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const validFiles = selectedFiles.filter((file) => {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert(`"${file.name}" is not supported. Only PNG, JPG, and PDF are allowed.`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        alert(`"${file.name}" exceeds the 10MB limit.`);
        return false;
      }
      return true;
    });
    setFiles((prev) => [...prev, ...validFiles]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const removeFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getFileIcon = (file: File) => {
    if (file.type === "application/pdf") return <FileText size={16} className="text-red-500" />;
    return <ImageIcon size={16} className="text-blue-500" />;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onCreate({ formData, files });
  };

  return (
    <div className="w-full max-w-5xl mx-auto">
      <form className="space-y-8" onSubmit={handleSubmit}>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Main Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} className="text-slate-400" /> Issue Title
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="How can we help you today?"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <AlignLeft size={16} className="text-slate-400" /> Description
              </label>
              <textarea
                required
                name="description"
                rows={6}
                value={formData.description}
                onChange={handleChange}
                placeholder="Please provide as much detail as possible..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>

            {/* NEW COMMENT SECTION */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <MessageSquare size={16} className="text-slate-400" /> Initial Comment
                <span className="text-xs font-normal text-slate-400">(optional)</span>
                <br />
                <p className="text-xs font-normal text-slate-400">u can add points here for the developer to know what to fix (1 point per point)</p>
              </label>
              <textarea
                name="comment"
                rows={4}
                value={formData.comment}
                onChange={handleChange}
                placeholder="Add any additional context or a specific message for the agent..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none bg-blue-50/10"
              />
            </div>
          </div>

          {/* RIGHT COLUMN: Classification */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6 h-fit">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Classification</h3>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <ShieldAlert size={14} /> Priority
              </label>
              <select 
                required 
                name="priority" 
                value={formData.priority} 
                onChange={handleChange} 
                className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Priority</option>
                {priorities.map((p) => (
                  <option key={p.value} value={p.value}>{p.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <Tag size={14} /> Issue Type
              </label>
              <select 
                required 
                name="issueType" 
                value={formData.issueType} 
                onChange={handleChange} 
                className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Type</option>
                {issueType.map((i) => (
                  <option key={i.value} value={i.value}>{i.label}</option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <Layers size={14} /> Category
              </label>
              <select 
                required 
                name="categoryId" 
                value={formData.categoryId} 
                onChange={handleChange} 
                className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select Category</option>
                {categories?.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ATTACHMENTS SECTION */}
        <div className="pt-6 border-t border-slate-100 space-y-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Paperclip size={16} className="text-slate-400" /> Attachments
            <span className="text-xs font-normal text-slate-400">(Screenshots or Logs)</span>
          </label>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="flex flex-col items-center justify-center gap-2 px-6 py-8 border-2 border-dashed border-slate-200 rounded-xl cursor-pointer hover:border-blue-400 hover:bg-blue-50/30 transition-all"
          >
            <Upload size={24} className="text-slate-400" />
            <p className="text-sm text-slate-500 font-medium">Click to upload files</p>
            <p className="text-xs text-slate-400">PNG, JPG, or PDF up to 10MB</p>
          </div>

          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept=".png,.jpg,.jpeg,.pdf"
            onChange={handleFileSelect}
            className="hidden"
          />

          {files.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {files.map((file, index) => (
                <div key={index} className="flex items-center justify-between px-4 py-2 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="flex items-center gap-3 min-w-0">
                    {getFileIcon(file)}
                    <span className="text-sm text-slate-700 truncate">{file.name}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => removeFile(index)}
                    className="p-1 text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 text-slate-500 bg-slate-100 px-4 py-2 rounded-lg">
            <AlertCircle size={18} />
            <span className="text-xs font-medium">You will receive an email update when an agent responds.</span>
          </div>
          
          <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            <Send size={18} />
            {isPending ? "Submitting..." : "Submit Ticket"}
          </button>
        </div>
      </form>
    </div>
  );
}