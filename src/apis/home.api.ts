import { fetchData } from '@core';
import { News } from '@types';

export const getNewsData = async () => fetchData<News[]>('get', '/home/news');
