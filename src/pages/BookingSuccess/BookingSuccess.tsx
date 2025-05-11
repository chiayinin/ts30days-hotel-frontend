import { useContext, useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import { getUser, getOrderDetail } from '@apis';
import { RoomFacilityInfo } from '@components'
import { Facility, BookingType } from '@types';
import { KEY_TOKEN, getFromStorage, GlobalContext } from '@core';
import line2IMG from '@assets/images/home-line2.png';

const MainContent = ({name, phone, email}: {name: string, phone: string, email: string}) => {
  return (<>
    <section className="space-y-10 md:space-y-20 text-neutral-0 text-body">
      <div className="border-b border-primary-40 pb-8 md:pb-20">
        <div className="mb-8 md:mb-10 flex flex-col md:flex-row gap-y-4 md:gap-x-10 justify-start md:items-center">
          <span className="material-symbols-outlined bg-success-100 text-neutral-0 p-2  rounded-full w-10 h-10 md:w-14 md:h-14 md:text-[40px]">
            check
          </span>
          <h3 className="h3 md:h1 leading-normal">恭喜，{name}！<br />您已預訂成功</h3>
        </div>
        <p className="text-neutral-40">我們已發送訂房資訊及詳細內容至你的電子信箱，入住時需向櫃檯人員出示訂房人證件。</p>
      </div>
      <div className="border-b border-primary-40 pb-8 md:pb-20">
        <div>
          <h5 className="mb-6 text-title md:h5">立即查看你的訂單紀錄</h5>
          <Link to={'/member'} className="btn-primary w-full text-center text-title">前往我的訂單</Link>
        </div>
      </div>
      <div>
        <h5 className="h5 mb-8 md:mb-10">訂房人資訊</h5>
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

const CardContent = ({orderUserId, imageUrl, roomName, days, peopleNum, startDate, endDate, price, facilityInfo, amenityInfo, className}: {orderUserId:string, imageUrl:string, roomName:string, days:number, peopleNum:number, startDate:string, endDate:string, price:number, facilityInfo:Facility[], amenityInfo:Facility[], className?:string}) => {
  const roomFacilityInfoStyle = 'border border-neutral-40 rounded-lg';

  return(<>
    <div className={`rounded-[20px] p-4 md:p-10 space-y-6 md:space-y-10 bg-neutral-0 text-neutral-80 text-subtitle md:text-title ${className}`}>
      <div>
        <p className="text-body2 md:text-body mb-2">預訂參考編號： {orderUserId}</p>
        <h5 className="text-title md:h5 text-neutral-100">即將來的行程</h5>
      </div>
      <figure className="w-full h-40 md:h-60">
        {/* 320*150 */}
        <img src={imageUrl} alt={roomName} className="h-full w-full rounded-lg object-cover object-center"/>
      </figure>
      <div className="space-y-6 pb-6 md:pb-10 border-b border-neutral-40">
        <h6>{roomName}，{days} 晚<span className="border border-neutral-60 rounded-lg  inline-block mx-4 h-[18px] align-sub"></span>住宿人數：{peopleNum}位</h6>
        <div>
          <p className="text-style-primary mb-2">入住：{startDate}，15:00 可入住</p>
          <p className="text-style-secondary">退房：{endDate}，12:00 前退房</p>
        </div>
        <p>NT$ {price * days}</p>
      </div>
      <div className="pb-6 mb:pb-10 border-b border-neutral-40">
        <h3 className="text-style-primary text-neutral-100 mb-6">房內設備</h3>
        <RoomFacilityInfo list={facilityInfo} className={roomFacilityInfoStyle} />
      </div>
      <div>
        <h3 className="text-style-primary text-neutral-100 mb-6">備品提供</h3>
        <RoomFacilityInfo list={amenityInfo} className={roomFacilityInfoStyle} />
      </div>
    </div>
  </>)
}

const BookingSuccess = () => {
  const { dispatch } = useContext(GlobalContext);
  const token = getFromStorage(KEY_TOKEN, 'COOKIE');
  const {id} = useParams();
  const [orderDetailData, setOrderDetailData] = useState<BookingType>({} as BookingType);

  useEffect(() => {
    // 要登入 token，未登入要轉跳 login
    // 要加 loading
    if (token) {
      const fetchUser = async () => {
        try {
          // 驗證是否有 token
          const user = await getUser(token);
          await dispatch({ type: 'SET_USER', payload: user });

          // 取得訂單資訊
          const orderData = await getOrderDetail(id ?? '');
          await setOrderDetailData(orderData);

          await dispatch({
            type: 'SET_TOAST',
            payload: {
              severity: 'success',
              summary: '已登入',
              detail: '已登入',
              display: true,
            },
          });
        } catch (error) {
          console.error('獲取資訊失敗:', error);
        }
      };

      fetchUser();
    }
  }, [dispatch, token, id]);

  if(!orderDetailData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無此房間訂單</h2>
      </div>
    )
  }

  return (<>
  <div className="bg-neutral-bg">
    <div className="container py-10 flex flex-col md:flex-row gap-[60px] md:justify-between">
      {orderDetailData && orderDetailData.userInfo && (
        <MainContent
          name={orderDetailData.userInfo.name}
          phone={orderDetailData.userInfo.phone}
          email={orderDetailData.userInfo.email}
        />
      )}
      <CardContent
        orderUserId={orderDetailData.orderUserId}
        imageUrl={orderDetailData?.roomId?.imageUrl ?? ''}
        roomName={orderDetailData?.roomId?.name ?? ''}
        days={orderDetailData?.roomId?.status ?? 0}
        peopleNum={orderDetailData?.peopleNum ?? 0}
        startDate={orderDetailData?.checkInDate ?? ''}
        endDate={orderDetailData?.checkOutDate ?? ''}
        price={orderDetailData?.roomId?.price ?? 0}
        facilityInfo={orderDetailData?.roomId?.facilityInfo ?? []}
        amenityInfo={orderDetailData?.roomId?.amenityInfo ?? []}
        className="md:max-w-[478px]"
      />
    </div>
    <img className="bottom-0 left-0 min-h-[84px]" src={line2IMG} alt="" />
  </div>
  </>)
}

export default BookingSuccess;
