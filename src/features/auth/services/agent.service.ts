import api from "@/src/lib/api";
import { Agent } from "@/src/types/Agent";
import { AgentCreateRequest } from "@/src/types/AgentCreateRequest";
import { AgentEditRequest } from "@/src/types/AgentEditRequest";
import { ApiResponse } from "@/src/types/ApiResponse";

const AGENTENDPOINT = "/agents";


export const createAgent = async (data: AgentCreateRequest) => {


    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("username", data.username);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("phoneNumber", data.phone);
    formData.append("specialization", data.specialization);
    formData.append("averageResolutionTime", data.averageResolutionTime.toString());
    formData.append("performanceRating", data.performanceRating.toString());
    formData.append("availabilityStatus", data.availabilityStatus);
    formData.append("level", data.level);
    
    if(data.profilePicture){
        formData.append("profilePicture", data.profilePicture);
    }
    
        const res = await api.post(`${AGENTENDPOINT}`, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        });
        return res;
       
   
}

export const getAgents = async () => {
    const res = await api.get<ApiResponse<Agent[]>>(`${AGENTENDPOINT}`);
    return res.data.data;
}

export const getAgentById = async (id: string)=>{
    const res = await api.get<ApiResponse<Agent>>(`${AGENTENDPOINT}/${id}`);
    return res.data.data;
}


export const updateAgent = async(id:string,data:AgentEditRequest)=>{
    const res = await api.patch<ApiResponse<Agent>>(`${AGENTENDPOINT}/${id}`,data);
    return res.data.data;
}

export const deleteAgent = async(id:string)=>{
    const res = await api.delete(`${AGENTENDPOINT}/${id}`);
    return res.data.data;
}

export const softDeleteAgent = async(id:string)=>{
    const res = await api.put(`${AGENTENDPOINT}/soft-delete/${id}`);
    return res.data.data;
}

export const restoreAgent = async(id:string)=>{
    const res = await api.put(`${AGENTENDPOINT}/restore/${id}`);
    return res.data.data;
}

export const getTopAgents = async(limit:number)=>{
    const res = await api.get(`${AGENTENDPOINT}/top-agents?limit=${limit}`);
    return res.data.data;
}
