import api from "@/src/lib/api";
import { ClientCreateRequest } from "@/src/types/ClientCreateRequest";

const CLIENTENDPOINT = "/admin/clients";


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
    
        const res = await api.post(`${CLIENTENDPOINT}`, formData,{
            headers:{
                "Content-Type":"multipart/form-data",
            }
        });
        return res;
       
   
}