"use client";

import CreateUserForm from "@/src/shared/components/forms/CreateUserForm";

export default function CreateUserPage() {
  return (
    // The parent controls the layout (Flex, center, full viewport)
    <main className="h-[100%] w-full flex items-center justify-center gap-8 p-6 bg-transparent overflow-hidden">
      
      {/* Left Slot: Assigned 50% Width and 95% Height */}
      <div className="w-[90%] h-[95%]">
        <CreateUserForm roleId="1" />
      </div>

      {/* Right Slot: Assigned 30% Width and 90% Height */}
      <div className="w-[30%] h-[90%] rounded-2xl  text-white overflow-hidden flex flex-col bg-transparent">
        <h2 className="text-xl font-semibold mb-4 text-[#51c2de]">Admin List</h2>
        <div className="flex-1 overflow-y-auto border border-[#51c2de]/20 rounded-xl p-4">
          <p className="text-white/50 text-sm">fetchalladminsList content...</p>
        </div>
      </div>
      
    </main>
  );
}