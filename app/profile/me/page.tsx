"use client";
import React from "react";
import UserProfile from "@/src/shared/components/modals/UserProfile"; // Update path if needed
import useAuthStore from "@/src/store/authStore";

export default function UserProfilePage() {
  const user = useAuthStore((state) => state.user);

  

  const currentUser = user;

  return (
    <main className="w-full min-h-screen bg-slate-50">
      <UserProfile user={currentUser} />
    </main>
  );
}