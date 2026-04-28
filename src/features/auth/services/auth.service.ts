import api from "../../../lib/api";

const AUTHENDPOINT = "/auth";

export const login = async (
    data : {
            email: string | undefined,
            password: string | undefined
        }
)=>{
    try{
        const response = await api.post(`${AUTHENDPOINT}/login`, data);
        return response;
    } catch (error) {
        console.error("Login error:", error);
        throw error;
    }
}

export const logout = async ()=>{
    try{
        const response = await api.post(`${AUTHENDPOINT}/logout`);
        return response;
    } catch (error) {
        console.error("Logout error:", error);
        throw error;
    }

}