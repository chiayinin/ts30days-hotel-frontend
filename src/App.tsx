import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { useEffect, useReducer } from 'react';

import { addLocale, locale } from 'primereact/api';
import { zh_TW } from 'primelocale/js/zh_TW.js';

import { getFromStorage, GlobalContext, KEY_TOKEN, reducer } from '@core';
import { getUser } from '@apis';
import { MyToast } from '@components';
import { Loader } from '@components';

import { Suspense } from 'react';

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

  addLocale('zh-TW', zh_TW);
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
          console.log('get user err', err);
        }
      };
      fetchUSer();
    }
  }, []);

  return (
    // <GlobalContext.Provider value={{user, toastPayload, isLoading, dispatch}}>
    //   {/* <PrimeReactProvider> */}
    //     <Loader />
    //     <RouterProvider router={router} />
    //     <MyToast />
    //   {/* </PrimeReactProvider> */}
    // </GlobalContext.Provider>
    <GlobalContext.Provider value={{user, toastPayload, isLoading, dispatch}}>
      <Suspense fallback={<Loader />}>
        {/* <Loader /> */}
        <RouterProvider router={router} />
        <MyToast />
      </Suspense>
    </GlobalContext.Provider>
      )
}

export default App
