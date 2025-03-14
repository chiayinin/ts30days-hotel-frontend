import { useContext, useRef, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { SubmitHandler } from "react-hook-form";

import UserSignUp from './UserSignUp';
import ValiEmail from './ValiEmail';
import { verifyEmail, signUp } from "@apis";
import { Header } from "@components";
import { Footer } from "@components";
import registerIMG from '@assets/images/register.png';
import { GlobalContext } from '@core';
import { SignUpForm, ValiEmailForm, UserSignUpForm, User } from '@types';

import { Stepper, StepperChangeEvent } from 'primereact/stepper';
import { StepperPanel } from 'primereact/stepperpanel';

const Signup = () => {
  const { dispatch } = useContext(GlobalContext)
  const location = useLocation();
  const navigate = useNavigate();
  const stepperRef = useRef(null);
  const defaultForm  = {
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
  const [formData, setFormData] = useState<SignUpForm>(defaultForm);
  const [resetFields, setResetFields] = useState(false);

  // setting loction.hash from switch step.
  const handleChangeStep = (event: StepperChangeEvent) => {
    let step = '';

    switch (event.index) {
      case 0:
        step = 'ValiEmail';
        break;
      case 1:
        step = 'UserSignUp';
        break;
    };
    location.hash = step;
    navigate(`/signup#${step}`);
    return;
  }

  // 第一階段驗證 Submit
  const valiEmailSubmit: SubmitHandler<ValiEmailForm> = async(data: ValiEmailForm) => {
    await dispatch({ type: 'SET_LOADER', payload: true });
    try {
      const response = await verifyEmail(data);

      // 暫存密碼，email未註冊則儲存，email已註冊過不儲存。
      if(!response?.isEmailExists) {
        // email未註冊，儲存密碼
        // 只要離開 /signup 就刪除密碼
        setFormData({...formData, ...data});
        stepperRef.current.nextCallback();
      } else {
        // email已註冊，不儲存密碼
        await dispatch({
          type: 'SET_TOAST',
          payload: {
            severity: 'error',
            summary: '失敗',
            detail: 'Email 已註冊。',
            display: true,
          },
        });
        setResetFields(true);
      }
    } catch(err) {
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: 'Email 格式不正確',
          detail: `${err}`,
          display: true
        }
      });
    } finally {
      await dispatch({ type: 'SET_LOADER', payload: false });
    }
  };

  // 第二階段驗證 submit
  const signUpSubmit: SubmitHandler<UserSignUpForm> = async (data: UserSignUpForm) => {
    const registerForm: SignUpForm =  {...formData, ...data};
    const params: User = {
      ...registerForm,
      birthday: `${data.birthday.year}/${data.birthday.month}/${data.birthday.day}`
    };

    dispatch({ type: 'SET_LOADER', payload: true });
    setFormData(registerForm);

    try {
      const response = await signUp(params);

      await dispatch({type: 'SET_USER', payload: response});
      await dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'success',
          summary: '註冊',
          detail: '已成功註冊。',
          display: true,
        },
      });
      navigate('/');
    } catch(error) {
      dispatch({
        type: 'SET_TOAST',
        payload: {
          severity: 'error',
          summary: '註冊失敗',
          detail: `${error}`,
          display: true
        }
      });
    } finally {
      dispatch({type: 'SET_LOADER', payload: false});
    }
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
          <Stepper ref={stepperRef} headerPosition="bottom" onChangeStep={handleChangeStep}>
            <StepperPanel header="輸入信箱及密碼" >
              <ValiEmail nextStep={valiEmailSubmit} defaultValues={formData} resetFields={resetFields} setResetFields={setResetFields}></ValiEmail>
            </StepperPanel>
            <StepperPanel header="填寫基本資料">
              <UserSignUp userSignUpSubmit={signUpSubmit} defaultValues={formData}></UserSignUp>
            </StepperPanel>
          </Stepper>
        </div>
      </div>
    </div>
  </div>
  <Footer></Footer>
  </>)
};

export default Signup;
