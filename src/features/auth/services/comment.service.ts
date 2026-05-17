import api from "@/src/lib/api";
import useAuthStore from "@/src/store/authStore";
import { ApiResponse } from "@/src/types/ApiResponse";
import { CommentRequest } from "@/src/types/CommentRequest";
import { CommentResponse } from "@/src/types/CommentResponse";

const COMMENT_ENDPOINT = "/comments";

// get all comments

type Params ={
    page?:number;
    size?:number;
}
export const getAllComments = async(params:Params)=>{
   try{
    const res = await api.get<ApiResponse<CommentResponse[]>>(`${COMMENT_ENDPOINT}`);
    return res.data.data;
   }catch(error){
    throw error;
   }
}
// get comment by id
export const getCommentById = async(id:string)=>{
   try{
    const res = await api.get<ApiResponse<CommentResponse>>(`${COMMENT_ENDPOINT}/${id}`);
    return res.data.data;
   }catch(error){
    throw error;
   }
}


// get comments by ticket id
export const getCommentsByTicketId = async(ticketId:string)=>{
   try{
    const res = await api.get<ApiResponse<CommentResponse[]>>(`${COMMENT_ENDPOINT}/ticket/${ticketId}`);
    return res.data.data;
   }catch(error){
    throw error;
   }
}

// delete comment
export const deleteComment = async(id:number)=>{
   try{
    const res = await api.delete<ApiResponse<CommentResponse>>(`${COMMENT_ENDPOINT}/${id}`);
    return res.data.data;
   }catch(error){
    throw error;
   }
}

// update comment
export const updateComment = async (id: string, content: string, ticketId: number) => {
  try {
    const res = await api.patch<ApiResponse<CommentResponse>>(
      `${COMMENT_ENDPOINT}/${id}`,
      { 
        content, 
        ticketId // The backend is asking for this
      }
    );
    return res.data.data;
  } catch (error) {
    throw error;
  }
};
// create comment
export const createComment = async(data:{ticketId:number, content:string}):Promise<CommentResponse>=>{
   //  const user = useAuthStore.getState().user;
   //  const userId = user?.id as number;

    const commentRequest: CommentRequest = {
        content: data.content,
      //   userId: userId,
        ticketId: data.ticketId
    };

   try{
    const res = await api.post<ApiResponse<CommentResponse>>(`${COMMENT_ENDPOINT}`,commentRequest);
    console.log("comment created successfully");
    
    return res.data.data;
   }catch(error:any){
    const errorMessage = error.response?.data?.message || "Failed to create comment";
    throw errorMessage;
   }
}


