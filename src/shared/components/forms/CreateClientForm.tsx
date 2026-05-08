"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Camera } from "lucide-react";

const createUserSchema = z.object({
  firstName: z.string().min(2, "Short"),
  lastName: z.string().min(2, "Short"),
  username: z.string().min(3, "Min 3 chars"),
  email: z.string().email("Invalid"),
  password: z.string().min(8, "Min 8 chars"),
  phoneNumber: z.string().min(10, "Invalid"),
  profilePicture: z.instanceof(File).optional(),
});

type CreateUserInputs = z.infer<typeof createUserSchema>;

interface Props {
  onSubmit: (data: CreateUserInputs) => void;
  isLoading: boolean;
}

export default function CreateClientForm({ onSubmit, isLoading }: Props) {
  const [preview, setPreview] = useState<string | null>(null);

  const { register, handleSubmit, setValue, formState: { errors } } = useForm<CreateUserInputs>({
    resolver: zodResolver(createUserSchema),defaultValues:{profilePicture: undefined},
  });
  
const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

  if (file) {
    setPreview(URL.createObjectURL(file)); // UI only
    setValue("profilePicture", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  }
};
useEffect(() => {
  return () => {
    if (preview) {
      URL.revokeObjectURL(preview);
    }
  };
}, [preview]);

  return (
    <div className="w-full h-full rounded-[1rem] p-[1.5rem] text-white flex flex-col overflow-hidden">
      <div className="mb-[0.75rem]">
        <h2 className="text-[0.6rem] tracking-[0.2em] uppercase text-[#51c2de]">Administration</h2>
        <h1 className="text-[1.1rem] font-semibold leading-tight">Create new Client</h1>
        <p className="text-white/50 text-[0.65rem]">
          Role: <span className="text-[#51c2de] font-bold">CLIENT</span>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col justify-between overflow-hidden">
        <div className="flex flex-col gap-[0.6rem]">
          <div className="flex justify-center">
            <div className="relative group w-[3.5rem] h-[3.5rem]">
              <div className="w-full h-full rounded-full border border-[#51c2de]/60 overflow-hidden bg-transparent flex items-center justify-center">
                {preview ? (
                  <img src={preview} alt="Preview" className="w-full h-full object-cover" />
                ) : (
                  <Camera className="text-[#51c2de]/40" size={20} />
                )}
              </div>
              <input type="file" accept="image/*" onChange={handleImageChange} className="absolute inset-0 opacity-0 cursor-pointer" />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[1rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <label className="text-[0.6rem] text-white/70 uppercase">First Name</label>
              <input {...register("firstName")} className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
              {errors.firstName && <span className="text-[0.5rem] text-red-400">{errors.firstName.message}</span>}
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <label className="text-[0.6rem] text-white/70 uppercase">Last Name</label>
              <input {...register("lastName")} className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
               {errors.lastName && (
    <span className="text-[0.5rem] text-red-400">
      {errors.lastName.message}
    </span>
  )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[1rem]">
            <div className="flex flex-col gap-[0.2rem]">
              <label className="text-[0.6rem] text-white/70 uppercase">Username</label>
              <input {...register("username")} className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
            </div>
            <div className="flex flex-col gap-[0.2rem]">
              <label className="text-[0.6rem] text-white/70 uppercase">Phone</label>
              <input {...register("phoneNumber")} className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
            </div>
          </div>

          <div className="flex flex-col gap-[0.2rem]">
            <label className="text-[0.6rem] text-white/70 uppercase">Email Address</label>
            <input {...register("email")} className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
          </div>

          <div className="flex flex-col gap-[0.2rem]">
            <label className="text-[0.6rem] text-white/70 uppercase">Password</label>
            <input {...register("password")} type="password" className="w-full text-[0.75rem] rounded-[0.4rem] border border-[#51c2de]/30 bg-transparent px-[0.6rem] py-[0.4rem] outline-none focus:border-[#51c2de]" />
          </div>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full mt-[0.75rem] rounded-[0.4rem] py-[0.6rem] text-[0.7rem] font-bold bg-transparent border border-[#51c2de] text-[#51c2de] hover:bg-[#51c2de] hover:text-white transition-all disabled:opacity-50"
        >
          {isLoading ? "Creating..." : "Create Account"}
        </button>
      </form>
    </div>
  );
}