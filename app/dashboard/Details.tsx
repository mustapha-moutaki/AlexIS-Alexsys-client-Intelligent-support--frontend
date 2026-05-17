"use client";

import FieldSkeleton from "@/components/ui/FieldSkeleton";
import GlassComponent from "@/components/GlassComponent";
export default function Details() {
  return (
    <>
      {/* PASTE ALL YOUR DASHBOARD UI HERE */}
      <h2>Details</h2>
      <FieldSkeleton/>
      <div className="flex space-x-2">
           <FieldSkeleton/>
      <FieldSkeleton/>
      </div>


    </>
  );
}