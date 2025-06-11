import { useEffect, useContext } from "react";
import { useLoaderData, Link, useNavigate, useLocation, useParams } from "react-router-dom";
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import { GlobalContext } from '@core';
import { Room, BookingForm, NewBooking, BookingType } from '@types';
import { RoomBasicInfo } from "@components";
import { RoomFacilityInfo } from "@components";
import { createOrder } from "@apis";
import {
  formatTimestamp,
  BOOKING_SCHEMA,
  CITY_OPTIONS,
  AREA_OPTIONS
 } from '@constants';

const Booking = () => {
  const { dispatch } = useContext(GlobalContext);
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const defaultValues  = {
    name: '',
    phone: '',
    email: '',
    address: {
      city: '臺北市',
      county: '中正區',
      zipcode: '100',
      detail: ''
    }
  };

  const { id: roomDataId } = useParams() ;
  const getQueryParam = (queryParams: URLSearchParams, key: string): string =>
    queryParams.get(key) ?? '';
  const bookingPeople = Number(getQueryParam(query, 'bookingPeople'));
  const diffDays = Number(getQueryParam(query, 'diffDays'));
  let startDate = getQueryParam(query, 'startDate');
  let endDate = getQueryParam(query, 'endDate');

  startDate = formatTimestamp(Number(startDate));
  endDate = formatTimestamp(Number(endDate));

  // get room data
  const roomData = useLoaderData() as Room | null;


  // 資料驗證設定
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<BookingForm>({
    resolver: yupResolver(BOOKING_SCHEMA),
    mode: 'onChange',
    defaultValues
  });

  // 監聽表單值變化
  const {city, county} = watch('address');

  // 當 city 變更時，預設 county
  useEffect(() => {
    if(AREA_OPTIONS[city]) setValue('address.county', AREA_OPTIONS[city][0].value);
  }, [city, setValue]);

  // 當 county 變更時，設定 zipcode
  useEffect(() => {
    const areaOption = AREA_OPTIONS[city].find((Option) => Option.value === county);

    if(areaOption) setValue('address.zipcode', areaOption.zipcode);
  }, [city, county, setValue]);

  // 送出表單
  const onSubmit: SubmitHandler<BookingForm> = async (data: BookingForm) => {
    if (!roomDataId) {
      alert('缺少房間 ID');
      return;
    }

    const params: NewBooking = {
      roomId: roomDataId,
      checkInDate: startDate,
      checkOutDate: endDate,
      peopleNum: bookingPeople,
      userInfo: {
        ...data,
        address: {
          zipcode: data.address.zipcode,
          detail: data.address.county + data.address.city + data.address.detail,
        }
      }
    };

    dispatch({ type: 'SET_LOADER', payload: true });

    try {
      const response: BookingType = await createOrder(params);

      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'success',
          summary: '房間預定',
          detail: '您已預訂成功。',
          display: true,
        }
      });
      navigate(`/bookingsuccess/${response._id}`);
    } catch(error) {
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '房間預定失敗',
          detail: `${error}`,
          display: true
        }
      });
    } finally {
      dispatch({type: 'SET_LOADER', payload: false});
    }
  };

  if(!roomData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無此房型</h2>
      </div>
    )
  }

  return(<>
  <section className="container text-neutral-100 py-10 md:py-[120px]">
    {/* Menu */}
    <Link to={`/room/${roomDataId}`} className="flex justify-start items-center mb-10 leading-none mr-2 hover:text-primary-120">
        <span className="material-symbols-outlined">
          chevron_left
        </span>
        <h2 className="h5 md:h3 underline underline-offset-4">確認訂房資訊</h2>
    </Link>
    {/* content */}
    <div className="md:flex md:justify-between md:items-start md:gap-3">
      {/* information */}
      <div className="max-w-[746px] md:basis-2/3 space-y-10 md:space-y-12">
        {/* 訂房資訊 */}
        <div className="pb-10 md:pb-12 border-b border-neutral-60">
          <h2 className="h6 md:h4 mb-8 md:mb-10">訂房資訊</h2>
          <ul className="space-y-6">
            <li>
              <p className="text-title lg:h5 text-style-primary mb-2">選擇房型</p>
              <p className="text-body">{roomData.name}</p>
            </li>
            <li>
              <p className="text-title lg:h5 text-style-primary mb-2">訂房日期</p>
              <p className="text-body mb-2">入住: {startDate}</p>
              <p className="text-body">退房: {endDate}</p>
            </li>
            <li>
              <p className="text-title lg:h5 text-style-primary mb-2">房客人數</p>
              <p className="text-body">{bookingPeople} 人</p>
            </li>
          </ul>
        </div>
        {/* 訂房人資訊 */}
        <div  className="pb-10 md:pb-12 border-b border-neutral-60">
          <h2 className="h6 md:h4">訂房人資訊</h2>
          <form id="bookingForm" onSubmit={handleSubmit(onSubmit)} className="mt-10 text-subtitle md:text-title space-y-10">
            <div className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="" className="block">姓名</label>
                <input type="text" placeholder="請輸入命名" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100" {...register("name")}/>
                <p className="text-tiny md:text-subtitle text-danger-100">{errors.name?.message}</p>
              </div>
              <div className="space-y-2">
                <label className="block">手機號碼</label>
                <input type="phone" placeholder="請輸入手機號碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100 text-" {...register("phone")}/>
                <p className="text-tiny md:text-subtitle text-danger-100">{errors.phone?.message}</p>
              </div>
              <div className="space-y-2">
                <label className="block">電子信箱</label>
                <input type="email" placeholder="請輸入電子信箱" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100 text-" {...register("email")}/>
                <p className="text-tiny md:text-subtitle text-danger-100">{errors.email?.message}</p>
              </div>
              <div className="space-y-2">
                <label className="block">地址</label>
                <div className="flex gap-2">
                  <select {...register("address.city")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100">
                    {CITY_OPTIONS.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
                  </select>
                  <select {...register("address.county")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100">
                    {AREA_OPTIONS[city].map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))
                    }
                  </select>
                  <input type="hidden" {...register("address.zipcode")} />
                </div>
                  <input type="text" placeholder="請輸入詳細地址" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-primary-40 text-neutral-100" {...register("address.detail")}/>
                  <p className="text-tiny md:text-subtitle text-danger-100">{errors.address?.detail?.message}</p>
              </div>
            </div>
          </form>
        </div>
        {/* 房間資訊 */}
        <div className="space-y-6 lg:space-y-20">
          <h2 className="h6 md:h4">房間資訊</h2>
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
        </div>
      </div>
      {/* button card */}
      <div className="mt-10 md:mt-0 md:basis-1/3 md:sticky md:top-[160px] w-full">
        <div className="bg-neutral-0 rounded-[20px] shadow-xl p-6 xl:p-10 w-full xl:w-[478px] space-y-6 md:space-y-10">
          <figure>
            <img src={roomData.imageUrl} alt={roomData.name} className="rounded-lg" />
          </figure>
          <div className="space-y-6">
            <h3 className="h6 md:h4">價格詳情</h3>
            <div className="pb-6 border-b border-primary-40 text-body space-y-3">
              <div>
                <span>NT$ {roomData.price}</span>
                <span className="material-symbols-outlined mx-2 text-[16px] align-middle">close</span>
                <span>{diffDays} 晚</span>
                <span className="float-right">NT$ {roomData.price * diffDays}</span>
              </div>
              <div>
                <span>住宿折扣</span>
                <span className="float-right text-primary-100">- NT$ 1000</span>
              </div>
            </div>
            <div className="text-title">
              <span>總價</span>
              <span className="float-right">NT$ {roomData.price * diffDays - 1000}</span>
            </div>
          </div>
          <button type="submit" form="bookingForm" className={`w-full text-title ${!isValid ? 'btn-primary-disable' : 'btn-primary'}`} disabled={!isValid}>確定訂房</button>
        </div>
      </div>
    </div>
  </section>
  </>);
};

export default Booking;
