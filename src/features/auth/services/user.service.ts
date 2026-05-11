import api from "@/src/lib/api";

import { ApiResponse } from "@/src/types/ApiResponse";
import { PaginatedResponse } from "@/src/types/ApiResponse";
import { User } from "@/src/types/User";
import { UserEditRequest } from "@/src/types/UserEditRequest";
import { UserInfoOptionsWithBufferEncoding } from "os";

const USER_ENDPOINT = "/users";

type Params = {
  page?: number;
  sortBy?: string;
  direction?: "asc" | "desc";
  role?: string;
  includeDeleted?: boolean;
};

export const getUsers = async (params: any) => {
  const queryParams: any = {
    page: params.page - 1,
    sortBy: params.sortBy,
    direction: params.direction,
    includeDeleted: params.includeDeleted,
  };

 
  if (params.role && params.role !== "") {
    queryParams.role = params.role;
  }

  const res = await api.get("/users", {
    params: queryParams,
  });

  return res.data.data;
};



export const getUserById = async (id: string) => {
    const res = await api.get<ApiResponse<User>>(`${USER_ENDPOINT}/${id}`);
    return res.data.data;
}

export const updateUser = async (id: string, data: UserEditRequest) => {
  const payload = {
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    email: data.email,
    phoneNumber: data.phoneNumber,
    ...(data.password && { password: data.password }),
  };

  const res = await api.patch(`${USER_ENDPOINT}/${id}`, payload);

  return res.data;
};

export const deleteUser = async(id:string)=>{
  const res = await api.delete(`${USER_ENDPOINT}/${id}`);
  return res.data
}