import { useState, useEffect } from "react";
import { Link, useLoaderData } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Pagination } from 'swiper/modules';
import { InputNumber, InputNumberValueChangeEvent } from 'primereact/inputnumber';
import { Calendar } from 'primereact/calendar';
import { Nullable } from "primereact/ts-helpers";

import { RoomBasicInfo } from "@components";
import { RoomFacilityInfo } from "@components";
import { Room } from "@types";

const RoomDetail = () => {
  // room data
  const roomData = useLoaderData() as Room | null;

  // Booking People inupt number
  const [bookingPeople, setBookingPeople] = useState<number>(2);
  const maxBookingPeople = roomData?.maxPeople;

  // Calendar
  const [startDate, setStartDate] = useState<Nullable<Date>>(null);
  const [endDate, setEndDate] = useState<Nullable<Date>>(null);
  const [diffDays, setDiffDays] = useState<number | null>(null);
  const minStartDate = new Date();
  const maxStartDate = !endDate ? undefined : new Date(endDate.getTime() - 24 * 60 * 60 * 1000);
  const minEndDate = !startDate ? undefined : new Date(startDate.getTime() + 24 * 60 * 60 * 1000);
  const queryStartDate = !startDate ? undefined : startDate.getTime();
  const queryEndDate = !endDate ? undefined : endDate.getTime();

  useEffect(() => {
    if (startDate && endDate) {
      const diffTime = endDate.getTime() - startDate.getTime();

      setDiffDays(Math.ceil(diffTime / (1000 * 60 * 60 * 24)));
    } else {
      setDiffDays(null);
    }
  }, [startDate, endDate]);

  if(!roomData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無此房型</h2>
      </div>
    )
  }

  return(<>
  {/* banner image */}
  <div>
    {/* banner Desktop */}
    <div className="hidden lg:block">
      <ul className="p-10 xl:p-20 grid grid-cols-4 grid-rows-2 gap-2 box-content h-72 xl:h-[600px]">
        <li className="col-span-2 row-span-2">
          <figure className="w-full h-full">
            <img src={roomData.imageUrl} alt={roomData.name} className="w-full h-full object-cover"/>
          </figure>
        </li>
        {
          roomData.imageUrlList.map((image, index) => (<li key={`${roomData._id}_${index}`}>
            <figure className="w-full h-full">
              <img src={image} alt={roomData.name} className="w-full h-full object-cover"/>
            </figure>
          </li>))
        }
      </ul>
    </div>
    {/* banner mobile */}
    <Swiper
      autoplay={{ // 自動輪播 swiper
        delay: 9999 *1000, // 每兩秒切換下一張
      }}
      loop={roomData.imageUrlList.length > 4} // 輪播結束後回到第一張繼續輪播
      effect={'fade'}
      pagination={{
        clickable: true,
      }}
      slidesPerView={4}
      modules={[Autoplay, EffectFade, Pagination]}
      className="w-full h-[240px] lg:hidden"
    >
      {roomData.imageUrlList.map((image, imageIndex) => (
        <SwiperSlide key={imageIndex} className="w-full h-full">
          <figure key={`${roomData._id}-${imageIndex}`} className="w-full h-full" >
            <img className="w-full h-full object-cover" src={image} alt=""/>
          </figure>
        </SwiperSlide>
      ))}
    </Swiper>
  </div>
  <section className="container py-10 lg:py-[120px] text-neutral-80 bg-primary-10 flex justify-between items-start gap-3">
    {/* room info */}
    <div className="max-w-[746px] space-y-6 lg:space-y-20 md:basis-2/3">
      <div>
        <h2 className="h3 lg:h1 align-middle text-neutral-100 mb-4">{roomData.name}</h2>
        <p className="text-body2 lg:text-body">{roomData.description}</p>
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房型基本資訊</h3>
        <RoomBasicInfo
          area={roomData.areaInfo}
          bed={roomData.bedInfo}
          people={roomData.maxPeople} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房間格局</h3>
        <RoomFacilityInfo list={roomData.layoutInfo} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">房內設備</h3>
        <RoomFacilityInfo list={roomData.facilityInfo} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">備品提供</h3>
        <RoomFacilityInfo list={roomData.amenityInfo} />
      </div>
      <div>
        <h3 className="text-title lg:h5 text-style-primary text-neutral-100 mb-4">訂房須知</h3>
        <ol className="list-decimal list-inside text-body2 lg:text-body">
          <li>入住時間為下午3點，退房時間為上午12點。</li>
          <li>如需延遲退房，請提前與櫃檯人員聯繫，視當日房況可能會產生額外費用。</li>
          <li>請勿在房間內抽煙，若有抽煙需求，可以使用設在酒店各樓層的專用吸煙區。</li>
          <li>若發現房間內的設施有損壞或遺失，將會按照價值收取賠償金。</li>
          <li>請愛惜我們的房間與公共空間，並保持整潔。</li>
          <li>如需額外的毛巾、盥洗用品或其他物品，請聯繫櫃檯。</li>
          <li>我們提供免費的Wi-Fi，密碼可以在櫃檯或是房間內的資訊卡上找到。</li>
          <li>請勿帶走酒店房內的物品，如有需要購買，請與我們的櫃檯人員聯繫。</li>
          <li>我們提供24小時櫃檯服務，若有任何需求或疑問，歡迎隨時詢問。</li>
          <li>為了確保所有客人的安全，請勿在走廊或公共區域大聲喧嘩，並遵守酒店的其他規定。</li>
        </ol>
      </div>
    </div>
    {/* room booking  */}
    <div className="md:basis-1/3 md:sticky md:top-[120px] fixed bottom-0 right-0 w-full">
      {/* room booking Mobile */}
      <div className="md:hidden w-full p-3 bg-neutral-0 border border-neutral-40">
        <div className="flex gap-2 mb-2">
          <div className="border border-neutral-100 rounded-lg p-2 w-1/2">
            <label htmlFor="startDateCalendar" className="text-tiny block mb-1">
              入住
            </label>
            <Calendar
              id="startDateCalendar"
              value={startDate}
              onChange={(e) => setStartDate(e.value)} dateFormat="yy/mm/dd"
              minDate={minStartDate}
              maxDate={maxStartDate}
              placeholder="請選擇入住日期"
              inputClassName="text-body2"
              locale="zh-TW"
              showButtonBar
              todayButtonClassName="hidden"
              clearButtonClassName="btn-secondary"
              panelClassName="p-8 text-title text-neutral-100"
              touchUI
            />
          </div>
          <div className="border border-neutral-100 rounded-lg p-2 w-1/2">
            <label htmlFor="endDateCalendar" className="text-tiny block mb-1">
              退房
            </label>
            <Calendar
              id="endDateCalendar"
              value={endDate}
              onChange={(e) => setEndDate(e.value)}
              dateFormat="yy/mm/dd"
              minDate={minEndDate}
              placeholder="請選擇退房日期"
              inputClassName="text-body2"
              locale="zh-TW"
              showButtonBar
              todayButtonClassName="hidden"
              clearButtonClassName="btn-secondary"
              panelClassName="p-8 text-title text-neutral-100"
              touchUI
            />
          </div>
        </div>
        <div className="mb-2 flex justify-between items-center pb-2 border-b border-neutral-40">
          <span className="text-body text-neutral-100">人數</span>
          <InputNumber
            value={bookingPeople}
            onValueChange={(e: InputNumberValueChangeEvent) => setBookingPeople(e.value ?? 2)}
            showButtons
            buttonLayout="horizontal"
            min={1}
            max={maxBookingPeople}
            decrementButtonClassName="p-2 border rounded-full border-primary-40 w-8 h-8"
            incrementButtonClassName="p-2 border rounded-full border-primary-40 w-8 h-8"
            incrementButtonIcon="pi pi-plus"
            decrementButtonIcon="pi pi-minus"
            inputClassName="focus:shadow-none focus:ring-2 focus:ring-primary-100 text-title mx-4 w-4 text-center"
          />
        </div>
        <div className="flex justify-between items-center">
          <span className="block w-1/2 text-neutral-80 text-body">NT$ {roomData.price} / {diffDays}晚 / {bookingPeople}人</span>
          <Link to="booking" className="w-1/2 text-title text-center btn-primary !p-3 cursor-pointer">立即預訂</Link>
        </div>
      </div>
      {/* room booking Desktop */}
      <div className="hidden md:block bg-neutral-0 text-neutral-80 rounded-[20px] p-5 xl:p-10 w-96 xl:w-[478px] space-y-10">
        <h3 className="h5 pb-4 border-b border-neutral-40 text-neutral-100">預訂房型</h3>
        <div>
          <h2 className="h2 align-middle mb-2">{roomData.name}</h2>
          <p className="text-body">{roomData.description}</p>
        </div>
        <div>
          <div className="flex gap-4 mb-4">
            <div className="border border-neutral-100 rounded-lg p-4">
              <label htmlFor="startDateCalendar" className="text-tiny block mb-1">
                入住（不可超過退房日）
              </label>
              <Calendar
                id="startDateCalendar"
                value={startDate}
                onChange={(e) => setStartDate(e.value)} dateFormat="yy/mm/dd"
                minDate={minStartDate}
                maxDate={maxStartDate}
                placeholder="請選擇入住日期"
                inputClassName="text-body"
                locale="zh-TW"
                showButtonBar
                todayButtonClassName="hidden"
                clearButtonClassName="btn-secondary"
                panelClassName="p-8 text-title text-neutral-100"
                touchUI
              />
            </div>
            <div className="border border-neutral-100 rounded-lg p-4">
              <label htmlFor="endDateCalendar" className="text-tiny block mb-1">
                退房（不可早於入住日）
              </label>
              <Calendar
                id="endDateCalendar"
                value={endDate}
                onChange={(e) => setEndDate(e.value)}
                dateFormat="yy/mm/dd"
                minDate={minEndDate}
                placeholder="請選擇退房日期"
                inputClassName="text-body"
                locale="zh-TW"
                showButtonBar
                todayButtonClassName="hidden"
                clearButtonClassName="btn-secondary"
                panelClassName="p-8 text-title text-neutral-100"
                touchUI
              />
            </div>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-title text-neutral-100">人數</span>
            <InputNumber
              value={bookingPeople}
              onValueChange={(e: InputNumberValueChangeEvent) => setBookingPeople(e.value ?? 2)}
              showButtons
              buttonLayout="horizontal"
              min={1}
              max={maxBookingPeople}
              decrementButtonClassName="p-4 border rounded-full border-primary-40 w-14 h-14"
              incrementButtonClassName="p-4 border rounded-full border-primary-40 w-14 h-14"
              incrementButtonIcon="pi pi-plus"
              decrementButtonIcon="pi pi-minus"
              inputClassName="focus:shadow-none focus:ring-2 focus:ring-primary-100 h6 mx-4 w-4 text-center"
            />
          </div>
        </div>
        <span className="block h5 text-primary-100">NT$ {roomData.price}</span>
        <Link to={{
          pathname: `/booking/${roomData._id}`,
          search: `?startDate=${queryStartDate}&endDate=${queryEndDate}&bookingPeople=${bookingPeople}&diffDays=${diffDays}`
        }}
        className="w-full text-title text-center btn-primary cursor-pointer">立即預訂</Link>
      </div>
    </div>
  </section>
  </>);
};

export default RoomDetail;
