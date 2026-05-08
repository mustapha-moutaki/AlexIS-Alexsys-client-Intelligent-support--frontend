"use client";

import { useCreateAdmin } from "@/src/hooks/useAdmin";
import { useCreateAgent } from "@/src/hooks/useAgent";
import { useCreateClient } from "@/src/hooks/useClient";
import CreateAdminForm from "@/src/shared/components/forms/CreateAdminForm";
import CreateAgentForm from "@/src/shared/components/forms/CreateAgentForm";
import CreateClient from "@/src/shared/components/forms/CreateClientForm";
import { useSearchParams } from "next/navigation";

export default function CreateAdminPage() {
    const searchParams = useSearchParams();
    const roleId = searchParams.get("roleId");

    const roleMap: Record<string, string> = {
        "1": "ADMIN",
        "2": "AGENT",
        "3": "CLIENT",
    };
    const selectedRole = roleMap[roleId || ""] || "UNKNOWN";

     // Initialize all hooks at the top level
    const adminAction = useCreateAdmin();
    const agentAction = useCreateAgent();
    const clientAction = useCreateClient(); 

    //Logic to determine which mutation function to call
    const handleCreateUser = (formData: any) => {
        if (selectedRole === "ADMIN") {
            adminAction.mutate(formData);
        } else if (selectedRole === "AGENT") {
            agentAction.mutate(formData);
        } else if (selectedRole === "CLIENT") {
            clientAction.mutate(formData);
        }
    };
        const isPending = adminAction.isPending || agentAction.isPending;


    return (
        <main className="h-full w-full flex items-center justify-center gap-8 p-6 bg-transparent overflow-hidden">

            {/* Left Slot */}
            <div className="w-[90%] h-[95%]">
                {selectedRole === "ADMIN" && (
    <CreateAdminForm
        onSubmit={handleCreateUser}
        isLoading={isPending}
    />
    )}

      {selectedRole === "AGENT" && (
        <CreateAgentForm 
        onSubmit={handleCreateUser}
         isLoading={isPending} />
        )}

        {selectedRole === "CLIENT" && (
    <CreateClient
        onSubmit={handleCreateUser}
        isLoading={isPending}
        />
    )}
            </div>

            {/* Right Slot */}
            <div className="w-[30%] h-[90%] rounded-2xl text-white overflow-hidden flex flex-col bg-transparent">
                <h2 className="text-xl font-semibold mb-4 text-[#51c2de]">Admin List</h2>
                <div className="flex-1 overflow-y-auto border border-[#51c2de]/20 rounded-xl p-4">
                    <p className="text-white/50 text-sm">Admin list content...</p>
                </div>
            </div>

        </main>
    );
}