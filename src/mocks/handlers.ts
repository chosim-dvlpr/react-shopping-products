import { HttpResponse, http, StrictRequest } from 'msw';
import { ENDPOINTS_CART, ENDPOINTS_PRODUCTS } from '../api/endpoints';
import { ProductResponse } from '../types/fetch';
import productSorter from '../utils/productSorter';
import { mockCart as mockCartResponse } from './cart';
import { mockProductsResponse } from './products';

const filterProductHandler = (
  productCopy: ProductResponse,
  category: string | null,
) => {
  return category
    ? productCopy.content.filter((product) => product.category === category)
    : productCopy.content;
};

const sortProductHandler = (
  sortings: string[],
  productCopy: ProductResponse,
) => {
  return sortings.length > 0
    ? productSorter(sortings, productCopy)
    : productCopy;
};

export const handlers = [
  http.get(ENDPOINTS_PRODUCTS, ({ request }) => {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page'));
    const size = Number(url.searchParams.get('size'));
    const sortings = url.searchParams.getAll('sort');
    const category = url.searchParams.get('category');

    const productCopy = Object.assign({}, mockProductsResponse);
    productCopy.content = filterProductHandler(productCopy, category);

    const productSorted = sortProductHandler(sortings, productCopy);

    const start = page * size;
    const end = (page + 1) * size;
    const productSliced = Object.assign({}, productSorted);
    productSliced.content = productSorted.content.slice(start, end);
    productSliced.last = productSliced.content.at(-1)!.id === 127;

    return HttpResponse.json(productSliced);
  }),

  // 카트에 상품 담기
  // 상품 담는 api 호출
  // -> cart-items (GET) 호출 대신 cart.json에 mock data 추가
  // -> mock data에서 id값이 같은 것 찾기
  http.post(
    `${ENDPOINTS_CART}`,
    async ({ request }: { request: StrictRequest<number> }) => {
      const id = await request.json();
      const findProduct = mockProductsResponse.content.find(
        (product) => product.id === id,
      );
      if (findProduct) {
        const data = {
          id: Math.random() * 1000,
          quantity: 1,
          product: findProduct,
        };
        mockCartResponse.content = [...mockCartResponse.content, data];
      }
      return HttpResponse.json(mockCartResponse);
    },
  ),
  http.get(`${ENDPOINTS_CART}`, async () => {
    return HttpResponse.json(mockCartResponse);
  }),

  // 카트에서 상품 제거
  http.delete(`${ENDPOINTS_CART}/:id`, ({ params }) => {
    const id = Number(params.id);
    const newMockCart = mockCartResponse.content.filter(
      (cart) => cart.id !== id,
    );
    mockCartResponse.content = newMockCart;
  }),
];
