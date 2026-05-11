// app/dashboard/users/[id]/edit/page.tsx or components/AdminEditForm.tsx
"use client";

import React, { useRef, useState } from "react";
import { User } from "@/src/types/User";
import { useUpdateAdmin } from "@/src/hooks/useAdmin";
import Breadcrumbs from "../ui/Breadcrumbs";
import {
  Camera,
  Mail,
  User as UserIcon,
  Phone,
  ShieldCheck,
  Save,
  Loader2,
} from "lucide-react";
import ButtonGoBack from "../ui/ButtonGoBack";

type Props = { user: User };

export default function AdminEditForm({ user }: Props) {
  const { mutate, isPending } = useUpdateAdmin();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    user.profilePicture || null
  );

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate({
      id: user.id.toString(),
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        role: formData.get("role") as string,
        profilePicture: formData.get("profilePicture") as any,
      },
    });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumbs */}
      <Breadcrumbs
        items={[
          { name: "Dashboard", route: "/dashboard" },
          { name: "Users Overview", route: "/dashboard/users" },
          { name: "Advanced Settings", route: "/dashboard/users/advanced-settings" },
          { name: `Edit Admin: ${user.firstName}`, route: "#" },
        ]}
      />

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-gray-200 rounded-md"
      >
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <ButtonGoBack/>
            <p>Edit Admin</p>
            </div>

          <button
            type="submit"
            disabled={isPending}
            className="inline-flex items-center gap-2 h-9 px-3 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700 disabled:opacity-60"
          >
            {isPending ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <Save className="w-4 h-4" />
            )}
            Save
          </button>
        </div>

        <div className="px-4 py-4 space-y-4">
          {/* Profile Picture */}
          <div className="flex items-center">
            <div
              onClick={() => fileInputRef.current?.click()}
              className="w-16 h-16 border border-gray-200 rounded-md bg-gray-50 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {previewImage ? (
                <img src={previewImage} alt="profile" className="w-full h-full object-cover" />
              ) : (
                <UserIcon className="w-5 h-5 text-gray-400" />
              )}
            </div>

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="ml-3 inline-flex items-center gap-2 h-9 px-3 text-sm border border-gray-200 rounded text-gray-700 hover:bg-gray-50"
            >
              <Camera className="w-4 h-4" />
              Upload
            </button>

            <input
              ref={fileInputRef}
              type="file"
              name="profilePicture"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-600 mb-1">First name</label>
              <input
                name="firstName"
                defaultValue={user.firstName}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Last name</label>
              <input
                name="lastName"
                defaultValue={user.lastName}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative flex items-center">
                <input
                  name="email"
                  type="email"
                  defaultValue={user.email}
                  className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                name="username"
                defaultValue={user.username}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  name="phoneNumber"
                  defaultValue={user.phoneNumber}
                  className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Role</label>
              <div className="relative flex items-center">
                <ShieldCheck className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <span>{user.role}</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}