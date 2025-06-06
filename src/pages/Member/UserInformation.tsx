import { useEffect, useState, useMemo, useContext } from "react";
import { Dialog } from 'primereact/dialog';
import { User } from "@types";


import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ValiPasswordType, ValiAccountInfoType, PutUserType, UserSignUpForm } from '@types';
import { EDIT_PASSWORD_SCHEMA, EDIT_USERINFO_SCHEMA, formatTimestamp } from '@constants';
import {
  USER_SIGN_UP_SCHEMA,
  CITY_OPTIONS,
  AREA_OPTIONS,
  getYearOptions,
  getMonthOptions,
  getDayOptions
 } from '@constants';
import { GlobalContext } from "@core";
import { putUser } from '@apis';

const UserInformation = ({user}) => {
  const [visibleEditPassword, setVisibleEditPassword] = useState<boolean>(false);
  const [visibleAccountInfo, setVisibleAccountInfo] = useState<boolean>(false);
  const { dispatch } = useContext(GlobalContext);

  const defaultEditPasswordFrom: ValiPasswordType = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const defaultAccountInfoFrom: ValiAccountInfoType = {
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
  };
  const defaultForm = {
    userId: '',
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
    oldPassword: undefined,
    newPassword: undefined,
  };
  const [userData, setUserData] = useState(user);
  // const [formData, setFormData] = useState<PutUserType>(defaultForm);

  useEffect(() => {
    setUserData(user);
  }, [user]);

  // Modal: 重設密碼資料驗證
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset,
    formState: { errors: passwordErrors, isValid: isPasswordValid },
  } = useForm<ValiPasswordType>({
    resolver: yupResolver(EDIT_PASSWORD_SCHEMA),
    mode: 'onChange',
    defaultValues: defaultEditPasswordFrom
  });

  // 重設密碼 submit
  const valiPasswordSubmit: SubmitHandler<ValiPasswordType> = async (data: ValiPasswordType) => {
    const params: PutUserType = {
      userId: userData?._id ?? '',
      oldPassword: data.oldPassword,
      newPassword: data.newPassword
    }

    dispatch({ type: 'SET_LOADER', payload: true});
    try {
      await putUser(params);

      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'success',
          summary: '設定成功',
          detail: '已成功設定新密碼。',
          display: true,
        },
      });
    } catch(error) {
      console.dir(error);
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '設定密碼失敗',
          detail: `${error}`,
          display: true
        }
      });
    } finally {
      reset(defaultEditPasswordFrom);
      dispatch({type: 'SET_LOADER', payload: false});
    };
  };

  // Modal: 修改資本資料資料驗證
  // const {
  //   register: registerAccount,
  //   handleSubmit: handleAccountSubmit,
  //   watch,
  //   setValue,
  //   formState: { errors: accountErrors, isValid: isAccountValid },
  // } = useForm<ValiAccountInfoType>({
  //   resolver: yupResolver(EDIT_USERINFO_SCHEMA),
  //   mode: 'onChange',
  //   defaultValues: defaultAccountInfoFrom,
  // });
  // // 監聽表單值變化
  // const {city, county} = watch('address');
  // const {year, month, day} = watch('birthday');
  // const [dayOptions, setDayOptions] = useState<string[]>([]);

  // // 預計不會變更的選項
  // const yearOptions = useMemo(getYearOptions, []);
  // const monthOptions = useMemo(getMonthOptions, []);
  // // 當 city 變更時，預設 county
  // useEffect(() => {
  //   if(AREA_OPTIONS[city]) setValue('address.county', AREA_OPTIONS[city][0].value);
  // }, [city, setValue]);

  // // 當 county 變更時，設定 zipcode
  // useEffect(() => {
  //   const areaOption = AREA_OPTIONS[city].find((Option) => Option.value === county);

  //   if(areaOption) setValue('address.zipcode', areaOption.zipcode);
  // }, [city, county, setValue]);

  // // 當年份或月份變更時，更新可選的日期
  // useEffect(() => {
  //   const options = getDayOptions(year, month);

  //   setDayOptions(options);
  //   if(!options.includes(day)) setValue('birthday.day', options[options.length - 1]);
  // }, [year, month, day, setValue]);

  // const onAccountInfoSubmit: SubmitHandler<ValiAccountInfoType> = async (data:ValiAccountInfoType) => {
  //   const params: PutUserType = {
  //     userId: userData?._id ?? '',
  //     name: data.name,
  //     phone: data.phone,
  //     birthday: `${data.birthday.year}/${data.birthday.month}/${data.birthday.day}`,
  //     address: {
  //       zipcode: data.address.zipcode,
  //       detail: data.address.city + data.address.county + data.address.detail
  //     },
  //   };

  //   dispatch({ type: 'SET_LOADER', payload: true });
  //   try {
  //     const response = await putUser(params);

  //     await setUserData(response)
  //     await dispatch({type: 'SET_USER', payload: response});
  //     await dispatch({
  //       type: 'SET_TOAST',
  //       payload: {
  //         severity: 'success',
  //         summary: '成功修改',
  //         detail: '已成功修改個人資料。',
  //         display: true,
  //       },
  //     });
  //   } catch(error) {
  //     console.dir(error);
  //     dispatch({
  //       type: 'SET_TOAST',
  //       payload: {
  //         severity: 'error',
  //         summary: '修改失敗',
  //         detail: `${error}`,
  //         display: true
  //       }
  //     });
  //   } finally {
  //     dispatch({type: 'SET_LOADER', payload: false});
  //   };
  // };

  if(!userData) {
    return(
      <div className='container py-10 lg:py-[120px] lg:px-10 text-neutral-80'>
        <h2 className="text-subtitle lg:h6">查無會員資料</h2>
      </div>
    )
  }

  return(
    <div className='flex flex-col md:flex-row md:justify-between gap-6 md:gap-10 mt-10 md:mt-20'>
    {/* 修改密碼 */}
    <div className="rounded-[20px] bg-neutral-0 p-6 space-y-6 md:space-y-10 md:basis-1/3">
      <h5 className='h6 md:h5'>修改密碼</h5>
      <ul className='space-y-4'>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">電子信箱</span>
          <span className="block text-subtitle md:text-title">{userData.email}</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">密碼</span>
          <input type="password" name="" id="" value="●●●●●●●●" className="block text-subtitle bg-neutral-0" disabled />
        </li>
      </ul>
      <button className="btn-secondary" onClick={() => setVisibleEditPassword(true)}>重設密碼</button>
    </div>
    {/* 基本資料 */}
    <div className="rounded-[20px] bg-neutral-0 p-6 space-y-6 md:space-y-10 md:basis-2/3">
      <h5 className='h6 md:h5'>基本資料</h5>
      <ul className='space-y-4'>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">姓名</span>
          <span className="block text-subtitle md:text-title">{userData.name}</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">手機號碼</span>
          <span className="block text-subtitle md:text-title">{userData.phone}</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">生日</span>
          <span className="block text-subtitle md:text-title">{formatTimestamp(userData.birthday)}</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">地址</span>
          <span className="block text-subtitle md:text-title">{userData.address?.detail}</span>
        </li>
      </ul>
      <button className="btn-secondary" onClick={() => setVisibleAccountInfo(true)}>編輯基本資料</button>
    </div>
    {/* Modal: 修改密碼 */}
    <Dialog
      visible={visibleEditPassword}
      modal
      onHide={() => {
        if (!visibleEditPassword) return;
        else reset(defaultEditPasswordFrom);
        setVisibleEditPassword(false);
      }}
      header="修改密碼"
      className="w-[80vw] md:w-[50vw]"
      headerClassName="h6 md:h5"
    >
      <div>
        <form onSubmit={handlePasswordSubmit(valiPasswordSubmit)} className="text-subtitle text-neutral-100 md:text-title space-y-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block">舊密碼</label>
              <input type="password" placeholder="請輸入舊密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...registerPassword("oldPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{passwordErrors.oldPassword?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">新密碼</label>
              <input type="password" placeholder="新密碼需至少 8 碼以上，並英數混合，不分大小寫" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...registerPassword("newPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{passwordErrors.newPassword?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">確認密碼</label>
              <input type="password" placeholder="請再輸入一次密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...registerPassword("confirmPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{passwordErrors.confirmPassword?.message}</p>
            </div>
          </div>
          <button
            className={`w-full text-title ${!isPasswordValid ? 'btn-primary-disable' : 'btn-primary'}`}
            disabled={!isPasswordValid}
            onClick={() => {setVisibleEditPassword(false)}}
          >儲存設定</button>
        </form>
      </div>
    </Dialog>
    {/* Modal: 修改基本資料 */}
    {/* <Dialog
      visible={visibleAccountInfo}
      modal
      onHide={() => {
        if (!visibleAccountInfo) return; setVisibleAccountInfo(false);
      }}
      header="修改基本資料"
      className="w-[80vw] md:w-[50vw]"
      headerClassName="h6 md:h5"
    >
      <div>
        <form onSubmit={handleAccountSubmit(onAccountInfoSubmit)} className="text-subtitle text-neutral-100 md:text-title space-y-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block">姓名</label>
              <input type="text" placeholder="請輸入命名" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...registerAccount("name")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{accountErrors.name?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">手機號碼</label>
              <input type="phone" placeholder="請輸入手機號碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100 text-" {...registerAccount("phone")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{accountErrors.phone?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">生日</label>
              <div className="flex gap-2">
                <select {...registerAccount("birthday.year")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
                  {yearOptions.map((option, index) => (<option key={index} value={option}>{option} 年</option>))}
                </select>
                <select {...registerAccount("birthday.month")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
                  {monthOptions.map((option, index) => (<option key={index} value={option}>{option} 月</option>))}
                </select>
                <select {...registerAccount("birthday.day")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
                  {dayOptions.map((option, index) => (<option key={index} value={option}>{option} 日</option>))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block">地址</label>
              <div className="flex gap-2">
                <select {...registerAccount("address.city")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
                  {CITY_OPTIONS.map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))}
                </select>
                <select {...registerAccount("address.county")} className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100">
                  {AREA_OPTIONS[city].map((option, index) => (<option key={index} value={option.value}>{option.label}</option>))
                  }
                </select>
                <input type="hidden" {...registerAccount("address.zipcode")} />
              </div>
                <input type="text" placeholder="請輸入詳細地址" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...registerAccount("address.detail")}/>
                <p className="text-tiny md:text-subtitle text-danger-100">{accountErrors.address?.detail?.message}</p>
            </div>
          </div>
          <button
          className={`w-full text-title ${!isAccountValid ? 'btn-primary-disable' : 'btn-primary'}`}
          disabled={!isAccountValid}
          onClick={() => {setVisibleAccountInfo(false)}}
          >儲存設定</button>
        </form>
      </div>
    </Dialog> */}
  </div>
  )
};

export default UserInformation;
