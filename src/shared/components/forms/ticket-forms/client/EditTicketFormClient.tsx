"use client";

import React, { useState } from "react";
import { Send, Tag, Shield, Layers, FileText } from "lucide-react";
import SimpleSpinner from "@/components/ui/SimpleSpinner";
import { priorities } from "@/src/shared/constants/priority"; // Integrated
import { issueType } from "@/src/shared/constants/issueType"; // Integrated

interface Props {
  ticket: any;
  categories: any[];
  handleUpdate: (data: any) => void;
  isUpdating: boolean;
}

export default function EditTicketFormClient({ ticket, categories, handleUpdate, isUpdating }: Props) {
  const [formData, setFormData] = useState({
    title: ticket.title || "",
    description: ticket.description || "",
    issueType: ticket.issueType || "",
    priority: ticket.priority || "",
    categoryId: ticket.category?.id || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(formData);
  };

  const inputClass = "w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 focus:bg-white focus:ring-2 focus:ring-slate-900/5 outline-none transition-all text-slate-700 font-medium";
  const labelClass = "text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 mb-2";

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      {/* Title */}
      <div>
        <label className={labelClass}><FileText size={14}/> Title</label>
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          className={inputClass}
          placeholder="Summary of the issue"
          required
        />
      </div>

      {/* Description */}
      <div>
        <label className={labelClass}><FileText size={14}/> Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={6}
          className={`${inputClass} resize-none`}
          placeholder="Explain the problem in detail..."
          required
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Issue Type */}
<div>
  <label className={labelClass}><Tag size={14}/> Issue Type</label>
  <select name="issueType" value={formData.issueType} onChange={handleChange} className={inputClass} required>
    <option value="">Select Type</option>
    {issueType.map((type: any) => (
      // Use type.value for the key and value, and type.label for the display text
      <option key={type.value} value={type.value}>
        {type.label || type.value}
      </option>
    ))}
  </select>
</div>

        {/* Priority */}
<div>
  <label className={labelClass}><Shield size={14}/> Priority</label>
  <select name="priority" value={formData.priority} onChange={handleChange} className={inputClass} required>
    <option value="">Select Priority</option>
    {priorities.map((prio: any) => (
      <option key={prio.value} value={prio.value}>
        {prio.label || prio.value}
      </option>
    ))}
  </select>
</div>

        {/* Category */}
        <div>
          <label className={labelClass}><Layers size={14}/> Category</label>
          <select 
            name="categoryId" 
            value={formData.categoryId} 
            onChange={handleChange} 
            className={inputClass}
            required
          >
            <option value="">Select Category</option>
            {categories.map((cat: any) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="pt-6">
        <button
          type="submit"
          disabled={isUpdating}
          className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold text-sm flex items-center gap-3 hover:bg-slate-800 transition-colors disabled:opacity-50"
        >
          {isUpdating ? <SimpleSpinner /> : <Send size={18} />}
          Save Changes
        </button>
      </div>
    </form>
  );
}