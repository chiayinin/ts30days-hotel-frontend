import { BaseObj } from "./base.type";

export type Food = Partial<BaseObj> & {
  title: string;
  description: string;
  diningTime: string
  image: string;
};
