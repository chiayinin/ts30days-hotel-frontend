import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import { getNewsData, getRoomsData, getFoodsData, loginGuard } from './apis/index';

// 頁面元件
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Singnup from "./pages/Singnup/Singnup";

export const router =  createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        loader: async () => axios.all([ getNewsData(), getRoomsData(), getFoodsData() ]),
        element: <Home />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginGuard
  },
  {
    path: '/singnup',
    element: <Singnup />,
    loader: loginGuard
  }
])
