import api from "@/src/lib/api";
import { AdminDashboardOverview } from "@/src/types/AdminDashboardOverView";
import { AgentStatsOverView } from "@/src/types/AgentStatsOverView";
import { ApiResponse } from "@/src/types/ApiResponse";
import { CategoryStatsOverView } from "@/src/types/CategoryStatsOverView";
import { ClientStatsOverView } from "@/src/types/ClientStatsOverView";
import { TicketStatsOverView } from "@/src/types/TicketStatsOverVIew";
import { DASHBOARD_ENDPOINTS } from "@/src/shared/constants/endpoints";
import { ClientDashboardOverview } from "@/src/types/ClientDashboardOverview";


/**
 * 
 * @returns all stastistics for ADMIN_DASHBOARD
 */

// Admin dashboard overview 
export const getAdminDashboardOverview = async() =>{
    const res = await api.get<ApiResponse<AdminDashboardOverview>>(DASHBOARD_ENDPOINTS.ADMIN.OVERVIEW);
    return res.data.data
}

export const getAgentStatsOverview = async()=>{
    const res = await api.get<ApiResponse<AgentStatsOverView>>(DASHBOARD_ENDPOINTS.ADMIN.AGENTS);
    return res.data.data;
}

export const getClientStatsOverview = async() =>{
    const res = await api.get<ApiResponse<ClientStatsOverView>>(DASHBOARD_ENDPOINTS.ADMIN.CLIENTS);
    return res.data.data;
}

export const getTicketStatsOverview = async()=>{
    const res = await api.get<ApiResponse<TicketStatsOverView>>(DASHBOARD_ENDPOINTS.ADMIN.TICKETS);
    return res.data.data;
}

export const getCategoryStatsOverview = async()=>{
    const res = await api.get<ApiResponse<CategoryStatsOverView>>(DASHBOARD_ENDPOINTS.ADMIN.CATEGORIES);
    return res.data.data;
}

// STATS FOR CLIENT DASHBOARD

export const getClientDashboardOverview = async ()=>{
    const res = await api.get<ApiResponse<ClientDashboardOverview>>(DASHBOARD_ENDPOINTS.CLIENT.OVERVIEW)
    return res.data.data;
}


// stats for graphs for admin dashboard
export const getStatsForGraphs = async()=>{
    const res = await api.get<ApiResponse<any>>("/dashboard/graphs/stats");
    return res.data.data;
}

// stats for agent
export const getStatsForAgentDashboard = async()=>{
    const res = await api.get<ApiResponse<any>>(DASHBOARD_ENDPOINTS.AGENTDASHBOARD.OVERVIEW);
    return res.data.data;
}