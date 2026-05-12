import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createCategory, deleteCategory, getCategories, updateCategory } from "../features/auth/services/category.service"
import toast from "react-hot-toast"
import { Category } from "../types/Category"

export const useCategories = ()=>{

    return useQuery({
       queryKey:["categories"],
        queryFn:()=> getCategories(),
        enabled:true,
        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}

export const useCreateCategory = ()=>{
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (category: Category) => createCategory(category),
        onSuccess:()=>{
            toast.success("Category created successfully");
            queryClient.invalidateQueries({queryKey:["categories"]});
        },

        onError:()=>{
            toast.error("Failed to create category");
        }
    })
}

export const useUpdateCategory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    // Receives the object { id, category } from the handleUpdate function
    mutationFn: ({ id, category }: { id: string; category: Category }) => 
      updateCategory(id, category),
    
    onSuccess: () => {
      toast.success("Category updated successfully");
      // This tells React Query to refetch the list so the UI updates
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },

    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Failed to update category");
    }
  });
};

export const useDeleteCategory = ()=>{
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (id: string) => deleteCategory(id),
        onSuccess:()=>{
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({queryKey:["categories"]});
        },

        onError:()=>{
            toast.error("Failed to delete category");
        }
    })
}