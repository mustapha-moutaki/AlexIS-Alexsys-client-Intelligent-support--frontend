import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { CreateAdminRequest } from "@/src/types/CreateAdminRequest";
import { User } from "@/src/types/User";





export const createAdminUser = async(user:CreateAdminRequest)=>{
    const res = await api.post<ApiResponse<User>>("/users",user);
    return res.data;
}
