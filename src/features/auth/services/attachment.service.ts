import api from "@/src/lib/api";
import { AttachmentResponse } from "@/src/types/AttachmentResponse";
import { ApiResponse } from "@/src/types/ApiResponse";


const ATTACHMENT_ENDPOINT = "/attachments";
export const createAttachment = async (file: File, ticketId: number) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("ticketId", ticketId.toString());
    
    const response = await api.post<ApiResponse<AttachmentResponse>>(`${ATTACHMENT_ENDPOINT}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.data;
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || "Failed to create attachment";
    throw errorMessage;
  }
};

export const uploadAttachments = async (formData: FormData) => {
  const response = await api.post(`${ATTACHMENT_ENDPOINT}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data', // Usually optional, browser does it
    },
  });
  return response.data;
};


export const getAttachmentsByTicketId = async (ticketId: number) => {
  try {
    const response = await api.get<ApiResponse<AttachmentResponse[]>>(`${ATTACHMENT_ENDPOINT}/ticket/${ticketId}`);
    return response.data.data;
  } catch (error:any) {
    const errorMessage = error.response?.data?.message || "Failed to get attachments";
    throw errorMessage;
  }
};

export const deleteAttachment = async (id: number) => {
  try {
    const response = await api.delete(`/attachments/${id}`);
    return response.data.data;
  } catch (error) {
    console.error('Error deleting attachment:', error);
    throw error;
  }
};

/**
 * Upload a single file without a ticketId.
 * Returns the attachment ID so it can be sent with ticket creation.
 */
export const uploadFileAndGetId = async (file: File): Promise<number> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await api.post<ApiResponse<AttachmentResponse>>(
    `${ATTACHMENT_ENDPOINT}`,
    formData,
    { headers: { "Content-Type": "multipart/form-data" } }
  );
  return response.data.data.id;
};