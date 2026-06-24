import api from "@/src/lib/api";
import { ApiResponse } from "@/src/types/ApiResponse";


const ENDPOINT = "/ai/chat";

export const sendMessage = async (message: string): Promise<string> => {
 const res = await api.post(`${ENDPOINT}`, {
  question: message,
});
  const body = res.data;
  const reply = body?.reply ?? body?.data?.reply ?? body?.data ?? null;
  if (!reply) throw new Error(`Unexpected shape: ${JSON.stringify(body)}`);
  return String(reply);
};
