"use client";
import { useState } from "react";
import CreateTicketFromClient, { CreateClientTicketFormPayload } from "@/src/shared/components/forms/ticket-forms/client/CreateTicketFromClient";
import { CheckCircle2 } from "lucide-react";
import { useCategories } from "@/src/hooks/useCategory";
import { useCreateTicketByClient } from "@/src/hooks/useTickets";
import { createAttachment } from "@/src/features/auth/services/attachment.service";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useCreateComment } from "@/src/hooks/useComment"; 
import { CreateClientTicketPayload } from "@/src/types/CreateClientTicketPayload";

export default function CreateTicketPage() {
  const router = useRouter();
  const { data, isPending: isCategoriesPending, error } = useCategories();
  const categories = data?.content || [];
  
  const { mutateAsync: createTicket, isPending: isCreatingTicket } = useCreateTicketByClient();
  
  /** 
   * To fix the TS(2554) error, we pass placeholder values (0, ""). 
   * The actual values will be passed when we call createComment(...) in handleSubmit.
   */
  const { mutateAsync: createComment, isPending: isCommentCreating } = useCreateComment(0, "");

  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const isSubmitting = isCreatingTicket || isProcessing || isCommentCreating;

  const handleSubmit = async (payload: CreateClientTicketFormPayload) => {
    try {
      setIsProcessing(true);
      setIsSuccess(false);

      // 1. Submit ticket details using the imported Payload type
      const ticketDto: CreateClientTicketPayload = {
        title: payload.formData.title,
        description: payload.formData.description,
        priority: payload.formData.priority,
        issueType: payload.formData.issueType,
        categoryId: Number(payload.formData.categoryId),
        // If your CreateClientTicketPayload requires a commentId (per your instructions)
        // ensure it is handled here, or passed as a default.
      };

      const createdTicket = await createTicket(ticketDto);

      if (!createdTicket?.id) {
        throw new Error("Ticket created but no ID was returned from server");
      }

      // 2. Create the comment if content exists
      // Assuming payload.formData.comment is the field in your form
      if (payload.formData.comment) {
        try {
          await createComment({ 
            ticketId: Number(createdTicket.id), 
            content: payload.formData.comment 
          });
        } catch (commentErr) {
          console.error("Comment failed:", commentErr);
          toast.error("Ticket created, but comment could not be posted.");
        }
      }

      // 3. Upload any attachments selected
      if (payload.files.length > 0) {
        try {
          await Promise.all(
            payload.files.map((file) => createAttachment(file, createdTicket.id))
          );
        } catch {
          toast.error("Ticket created, but some attachments could not be uploaded.");
        }
      }

      setIsSuccess(true);
    } catch (error) {
      console.error("Error creating ticket:", error);
      toast.error("An error occurred while creating the ticket.");
    } finally {
      setIsProcessing(false);
    }
  };

  if (isCategoriesPending) {
    return <div>Loading categories...</div>;
  }

  if (error) {
    return <div>Error loading categories</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50/50 p-6 space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-slate-800 tracking-tight">Submit New Ticket</h1>
          <p className="text-sm text-slate-400 mt-0.5">Fill in the details below to report an issue</p>
        </div>
      </div>

      <CreateTicketFromClient 
        onCreate={handleSubmit} 
        categories={categories || []} 
        isPending={isSubmitting}
      />

      {isSuccess && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
            <div className="flex flex-col items-center text-center space-y-4">
              <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center">
                <CheckCircle2 size={40} className="text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-slate-800">Ticket Submitted!</h2>
              <p className="text-slate-600">Your ticket has been successfully created and assigned to an agent.</p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  router.push("/dashboard/client/tickets");
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}