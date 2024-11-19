import axios from 'axios';
import {getUser} from "../service/AuthService";

const axiosInstance = axios.create();

// リクエストインターセプターを追加
axiosInstance.interceptors.request.use(
  async (config) => {
    const user = await getUser();
    if (user && user.access_token) {
      config.headers.Authorization = `Bearer ${user.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
