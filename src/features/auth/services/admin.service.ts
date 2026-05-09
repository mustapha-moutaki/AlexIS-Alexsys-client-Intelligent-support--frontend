import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { CreateAdminRequest } from "@/src/types/CreateAdminRequest";
import { User } from "@/src/types/User";
import { UserEditRequest } from "@/src/types/UserEditRequest";
import { updateUser } from "./user.service";





export const createAdminUser = async (user: CreateAdminRequest) => {

    
    const formData = new FormData();

    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("username", user.username);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("phoneNumber", user.phoneNumber);

    if (user.profilePicture) {
        formData.append("profilePicture", user.profilePicture);
    }

    const res = await api.post<ApiResponse<User>>(
        "/users",
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );
   

    return res.data;
};


export const getAdmins = async (page = 0) => {
    const res = await api.get<ApiResponse<{ content: User[], totalPages: number, totalElements: number, number: number }>>("/users", {
        params: {
            role: "ADMIN",
            page: page,
            size: 10 
        }
    });
    return res.data.data; 
}

export const updateAdmin = async (id: string, data: UserEditRequest) => {
    return await updateUser(id, data);
}