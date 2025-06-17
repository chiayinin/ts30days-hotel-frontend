import { useState, useRef, useEffect } from 'react';
import { BookingType } from '@types';
import { RoomFacilityInfo, ConfirmationDialog } from '@components';

const MainContent = ({className, data, onDeleted}: {
  className?:string,
  data: BookingType,
  onDeleted: () => void
}) => {
  const roomFacilityInfoStyle = 'border border-neutral-40 rounded-lg';

  const confirmDialogRef = useRef<{ showConfirm: (id: string) => void } | null>(null);
  const handleConfirm = () => {
    if(confirmDialogRef.current) confirmDialogRef.current.showConfirm(data._id);
  }

  return(<>
    <div className={`rounded-[20px] p-4 md:p-10 space-y-6 md:space-y-10 bg-neutral-0 text-neutral-80 text-subtitle md:text-title ${className}`}>
      <div>
        <p className="text-body2 md:text-body mb-2">預訂參考編號： {data._id}</p>
        <h5 className="text-title md:h5 text-neutral-100">即將來的行程</h5>
      </div>
      <figure className="w-full h-40 md:h-60">
        {/* 320*150 */}
        <img src={data.roomId.imageUrl} alt={data.roomId.name} className="h-full w-full rounded-lg object-cover object-center"/>
      </figure>
      <div className="space-y-6 pb-6 md:pb-10 border-b border-neutral-40">
        <h6>{data.roomId.name}，{data.diffDays} 晚<span className="border border-neutral-60 rounded-lg  inline-block mx-4 h-[18px] align-sub"></span>住宿人數：{data.peopleNum}位</h6>
        <div>
          <p className="text-style-primary mb-2">入住：{data.checkInDate}，15:00 可入住</p>
          <p className="text-style-secondary">退房：{data.checkOutDate}，12:00 前退房</p>
        </div>
        <p>NT$ {data.roomId.price * (data.diffDays ?? 1)}</p>
      </div>
      <div className="pb-6 mb:pb-10 border-b border-neutral-40">
        <h3 className="text-style-primary text-neutral-100 mb-6">房內設備</h3>
        <RoomFacilityInfo list={data.roomId.facilityInfo} className={roomFacilityInfoStyle} />
      </div>
      <div>
        <h3 className="text-style-primary text-neutral-100 mb-6">備品提供</h3>
        <RoomFacilityInfo list={data.roomId.amenityInfo} className={roomFacilityInfoStyle} />
      </div>
      <button className="btn-secondary w-full" onClick={handleConfirm}>取消預定</button>
      <ConfirmationDialog ref={confirmDialogRef} onDeleted={onDeleted} />
    </div>
  </>)
}

const HistoryContent = ({data, className, onSelectOrder, selectId}:{data: BookingType[], className?:string; onSelectOrder: (order: BookingType) => void; selectId:string}) => {
  const selectIdStyle = 'outline outline-neutral-60/30 shadow-lg bg-primary-10/50';

  // Pagination
  const itemsPerPage = 3; // 每次載入的數量
  const [visibleData, setVisibleData] = useState(data.slice(0, itemsPerPage));
  const [nextIndex, setNextIndex] = useState(itemsPerPage);

  const loadMore = () => {
    if(nextIndex >= data.length) return;

    const newData = data.slice(nextIndex, nextIndex + itemsPerPage);
    setVisibleData((prev) => [...prev, ...newData]);
    setNextIndex(nextIndex + itemsPerPage);
  };

  return(<>
    <div className={`rounded-[20px] p-4 md:p-10 space-y-6 md:space-y-10 bg-neutral-0 text-neutral-80 text-body2 md:text-body ${className}`}>
      <div>
        <h5 className="text-title md:h5 text-neutral-100">歷史訂單</h5>
      </div>
      <div className="space-y-6 md:space-y-10">
        {/* 迴圈 */}
        {visibleData.map((order, index) => (
          <div key={`${order._id}-${index}`} className={`p-1 pb-6 md:pb-10 border-b border-neutral-40 flex flex-col md:flex-row gap-6 cursor-pointer hover:shadow-lg hover:bg-primary-10/50 rounded active:bg-primary-40 ${selectId === order._id ? selectIdStyle : ''}`}
          onClick={() => onSelectOrder(order)}
          >
            <figure className="w-[120px] h-20">
              <img src={order.roomId.imageUrl} alt={order.roomId.name} className="h-full w-full rounded-lg object-cover object-center"/>
            </figure>
            <div className="space-y-4">
              <p>預訂參考編號： {order._id}</p>
              <h6 className="text-subtitle md:text-title">{order.roomId.name}</h6>
              <div>
                <p className="mb-2">住宿天數：{order.diffDays}晚</p>
                <p>住宿人數：{order.peopleNum}位</p>
              </div>
              <div>
                <p className="text-style-primary mb-2">入住：{order.checkInDate}，15:00 可入住</p>
                <p className="text-style-secondary">退房：{order.checkOutDate}，12:00 前退房</p>
              </div>
              <p className="text-subtitle md:text-title">NT$ {order.roomId.price * (order.diffDays ?? 1)}</p>
            </div>
          </div>
        ))}
        {/* button */}
        <button
        onClick={loadMore}
        disabled={nextIndex >= data.length}
        className={`btn-secondary w-full
        ${nextIndex >= data.length ? 'btn-secondary-disable' : ''}`}>{nextIndex >= data.length ? '已經到最底囉' : '查看更多'}
          <span className="material-symbols-outlined align-bottom">keyboard_arrow_down</span>
        </button>
      </div>
    </div>
  </>)
}

const UserOrder = ({data}: {data:BookingType[]}) => {
  const [orderList, setOrderList] = useState<BookingType[]>(data);
  const [orderDetailData, setOrderDetailData] = useState<BookingType>(data[0] as BookingType);

  useEffect(() => {
    setOrderList(data);
    setOrderDetailData(data[0]);
  }, [data]);

  const handleDeleted = () => {
    const updatedList = orderList.filter(order => order._id !== orderDetailData._id);
    setOrderList(updatedList);

    if(updatedList.length > 0) setOrderDetailData(updatedList[0]);
  }

  if(!orderList || !orderDetailData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無訂單資料</h2>
      </div>
    )
  }

  return(
    <div className="flex flex-col gap-6 lg:flex-row mt-10 md:mt-20">
      <MainContent
        key={orderDetailData._id}
        data={orderDetailData}
        className="w-full animate-fadein"
        onDeleted={handleDeleted}
      />
      <HistoryContent
        data={orderList}
        className="lg:max-w-[527px]"
        onSelectOrder={setOrderDetailData}
        selectId={orderDetailData._id}
      />
    </div>
  )
};

export default UserOrder;
