import { useEffect, useState, useRef } from 'react';
import { Facility, BookingType } from '@types';
import { RoomFacilityInfo, ConfirmationDialog } from '@components';

const MainContent = ({orderUserId, imageUrl, roomName, days, peopleNum, startDate, endDate, price, facilityInfo, amenityInfo, className}: {orderUserId:string, imageUrl:string, roomName:string, days:number, peopleNum:number, startDate:string, endDate:string, price:number, facilityInfo:Facility[], amenityInfo:Facility[], className?:string}) => {
  const roomFacilityInfoStyle = 'border border-neutral-40 rounded-lg';

  const confirmDialogRef = useRef(null);
  const handleConfirm = () => {
    if(confirmDialogRef.current) confirmDialogRef.current.showConfirm();
  }

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
      <button className="btn-secondary w-full" onClick={handleConfirm}>取消預定</button>
      <ConfirmationDialog ref={confirmDialogRef} />
    </div>
  </>)
}

const HistoryContent = ({data, days, className}:{data: BookingType[], days:number, className?:string}) => {
// const HistoryContent = ({data, orderUserId, imageUrl, roomName, days, peopleNum, startDate, endDate, price, className}: {data:BookingType[], orderUserId:string, imageUrl:string, roomName:string, days:number, peopleNum:number, startDate:string, endDate:string, price:number, className?:string}) => {


  return(<>
    <div className={`rounded-[20px] p-4 md:p-10 space-y-6 md:space-y-10 bg-neutral-0 text-neutral-80 text-body2 md:text-body ${className}`}>
      <div>
        <h5 className="text-title md:h5 text-neutral-100">歷史訂單</h5>
      </div>
      <div className="space-y-6 md:space-y-10">
        {/* 迴圈 card */}
        {/* <div className="pb-6 md:pb-10 border-b border-neutral-40 flex flex-col md:flex-row gap-6">
          <figure className="w-[120px] h-20"> */}
            {/* 320*150 */}
            {/* <img src={imageUrl} alt={roomName} className="h-full w-full rounded-lg object-cover object-center"/>
          </figure>
          <div className="space-y-4">
            <p>預訂參考編號： {orderUserId}</p>
            <h6 className="text-subtitle md:text-title">{roomName}</h6>
            <div>
              <p className="mb-2">住宿天數：{days}晚</p>
              <p>住宿人數：{peopleNum}位</p>
            </div>
            <div>
              <p className="text-style-primary mb-2">入住：{startDate}，15:00 可入住</p>
              <p className="text-style-secondary">退房：{endDate}，12:00 前退房</p>
            </div>
            <p className="text-subtitle md:text-title">NT$ {price * days}</p>
          </div>
        </div> */}
        {/* 測試迴圈 */}
        {data.map((order, index) => (
          <div key={`${order._id}-${index}`} className="pb-6 md:pb-10 border-b border-neutral-40 flex flex-col md:flex-row gap-6">
            <figure className="w-[120px] h-20">
              <img src={order.roomId.imageUrl} alt={order.roomId.name} className="h-full w-full rounded-lg object-cover object-center"/>
            </figure>
            <div className="space-y-4">
              <p>預訂參考編號： {order.orderUserId}</p>
              <h6 className="text-subtitle md:text-title">{order.roomId.name}</h6>
              <div>
                <p className="mb-2">住宿天數：{days}晚</p>
                <p>住宿人數：{order.peopleNum}位</p>
              </div>
              <div>
                <p className="text-style-primary mb-2">入住：{order.checkInDate}，15:00 可入住</p>
                <p className="text-style-secondary">退房：{order.checkOutDate}，12:00 前退房</p>
              </div>
              <p className="text-subtitle md:text-title">NT$ {order.roomId.price * days}</p>
            </div>
          </div>
        ))}
        {/* button */}
        <button className="btn-secondary w-full">查看更多
          <span className="material-symbols-outlined align-bottom">keyboard_arrow_down</span>
        </button>
      </div>
    </div>
  </>)
}

const UserOrder = ({data}: {data:BookingType[]}) => {
  const [orderDetailData, setOrderDetailData] = useState<BookingType>({} as BookingType);

  useEffect(() => {
    const demoData =
      {
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
      };
    setOrderDetailData(demoData);

  }, [])

  if(!orderDetailData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無此房間訂單</h2>
      </div>
    )
  }

  return(
    <div className="flex flex-col gap-6 lg:flex-row mt-10 md:mt-20">
      <MainContent
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
        className="w-full"
      />
      <HistoryContent
        data={data}
        orderUserId={orderDetailData.orderUserId}
        imageUrl={orderDetailData?.roomId?.imageUrl ?? ''}
        roomName={orderDetailData?.roomId?.name ?? ''}
        days={orderDetailData?.roomId?.status ?? 0}
        peopleNum={orderDetailData?.peopleNum ?? 0}
        startDate={orderDetailData?.checkInDate ?? ''}
        endDate={orderDetailData?.checkOutDate ?? ''}
        price={orderDetailData?.roomId?.price ?? 0}
        className="lg:max-w-[527px]"
      />
    </div>
  )
};

export default UserOrder;
