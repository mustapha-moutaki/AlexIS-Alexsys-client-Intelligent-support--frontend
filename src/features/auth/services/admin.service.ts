import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { CreateAdminRequest } from "@/src/types/CreateAdminRequest";
import { User } from "@/src/types/User";


const ADMIN_ENDPOINT = "/admin";


export const createAdminUser = async(user:CreateAdminRequest)=>{
    const res = await api.post<ApiResponse<User>>(ADMIN_ENDPOINT,user);
    return res.data;
}
