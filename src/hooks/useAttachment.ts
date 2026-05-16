import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { createAttachment } from "../features/auth/services/attachment.service";
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