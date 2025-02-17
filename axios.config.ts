import axios, { AxiosInstance, isAxiosError } from 'axios';

const instance: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  // timeout: 5000,
  headers: { 'Content-Type': 'application/json' }// 全局設置 Content-Type 為 application/json }
})

export default instance;
export { isAxiosError }; // 將 isAxiosError 一併導出
