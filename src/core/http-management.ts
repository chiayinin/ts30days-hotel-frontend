import { KEY_TOKEN, storeInStorage } from './storage-management.ts';
import axios from 'axios';

/**
 * API 回應的格式
 */
export type APIResponseDIO<T> = {
  status: boolean;
  token: string;
  message: string;
  result: T;
};

/**
 * HTTP 請求的方式
 */
export type HTTPMethod = 'get' | 'post' | 'put' | 'delete';

/**
 * 發送 HTTP 請求
 * @param method HTTP 請求的方法
 * @param url 要發送的請求的路徑
 * @param param 要傳送的參數
 * @param token 要傳送的 token
 * @returns
 */
export const fetchData = async <T = unknown>(
  method: HTTPMethod,
  url: string,
  params?: unknown,
  token?: string
) => {
  if(token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios[method](`/api/${url}`, params ? JSON.stringify(params) : undefined);
    const data = (await response?.data) as APIResponseDIO<T>;

    if(!data.status) throw new Error(data.message);
    if(data.token) storeInStorage(KEY_TOKEN, data.token, 'COOKIE');

    return data.result;
  } catch (err) {
    const error =err as Error;
    throw new Error(`HTTP error: ${error.message}`);
  }
}
