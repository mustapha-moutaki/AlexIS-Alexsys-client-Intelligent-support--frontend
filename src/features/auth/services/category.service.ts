import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";
import { Category } from "@/src/types/Category";

const CATEGORY_URL = "/categories";

export const getCategories = async()=>{
    const res = await api.get<ApiResponse<Category[]>>(`${CATEGORY_URL}`);
    return res.data.data;
}

export const createCategory = async(category: Category)=>{
    const res = await api.post<ApiResponse<Category>>(`${CATEGORY_URL}`, category);
    return res.data.data;
}

export const updateCategory = async (id: string, category: Partial<Category>) => {
  const res = await api.patch<ApiResponse<Category>>(`${CATEGORY_URL}/${id}`, category);
  return res.data.data;
};
export const deleteCategory = async(id: string)=>{
    const res = await api.delete<ApiResponse<Category>>(`${CATEGORY_URL}/${id}`);
    return res.data.data;
}