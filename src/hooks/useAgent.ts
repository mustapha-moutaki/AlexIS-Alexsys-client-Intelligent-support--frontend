import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAgent } from "../features/auth/services/agent.service";

export const useCreateAgent = ()=>{
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: createAgent,
    })


}