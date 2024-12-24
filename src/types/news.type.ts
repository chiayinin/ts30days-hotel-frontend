import { BaseObj } from './base.type';

export type News = Partial<BaseObj> & {
  title: string;
  description: string;
  image: string;
}
