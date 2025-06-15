import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { useEffect, useReducer } from 'react';

import { addLocale, locale } from 'primereact/api';
import { all as locales } from 'primelocale';

import { getFromStorage, GlobalContext, KEY_TOKEN, reducer } from '@core';
import { getUser } from '@apis';
import { MyToast } from '@components';
import { Loader } from '@components';

// style
import "primereact/resources/themes/lara-light-cyan/theme.css";
import 'primeicons/primeicons.css';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';

const App = () => {
  const [{ user, toastPayload, isLoading }, dispatch ] = useReducer(reducer, {
    user: null,
    toastPayload: { display: false },
    isLoading: false,
  });

  // PrimeReact i18n
  const newLocale = locales['zh-TW'];
  addLocale('zh-TW', newLocale);
  locale('zh-TW');

  useEffect(() => {
    const token = getFromStorage(KEY_TOKEN, 'COOKIE');

    if(token) {
      const fetchUSer = async () => {
        try {
          const user = await getUser(token);

          dispatch({type: 'SET_USER', payload: user});
          dispatch({
            type: 'SET_TOAST',
            payload: {
              severity: 'success',
              summary: '已登入',
              detail: '已登入',
              display: true,
            },
          });
        } catch(err) {
          console.log('get iser err', err);
        }
      };
      fetchUSer();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{user, toastPayload, isLoading, dispatch}}>
      <Loader />
      <RouterProvider router={router} />
      <MyToast />
    </GlobalContext.Provider>
  )
}

export default App
