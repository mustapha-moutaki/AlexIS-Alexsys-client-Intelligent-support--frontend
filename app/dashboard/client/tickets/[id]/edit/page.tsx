"use client";

import { useParams, useRouter } from "next/navigation";
import { useCategories } from "@/src/hooks/useCategory";
import { useClientGetTicketById, useUpdateClientTicket } from "@/src/hooks/useTickets";
import EditTicketFormClient from "@/src/shared/components/forms/ticket-forms/client/EditTicketFormClient";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import SimpleSpinner from "@/components/ui/SimpleSpinner";

export default function EditTicketPage() {
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id;

  const { mutate: updateClientTicket, isPending: isUpdating } = useUpdateClientTicket();
  const { data: ticket, isLoading: isTicketLoading } = useClientGetTicketById(Number(ticketId));
  const { data: categories, isLoading: isCatsLoading } = useCategories();

  if (isTicketLoading || isCatsLoading) {
    return <div className="flex justify-center items-center min-h-[400px]"><SimpleSpinner /></div>;
  }

  const handleUpdate = (formData: any) => {
    updateClientTicket(
      { id: Number(ticketId), ticket: formData },
      {
        onSuccess: () => {
          router.push(`/dashboard/client/tickets/${ticketId}`);
        },
      }
    );
  };

  return (
    <div className="w-full min-h-screen bg-white font-sans">
      <div className="w-full px-6 py-8 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <ButtonGoBack />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Edit Ticket</h1>
            <Breadcrumbs
              items={[
                { name: "Dashboard", route: "/dashboard" },
                { name: "My Tickets", route: "/dashboard/tickets" },
                { name: `Edit TICKET-${ticketId}` },
              ]}
            />
          </div>
        </div>

        {/* Form Container */}
        <div className="max-w-4xl">
          <EditTicketFormClient
            ticket={ticket}
            categories={categories?.content || []}
            handleUpdate={handleUpdate}
            isUpdating={isUpdating}
          />
        </div>
      </div>
    </div>
  );
}