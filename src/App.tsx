import { RouterProvider } from 'react-router-dom';
import { router } from './app-routing';
import { PrimeReactProvider } from 'primereact/api';
import { useEffect, useReducer } from 'react';
import { getFromStorage, GlobalContext, KEY_TOKEN, reducer } from '@core';
import { getUser } from '@apis';

import { MyToast } from '@components';

// style
import Tailwind from 'primereact/passthrough/tailwind';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-fade';


const App = () => {
  const [{ user, toastPayload }, dispatch ] = useReducer(reducer, {
    user: null,
    toastPayload: { display: false }
  });

  useEffect(() => {
    const token = getFromStorage(KEY_TOKEN, 'COOKIE');

    console.log('token:', token);

    if(token) {
      getUser(token).then(user => {
        dispatch({type: 'SET_USER', payload: user});
      }).catch(err => {
        console.log('get iser err', err);

      })
    }
  });

  return (
    <GlobalContext.Provider value={{user, toastPayload, dispatch}}>
      <PrimeReactProvider value={{ unstyled: true, pt: Tailwind }}>
        <RouterProvider router={router}>
        </RouterProvider>
        <MyToast />
      </PrimeReactProvider>

    </GlobalContext.Provider>
  )
}

export default App
