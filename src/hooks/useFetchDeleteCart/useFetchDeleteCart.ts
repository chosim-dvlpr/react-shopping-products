import { useMutation, useQueryClient } from '@tanstack/react-query';

import { deleteItem } from '../../api/products';
import { fetchCartItems } from '../../api/cartItems';
import { QUERY_KEYS } from '../../constants/queryKeys';

const useFetchDeleteCart = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async (id: number) => {
      const cartItemsResponse = await fetchCartItems();
      const cartItemToDelete = cartItemsResponse.content.find(
        (item) => item.product.id === id,
      );

      if (!cartItemToDelete) {
        throw new Error('상품이 장바구니에 없습니다.');
      }
      await deleteItem(cartItemToDelete.id);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.cartItems] });
    },
  });

  return {
    deleteCartItem: mutate,
  };
};

export default useFetchDeleteCart;
