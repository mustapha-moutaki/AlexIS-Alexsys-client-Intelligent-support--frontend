import { useQuery } from "@tanstack/react-query";
import { getAdminDashboardOverview } from "../features/auth/services/dashaboard.service"



export const useAdminDashboardOverview = ()=>{
    return useQuery({
        queryKey: ["admin_dashboard_overview"],
        queryFn: getAdminDashboardOverview,

        // caching config  
        staleTime: 1000 * 60 * 2, // 2 minutes fresh data
        gcTime: 1000 * 60 * 10, // keep cached for 10 minutes (even if inactive)

        // refetch configs 
        refetchOnWindowFocus: true, // refetch when window regains focus
        refetchOnReconnect: true // refetch when browser regains connection
    });
}