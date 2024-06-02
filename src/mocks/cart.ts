import { CartResponse } from '../types/fetch';

export const mockCart: CartResponse = {
  content: [],
  pageable: {
    sort: {
      sorted: false,
      unsorted: true,
      empty: true,
    },
    pageNumber: 0,
    pageSize: 20,
    offset: 0,
    paged: true,
    unpaged: false,
  },
  last: true,
  totalPages: 1,
  totalElements: 3,
  sort: {
    sorted: false,
    unsorted: true,
    empty: true,
  },
  first: true,
  number: 0,
  numberOfElements: 3,
  size: 20,
  empty: false,
};
