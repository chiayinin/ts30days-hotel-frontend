import axios, { isAxiosError } from 'axios';
import { getFromStorage, KEY_TOKEN } from './src/core/index';

// 設定 baseURL
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;

// 設定全域 Content-Type
axios.defaults.headers.common["Content-Type"] = "application/json";

// 設定全域 Authorization（應用啟動時）
const token = getFromStorage(KEY_TOKEN, 'COOKIE');
if (token) {
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

export default axios;
export { isAxiosError }; // 將 isAxiosError 一併導出
