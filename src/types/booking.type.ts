import { Address } from './user.type';
import { Room } from './rooms.type';
import { BaseObj } from "./base.type";

export type BookingForm = {
  name: string;
  phone: string;
  email: string;
  address: Address;
};

export type NewBooking = {
  roomId: string;
  checkInDate: string;
  checkOutDate: string;
  peopleNum: number;
  userInfo: Omit<BookingForm, 'address'> & {
    address: {
      zipcode: string;
      detail: string;
    };
  };
};

export type BookingType = Partial<NewBooking> & Partial<BaseObj> & {
  roomId: Room;
  orderUserId: string;
  status: number;
  _id: string;
  diffDays?: number;
}
