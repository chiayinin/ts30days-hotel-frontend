import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import { getNewsData, getRoomsData, getFoodsData, loginGuard } from './apis/index';

// 頁面元件
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import RoomMain from "./pages/RoomMain/RoomMain";

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
      {
        path: '/room',
        loader: async () => getRoomsData(),
        element: <RoomMain />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    loader: loginGuard
  },
  {
    path: '/signup',
    element: <Signup />,
    loader: loginGuard
  }
])
