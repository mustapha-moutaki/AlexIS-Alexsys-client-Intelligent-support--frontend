import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment } from "../features/auth/services/comment.service";
import toast from "react-hot-toast";

export const useCreateComment = (ticketId: number, content:string)=>{
    const queryCleint = useQueryClient();
    return useMutation({
        mutationKey: ["comments",ticketId],
        mutationFn:(data: {ticketId:number, content:string})=> createComment(data),
        onSuccess:(data)=>{
            toast.success("Comment added successfully!");
            queryCleint.invalidateQueries({
                queryKey: ["comments",ticketId],
            });
            queryCleint.invalidateQueries({
                queryKey: ["ticket",ticketId],
            });
            
        },
        onError:(error:any)=>{
            toast.error(error?.response?.data?.message || "Failed to add comment");
        }
    })
}