import { useEffect, useMemo, useState } from "react";
import { Link} from "react-router-dom";
import { useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";

import {
  USER_SIGN_UP_SCHEMA,
  CITY_OPTIONS,
  AREA_OPTIONS,
  getYearOptions,
  getMonthOptions,
  getDayOptions
 } from '@constants';
import { UserSignUpForm } from '@types';

type UserSignUpFormProps = {
  userSignUpSubmit: (data: UserSignUpForm) => void;
  defaultValues?: UserSignUpForm;
};

const UserSignUp = ({ userSignUpSubmit, defaultValues }: UserSignUpFormProps) => {
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
    userSignUpSubmit(data);
  };

  return(<>
  <form onSubmit={handleSubmit(onSubmit)} className="mt-10 text-subtitle text-neutral-0 md:text-title space-y-10">
    <div className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="" className="block">姓名</label>
        <input type="text" placeholder="請輸入命名" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("name")}/>
        <p className="text-tiny md:text-subtitle text-danger-100">{errors.name?.message}</p>
      </div>
      <div className="space-y-2">
        <label className="block">手機號碼</label>
        <input type="phone" placeholder="請輸入手機號碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100 text-" {...register("phone")}/>
        <p className="text-tiny md:text-subtitle text-danger-100">{errors.phone?.message}</p>
      </div>
      <div className="space-y-2">
        <label className="block">生日</label>
        <div className="flex gap-2">
          <select {...register("birthday.year")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
            {yearOptions.map((option, index) => (<option key={index} value={option}>{option} 年</option>))}
          </select>
          <select {...register("birthday.month")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
            {monthOptions.map((option, index) => (<option key={index} value={option}>{option} 月</option>))}
          </select>
          <select {...register("birthday.day")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
            {dayOptions.map((option, index) => (<option key={index} value={option}>{option} 日</option>))}
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <label className="block">地址</label>
        <div className="flex gap-2">
          <select {...register("address.city")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
            {CITY_OPTIONS.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
          </select>
          <select {...register("address.county")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
            {AREA_OPTIONS[city].map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))
            }
          </select>
          <input type="hidden" {...register("address.zipcode")} />
        </div>
          <input type="text" placeholder="請輸入詳細地址" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("address.detail")}/>
          <p className="text-tiny md:text-subtitle text-danger-100">{errors.address?.detail?.message}</p>
      </div>
      <label className="peer flex justify-start items-center rounded">
        <input type="checkbox" className="peer size-6 appearance-none rounded border border-primary-10 bg-primary-tint accent-primary-100 checked:appearance-auto cursor-pointer mr-2" {...register("agreement")}/>
        <span className="select-none">我已閱讀並同意本網站個資使用規範</span>
      </label>
    </div>
    <button className={`w-full text-title ${!isValid ? 'btn-primary-disable' : 'btn-primary'}`} disabled={!isValid}>完成註冊</button>
    <p>已經有會員了嗎？<Link to="/login" className="ml-2 text-primary-100 underline md:text-subtitle">立即登入</Link></p>
  </form>
  </>)
}

export default UserSignUp;
