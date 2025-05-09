/**
 * Token 的 key 值
 */
export const KEY_TOKEN = 'token';

/**
 * 儲存資料到 sessionStorage 或 localStorage
 *
 * @param key 要儲存的資料的 Key 值
 * @param value 要儲存的資料
 * @param type 把資料儲存到哪裡，預設為 SessionStorage
 */
export const storeInStorage = <T = string>(
  key: string,
  value: T,
  type: 'SESSION' | 'LOCAL' | 'COOKIE' = 'SESSION',
  days: number = 7
) => {
  const strValue = JSON.stringify(value);

  switch (type) {
    case 'SESSION':
      sessionStorage.setItem(key, strValue);
      break;
    case 'LOCAL':
      localStorage.setItem(key, strValue);
      break;
    case 'COOKIE': {
      // 將 token 儲存在 cookie
      const expired =  new Date(Date.now() + (days * 24 * 60 * 60 * 1000)).toUTCString();
      document.cookie = `hotelToken=${strValue}; expires=${expired};`
      console.log('成功儲存 token')
      break;
    }
  }
}

/**
 * 從 sessionStorage | localStorage | cookie 取得資料
 * @param kdy 要取得的資料的 key 值
 * @param type 從哪裡取得資料，預設為 SessionStorage
 * @returns 取得的資料
 */
export const getFromStorage = <T = string>(
  key: string,
  type: 'SESSION' | 'LOCAL' | 'COOKIE' = 'SESSION',
): T | null => {
  if(!key) {
    throw new Error("Key is null or undefined.");
    return null;
  }

  let value: string | null = null;

  switch (type) {
    case 'SESSION':
      value = sessionStorage.getItem(key);
      break;
    case 'LOCAL':
      value = localStorage.getItem(key);
      break;
    case 'COOKIE':
      value = document.cookie.replace(/(?:(?:^|.*;\s*)hotelToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
      break;
  };

  return value ? (JSON.parse(value) as T) : null;
};

/**
 * 從 sessionStorage | localStorage | cookie 刪除指定的資料
 * @param key 要移除的資料的 key 值
 * @param type 從哪裡移除資料，預設為 SessionStorage
 */
export const removeFromStorage = (
  key: string,
  type: 'SESSION' | 'LOCAL' | 'COOKIE' = 'SESSION'
) => {
  switch (type) {
    case 'SESSION':
      sessionStorage.removeItem(key);
      break;
    case 'LOCAL':
      localStorage.removeItem(key);
      break;
    case 'COOKIE':
      document.cookie = 'hotelToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      break;
  }
};

/**
 * 清空 sessionStorage | localStorage | cookie 的資料
 * @param type 清空哪裡的資料，預設為 SessionStorage
 */
export const clearStorage = (
  type: 'SESSION' | 'LOCAL' | 'COOKIE' = 'SESSION'
) => {
  switch (type) {
    case 'SESSION':
      sessionStorage.clear();
      break;
    case 'LOCAL':
      localStorage.clear();
      break;
    case 'COOKIE':
      document.cookie = 'hotelToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      break;
  }
};
