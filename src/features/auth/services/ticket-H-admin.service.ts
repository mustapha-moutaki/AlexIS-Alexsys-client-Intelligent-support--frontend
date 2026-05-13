import api from "@/src/lib/api"
import { ApiResponse } from "@/src/types/ApiResponse"
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