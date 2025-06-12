import { BaseObj } from './base.type';

export type New = Partial<BaseObj> & {
  title?: string;
  description: string;
  image?: string;
}
