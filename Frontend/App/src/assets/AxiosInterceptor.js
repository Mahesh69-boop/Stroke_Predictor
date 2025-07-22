
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // for accessing token & login()

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "";


const useAxios = () => {
  const { token, login } = useAuth();

  const instance = axios.create({
    baseURL: BASE_URL,
    withCredentials: true, // send cookies (for refresh token)
  });

  // Add access token to headers
  instance.interceptors.request.use(
    (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Handle expired tokens
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await axios.get(`${BASE_URL}/api/auth/refresh`, {
            withCredentials: true,
          });

          const newToken = res.data.accessToken;
          login(newToken); // update token in context

          // Retry original request with new token
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return axios(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );

  return instance;
};

export default useAxios;

