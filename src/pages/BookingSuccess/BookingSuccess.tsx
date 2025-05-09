// orderId: 680f73535e33593cbe855df5
// 要登入 token，未登入要轉跳 login
// import { useLoaderData } from "react-router-dom";
// import { BookingType } from "@types";

import { Link } from "react-router-dom";
import { RoomFacilityInfo } from '@components'
import { Facility } from '@types';
import line2IMG from '@assets/images/home-line2.png';

// const orderDetailData = {
//   "address": {
//       "zipcode": 802,
//       "detail": "文山路23號"
//   },
//   "_id": "6729b83b5653aebb60f00c20",
//   "name": "Lisa",
//   "email": "lisa@test.com",
//   "phone": "(663) 742-3828",
//   "birthday": "1982-02-04T00:00:00.000Z",
//   "createdAt": "2024-11-05T06:16:27.107Z",
//   "updatedAt": "2024-11-05T06:16:27.107Z"
// };

const orderDetailData = {
  "userInfo": {
    "address": {
      "zipcode": 802,
      "detail": "文山路23號"
    },
    "name": "Joanne Chen",
    "phone": "0912345678",
    "email": "example@gmail.com"
  },
  "_id": "653e335a13831c2ac8c389bb",
  "roomId": {
    "name": "尊爵雙人房",
    "description": "享受高級的住宿體驗，尊爵雙人房提供給您舒適寬敞的空間和精緻的裝潢。",
    "imageUrl": "https://fakeimg.pl/300/",
    "imageUrlList": [
      "https://fakeimg.pl/300/",
      "https://fakeimg.pl/300/",
      "https://fakeimg.pl/300/"
    ],
    "areaInfo": "24坪",
    "bedInfo": "一張大床",
    "maxPeople": 4,
    "price": 10000,
    "status": 1,
    "layoutInfo": [
      {
        "title": "市景",
        "isProvide": true
      }
    ],
    "facilityInfo": [
      {
        "title": "平面電視",
        "isProvide": true
      }
    ],
    "amenityInfo": [
      {
        "title": "衛生紙",
        "isProvide": true
      }
    ],
    "_id": "653e4661336cdccc752127a0",
    "createdAt": "2023-10-29T11:47:45.641Z",
    "updatedAt": "2023-10-29T11:47:45.641Z"
  },
  "checkInDate": "2023-06-17T16:00:00.000Z",
  "checkOutDate": "2023-06-18T16:00:00.000Z",
  "peopleNum": 2,
  "orderUserId": "6533f0ef4cdf5b7f762747b0",
  "status": 0,
  "createdAt": "2023-10-29T10:26:34.498Z",
  "updatedAt": "2023-10-29T10:26:34.498Z"
}

const MainContent = ({name, phone, email}: {name: string, phone: string, email: string}) => {
  return (<>
    <section className="space-y-10 text-neutral-0 text-body">
      <div className="border-b border-primary-40 pb-8">
        <div className="mb-8">
          <span className="material-symbols-outlined bg-success-100 text-neutral-0 p-2  rounded-full mb-4">
            check
          </span>
          <h3 className="h3 leading-normal">恭喜，{name}！<br />您已預訂成功</h3>
        </div>
        <p className="text-neutral-40">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>
      </div>
      <div className="border-b border-primary-40 pb-8">
        <div>
          <h5 className="mb-6">立即查看你的訂單紀錄</h5>
          <Link to={'/member'} className="btn-primary w-full text-center">前往我的訂單</Link>
        </div>
      </div>
      <div>
        <h5 className="h5 mb-8">訂房人資訊</h5>
        <ul className="space-y-6">
          <li>
            <p className="mb-2 text-neutral-40">姓名</p>
            <p className="text-title">{name}</p>
          </li>
          <li>
            <p className="mb-2 text-neutral-40">手機號碼</p>
            <p className="text-title">{phone}</p>
          </li>
          <li>
            <p className="mb-2 text-neutral-40">電子信箱</p>
            <p className="text-title">{email}</p>
          </li>
        </ul>
      </div>
    </section>
  </>)
};

const CardContent = ({orderUserId, imageUrl, roomName, days, peopleNum, startDate, endDate, price, facilityInfo, amenityInfo}: {orderUserId:string, imageUrl:string, roomName:string, days:number, peopleNum:number, startDate:string, endDate:string, price:number, facilityInfo:Facility[], amenityInfo:Facility[]}) => {
  const roomFacilityInfoStyle = 'border border-neutral-40 rounded-lg';

  return(<>
    <div className="rounded-[20px] p-4 space-y-6 bg-neutral-0 text-neutral-80 text-subtitle">
      <div>
        <p className="text-body2 mb-2">預訂參考編號： {orderUserId}</p>
        <h5 className="text-title text-neutral-100">即將來的行程</h5>
      </div>
      <figure className="w-80 h-40">
        {/* 320*150 */}
        <img src={imageUrl} alt={roomName} className="h-full w-full rounded-lg object-cover object-center"/>
      </figure>
      <div className="space-y-6 pb-6 border-b border-neutral-40">
        <h6>{roomName}，{days} 晚<span className="border border-neutral-60 rounded-lg  inline-block mx-4 h-[18px] align-sub"></span>住宿人數：{peopleNum}位</h6>
        <div>
          <p className="text-style-primary mb-2">入住：{startDate}，15:00 可入住</p>
          <p className="text-style-secondary">退房：{endDate}，12:00 前退房</p>
        </div>
        <p>NT$ {price * days}</p>
      </div>
      <div className="pb-6 border-b border-neutral-40">
        <h3 className="text-style-primary text-neutral-100 mb-6">房內設備</h3>
        <RoomFacilityInfo list={facilityInfo} style={roomFacilityInfoStyle} />
      </div>
      <div>
        <h3 className="text-style-primary text-neutral-100 mb-6">備品提供</h3>
        <RoomFacilityInfo list={amenityInfo} style={roomFacilityInfoStyle} />
      </div>
    </div>
  </>)
}

const BookingSuccess = () => {
  // order data
  // const orderDetailData = useLoaderData() as BookingType | null;

  if(!orderDetailData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無此房間訂單</h2>
      </div>
    )
  }

  return (<>
  <div className="bg-neutral-bg">
    <div className="container py-10 flex flex-col gap-[60px]">
      <MainContent
        name={orderDetailData.userInfo.name}
        phone={orderDetailData.userInfo.phone}
        email={orderDetailData.userInfo.email}
      />
      <CardContent
        orderUserId={orderDetailData.orderUserId}
        imageUrl={orderDetailData.roomId.imageUrl}
        roomName={orderDetailData.roomId.name}
        days={orderDetailData.roomId.status}
        peopleNum={orderDetailData.peopleNum}
        startDate={orderDetailData.checkInDate}
        endDate={orderDetailData.checkOutDate}
        price={orderDetailData.roomId.price}
        facilityInfo={orderDetailData.roomId.facilityInfo}
        amenityInfo={orderDetailData.roomId.amenityInfo}
      />
    </div>
    <img className="bottom-0 left-0 min-h-[84px]" src={line2IMG} alt="" />
  </div>
  </>)
}

export default BookingSuccess;
