"use client";
import { useAgents } from "@/src/hooks/useAgent";
import { useCategories } from "@/src/hooks/useCategory";
import { useClients } from "@/src/hooks/useClient";
import { useCreateTicketByAdmin } from "@/src/hooks/useTickets";
import CreateTicketFromAdmin from "@/src/shared/components/forms/ticket-forms/admin/CreateTicketFromAdmin";
import type { CreateTicketFormPayload } from "@/src/shared/components/forms/ticket-forms/admin/CreateTicketFromAdmin";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useRouter } from "next/navigation";
import { createAttachment } from "@/src/features/auth/services/attachment.service";
import { createComment } from "@/src/features/auth/services/comment.service";
import { useState } from "react";
import toast from "react-hot-toast";
import type { TicketFormData as CanonicalTicketFormData } from "@/src/types/TicketFormData";

export default function CreateTicketPage() {


    const router = useRouter();

interface TicketFormData {
  title: string;
  description: string;
  status: string;
  priority: string;
  issueType: string;
  categoryId: string;
  clientId: string;
  assignedToId?: string;
}

const {mutateAsync, isPending: isCreatingTicket}= useCreateTicketByAdmin();


const {data: categories} = useCategories();
const {data: clients} = useClients();
const {data: agents} = useAgents();

const [isProcessing, setIsProcessing] = useState(false);
const isPending = isCreatingTicket || isProcessing;

  const handleCreate = async (payload: CreateTicketFormPayload) => {
  const { formData, commentText, files } = payload;

  try {
    setIsProcessing(true);

    const cleanedFormData = { ...formData };
    
    if (!cleanedFormData.assignedToId) {
      delete cleanedFormData.assignedToId;
    }
    

    const createdTicket = await mutateAsync(cleanedFormData as CanonicalTicketFormData);

    if (!createdTicket?.id) {
      throw new Error("Ticket created but no ID returned");
    }

    // 2. Upload files
    if (files.length > 0) {
      try {
        await Promise.all(
          files.map((file) => createAttachment(file, createdTicket.id))
        );
      } catch {
        toast.error("Ticket created, but some attachments could not be uploaded.");
      }
    }

    // 3. Create comment
    if (commentText.trim()) {
      try {
        await createComment({
          ticketId: createdTicket.id,
          content: commentText.trim(),
        });
      } catch {
        toast.error("Ticket created, but the comment could not be added.");
      }
    }

    router.push("/dashboard/admin/tickets");
  } catch (error) {
    console.error("Error creating ticket:", error);
  } finally {
    setIsProcessing(false);
  }
};



  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <div className="w-full px-6 py-8 space-y-6">
        {/* Breadcrumbs / Header Area */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <ButtonGoBack />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Create New Ticket
            </h1>
            
            <Breadcrumbs
                       items={[
                         { name: "Dashboard", route: "/" },
                         { name: "tickets", route: "/dashboard/admin/tickets" },
                          { name: "new" },
                       ]}
                     />
           
          </div>
        </div>

        {/* Form Component */}
        
        <CreateTicketFromAdmin
         onCreate = {handleCreate}
         categories = {categories || []}
         clients = {clients?.content || []}
         agents = {agents || []}
         isPending = {isPending}
         />
      </div>
    </div>
  );
}