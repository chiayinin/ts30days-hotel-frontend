import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { PrimeReactProvider } from 'primereact/api';
import { useEffect, useReducer } from 'react';
import { getFromStorage, GlobalContext, KEY_TOKEN, reducer } from '@core';
import { getUser } from '@apis';
import { MyToast } from '@components';
import { Loader } from '@components';

// style
import "primereact/resources/themes/lara-light-cyan/theme.css";
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

  useEffect(() => {
    const token = getFromStorage(KEY_TOKEN, 'COOKIE');

    if(token) {
      const fetchUSer = async () => {
        try {
          const user = await getUser(token);
          dispatch({type: 'SET_USER', payload: user});
        } catch(err) {
          console.log('get iser err', err);
        }
      };

      fetchUSer();
    }
  }, []);

  return (
    <GlobalContext.Provider value={{user, toastPayload, isLoading, dispatch}}>
      <PrimeReactProvider>
        <Loader />
        <RouterProvider router={router} />
        <MyToast />
      </PrimeReactProvider>
    </GlobalContext.Provider>
  )
}

export default App
