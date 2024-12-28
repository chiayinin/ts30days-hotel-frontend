import { fetchData } from "@core";
import { Room } from '@types';

export const getRoomsData = async () => fetchData<Room[]>('get', 'rooms').catch(() => [] as Room[]);;
