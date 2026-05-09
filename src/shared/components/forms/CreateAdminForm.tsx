"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera, X, Loader2 } from "lucide-react";

const createUserSchema = z.object({
  firstName: z.string().min(2, "Required"),
  lastName: z.string().min(2, "Required"),
  username: z.string().min(3, "Min 3 chars"),
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Min 8 chars"),
  phoneNumber: z.string().min(10, "Invalid phone"),
  profilePicture: z.instanceof(File).optional(),
});

type CreateUserInputs = z.infer<typeof createUserSchema>;

interface Props {
  onSubmit: (data: CreateUserInputs) => void;
  isLoading: boolean;
}

export default function CreateAdminForm({ onSubmit, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CreateUserInputs>({
    resolver: zodResolver(createUserSchema),
    defaultValues: { profilePicture: undefined },
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setValue("profilePicture", file, {
        shouldValidate: true,
        shouldDirty: true,
      });
    }
  };

  useEffect(() => {
    return () => {
      if (preview) URL.revokeObjectURL(preview);
    };
  }, [preview]);

  return (
    <div className="w-full h-full rounded-2xl p-6 bg-white border border-slate-200 text-slate-900 flex flex-col shadow-xl shadow-slate-200/50 overflow-hidden">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-1 w-8 bg-[#51c2de] rounded-full" />
          <h2 className="text-[0.65rem] tracking-[0.3em] uppercase font-bold text-[#3eaec9]">
            Administration
          </h2>
        </div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-800">Create New Admin</h1>
        <p className="text-slate-500 text-xs">
          New user will be granted <span className="text-[#3eaec9] font-semibold underline decoration-2 underline-offset-2">ADMIN</span> access
        </p>
      </div>

      <form 
        onSubmit={handleSubmit(onSubmit)} 
        className="flex-1 flex flex-col space-y-5 overflow-y-auto pr-1 custom-scrollbar-light"
      >
        {/* Profile Upload */}
        <div className="flex justify-center mb-2">
          <div className="relative group">
            <div className="w-20 h-20 rounded-2xl border-2 border-dashed border-slate-200 group-hover:border-[#51c2de] transition-all overflow-hidden bg-slate-50 flex items-center justify-center relative shadow-inner">
              {preview ? (
                <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="flex flex-col items-center">
                  <Camera className="text-slate-400 group-hover:text-[#51c2de] transition-colors" size={24} />
                  <span className="text-[10px] text-slate-400 mt-1 uppercase font-bold tracking-tighter">Photo</span>
                </div>
              )}
              
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                className="absolute inset-0 opacity-0 cursor-pointer z-10" 
              />
            </div>
            
            {preview && (
              <button
                type="button"
                onClick={() => { setPreview(null); setValue("profilePicture", undefined); }}
                className="absolute -top-2 -right-2 bg-white text-red-500 p-1 rounded-full shadow-md z-20 border border-slate-100 hover:bg-red-50 transition-colors"
              >
                <X size={12} />
              </button>
            )}
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">First Name</label>
              <input 
                {...register("firstName")} 
                placeholder="John"
                className={`w-full text-sm rounded-lg border bg-white px-3 py-2.5 outline-none transition-all duration-200 focus:ring-4 focus:ring-[#51c2de]/10 ${errors.firstName ? 'border-red-400' : 'border-slate-200 focus:border-[#51c2de]'}`} 
              />
              {errors.firstName && <span className="text-[10px] text-red-500 ml-1 font-medium">{errors.firstName.message}</span>}
            </div>
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">Last Name</label>
              <input 
                {...register("lastName")} 
                placeholder="Doe"
                className={`w-full text-sm rounded-lg border bg-white px-3 py-2.5 outline-none transition-all duration-200 focus:ring-4 focus:ring-[#51c2de]/10 ${errors.lastName ? 'border-red-400' : 'border-slate-200 focus:border-[#51c2de]'}`} 
              />
              {errors.lastName && <span className="text-[10px] text-red-500 ml-1 font-medium">{errors.lastName.message}</span>}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">Username</label>
              <input 
                {...register("username")} 
                placeholder="johndoe_admin"
                className="w-full text-sm rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#51c2de] focus:ring-4 focus:ring-[#51c2de]/10 transition-all" 
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">Phone</label>
              <input 
                {...register("phoneNumber")} 
                placeholder="+1 234 567 890"
                className="w-full text-sm rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#51c2de] focus:ring-4 focus:ring-[#51c2de]/10 transition-all" 
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">Email Address</label>
            <input 
              {...register("email")} 
              placeholder="admin@system.com"
              className="w-full text-sm rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#51c2de] focus:ring-4 focus:ring-[#51c2de]/10 transition-all" 
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-[0.65rem] font-bold text-slate-500 uppercase tracking-wider ml-1">Secure Password</label>
            <input 
              {...register("password")} 
              type="password" 
              placeholder="••••••••"
              className="w-full text-sm rounded-lg border border-slate-200 bg-white px-3 py-2.5 outline-none focus:border-[#51c2de] focus:ring-4 focus:ring-[#51c2de]/10 transition-all" 
            />
          </div>
        </div>

        {/* Action Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="relative w-full group overflow-hidden mt-2 rounded-xl py-3 text-xs font-bold uppercase tracking-widest bg-[#51c2de] text-white hover:bg-[#3eaec9] shadow-lg shadow-cyan-200/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98]"
        >
          <div className="relative z-10 flex items-center justify-center gap-2">
            {isLoading ? (
              <>
                <Loader2 size={16} className="animate-spin" />
                Validating...
              </>
            ) : (
              "Initialize Admin Account"
            )}
          </div>
        </button>
      </form>

      <style jsx>{`
        .custom-scrollbar-light::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar-light::-webkit-scrollbar-track {
          background: #f1f5f9;
        }
        .custom-scrollbar-light::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }
      `}</style>
    </div>
  );
}