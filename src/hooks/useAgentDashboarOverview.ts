
import { getStatsForAgentDashboard } from "@/src/features/auth/services/dashaboard.service";
import { useQuery } from "@tanstack/react-query";

export const useAgentDashboardOverview = ()=>{
    return useQuery({
        queryKey: ["AGENT_DASHBOARD_OVERVIEW"],
        queryFn: getStatsForAgentDashboard,
        staleTime:1000*60*5,
        gcTime:1000*60*5,
        refetchOnMount:false,
        refetchOnWindowFocus:false,
    })
}