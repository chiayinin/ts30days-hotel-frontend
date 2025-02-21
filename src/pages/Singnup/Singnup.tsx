import { useContext, useRef } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUp } from "@apis";
import { Header } from "@components";
import { Footer } from "@components";
import registerIMG from '@assets/images/register.png';
import { GlobalContext } from '@core';

import { Stepper } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

type Form = {
  email: string;
  password: string;
  confirmPass: string;
}

const Singnup = () => {
  const { dispatch } = useContext(GlobalContext)
  const navigate = useNavigate();
  const stepperRef = useRef(null);

  const validate = yup.object({
    email: yup.string()
      .email("電子郵件的格式有誤")
      .required("欄位不得為空"),
    password: yup
      .string()
      .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
      .min(8, "密碼需至少 8 碼以上")
      .matches(/^(?=.*[a-z])(?=.*\d).+$/, "密碼需包含英文及數字")
      .required("欄位不得為空"), // 密碼需至少 8 碼以上，並英數混合
    confirmPass: yup
      .string()
      .transform((value) => value.toLowerCase().replace(/\s+/g, "")) // 將大寫轉換為小寫，並移除所有空白
      .required("欄位不得為空") // 密碼需至少 8 碼以上，並英數混合
      .oneOf([yup.ref('password')], "和密碼不相符")
  });

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<Form>({
    resolver: yupResolver(validate),
    mode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPass: '',
    }
  });

  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    await dispatch({ type: 'SET_LOADER', payload: true });
    try {
      const response = await signUp(data);

      await dispatch({ type: 'SET_USER', payload: response });
      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'success',
          summary: '登入',
          detail: '已成功登入。',
          display: true,
        },
      });
      navigate('/');
    } catch(err) {
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '登入失敗',
          detail: `${err}`,
          display: true
        }
      });
    } finally {
      await dispatch({ type: 'SET_LOADER', payload: false });
    }
  };

  const valiEmailSubmit: SubmitHandler<Form> = async (data: Form) => {
    console.log('valiEmailSubmit');
    // stepperRef.current.nextCallback();

  };

  return(<>
  <Header></Header>
  <div className="flex justify-start items-center bg-neutral-bg text-neutral-0 pt-[72px] md:pt-[120px]">
    <figure className="h-full w-1/2 hidden md:block">
      <img className="h-full w-full bg-cover bg-center" src={registerIMG} alt="Login image" />
    </figure>
    <div className='md:w-1/2 container md:max-w-[416px]'>
      <div className="w-full">
        <div className='space-y-4'>
          {/* title */}
          <div className="space-y-2">
            <p className="text-primary-100">享樂酒店，誠摯歡迎</p>
            <p className="h3 md:h1">立即註冊</p>
          </div>
          {/* stepper */}
          <Stepper ref={stepperRef} headerPosition="bottom" >
            <StepperPanel header="輸入信箱及密碼">
              <form onSubmit={handleSubmit(valiEmailSubmit)} className="mt-10 text-subtitle md:text-title space-y-10">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label htmlFor="" className="block">電子信箱</label>
                    <input type="email" placeholder="test@gmail.com" className="text-body2 md:text-body block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("email")}/>
                    <p className="text-tiny md:text-subtitle text-danger-100">{errors.email?.message}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block">密碼</label>
                    <input type="password" placeholder="密碼需至少 8 碼以上，並英數混合，不分大小寫" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("password")}/>
                    <p className="text-tiny md:text-subtitle text-danger-100">{errors.password?.message}</p>
                  </div>
                  <div className="space-y-2">
                    <label className="block">確認密碼</label>
                    <input type="password" placeholder="請再輸入一次密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("confirmPass")}/>
                    <p className="text-tiny md:text-subtitle text-danger-100">{errors.confirmPass?.message}</p>
                  </div>
                </div>
                <button className={`w-full text-title ${!isValid ? 'btn-primary-disable' : 'btn-primary'}`} disabled={!isValid}>下一步</button>
                <p>已經有會員了嗎？<Link to="/login" className="ml-2 text-primary-100 underline md:text-subtitle">立即登入</Link></p>
              </form>
            </StepperPanel>
              <div className="flex flex-column h-12rem">
                <div className="border-2 border-dashed surface-border border-round surface-ground flex-auto flex justify-content-center align-items-center font-medium">Content III</div>
              </div>
              <div className="flex pt-4 justify-content-start">
                  <Button label="Back" severity="secondary" icon="pi pi-arrow-left" onClick={() => stepperRef.current.prevCallback()} />
              </div>
            <StepperPanel header="填寫基本資料"></StepperPanel>
          </Stepper>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
  </>)
};

export default Singnup;
