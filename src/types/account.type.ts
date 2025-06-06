import { Address } from './user.type';

export type PasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type ValiPasswordType = PasswordType & {
  confirmPassword: string;
};

export type  ValiAccountInfoType = Partial<Address> & {
  name: string;
  phone: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
  address: Address;
};

export type PutUserType = {
  userId: string;
} & Partial<PasswordType & Omit<ValiAccountInfoType, 'birthday' | 'address'> & {
  birthday: string;
  address: {
    zipcode: string;
    detail: string;
  };
}>;
