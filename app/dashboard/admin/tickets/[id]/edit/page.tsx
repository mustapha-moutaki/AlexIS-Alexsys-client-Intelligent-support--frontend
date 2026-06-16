"use client";

import { useAgents } from "@/src/hooks/useAgent";
import { useCategories } from "@/src/hooks/useCategory";
import { useClients } from "@/src/hooks/useClient";
import { useTicketByIdByAdmin, useUpdateTicketByAdmin } from "@/src/hooks/useTickets";
import EditTicketFormAdmin from "@/src/shared/components/forms/ticket-forms/admin/EditTicketFormAdmin";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useRouter, useParams } from "next/navigation";

export default function EditTicketPage(){
  const params = useParams();
  const router = useRouter();
  const ticketId = params.id;

     const {mutate: updateTicket,isPending:isUpdating} = useUpdateTicketByAdmin();

   const {data:ticket,isPending} = useTicketByIdByAdmin(Number(ticketId));
    const {data: categories} = useCategories();
    const {data: clients} = useClients();
    const {data: agents} = useAgents();

    if(isPending) return <div>Loading...</div>

    if(!ticket) return <div>Ticket not found</div>

   
    const handleUpdate = (formData:any) => {
        updateTicket({id:Number(ticketId), ticket:formData});
        router.push("/dashboard/admin/tickets");
    }
    return (
        <div className="w-full min-h-screen bg-white font-sans">
      <div className="w-full px-6 py-8 space-y-6">
        {/* Breadcrumbs / Header Area */}
        <div className="flex items-center gap-4 pb-4 border-b border-slate-100">
          <ButtonGoBack />
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
              Edit Ticket
            </h1>
            

            <Breadcrumbs
                       items={[
                         { name: "Dashboard", route: "/" },
                         { name: "tickets", route: "/dashboard/admin/tickets" },
                          { name: "new" },
                       ]}
                     />
            {/* <p className="text-slate-500 text-sm">
              Dashboard / Tickets / <span className="text-blue-600">New Ticket</span>
            </p> */}
          </div>
        </div>

        {/* Form Component */}
        <EditTicketFormAdmin
         ticket = {ticket}
         isPending = {isPending}
         categories={categories || []}
         clients={clients || []}
         agents={agents || []}
        handleUpdate={handleUpdate}
        isUpdating={isUpdating}
          />
      </div>
    </div>
    )
}