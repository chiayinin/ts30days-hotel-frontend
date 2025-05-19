export type PasswordType = {
  oldPassword: string;
  newPassword: string;
};

export type ValiPasswordType = PasswordType & {
  confirmPassword: string;
};

export type  ValiAccountInfoType = {
  name: string;
  phone: string;
  birthday: string;
  address: {
    zipcode: string;
    detail: string;
  };
};

export type PutUserType = PasswordType & ValiAccountInfoType & {
  userId: string;
};
