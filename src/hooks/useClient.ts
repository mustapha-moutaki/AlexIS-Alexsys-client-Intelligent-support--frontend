import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createClient, getClientById, getClients, updateClient } from "../features/auth/services/client.service";
import toast from "react-hot-toast";
import { ClientEditRequest } from "../types/ClientEditRequest";


type Params = {
    page?:number;
    size?:number;
    isVip?:boolean;
    isActive?:boolean;
    sortDirection?:string
}


export const useCreateClient = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createClient,
        onSuccess:()=>{
            queryClient.invalidateQueries({queryKey: ["clients"]});
            toast.success("Client created successfully");
        },
        onError:(error)=>{
            toast.error(error.message);
        }
    })

}

export const useClientById = (id:string,enabled:boolean = true)=>{
    return useQuery({
        queryKey: ["client", id],
        queryFn: () => getClientById(id),
        enabled:enabled,

        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}

export const useClients = (params?: Params,enabled:boolean = true)=>{
    return useQuery({
        queryKey: ["clients", params],
        queryFn: () => getClients(params),
        enabled:enabled,

        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}

export const useUpdateClient = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({id, data}:{id:string; data:ClientEditRequest})=> updateClient(id, data),
        
        onMutate:()=>{
            toast.loading("Updating client profile...");
        },
        onSuccess:(data, variables)=>{
            toast.dismiss();
            toast.success("Client updated successfully");

            //invalidate queries
            queryClient.invalidateQueries({queryKey: ["clients"]});
            queryClient.invalidateQueries({queryKey: ["user", variables.id]});
        },
        onError:(error:any)=>{
            toast.dismiss();
            const errorMessage = error?.response?.data?.message || "Failed to update client";
            toast.error(errorMessage);
        }
    })
}