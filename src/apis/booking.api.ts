import { fetchData } from "@core";
import { NewBooking, BookingType } from "@types";
import { FAKE_LAYOUT_INFO, FAKE_FACILITY_INFO, FAKE_AMENITY_INFO } from "@constants";

export const createOrder = async (params: NewBooking) => fetchData<BookingType>('post', '/orders', params);

export const getOrdersData = async () => fetchData<BookingType[]>('get', '/orders').catch(() => [] as BookingType[]);

export const getOrderDetail = async (id: string) => fetchData<BookingType>('get', `/orders/${id}`).then((order) => {
  order.roomId.layoutInfo = FAKE_LAYOUT_INFO;
  order.roomId.facilityInfo = FAKE_FACILITY_INFO;
  order.roomId.amenityInfo = FAKE_AMENITY_INFO;

  return order;
});

export const deleteOrder = async (id: string) => fetchData<BookingType>('delete', `/orders/${id}`);
