// src/shared/components/edit-froms/AgentEditForm.tsx
"use client";

import React, { useRef, useState } from "react";
import { Agent } from "@/src/types/Agent";
import { useUpdateAgent } from "@/src/hooks/useAgent"; // Assuming this exists
import Breadcrumbs from "../ui/Breadcrumbs";
import {
  Camera,
  Mail,
  User as UserIcon,
  Phone,
  ShieldCheck,
  Save,
  Loader2,
  Briefcase,
  Activity,
  Clock,
  Star,
  Settings,
  Trash2,
} from "lucide-react";

interface Props {
  user: Agent;
}

export default function AgentEditForm({ user }: Props) {
  const { mutate, isPending } = useUpdateAgent();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profilePicture || null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    // Convert checkboxes to booleans
    const active = formData.get("active") === "on";
    const deleted = formData.get("deleted") === "on";

    mutate({
      id: user.id.toString(),
      data: {
        ...Object.fromEntries(formData),
        active,
        deleted,
        performanceRating: Number(formData.get("performanceRating")),
        averageResolutionTime: Number(formData.get("averageResolutionTime")),
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => setPreviewImage(reader.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      <Breadcrumbs
        items={[
          { name: "Dashboard", route: "/dashboard" },
          { name: "Users", route: "/dashboard/users" },
          { name: `Edit Agent: ${user.firstName}`, route: "#" },
        ]}
      />

      <form onSubmit={handleSubmit} className="w-full bg-white border border-gray-200 rounded-md shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-blue-600" />
            Edit Agent Profile
          </div>
          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60 transition-colors"
          >
            {isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Save Changes
          </button>
        </div>

        <div className="px-4 py-6 space-y-6">
          {/* Profile Picture Section */}
          {/* <div className="flex items-center gap-4">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-20 h-20 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden group relative"
            >
              {previewImage ? (
                <img src={previewImage} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-6 h-6 text-gray-400" />
              )}
              <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                <Camera className="w-5 h-5 text-white" />
              </div>
            </div>
            <div>
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-sm font-medium text-blue-600 hover:underline"
              >
                Change Photo
              </button>
              <input ref={fileInputRef} type="file" name="profilePicture" accept="image/*" onChange={handleImageChange} className="hidden" />
            </div>
          </div> */}

          {/* Grid: Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">First name</label>
              <input name="firstName" defaultValue={user.firstName} className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Last name</label>
              <input name="lastName" defaultValue={user.lastName} className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input name="email" type="email" defaultValue={user.email} className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Phone</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input name="phoneNumber" defaultValue={user.phoneNumber} className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
              </div>
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Username</label>
                <input name="username" defaultValue={user.username} className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" />
            </div>
            <div>
                <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Password (Leave blank to keep same)</label>
                <input name="password" type="password" className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500" placeholder="••••••••" />
            </div>
          </div>

          <hr className="border-gray-100" />

          {/* Grid: Agent Professional Details */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Specialization</label>
              <div className="relative flex items-center">
                <Settings className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <select name="specialization" defaultValue={user.specialization} className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white">
                  {["TECHNICAL_SUPPORT", "NETWORK", "SECURITY", "SOFTWARE", "DATA", "AI", "AUTOMATION", "OTHER"].map(opt => (
                    <option key={opt} value={opt}>{opt.replace("_", " ")}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Agent Level</label>
              <div className="relative flex items-center">
                <ShieldCheck className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <select name="level" defaultValue={user.level} className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white">
                  {["JUNIOR", "MID", "SENIOR", "UNASSIGNED"].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-gray-500 uppercase mb-1">Availability</label>
              <div className="relative flex items-center">
                <Activity className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <select name="availabilityStatus" defaultValue={user.availabilityStatus} className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500 bg-white">
                  {["AVAILABLE", "ONLINE", "BUSY", "OFFLINE", "NOT_SELECTED"].map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Metrics & Status Toggles */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-4 rounded-md border border-gray-100">
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" /> Avg. Resolution Time (min)
                    </label>
                    <input name="averageResolutionTime" type="number" defaultValue={user.averageResolutionTime} className="w-20 h-8 px-2 border border-gray-200 rounded text-sm outline-none" />
                </div>
                <div className="flex items-center justify-between">
                    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" /> Performance Rating (1-5)
                    </label>
                    <input name="performanceRating" type="number" step="0.1" max="5" min="0" defaultValue={user.performanceRating} className="w-20 h-8 px-2 border border-gray-200 rounded text-sm outline-none" />
                </div>
            </div>

            <div className="space-y-4 border-l border-gray-200 pl-6">
                <div className="flex items-center gap-3">
                    <input name="active" type="checkbox" defaultChecked={user.active} className="w-4 h-4 accent-blue-600" />
                    <label className="text-sm font-medium text-gray-700">Account Active</label>
                </div>
                <div className="flex items-center gap-3">
                    <input name="deleted" type="checkbox" defaultChecked={user.deleted} className="w-4 h-4 accent-red-600" />
                    <label className="text-sm font-medium text-red-600 flex items-center gap-1">
                        <Trash2 className="w-3 h-3" /> Mark for Deletion
                    </label>
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}