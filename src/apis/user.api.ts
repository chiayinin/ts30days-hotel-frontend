import { redirect } from 'react-router-dom';
import { fetchData, getFromStorage, KEY_TOKEN } from '@core';
import { User } from '@types';

export const signUp = async (params: User) => fetchData<User>('post', '/user/signup', params);

export const login = async (params: { email: string, password: string }) => fetchData<User>('post', '/user/login', params);

export const getUser = async (token: string) => fetchData<User | null>('get', '/user', undefined, token);

export const loginGuard = async () => {
  const token = getFromStorage(KEY_TOKEN, 'COOKIE');

  if(token) {
    const user = await getUser(token);
    if(user) return redirect('/');
  };
  return null;
};
