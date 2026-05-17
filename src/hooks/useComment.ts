import { useQueries, useMutation, useQueryClient } from "@tanstack/react-query"
import { createComment, deleteComment, updateComment } from "../features/auth/services/comment.service";
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

export const useEditComment = (ticketId: string) => {
  const queryClient = useQueryClient();

  return useMutation({

    mutationFn: (data: { id: string; content: string }) =>
      updateComment(data.id, data.content, Number(ticketId)),

    onSuccess: () => {
      toast.success("Comment updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["comments", Number(ticketId)],
      });
      queryClient.invalidateQueries({
        queryKey: ["ticket"],
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update comment");
    },
  });
};

export const useDeleteComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Pass the id here as a variable
    mutationFn: (id: number) => deleteComment(id),

    onSuccess: () => {
      toast.success("Comment deleted successfully!");
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      queryClient.invalidateQueries({ queryKey: ["ticket"] });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to delete comment");
    },
  });
};
