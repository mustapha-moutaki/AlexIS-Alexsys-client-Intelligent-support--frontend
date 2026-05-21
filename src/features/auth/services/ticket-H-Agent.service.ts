import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { TicketDetailsResponse } from "@/src/types/TicketDetailsResponse";

const TICKET_BASE_ENDPOINT = "/agent/tickets";

export const getAllTickets= async(status: string)=>{
    if(status){
        try{
            const res = await api.get<ApiResponse<TicketDetailsResponse[]>>(`${TICKET_BASE_ENDPOINT}?status=${status}`);
            if(res.data && res.data.success){
                return res.data.data;
            }
            throw new Error("Failed to fetch tickets");
        }catch(error){
            console.error(error);
            throw error;
        }
    }
    else{
        try{
            const res = await api.get<ApiResponse<TicketDetailsResponse[]>>(`${TICKET_BASE_ENDPOINT}`);
            if(res.data && res.data.success){
                return res.data.data;
            }
            throw new Error("Failed to fetch tickets");
        }catch(error){
            console.error(error);
            throw error;
        }
        
    }

}

export const getTicketByIdForAgent = async (id: number) => {
    try {
        const res = await api.get<ApiResponse<TicketDetailsResponse>>(`${TICKET_BASE_ENDPOINT}/${id}`);
        if (res.data && res.data.success) {
            return res.data.data;
        }
        throw new Error("Failed to fetch ticket");
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const updateTicketStatusAgent = async (ticketId: number)=>{
    try{
        const res = await api.put<ApiResponse<any>>(`${TICKET_BASE_ENDPOINT}/${ticketId}`,{
            status:"RESOLVED"
        });
        if(res.data && res.data.success){
            return res.data.data;
        }
        throw new Error("Failed to update ticket status");
    }catch(error){
        console.error(error);
        throw error;
    }
}