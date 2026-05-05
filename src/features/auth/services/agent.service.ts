import api from "@/src/lib/api";
import { AgentCreateRequest } from "@/src/types/AgentCreateRequest";

const AGENTENDPOINT = "/agents";


export const createAgent = async (data: AgentCreateRequest) => {
    try {
        const response = await api.post(`${AGENTENDPOINT}`, data);
        return response;
    } catch (error) {
        console.error("Create agent error:", error);
        throw error;
    }
}