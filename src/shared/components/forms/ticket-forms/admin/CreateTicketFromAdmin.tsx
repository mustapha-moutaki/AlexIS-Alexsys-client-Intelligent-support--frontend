"use client";
import React, { useState } from "react";
import { 
  Send, 
  AlertCircle, 
  Type, 
  AlignLeft, 
  Tag, 
  ShieldAlert, 
  User, 
  Users, 
  Layers, 
  Activity 
} from "lucide-react";
import { Agent } from "@/src/types/Agent";
import { Client } from "@/src/types/Client";
import { priorities } from "@/src/shared/constants/priority";
import { issueType } from "@/src/shared/constants/issueType";
import { ticketStatus } from "@/src/shared/constants/ticketStatus";

interface TicketFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  issueType: string;
  categoryId: string;
  clientId: string;
  assignedToId: string;
}

export default function CreateTicketFromAdmin({ onCreate, categories, clients, agents, isPending }: { onCreate: (data:TicketFormData) => void, categories:any, clients:any, agents:any, isPending:boolean }) {
  const [formData, setFormData] = useState<TicketFormData>({
    title: "",
    description: "",
    status: "OPEN",
    priority: "",
    issueType: "",
    categoryId: "",
    clientId: "",
    assignedToId: "",
  });

  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    onCreate(formData)
  }

  return (
    <div className="w-full">
      <form className="space-y-8" onSubmit= {handleSubmit}>
        
        {/* SECTION 1: CORE DETAILS */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            
            {/* Title */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <Type size={16} className="text-slate-400" /> Ticket Title
              </label>
              <input
                required
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Briefly describe the issue..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all placeholder:text-slate-400"
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                <AlignLeft size={16} className="text-slate-400" /> Detailed Description
              </label>
              <textarea
                required
                name="description"
                rows={8}
                value={formData.description}
                onChange={handleChange}
                placeholder="Provide steps to reproduce, logs, or context..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
              />
            </div>
          </div>

          {/* SECTION 2: SIDEBAR METADATA */}
          <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 space-y-6">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">Ticket Classification</h3>
            
            {/* Status */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <Activity size={14} /> Status
              </label>
              <select name="status" value={formData.status} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500">
                {ticketStatus.map((status)=> (
                    <option key={status.value} value={status.value}>{status.label}</option>
                ))}
              </select>
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <ShieldAlert size={14} /> Priority
              </label>
              <select name="priority" value={formData.priority} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500">
                {priorities.map((priority)=> (
                    <option key={priority.value} value={priority.value}>{priority.label}</option>
                ))}
              </select>
            </div>

            {/* Issue Type */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 flex items-center gap-2">
                <Tag size={14} /> Issue Type
              </label>
              <select name="issueType" value={formData.issueType} onChange={handleChange} className="w-full p-2.5 bg-white rounded-lg border border-slate-200 text-sm font-medium focus:ring-2 focus:ring-blue-500">
                {issueType.map((issue)=> (
                    <option key={issue.value} value={issue.value}>{issue.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* SECTION 3: ASSIGNMENTS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-slate-100">
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Layers size={16} className="text-slate-400" /> Category
            </label>
            <select name="categoryId" value={formData.categoryId} onChange={handleChange} className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="" disabled>Select Category</option>
              {categories?.map((c:any) => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <Users size={16} className="text-slate-400" /> Client Account
            </label>
            <select value={formData.clientId} onChange={handleChange} name="clientId" className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all">
              <option value="" disabled >Select Client</option>
              {clients.map((c:Client) => <option key={c.id} value={c.id}>{c.id + " - " + c.firstName + " " + c.lastName}</option>)}
            </select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
              <User size={16} className="text-slate-400" /> Assigned Agent
            </label>
    <select
  name="assignedToId"
  value={formData.assignedToId}
  onChange={handleChange}
  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white focus:ring-2 focus:ring-blue-500 transition-all"
>
  <option value="" disabled>
    Select Agent
  </option>

  {agents?.map((a: Agent) => (
    <option key={a.id} value={a.id}>
      {`${a.id} - ${a.firstName} ${a.lastName} - ${a.level} - ${a.availabilityStatus}`}
    </option>
  ))}
</select>
          </div>
        </div>

        {/* FOOTER ACTIONS */}
        <div className="flex items-center justify-between pt-8 border-t border-slate-100">
          <div className="flex items-center gap-2 text-amber-600 bg-amber-50 px-4 py-2 rounded-lg">
            <AlertCircle size={18} />
            <span className="text-xs font-medium">Auto-notifications are enabled for this ticket.</span>
          </div>
          
          <div className="flex items-center gap-4">
            <button type="button" className="px-6 py-2.5 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
              Save as Draft
            </button>
            <button
  type="submit"
  disabled={isPending}
  className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-blue-500/20 transition-all active:scale-95"
>
  <Send size={18} />
  {isPending ? "Creating..." : "Create Ticket"}
</button>
          </div>
        </div>
      </form>
    </div>
  );
}