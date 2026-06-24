import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { Client } from "@/src/types/Client";
import { ClientCreateRequest } from "@/src/types/ClientCreateRequest";
import { ClientEditProfile } from "@/src/types/ClientEditProfile";
import { ClientEditRequest } from "@/src/types/ClientEditRequest";
import { MyTicketSummaryResponse } from "@/src/types/MyTicketSummaryResponse";
import { PageResponse } from "@/src/types/PageResponse";

const ADMINENDPOINT = "/admin/clients";
const CLIENTENDPOINT = "/client/tickets";

type Params = {
    page?:number;
    size?:number;
    isVip?:boolean;
    isActive?:boolean;
    sortDirection?:string
}
export const createClient = async (data: ClientCreateRequest) => {


    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phoneNumber);
    
    
    if(data.profilePicture){
        formData.append("profilePicture", data.profilePicture);
    }
    
        const res = await api.post(`${ADMINENDPOINT}`, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        });
        return res;
       
}

export const getClients = async(params?: Params)=>{
    const res = await api.get<ApiResponse<PageResponse<Client>>>(`${ADMINENDPOINT}`, {
        params:{
            page:params?.page || 0,
            size:params?.size || 10,
            isVip:params?.isVip,
            isActive:params?.isActive,
            sortDirection:params?.sortDirection,

        }
    })

    return res.data.data
}

export const getClientById = async (id: string) => {
    const res = await api.get<ApiResponse<Client>>(`${ADMINENDPOINT}/${id}`);
    return res.data.data;
}

export const updateClient = async (id: string, data: ClientEditRequest) => {

    const res = await api.patch(`${ADMINENDPOINT}/${id}`,data);
    return res.data.data;
}

export const updateProfile = async(id:any, data: ClientEditProfile)=>{
    const formData = new FormData();

    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("phoneNumber", data.phoneNumber);
    
    if(data.profilePicture){
        formData.append("profilePicture", data.profilePicture);
    }
    const res = await api.patch(`${ADMINENDPOINT}/profile/${id}`,data);
    return res.data.data;
}



export const deleteClient = async(id:string)=>{
    const res = await api.delete(`${ADMINENDPOINT}/${id}`);
    return res.data.data;
}


// client service

type GetTicketWithPagination = {
    page?:number;
    size?:number;
}

export const getClientTickets = async (params?: GetTicketWithPagination) =>{
    const res = await api.get<ApiResponse<PageResponse<MyTicketSummaryResponse>>>(CLIENTENDPOINT,{
        params:{
            page:params?.page || 0,
            size:params?.size || 10,
        }
    });
    return res.data.data;
}