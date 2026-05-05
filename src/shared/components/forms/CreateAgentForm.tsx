"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, ChevronDown } from "lucide-react"; 

const SpecializationEnum = [
  "TECHNICAL_SUPPORT", "NETWORK", "SECURITY", "SOFTWARE", 
  "DATA", "AI", "AUTOMATION", "OTHER"
] as const;

const AvailabilityEnum = [
  "AVAILABLE", "ONLINE", "BUSY", "OFFLINE", "NOT_SELECTED"
] as const;

const AgentLevelEnum = ["JUNIOR", "MID", "SENIOR", "UNASSIGNED"] as const;

const createAgentSchema = z.object({
  firstName: z.string().min(2, "Short"),
  lastName: z.string().min(2, "Short"),
  username: z.string().min(3, "Min 3 chars"),
  email: z.string().email("Invalid"),
  password: z.string().min(5, "Min 5 chars"),
  phoneNumber: z.string().min(10, "Invalid"),
  profilePicture: z.any().optional(),
  specialization: z.enum(SpecializationEnum),
  averageResolutionTime: z.coerce.number().min(0), 
  performanceRating: z.coerce.number().min(1).max(5),
  availabilityStatus: z.enum(AvailabilityEnum).default("NOT_SELECTED"),
  level: z.enum(AgentLevelEnum).default("UNASSIGNED"),
});

type CreateAgentInputs = z.infer<typeof createAgentSchema>;

interface Props {
  onSubmit: (data: CreateAgentInputs) => void;
  isLoading: boolean;
}

export default function CreateAgentForm({ onSubmit, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateAgentInputs>({
    resolver: zodResolver(createAgentSchema),
    defaultValues: { 
      availabilityStatus: "NOT_SELECTED",
      level: "UNASSIGNED" 
    }
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setValue("profilePicture", file);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  const inputStyles = "w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de] text-white transition-colors";
  const labelStyles = "text-[0.6rem] text-white/70 uppercase tracking-wider font-medium";
  
  // Updated selectStyles: removed fixed background, kept transparent
  const selectStyles = "w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de] text-white appearance-none cursor-pointer relative z-10";

  return (
    <div 
        className="w-full h-full p-[1rem] text-white flex flex-col bg-transparent overflow-y-auto"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
    >
      <style jsx>{`
        div::-webkit-scrollbar { display: none; }
        /* Styling the dropdown options to match the theme since they can't be truly transparent */
        option {
          background-color: #0a192f; /* Match your darkest background color */
          color: white;
        }
      `}</style>

      <div className="mb-[0.75rem]">
        <h2 className="text-[0.6rem] tracking-[0.2em] uppercase text-[#51c2de]">Personnel</h2>
        <h1 className="text-[1.1rem] font-semibold leading-tight">Create Agent Profile</h1>
        <p className="text-white/50 text-[0.65rem]">Role: <span className="text-[#51c2de] font-bold">AGENT</span></p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col gap-[0.8rem]">
        <div className="flex flex-col gap-[0.8rem]">
          {/* Profile Picture */}
          <div className="flex justify-center">
            <div className="relative group w-[3.5rem] h-[3.5rem]">
              <div className="w-full h-full rounded-full border border-[#51c2de]/60 overflow-hidden bg-transparent flex items-center justify-center">
                {preview ? <img src={preview} alt="Preview" className="w-full h-full object-cover" /> : <Camera className="text-[#51c2de]/40" size={20} />}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[0.75rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <label className={labelStyles}>First Name</label>
              <input {...register("firstName")} className={inputStyles} />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <label className={labelStyles}>Last Name</label>
              <input {...register("lastName")} className={inputStyles} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[0.75rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <label className={labelStyles}>Username</label>
              <input {...register("username")} className={inputStyles} />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <label className={labelStyles}>Phone</label>
              <input {...register("phoneNumber")} className={inputStyles} />
            </div>
          </div>

          <div className="flex flex-col gap-[0.2rem]">
            <label className={labelStyles}>Email Address</label>
            <input {...register("email")} className={inputStyles} />
          </div>

          <div className="flex flex-col gap-[0.2rem]">
            <label className={labelStyles}>Password</label>
            <input {...register("password")} type="password" className={inputStyles} />
          </div>

          {/* Agent Metrics Section */}
          <div className="mt-2 pt-3 border-t border-[#51c2de]/10 grid grid-cols-2 gap-x-[0.75rem] gap-y-[0.6rem]">
            
            {/* Specialization */}
            <div className="flex flex-col gap-[0.2rem] relative">
              <label className={labelStyles}>Specialization</label>
              <div className="relative">
                <select {...register("specialization")} className={selectStyles}>
                  <option value="" disabled hidden>Select...</option>
                  {SpecializationEnum.map(opt => <option  key={opt} value={opt}>{opt.replace('_', ' ')}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#51c2de]/50 pointer-events-none" />
              </div>
            </div>

            {/* Level */}
            <div className="flex flex-col gap-[0.2rem] relative">
              <label className={labelStyles}>Agent Level</label>
              <div className="relative">
                <select {...register("level")} className={selectStyles}>
                  {AgentLevelEnum.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#51c2de]/50 pointer-events-none" />
              </div>
            </div>

            {/* Status */}
            <div className="flex flex-col gap-[0.2rem] relative">
              <label className={labelStyles}>Status</label>
              <div className="relative">
                <select {...register("availabilityStatus")} className={selectStyles}>
                  {AvailabilityEnum.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-[#51c2de]/50 pointer-events-none" />
              </div>
            </div>

            {/* Resolution Time */}
            <div className="flex flex-col gap-[0.2rem]">
              <label className={labelStyles}>Resolution (Min)</label>
              <input {...register("averageResolutionTime")} type="number" className={inputStyles} placeholder="45" />
            </div>

            {/* Rating */}
            <div className="flex flex-col gap-[0.2rem] col-span-2">
              <label className={labelStyles}>Performance Rating (1-5)</label>
              <input {...register("performanceRating")} type="number" step="0.1" className={inputStyles} placeholder="4.5" />
            </div>
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-auto mb-4 rounded-[0.4rem] py-[0.6rem] text-[0.7rem] font-bold uppercase tracking-widest bg-transparent border border-[#51c2de] text-[#51c2de] hover:bg-[#51c2de] hover:text-white transition-all disabled:opacity-50"
        >
          {isLoading ? "Synchronizing..." : "Initialize Agent"}
        </button>
      </form>
    </div>
  );
}