//id: 676e7cf5de85a9ded62f5b2e
import { useEffect, useMemo, useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import { Room } from "@types";
import { RoomBasicInfo } from "@components";
import { RoomFacilityInfo } from "@components";
import {
  USER_SIGN_UP_SCHEMA,
  CITY_OPTIONS,
  AREA_OPTIONS,
  getYearOptions,
  getMonthOptions,
  getDayOptions
 } from '@constants';
import { UserSignUpForm } from '@types';
import { SignUpForm } from '@types';

type UserSignUpFormProps = {
  userSignUpSubmit: (data: UserSignUpForm) => void;
  defaultValues?: UserSignUpForm;
};

const Booking = () => {
  const roomId = '676e7cf5de85a9ded62f5b2e';

  // get room data
  const roomData = useLoaderData() as Room | null;

  const defaultValues  = {
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    birthday: {
      year: '2000',
      month: '1',
      day: '1'
    },
    address: {
      city: '臺北市',
      county: '中正區',
      zipcode: '100',
      detail: ''
    },
    agreement: false
  };
  // const [formData, setFormData] = useState<SignUpForm>(defaultForm);
  // 資料驗證設定
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<UserSignUpForm>({
    resolver: yupResolver(USER_SIGN_UP_SCHEMA),
    mode: 'onChange',
    defaultValues
  });

  // 監聽表單值變化
  const {city, county} = watch('address');
  const {year, month, day} = watch('birthday');
  const [dayOptions, setDayOptions] = useState<string[]>([]);

  // 預計不會變更的選項
  const yearOptions = useMemo(getYearOptions, []);
  const monthOptions = useMemo(getMonthOptions, []);

  // 當 city 變更時，預設 county
  useEffect(() => {
    if(AREA_OPTIONS[city]) setValue('address.county', AREA_OPTIONS[city][0].value);
  }, [city, setValue]);

  // 當 county 變更時，設定 zipcode
  useEffect(() => {
    const areaOption = AREA_OPTIONS[city].find((Option) => Option.value === county);

    if(areaOption) setValue('address.zipcode', areaOption.zipcode);
  }, [city, county, setValue]);

  // 當年份或月份變更時，更新可選的日期
  useEffect(() => {
    const options = getDayOptions(year, month);

    setDayOptions(options);
    if(!options.includes(day)) setValue('birthday.day', options[options.length - 1]);
  }, [year, month, day, setValue]);

  const onSubmit = (data: UserSignUpForm) => {
    console.log('form:', data);

    // userSignUpSubmit(data);
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
    <div className="flex justify-start items-center mb-10">
      <Link to={`/room/${roomId}`} className="leading-none mr-2 hover:text-primary-120 hover:outline">
        <span className="material-symbols-outlined">
          chevron_left
        </span>
      </Link>
      <h2 className="h5 md:h3">確認訂房資訊</h2>
    </div>
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
              <p className="text-body">尊爵雙人房</p>
            </li>
            <li>
              <p className="text-title lg:h5 text-style-primary mb-2">訂房日期</p>
              <p className="text-body mb-2">入住: 6 月 10 日星期二</p>
              <p className="text-body">退房: 6 月 11 日星期三</p>
            </li>
            <li>
              <p className="text-title lg:h5 text-style-primary mb-2">房客人數</p>
              <p className="text-body">2 人</p>
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
                <span>NT$ 10000</span>
                <span className="material-symbols-outlined mx-2 text-[16px] align-middle">close</span>
                <span>2 晚</span>
                <span className="float-right">NT$ 20000</span>
              </div>
              <div>
                <span>住宿折扣</span>
                <span className="float-right text-primary-100">-NT$ 1,000</span>
              </div>
            </div>
            <div className="text-title">
              <span>總價</span>
              <span className="float-right">NT$ 19000</span>
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
