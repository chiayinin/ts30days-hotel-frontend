import { BaseObj } from "./base.type";

export type Address = {
  zipcode: number;
  detail: string;
  city: string;
  county: string;
};

export type User = Partial<BaseObj> & {
  name: string;
  email: string;
  phone: string;
  birthday: string;
  address: Address;
};
