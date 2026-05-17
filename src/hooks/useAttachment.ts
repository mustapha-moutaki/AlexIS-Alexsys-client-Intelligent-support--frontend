import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttachment, deleteAttachment } from "../features/auth/services/attachment.service";
import toast from "react-hot-toast";



export const useCreateAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ file, ticketId }: { file: File; ticketId: number }) =>
      createAttachment(file, ticketId),

     onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ['ticket', variables.ticketId],
      });

      toast.success("Attachment created successfully!");
    },

    onError: (error: any) => {
      toast.error(error?.message || "Failed to create attachment");
    },
  });
};

export const useDeleteAttachment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteAttachment(id),
    
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['ticket'],
      });

      toast.success("Attachment deleted successfully!");
    },
    
    onError: (error: Error) => {
      toast.error(error.message || "Failed to delete attachment");
    },
  });
};