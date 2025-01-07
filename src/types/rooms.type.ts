import { BaseObj } from "./base.type";

export type facility = {
  title: string;
  isProvide: boolean;
};

export type Room = Partial<BaseObj> & {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  status: number;
  layoutInfo: facility[];
  facilityInfo: facility[];
  amenityInfo: facility[];
};
