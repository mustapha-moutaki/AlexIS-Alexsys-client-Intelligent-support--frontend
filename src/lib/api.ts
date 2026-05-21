import { getToken, saveToken, removeToken } from "./auth";
import axios from "axios";

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL,
    headers: {
        "Content-Type": "application/json",
    },
    withCredentials: true,// this is important for the refresh token to be sent automatically
});

// request interceptor (future JWT)
api.interceptors.request.use(
    (config) => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    }
);

// response interceptor (error handling)
let isRefreshing = false;// if the refreshing process is already running
let failedQueue: any[] = []; // queue of failed requests
api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        const isRefreshRequest = originalRequest?.url?.includes("/auth/refresh");// to avaoind sending multiple refresh requests

        // check if the request is 401 and it is not a retry request means access token is expired
        if (
            error.response?.status === 401 &&
            !originalRequest._retry &&
            !isRefreshRequest
        ) {
            if (isRefreshing) {
                return new Promise((resolve) => {
                    failedQueue.push(() => resolve(api(originalRequest)));
                }); // if the refresh is already running, add the request to the queue to be executed after the refresh
            }

            originalRequest._retry = true;// mark the request as retry
            isRefreshing = true;// start the refresh process

            try {
                // we don't send anything to the refresh endpoint it uses the stored cookies 
                // browser send refreshToken form thee httpOnly cookies 
                const res = await api.post("/auth/refresh");

                const newToken = res.data.accessToken;// get new token

                saveToken(newToken);

                // update the token in the default headers and the original request headers
                api.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
                originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

                // execute all the queued requests with the new token
                failedQueue.forEach((cb) => cb());
                failedQueue = [];
            } catch (err) {
                removeToken();
                window.location.href = "/login";
                return Promise.reject(err);
            } finally {
                isRefreshing = false;
            }

            return api(originalRequest);
        }

         // =========================
        // GLOBAL ERROR HANDLING
        // =========================

        if (!isRefreshRequest) {
            // If we get a 401 and it wasn't caught by the refresh logic (e.g., retry failed), force logout
            if (error.response?.status === 401) {
                removeToken();
                window.location.href = "/login";
            }

            // if (error.response?.status === 404) {
            //     window.location.href = "/404";
            // }

            // if (error.response?.status >= 500) {
            //     window.location.href = "/500";
            // }

            if ((error.response?.status) === 403) {
                window.location.href = "/403";
            }
        }

        return Promise.reject(error);
    }
);
export default api;