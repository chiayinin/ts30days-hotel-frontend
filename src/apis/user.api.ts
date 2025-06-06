import { redirect } from 'react-router-dom';
import axios from 'axios';

import { fetchData, getFromStorage, clearStorage, KEY_TOKEN } from '@core';
import { User, PutUserType } from '@types';

export const signUp = async (params: User) => fetchData<User>('post', '/user/signup', params);

export const login = async (params: { email: string, password: string }) => fetchData<User>('post', '/user/login', params);

export const getUser = async (token: string) => fetchData<User | null>('get', '/user', undefined, token);

export const putUser = async (params: PutUserType) => fetchData<null>('put', '/user', params);

export const loginGuard = async () => {
  const token = getFromStorage(KEY_TOKEN, 'COOKIE');

  if(token) {
    const user = await getUser(token);
    if(user) return redirect('/');
  };
  return null;
};

export const logout = () => {
  delete axios.defaults.headers.common["Authorization"];
  clearStorage('COOKIE');
}
