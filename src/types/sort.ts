import { Product } from './fetch';

export type Order = 'asc' | 'desc';

export interface SortingParam {
  name: keyof Product;
  order: Order;
}
