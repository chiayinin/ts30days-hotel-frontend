import { Address } from './user.type';

export type Verify = {
  email: string;
  isEmailExists?: boolean
};

export type LoginForm = Verify & {
  password: string;
};

export type ValiEmailForm = LoginForm & {
  confirmPassword: string;
};

export type UserSignUpForm = Partial<Address> & {
  name: string;
  phone: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
  address: Address;
  agreement: boolean;
};

export type SignUpForm = ValiEmailForm & UserSignUpForm;
