import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTicket, getTickets } from "../features/auth/services/ticket-H-admin.service";
import toast from "react-hot-toast";



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