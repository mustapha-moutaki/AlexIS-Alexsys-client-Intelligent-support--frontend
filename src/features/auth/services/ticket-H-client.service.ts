import { CreateClientTicketPayload } from "@/src/types/CreateClientTicketPayload";
import api from "@/src/lib/api";
import { TicketResponse } from "@/src/types/TicketResponse";
import { ApiResponse } from "@/src/types/ApiResponse";
import { TicketDetailsResponse } from "@/src/types/TicketDetailsResponse";
import { UpdateClientTicketPayload } from "@/src/types/UpdateClientTicketPayload";


const TICKET_BASE_URL = "/client/tickets";



export const createTicketByClient = async (data: CreateClientTicketPayload) => {
    try{
        const res = await api.post<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}`, data);
        return res.data.data;
    }catch(error){
        throw error;
    }
}

export const getClientTicketById = async (ticketId: number) =>{
    const res = await api.get<ApiResponse<TicketDetailsResponse>>(`${TICKET_BASE_URL}/${ticketId}`);
    return res.data.data;
}

// client updated his own ticket
export const updateClientTicket = async(ticketId: number, data: UpdateClientTicketPayload) =>{
    const res = await api.patch<ApiResponse<TicketResponse>>(`${TICKET_BASE_URL}/${ticketId}`, data);
    return res.data.data;
}