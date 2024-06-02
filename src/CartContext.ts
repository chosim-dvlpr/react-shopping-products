import { createContext } from 'react';
import useFetchAddCart from './hooks/useFetchAddCart';

export const CartContext = createContext<ReturnType<typeof useFetchAddCart>>({
  cartIdSet: new Set(),
  setCartIdSet: () => {},
  patchToAddCart: () => {},
  patchToRemoveCart: async () => {},
  fetchCart: async () => [],
});
