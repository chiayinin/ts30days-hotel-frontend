import { BaseObj } from "./base.type";

export type Facility = {
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
  layoutInfo: Facility[];
  facilityInfo: Facility[];
  amenityInfo: Facility[];
};
