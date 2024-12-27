import { fetchData } from "@core";
import { Rooms } from '@types';

export const getRoomsData = async () => fetchData<Rooms[]>('get', 'rooms');
