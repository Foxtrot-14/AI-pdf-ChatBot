import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
  baseURL: "http://127.0.0.1:8080/", 
  timeout: 1000, 
  headers: { "Content-Type": "application/json" },
});
export default axiosInstance;
