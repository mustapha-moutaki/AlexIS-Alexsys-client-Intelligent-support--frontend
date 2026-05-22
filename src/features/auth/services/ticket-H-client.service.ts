import { CreateClientTicketPayload } from "@/src/types/CreateClientTicketPayload";
import api from "@/src/lib/api";
import { TicketResponse } from "@/src/types/TicketResponse";
import { ApiResponse } from "@/src/types/ApiResponse";


const TICKET_BASE_URL = "/client/tickets";



export const createTicketByClient = async (data: CreateClientTicketPayload) => {
    try{
        const res = await api.post<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}`, data);
        return res.data.data;
    }catch(error){
        throw error;
    }
}