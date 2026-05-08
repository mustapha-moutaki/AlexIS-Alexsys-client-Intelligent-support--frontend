import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createClient } from "../features/auth/services/client.service";
import toast from "react-hot-toast";

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