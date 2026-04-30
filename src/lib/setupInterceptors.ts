import api from "./api";
import refreshApi from "./refreshApi";
import { getToken, saveToken, removeToken } from "./auth";

let isRefreshing = false;
let failedQueue: any[] = [];

const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else p.resolve(token);
  });

  failedQueue = [];
};

export const setupInterceptors = () => {
  // ---------------------------
  // REQUEST INTERCEPTOR
  // ---------------------------
  api.interceptors.request.use((config) => {
    const token = getToken();

    if (token) {
      // IMPORTANT FIX (Axios v1 safe way)
      config.headers = config.headers ?? {};
      (config.headers as any).Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // ---------------------------
  // RESPONSE INTERCEPTOR
  // ---------------------------
  api.interceptors.response.use(
    (response) => response,

    async (error) => {
      const originalRequest = error.config;

      if (
        (error.response?.status === 401 || error.response?.status === 403) &&
        !originalRequest._retry
      ) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          }).then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return api(originalRequest);
          });
        }

        originalRequest._retry = true;
        isRefreshing = true;

        try {
          const res = await refreshApi.post("/auth/refresh");

          const newToken = res.data.accessToken;

          saveToken(newToken);

          processQueue(null, newToken);

          originalRequest.headers.Authorization = `Bearer ${newToken}`;

          return api(originalRequest);
        } catch (err) {
          processQueue(err, null);
          removeToken();
          window.location.href = "/login";
          return Promise.reject(err);
        } finally {
          isRefreshing = false;
        }
      }

      return Promise.reject(error);
    }
  );
};