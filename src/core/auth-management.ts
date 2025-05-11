import { KEY_TOKEN, getFromStorage, GlobalContext } from '@core';
import { getUser } from '@apis';
import { useContext, useEffect } from 'react';


export const useFetchUserFromToken = () => {
  const { dispatch } = useContext(GlobalContext);

  useEffect(() => {
    const token = getFromStorage(KEY_TOKEN, 'COOKIE');
    console.log('useFetchUserFromToken');

    if (token) {
      const fetchUser = async () => {
        try {
          const user = await getUser(token);
          dispatch({ type: 'SET_USER', payload: user });
          dispatch({
            type: 'SET_TOAST',
            payload: {
              severity: 'success',
              summary: '已登入',
              detail: '已登入',
              display: true,
            },
          });
        } catch (err) {
          console.error('獲取使用者資訊失敗:', err);
        }
      };

      fetchUser();
    }
  }, [dispatch]);
};
