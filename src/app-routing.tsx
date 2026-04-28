import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { getRoomsData, getRoomDetail, loginGuard } from './apis/index';

// 頁面元件
const Layout = lazy(() => import("./pages/Layout/Layout"));
const Home = lazy(() => import("./pages/Home/Home"));
const Login = lazy(() => import("./pages/Login/Login"));
const Signup = lazy(() => import("./pages/Signup/Signup"));
const RoomMain = lazy(() => import("./pages/RoomMain/RoomMain"));
const RoomDetail = lazy(() => import("./pages/RoomDetail/RoomDetail"));
const Booking = lazy(() => import("./pages/Booking/Booking"));
const BookingSuccess = lazy(() => import("./pages/BookingSuccess/BookingSuccess"));
const AccountLayout = lazy(() => import("./pages/AccountLayout/AccountLayout"));
const Member = lazy(() => import("./pages/Member/Member"));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '',
        // loader: async () => axios.all([ getNewsData(), getRoomsData(), getFoodsData() ]),
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
  // {
  //   path: '*',
  //   element: <NotFound />
  // }
], {
  basename: '/',
})
