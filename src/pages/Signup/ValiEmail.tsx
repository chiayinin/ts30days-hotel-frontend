import { Link} from "react-router-dom";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { ValiEmailForm } from '@types';
import { VALI_EMAIL_SCHEMA } from '@constants';

type ValiEmailFormProps = {
  nextStep: (data: ValiEmailForm) => void;
  defaultValues?: ValiEmailForm;
};

const ValiEmail = ({ nextStep, defaultValues }: ValiEmailFormProps) => {

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<ValiEmailForm>({
    resolver: yupResolver(VALI_EMAIL_SCHEMA),
    mode: 'onChange',
    defaultValues
  });

  const valiEmailSubmit: SubmitHandler<ValiEmailForm> = (data) => nextStep(data);

return(<>
<form onSubmit={handleSubmit(valiEmailSubmit)} className="mt-10 text-subtitle text-neutral-0 md:text-title space-y-10">
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
      <input type="password" placeholder="請再輸入一次密碼" className="text-body2 block w-full h-[52px] rounded-lg p-4 border border-b-primary-tint text-neutral-100" {...register("confirmPassword")}/>
      <p className="text-tiny md:text-subtitle text-danger-100">{errors.confirmPassword?.message}</p>
    </div>
  </div>
  <button className={`w-full text-title ${!isValid ? 'btn-primary-disable' : 'btn-primary'}`} disabled={!isValid}>下一步</button>
  <p>已經有會員了嗎？<Link to="/login" className="ml-2 text-primary-100 underline md:text-subtitle">立即登入</Link></p>
</form>
</>)
};

export default ValiEmail;
