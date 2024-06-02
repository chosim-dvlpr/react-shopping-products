const BASE_URL = import.meta.env.VITE_API_URL;
export const ENDPOINTS_PRODUCTS = `${BASE_URL}/products`;
export const ENDPOINTS_CART = `${BASE_URL}/cart-items`;
export const ENDPOINTS_REMOVE_CART = (id: number) =>
  `${BASE_URL}/cart-items/${id}`;
