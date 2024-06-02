export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  category: string;
}

export interface ProductSortOption {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface ProductPageableOption {
  sort: ProductSortOption;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}

interface ProductResponseWithoutContent {
  pageable: ProductPageableOption;
  last: boolean;
  totalPages: number;
  totalElements: number;
  sort: ProductSortOption;
  first: boolean;
  number: number;
  numberOfElements: number;
  size: number;
  empty: boolean;
}

export interface ProductResponse extends ProductResponseWithoutContent {
  content: Product[];
}


export interface Carts {
  id: number;
  quantity: number;
  product: Product;
}

export interface CartResponse extends ProductResponseWithoutContent {
  content: Carts[];
}
