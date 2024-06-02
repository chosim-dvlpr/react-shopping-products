import { CartResponse, ProductResponse } from '../types/fetch';
import { SortingParam } from '../types/sort';
import { generateBasicToken } from '../utils/auth';
import {
  ENDPOINTS_PRODUCTS,
  ENDPOINTS_CART,
  ENDPOINTS_REMOVE_CART,
} from './endpoints';

const USER_ID = import.meta.env.VITE_USER_ID;
const USER_PASSWORD = import.meta.env.VITE_USER_PASSWORD;
const token = generateBasicToken(USER_ID, USER_PASSWORD);

export const fetchProducts = async (
  page: number,
  size: number,
  sortings: SortingParam[] = [],
  category: string = '',
): Promise<ProductResponse> => {
  const results = sortings.map(
    (sorting) => `${sorting.name}%2C${sorting.order}`,
  );
  const sortingParams =
    results.length > 0 ? '&sort=' + results.join('&sort=') : '';

  const categoryParam = category ? `&category=${category}` : '';

  const response = await fetch(
    `${ENDPOINTS_PRODUCTS}?page=${page}&size=${size}${sortingParams}${categoryParam}`,
  );

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as ProductResponse;
  return data;
};

export const postAddItems = async (id: number) => {
  const response = await fetch(`${ENDPOINTS_CART}`, {
    method: 'POST',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      productId: id,
      quantity: 1,
    }),
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }
};

export const deleteItem = async (id: number) => {
  const response = await fetch(`${ENDPOINTS_REMOVE_CART(id)}`, {
    method: 'DELETE',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }
};

export const fetchCartItems = async () => {
  const response = await fetch(`${ENDPOINTS_CART}`, {
    method: 'GET',
    headers: { Authorization: token, 'Content-Type': 'application/json' },
  });

  if (!response.ok) {
    throw new Error(`200~299 이외의 응답이 발생하였습니다.${response.body}`);
  }

  const data = (await response.json()) as CartResponse;
  return data;
};
