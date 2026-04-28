import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});

// request interceptor (future JWT)
api.interceptors.request.use(
    (config) =>{
        const token  = localStorage.getItem("token");

        if(token){
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    } 
);

// response interceptor (error handling)
api.interceptors.response.use(
    (response)=> response,
    (error)=>{
        console.log("API Error:", error?.response?.data || error.message || error);
        return Promise.reject(error);
    }
);

export default api;