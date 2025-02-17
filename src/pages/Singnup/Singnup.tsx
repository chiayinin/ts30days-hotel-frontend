import { useContext } from 'react';
import { Link, useNavigate} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { signUp } from "@apis";
import { Header } from "@components";
import { Footer } from "@components";
import registerIMG from '@assets/images/register.png';
import { GlobalContext } from '@core';

type Form = {
  email: string;
  password: string;
}

const Singnup = () => {
  const { dispatch } = useContext(GlobalContext)
  const navigate = useNavigate();

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

  return(<>
  <Header></Header>
  <div className="flex justify-start items-center bg-neutral-bg">
    <figure className="h-full w-1/2 hidden md:block">
      <img className="h-full w-full bg-cover bg-center" src={registerIMG} alt="Login image" />
    </figure>
    <div className="md:w-1/2 m-auto container md:max-w-[416px]">
      <form onSubmit={handleSubmit(onSubmit)} className="mt-[72px] md:mt-[120px]  text-neutral-0 text-subtitle md:text-title space-y-5 md:space-y-10">
        <div className="space-y-2">
          <p className="text-primary-100">享樂酒店，誠摯歡迎</p>
          <p className="h3 md:h1">立即開始旅程</p>
        </div>
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
          <div className="flex justify-between items-center">
            <label className="peer flex justify-start items-center rounded">
              <input type="checkbox" className="peer size-6 appearance-none rounded border border-primary-10 bg-primary-tint accent-primary-100 checked:appearance-auto cursor-pointer mr-2" />
              <span className="select-none">記住帳號</span>
            </label>
            <Link to="/forget-password" className="text-primary-100 underline md:text-subtitle">忘記密碼</Link>
          </div>
        </div>
        <button className={`w-full text-title ${!isValid ? 'btn-primary-disable' : 'btn-primary'}`} disabled={!isValid}>會員登入</button>
        <p>沒有會員嗎？<Link to="/registration" className="ml-2 text-primary-100 underline md:text-subtitle">前往註冊</Link></p>
      </form>
    </div>
  </div>
  <Footer></Footer>
  </>)
};

export default Singnup;
