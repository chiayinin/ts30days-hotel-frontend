import { fetchData } from "@core";
import { NewBooking, BookingType } from "@types";

export const createOrder = async (params: NewBooking) => fetchData<BookingType>('post', '/orders', params);

export const getOrdersData = async () => fetchData<BookingType[]>('get', '/orders').catch(() => [] as BookingType[]);

export const getOrderDetail = async (id: string) => fetchData<BookingType>('get', `/orders/${id}`);

export const deleteOrder = async (id: string) => fetchData<BookingType>('delete', `/orders/${id}`);
