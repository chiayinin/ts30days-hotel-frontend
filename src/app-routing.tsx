import { createBrowserRouter } from "react-router-dom";

import Home from "./pages/Home/Home";

// 頁面元件
import Layout from "./pages/Layout/Layout";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        element: <Home />
      },
    ]
  }
])
