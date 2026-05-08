import { useQuery } from "@tanstack/react-query"
import { getUserById, getUsers } from "../features/auth/services/user.service"

type Params={
  page?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
  role?: string;
  includeDeleted?: boolean;
}
export const useUsers = (params:Params)=>{
    return useQuery({
        queryKey:["users",params],
        queryFn: ()=>getUsers(params),

         // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    })
}


export const useUserById = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
    enabled: !!id,
  });
};