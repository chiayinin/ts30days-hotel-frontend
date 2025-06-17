import { createBrowserRouter } from "react-router-dom";
import axios from "axios";

import { getNewsData, getRoomsData, getRoomDetail, getFoodsData, loginGuard } from './apis/index';

// 頁面元件
import Layout from "./pages/Layout/Layout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import RoomMain from "./pages/RoomMain/RoomMain";
import RoomDetail from "./pages/RoomDetail/RoomDetail";
import Booking from "./pages/Booking/Booking";
import BookingSuccess from "./pages/BookingSuccess/BookingSuccess";
import AccountLayout from "./pages/AccountLayout/AccountLayout";
import Member from "./pages/Member/Member";
import NotFound from './pages/NotFound/NotFound';

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
      {
        path: '/room/:id',
        loader: async ({ params }) => getRoomDetail(params.id ?? ''),
        element: <RoomDetail />,
      },
      {
        path: '/booking/:id',
        loader: async ({ params }) => getRoomDetail(params.id ?? ''),
        element: <Booking />,
        // search: `?startDate=${queryStartDate}&endDate=${queryEndDate}&bookingPeople=${bookingPeople}&diffDays=${diffDays}
      },
      {
        path: '/bookingsuccess/:id',
        element: <BookingSuccess />,
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
  },
  {
    path: '/account',
    element: <AccountLayout />,
    children: [
      {
        path: '',
        element: <Member />,
      },
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
])
