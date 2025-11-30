import axios from 'axios';

const BASE_URL = "https://docai-backend-nnvs.onrender.com/api";
const LOCAL_BASE_URL = "http://127.0.0.1:8000/api";

const axiosInstance = axios.create({
  baseURL: BASE_URL,
});


// Request interceptor to add token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor: on 401, clear token and redirect to login
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/";
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
