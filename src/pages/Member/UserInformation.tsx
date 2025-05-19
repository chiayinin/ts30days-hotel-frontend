import { useEffect, useState } from "react";
import { Dialog } from 'primereact/dialog';


import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ValiPasswordType, ValiAccountInfoType, PutUserType } from '@types';
import { EDIT_PASSWORD_SCHEMA } from '@constants';

const UserInformation = () => {
  const [visibleEditPassword, setVisibleEditPassword] = useState<boolean>(false);

  const defaultEditPasswordFrom: ValiPasswordType = {
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  };
  const defaultAccountInfoFrom: ValiAccountInfoType = {
    name: '',
    phone: '',
    birthday: '',
    address: {
      zipcode: '',
      detail: '',
    },
  };
  const defaultForm = {
    userId: '',
    name: '',
    phone: '',
    birthday: '',
    address: {
      zipcode: '',
      detail: '',
    },
    oldPassword: '',
    newPassword: '',
  };
  const getUserData = {
    "address": {
      "zipcode": 802,
      "detail": "文山路23號",
      "city": "高雄市",
      "county": "苓雅區"
    },
    "_id": "6533f0ef4cdf5b7f762747b0",
    "name": "Lori Murphy",
    "email": "timmothy.ramos@example.com",
    "phone": "(663) 742-3828",
    "birthday": "1982-02-03T16:00:00.000Z",
    "createdAt": "2023-10-21T15:40:31.526Z",
    "updatedAt": "2023-10-21T15:40:31.526Z",
    "id": "6533f0ef4cdf5b7f762747b0"
  };
  const [formData, setFormData] = useState<PutUserType>(defaultForm);


  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<ValiPasswordType>({
    resolver: yupResolver(EDIT_PASSWORD_SCHEMA),
    mode: 'onChange',
    defaultValues: defaultEditPasswordFrom
  });

  // 重設密碼 submit
  const valiPasswordSubmit: SubmitHandler<ValiPasswordType> = async (data) => {
    console.log(data)
    console.log(isValid);

    setVisibleEditPassword(false)

    // // 取得 getUser
    // const

    // // 清空密碼欄位
    // reset(defaultEditPasswordFrom);

  };

  return(
    <div className='flex flex-col md:flex-row md:justify-between gap-6 md:gap-10 mt-10 md:mt-20'>
    {/* 修改密碼 */}
    <div className="rounded-[20px] bg-neutral-0 p-6 space-y-6 md:space-y-10 md:basis-1/3">
      <h5 className='h6 md:h5'>修改密碼</h5>
      <ul className='space-y-4'>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">電子信箱</span>
          <span className="block text-subtitle md:text-title">Jessica@exsample.com</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">密碼</span>
          <input type="password" name="" id="" value="●●●●●●" className="block text-subtitle bg-neutral-0" disabled />
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
          <span className="block text-subtitle md:text-title">Jessica Ｗang</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">手機號碼</span>
          <span className="block text-subtitle md:text-title">+886 912 345 678</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">生日</span>
          <span className="block text-subtitle md:text-title">1990 年 8 月 15 日</span>
        </li>
        <li>
          <span className="block mb-2 text-body2 md:text-body text-neutral-80">地址</span>
          <span className="block text-subtitle md:text-title">高雄市新興區六角路 123 號</span>
        </li>
      </ul>
      <button className="btn-secondary">編輯基本資料</button>
    </div>
    {/* Modal */}
    <Dialog
      visible={visibleEditPassword}
      modal
      onHide={() => {
        if (!visibleEditPassword) return; setVisibleEditPassword(false);
      }}
      header="修改密碼"
    >
      <div>
        <form onSubmit={handleSubmit(valiPasswordSubmit)} className="text-subtitle text-neutral-100 md:text-title space-y-10">
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="block">舊密碼</label>
              <input type="password" placeholder="請輸入舊密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("oldPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{errors.oldPassword?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">新密碼</label>
              <input type="password" placeholder="新密碼需至少 8 碼以上，並英數混合，不分大小寫" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("newPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{errors.newPassword?.message}</p>
            </div>
            <div className="space-y-2">
              <label className="block">確認密碼</label>
              <input type="password" placeholder="請再輸入一次密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("confirmPassword")}/>
              <p className="text-tiny md:text-subtitle text-danger-100">{errors.confirmPassword?.message}</p>
            </div>
          </div>
          <button
            className={`w-full text-title ${!isValid ? 'btn-secondary-disable' : 'btn-secondary'}`}
            disabled={!isValid}
            onClick={() => {setVisibleEditPassword(false); console.log(isValid);}}
          >儲存設定</button>
        </form>
      </div>
    </Dialog>
  </div>
  )
};

export default UserInformation;
