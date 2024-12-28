import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import { getNewsData, getRoomsData, getFoodsData } from './apis/index';


// 頁面元件
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        // loader: async () => getNewsData(),
        loader: async () => axios.all([ getNewsData(), getRoomsData(), getFoodsData() ]),
        element: <Home />,
      },
    ]
  }
])
