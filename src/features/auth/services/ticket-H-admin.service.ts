import api from "@/src/lib/api"
import { ApiResponse } from "@/src/types/ApiResponse"
import { TicketDetailsResponse } from "@/src/types/TicketDetailsResponse";
import { TicketFormData } from "@/src/types/TicketFormData";
import { TicketResponse } from "@/src/types/TicketResponse"


const TICKET_BASE_URL = "/admin/tickets";


type PaginationParams ={
    page?:number;
    size?:number;
}
export const getTickets = async (params : PaginationParams) => {

    const queryParams: any = {
        page:params.page,
        size:params.size,
    }
  
    const res = await api.get<ApiResponse<TicketResponse[]>>(TICKET_BASE_URL,{
        params:queryParams
    });
    return res.data.data;
}

export const createTicket = async (data: TicketFormData) => {

    const res = await api.post<ApiResponse<TicketResponse>>(TICKET_BASE_URL, data);
    return res.data.data;
}

export const getTicketById = async(id:number)=>{
    try{
        const res = await api.get<ApiResponse<TicketDetailsResponse>>(`${TICKET_BASE_URL}/${id}`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const updateTicketByAdmin = async (id: string, data: any) => {
    try{
        const res = await api.patch<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}`, data);
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const deleteTicketByAdmin = async (id: string) => {
    try{
        const res = await api.delete<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const updateTicketStatusByAdmin = async(id: string, status:string)=>{
    try{
        const res = await api.patch<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}/status`,
        {status})
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const updateTicketPriorityByAdmin = async(id: string, priority:string)=>{
    try{
        const res = await api.patch<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}/priority`,
        {priority})
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const updateTicketAssignedToByAdmin = async(id: string, assignedToId:string)=>{
    try{
        const res = await api.patch<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}/assign?agentId=${assignedToId}`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}

// now not used by anyone and nowhere, because when we need detailed ticket we call by id
export const getAllTicketsDetailed = async()=>{
    try{
        const res = await api.get<ApiResponse<TicketResponse[]>>(`${TICKET_BASE_URL}/details`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}


// now not used but will be used later when we create dashboard for agents
// this is used in assigned tickets page for agents
export const getTicketByIdSummary = async(id:string)=>{
    try{
        const res = await api.get<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${id}/summary`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}


// but not used for now, but will be used later
// for admin to see all tickets in one page, without pagination and only id, title, status, priority, assignedTo, createdAt
export const getAllTicketsSummary= async()=>{
    try{
        const res = await api.get<ApiResponse<TicketResponse[]>>(`${TICKET_BASE_URL}/summary`);
        return res.data.data;
    }catch(error){
        throw error;
    }
}