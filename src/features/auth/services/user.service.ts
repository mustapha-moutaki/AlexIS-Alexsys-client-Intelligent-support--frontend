import api from "@/src/lib/api";

import { ApiResponse } from "@/src/types/ApiResponse";
import { PaginatedResponse } from "@/src/types/ApiResponse";
import { User } from "@/src/types/User";

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