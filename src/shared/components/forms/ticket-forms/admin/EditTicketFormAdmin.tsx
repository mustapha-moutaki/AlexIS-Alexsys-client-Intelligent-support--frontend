"use client";
import React, { useState } from "react";
import { 
  Type, AlignLeft, Activity, ShieldAlert, Tag, 
  Layers, Users, User, Save, Loader2, AlertCircle 
} from "lucide-react";
import { Category } from "@/src/types/Category";
import { TicketDetailsResponse } from "@/src/types/TicketDetailsResponse";
import { User as UserType } from "@/src/types/User";
import { ticketStatus } from "@/src/shared/constants/ticketStatus";
import {priorities} from "@/src/shared/constants/priority";
import { issueType } from "@/src/shared/constants/issueType";
import { Agent } from "@/src/types/Agent";
// Define the option arrays for selectors


interface EditProps {
  ticket: TicketDetailsResponse;
  categories: Category[];
  clients: UserType[];
  agents: Agent[];
  isPending: boolean;
  handleUpdate: (formData: any) => void;
  isUpdating: boolean;
}

export default function EditTicketFormAdmin({ ticket, categories, clients, agents, isPending, handleUpdate, isUpdating }: EditProps) {
  // Initialize state with existing ticket data
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description,
    status: ticket.status,
    priority: ticket.priority,
    issueType: ticket.issueType,
    categoryId: ticket.category?.id?.toString() || "",
    clientId: ticket.clientId?.toString() || "",
    assignedToId: ticket.assignedToId?.toString() || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUpdate(formData)
  };

  return (
    <form onSubmit={handleSubmit} className="w-full space-y-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* LEFT COLUMN: PRIMARY CONTENT */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Type size={16} className="text-slate-400" /> Ticket Title
            </label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <AlignLeft size={16} className="text-slate-400" /> Description
            </label>
            <textarea
              name="description"
              rows={10}
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
            />
          </div>
        </div>

        {/* RIGHT COLUMN: METADATA SIDEBAR */}
        <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 space-y-6">
          <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest mb-4">Management</h3>

          {/* Status */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-2 text-primary">
              <Activity size={14} /> Current Status
            </label>
            <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-blue-500">
              {ticketStatus.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>
          </div>

          {/* Priority */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <ShieldAlert size={14} /> Priority Level
            </label>
            <select name="priority" value={formData.priority} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-blue-500">
              {priorities.map((p) => (
                <option key={p.value} value={p.value}>{p.label}</option>
              ))}
            </select>
          </div>

          {/* Issue Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
              <Tag size={14} /> Classification
            </label>
            <select name="issueType" value={formData.issueType} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-bold focus:ring-2 focus:ring-blue-500">
              {issueType.map((i) => (
                <option key={i.value} value={i.value}>{i.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* SECTION 3: ASSIGNMENTS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8 border-t border-slate-100">
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Layers size={16} className="text-slate-400" /> Category
          </label>
          <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="" disabled>Select Category</option>
            {categories?.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <Users size={16} className="text-slate-400" /> Client Account
          </label>
          <select name="clientId" value={formData.clientId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="" disabled>Select Client</option>
            {clients?.map((c) => (
              <option key={c.id} value={c.id}>{`${c.id} - ${c.firstName} ${c.lastName}`}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
            <User size={16} className="text-slate-400" /> Assigned Agent
          </label>
          <select name="assignedToId" value={formData.assignedToId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all">
            <option value="">Unassigned</option>
            {agents?.map((a) => (
              <option key={a.id} value={a.id}>
                {a.firstName} {a.lastName}
                ---{a.availabilityStatus}

                </option>
            ))}
          </select>
        </div>
      </div>

      {/* FOOTER ACTIONS */}
      <div className="flex items-center justify-between pt-8 border-t border-slate-100">
        <div className="flex items-center gap-2 text-slate-400">
          <AlertCircle size={16} />
          <span className="text-xs">Last updated by system on {new Date().toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button type="button" className="px-6 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            Discard Changes
          </button>

            <button
            type="submit"
            disabled={isPending}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
          >
            {isPending ? <Loader2 className="animate-spin" size={18} /> : <Save size={18} />}
            Update Ticket
          </button>
        </div>
      </div>
    </form>
  );
}