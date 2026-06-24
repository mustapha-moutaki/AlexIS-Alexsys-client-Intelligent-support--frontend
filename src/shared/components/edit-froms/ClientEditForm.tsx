"use client";

import React, { useRef, useState } from "react";
import { Client } from "@/src/types/Client";
import { useUpdateClient } from "@/src/hooks/useClient";
import Breadcrumbs from "../ui/Breadcrumbs";
import {
  Camera,
  Mail,
  User as UserIcon,
  Phone,
  Save,
  Loader2,
  Crown,
  Star,
} from "lucide-react";
import ButtonGoBack from "../ui/ButtonGoBack";

interface Props {
  client: Client;
}

export default function ClientEditForm({ client }: Props) {
  const { mutate, isPending } = useUpdateClient();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [previewImage, setPreviewImage] = useState<string | null>(
    client.profilePicture || null
  );
  const [rating, setRating] = useState(0);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    mutate({
      id: client.id.toString(),
      data: {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("email") as string,
        username: formData.get("username") as string,
        phoneNumber: formData.get("phoneNumber") as string,
        isVip: formData.get("isVip") === "on",
        satisfactionScore: rating,
        profilePicture: previewImage,
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
          { name: "Clients", route: "/dashboard/clients" },
          { name: `Edit Client: ${client.firstName}`, route: "#" },
        ]}
      />

      <form
        onSubmit={handleSubmit}
        className="w-full bg-white border border-gray-200 rounded-md"
      >
        {/* Header */}
        <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium text-gray-900">
            <ButtonGoBack />
            <p>Edit Client</p>
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
                defaultValue={client.firstName}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Last name</label>
              <input
                name="lastName"
                defaultValue={client.lastName}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Email</label>
              <div className="relative flex items-center">
                <Mail className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  name="email"
                  type="email"
                  defaultValue={client.email}
                  className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Username</label>
              <input
                name="username"
                defaultValue={client.username}
                className="w-full h-10 px-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">Phone</label>
              <div className="relative flex items-center">
                <Phone className="w-4 h-4 text-gray-400 absolute left-3 pointer-events-none" />
                <input
                  name="phoneNumber"
                  defaultValue={client.phoneNumber}
                  className="w-full h-10 pl-9 pr-3 border border-gray-200 rounded text-sm outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-600 mb-1">VIP Status</label>
              <div className="flex items-center h-10 px-3 border border-gray-200 rounded bg-gray-50/30">
                <input
                  id="isVip"
                  name="isVip"
                  type="checkbox"
                  defaultChecked={client.isVip}
                  className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <label htmlFor="isVip" className="ml-2 text-sm text-gray-700 flex items-center gap-1.5">
                  <Crown className={`w-3.5 h-3.5 ${client.isVip ? 'text-amber-500' : 'text-gray-400'}`} />
                  Mark as VIP
                </label>
              </div>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm text-gray-600 mb-1">Satisfaction Score</label>
              <div className="flex items-center h-10 px-3 border border-gray-200 rounded">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="focus:outline-none transition-transform active:scale-90"
                  >
                    <Star
                      className={`w-5 h-5 mr-1 ${
                        star <= rating ? "fill-amber-400 text-amber-400" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm font-medium text-gray-500">{rating} / 5</span>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}