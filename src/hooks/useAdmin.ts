import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createAdminUser, getAdmins, updateAdmin } from "@/src/features/auth/services/admin.service";

import toast from "react-hot-toast";
import { UserEditRequest } from "../types/UserEditRequest";

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

export const useAdmins = (page: number,enabled:boolean= true) => {
  return useQuery({
    queryKey: ["admins", page],
    queryFn: () => getAdmins(page),
    enabled:enabled,
  });
};




export const useUpdateAdmin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // We pass an object containing both the id and the update data
    mutationFn: ({ id, data }: { id: string; data: UserEditRequest }) => updateAdmin(id, data),

    onMutate: () => {
      toast.loading("Updating admin profile...");
    },

    onSuccess: (data, variables) => {
      toast.dismiss();
      toast.success("Admin updated successfully");

      // 1. Invalidate the general admins list to trigger a refresh
      queryClient.invalidateQueries({ queryKey: ["admins"] });

      // 2. Invalidate the specific user query if you have a "useUserById" hook
      queryClient.invalidateQueries({ queryKey: ["user", variables.id] });
    },

    onError: (error: any) => {
      toast.dismiss();
      const errorMessage = error?.response?.data?.message || "Failed to update admin";
      toast.error(errorMessage);
    },
  });
};