"use client";
import { useAgents } from "@/src/hooks/useAgent";
import { useCategories } from "@/src/hooks/useCategory";
import { useClients } from "@/src/hooks/useClient";
import { useCreateTicketByAdmin } from "@/src/hooks/useTickets";
import CreateTicketFromAdmin from "@/src/shared/components/forms/ticket-forms/admin/CreateTicketFromAdmin";
import Breadcrumbs from "@/src/shared/components/ui/Breadcrumbs";
import ButtonGoBack from "@/src/shared/components/ui/ButtonGoBack";
import { useRouter } from "next/navigation";

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
  assignedToId: string;
}

// handle create ticket request
const {mutateAsync, isPending}= useCreateTicketByAdmin();
// fetch categories, clients, agents
const {data: categories} = useCategories();
const {data: clients} = useClients();
const {data: agents} = useAgents();

  const handleCreate = async (data: TicketFormData) => {

   await mutateAsync(data);
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
              Create New Ticket
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
        <CreateTicketFromAdmin
         onCreate = {handleCreate}
         categories = {categories?.content || []}
         clients = {clients?.content || []}
         agents = {agents?.content || []}
         isPending = {isPending}
         />
      </div>
    </div>
  );
}