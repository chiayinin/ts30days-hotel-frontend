import { Link, useNavigate } from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { login } from "@apis";

import { Header } from "@components";
import { Footer } from "@components";
import registerIMG from '@assets/images/register.png';


type Form = {
  email: string;
  password: string;
}

const Login = () => {

  const validate = yup.object({
    email: yup.string().email("電子郵件的格式有誤").required("欄位不得為空"),
    password: yup.string().min(6).required("欄位不得為空"),
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
      password: ''
    }
  });

  console.log('errors:', errors);
  console.log('isValid:', isValid);


  const navigate = useNavigate();


  const onSubmit: SubmitHandler<Form> = async (data: Form) => {
    try {
      const respense = await login(data);
      console.log('respense:', respense);
      // console.log(data)
      // const respense = await login(data);
      // console.log('respense:', respense);

      // 成功登入視窗
      // navigate('/');
    } catch (error) {
      console.dir('error:', error)
      // 失敗登入視窗
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
            <input type="password" placeholder="請輸入密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("password")}/>
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

export default Login;
