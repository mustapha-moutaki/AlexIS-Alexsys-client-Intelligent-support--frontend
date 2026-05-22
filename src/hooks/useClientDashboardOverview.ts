import { useQuery } from "@tanstack/react-query"
import { getClientDashboardOverview } from "../features/auth/services/dashaboard.service"

export const useClientDashboardOverview = ()=>{
    return useQuery({
        queryKey:["client-dashboard"],
        queryFn:()=> getClientDashboardOverview()

    })
}