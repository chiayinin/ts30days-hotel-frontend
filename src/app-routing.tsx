import { createBrowserRouter } from "react-router-dom";

// 頁面元件
import Layout from "./pages/Layout/Layout";


export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
  }
])
