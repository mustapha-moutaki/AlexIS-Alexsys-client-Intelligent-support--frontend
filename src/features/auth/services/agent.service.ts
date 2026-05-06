import api from "@/src/lib/api";
import { AgentCreateRequest } from "@/src/types/AgentCreateRequest";

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
