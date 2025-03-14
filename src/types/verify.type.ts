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

export type UserSignUpForm = {
  name: string;
  phone: string;
  birthday: {
    year: string;
    month: string;
    day: string;
  };
  address: {
    city: string;
    county: string;
    detail: string;
    zipcode: string;
  };
  agreement: boolean;
};

export type SignUpForm = ValiEmailForm & UserSignUpForm;
