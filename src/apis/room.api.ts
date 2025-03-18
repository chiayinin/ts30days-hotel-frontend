import { fetchData } from "@core";
import { Room } from '@types';
import { FAKE_LAYOUT_INFO, FAKE_FACILITY_INFO, FAKE_AMENITY_INFO } from "@constants";

export const getRoomsData = async () => fetchData<Room[]>('get', 'rooms').catch(() => [] as Room[]);

export const getRoom = async (id: string) => fetchData<Room>('get', `rooms/${ id }`).then((room) => {
  room.layoutInfo = FAKE_LAYOUT_INFO;
  room.facilityInfo = FAKE_FACILITY_INFO;
  room.amenityInfo = FAKE_AMENITY_INFO;

  return room;
}).catch(() => null);
