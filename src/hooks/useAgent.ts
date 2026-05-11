import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAgent, deleteAgent, getAgentById, getAgents, updateAgent } from "../features/auth/services/agent.service";
import { AgentEditRequest } from "../types/AgentEditRequest";
import toast from "react-hot-toast";

export const useCreateAgent = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAgent,
    })
}

export const useAgents = (enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agents"],
        queryFn: () => getAgents(),
        enabled:enabled,
        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}


export const useAgentById = (id: string, enabled: boolean = true) => {
    return useQuery({
        queryKey: ["agent", id],
        queryFn: () => getAgentById(id),
        enabled:enabled,
        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}
export const useUpdateAgent = ()=>{
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: ({id, data}: {id:string; data:AgentEditRequest})=> updateAgent(id, data),

        onMutate:()=>{
            toast.loading("Updating agent profile...");
        },

        onSuccess:(data, variables)=>{
            toast.dismiss();
            toast.success("Agent updated successfully");

            //invalidate queries
            queryClient.invalidateQueries({queryKey:["agents"]});
            queryClient.invalidateQueries({queryKey:["user", variables.id]});
        },

        onError:(error:any)=>{
            toast.dismiss();
            const errorMessage = error?.response?.data?.message || "Failed to update agent";
            toast.error(errorMessage);
        }
    })
}

export const useDeleteAgent = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string)=> deleteAgent(id),

        onSuccess:()=>{
            toast.success("Agent deleted successfully");
            queryClient.invalidateQueries({queryKey:["agents"]});
        },

        onError:()=>{
            toast.error("Failed to delete agent");
        }
    })
}