import { KEY_TOKEN, storeInStorage } from './storage-management.ts';
import axios, { isAxiosError } from '../../axios.config.ts'; // 自定義 axios 實例

/**
 * API 回應的格式
 */
export type APIResponseDIO<T> = {
  status: boolean;
  token?: string;
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
): Promise<T> => {
  if(token) axios.defaults.headers.common.Authorization = `Bearer ${token}`;

  try {
    const response = await axios[method](`${url}`, params ? JSON.stringify(params) : undefined);
    console.log('response:', response);

    const data = response?.data as APIResponseDIO<T>;

    if(!data.status) throw new Error(data.message);
    if(data.token) storeInStorage(KEY_TOKEN, data.token, 'COOKIE');

    return data.result;
  } catch (error: unknown) {
    if (isAxiosError(error)) {
      // 處理 AxiosError
      console.dir(error)
      console.error('Axios error:', error.response?.data || error.message);
      throw new Error(error.response?.data?.message || error.message);
    } else {
      // 處理未知錯誤
      console.error('Unexpected error:', (error as Error).message);
      throw new Error((error as Error).message);
    }
  }
}
