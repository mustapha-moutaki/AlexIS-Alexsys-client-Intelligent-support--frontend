import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAdminUser } from "@/src/features/auth/services/admin.service";

import toast from "react-hot-toast";

export const useCreateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: createAdminUser,

  onMutate: () => {
    toast.loading("Creating admin...");
  },

  onSuccess: () => {
    toast.dismiss();
    toast.success("Admin created successfully");
  },

  onError: () => {
    toast.dismiss();
    toast.error("Failed to create admin");
  },
});
};