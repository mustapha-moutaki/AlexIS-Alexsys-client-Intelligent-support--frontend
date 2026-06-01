import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, deleteTicketByAdmin, getTicketById, getTickets, updateTicketAssignedToByAdmin, updateTicketByAdmin, updateTicketPriorityByAdmin, updateTicketStatusByAdmin } from "../features/auth/services/ticket-H-admin.service";
import toast from "react-hot-toast";
import { getAllTickets, getTicketByIdForAgent, updateTicketStatusAgent } from "../features/auth/services/ticket-H-Agent.service";
import { createTicketByClient, getClientTicketById, updateClientTicket } from "../features/auth/services/ticket-H-client.service";
import { CreateClientTicketPayload } from "../types/CreateClientTicketPayload";
import { UpdateClientTicketPayload } from "../types/UpdateClientTicketPayload";



type PaginationParams = {
    page?:number;
    size?:number;
}

export const useTickets = (params:PaginationParams)=>{
    return useQuery({
        queryKey:["tickets", params],
        queryFn: ()=>getTickets(params),
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
        
       
    })

}

export const useCreateTicketByAdmin = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createTicket,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Ticket created successfully");
        },
        onError: (error:any)=>{
            const errorMessage = error?.response?.data?.message || "Failed to create ticket";
            toast.error(errorMessage);
        }
    })
}

// get the ticket details by id for admin
export const useTicketByIdByAdmin = (id:number)=>{

    return useQuery({
        queryKey: ["ticket", id],
        queryFn: ()=>getTicketById(id)
    })
}



// delete ticket by admin
export const useDeleteTicketByAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id }: { id: string }) =>
      deleteTicketByAdmin(id),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tickets"],
      });
    },

    onError: (error: any) => {
      const errorMessage =
        error?.response?.data?.message ||
        "Failed to delete ticket";

      console.log(errorMessage);
    },
  });
};

export const useUpdateTicketByAdmin = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, ticket}:{id:any, ticket:any})=> updateTicketByAdmin(id, ticket),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Ticket updated successfully");
        },
        onError: (error:any)=>{
            const errorMessage = error?.response?.data?.message || "Failed to update ticket";
            toast.error(errorMessage);
        }
    })
}


// update ticket status by admin
export const useUpdateTicketStatusByAdmin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, status}: {id: string, status: string}) => 
            updateTicketStatusByAdmin(id, status),
            
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Status updated successfully");
        },
        
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update status";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};

export const useUpdateTicketStatusAgent = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id:number) => 
            updateTicketStatusAgent(id),
            
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Status updated successfully");
        },
        
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update status";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};



// update ticket priority by admin
export const useUpdateTicketPriorityByAdmin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, priority}: {id: string, priority: string}) => 
            updateTicketPriorityByAdmin(id, priority),
            
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Priority updated successfully");
        },
        
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update priority";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};

// update the agent that assigned to ticket
export const useUpdateTicketAssignedToByAdmin = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, assignedToId}: {id: string, assignedToId: string}) => 
            updateTicketAssignedToByAdmin(id, assignedToId),
            
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Assigned agent updated successfully");
        },
        
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update assigned agent";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};



// foor now not used
export const useCommentsByTicketId = (id:number)=>{
    return useQuery({
        queryKey: ["comments", id],
        // queryFn: ()=>getCommentsByTicketId(id)
    })
}

export const useAttachmentsByTicketId = (id:number)=>{
    return useQuery({
        queryKey: ["attachments", id],
        // queryFn: ()=>getAttachmentsByTicketId(id)
    })
}


// get all tickets for agent with Optional filter by the status
export const useTicketsByAgent = (status: string) => {

    return useQuery({
        queryKey: ["tickets", status],

        queryFn: () => getAllTickets(status),

        staleTime: 1000 * 60 * 2,
        gcTime: 1000 * 60 * 10,

        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
        refetchOnMount: true,

        placeholderData: (previousData) => previousData,
    });
};

// get ticket details for agent by ticket id
export const useTicketByIdForAgent = (id: number) => {
    return useQuery({
        queryKey: ["ticket", id],
        queryFn: () => getTicketByIdForAgent(id)
    })
}

// create ticket by client 
export const useCreateTicketByClient = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: CreateClientTicketPayload) => createTicketByClient(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tickets"] });
            toast.success("Ticket created successfully");
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to create ticket";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};

// get ticket details for the client by the ticket id
export const useClientGetTicketById = ( id: number) =>{
    return useQuery({
        queryKey: ["client-ticket", id],
        queryFn: () => getClientTicketById(id)
    })
}

// client update his own ticket
export const useUpdateClientTicket = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, ticket}: {id: number, ticket: UpdateClientTicketPayload}) => updateClientTicket(id, ticket),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["client-ticket"] });
            toast.success("Ticket updated successfully");
        },
        onError: (error: any) => {
            const errorMessage =
                error?.response?.data?.message ||
                "Failed to update ticket";
            
            console.log(errorMessage);
            toast.error(errorMessage);
        }
    });
};