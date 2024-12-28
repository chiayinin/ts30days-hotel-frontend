import { fetchData } from '@core';
import { New, Food } from '@types';

export const getNewsData = async () => fetchData<New[]>('get', '/home/news');
export const getFoodsData = async() => fetchData<Food[]>('get', '/home/culinary');
