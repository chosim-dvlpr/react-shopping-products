import { act, renderHook, waitFor } from '@testing-library/react';
import useFetchAddCart from './useFetchAddCart';

describe('useFetchAddCart', () => {
  it('장바구니에 담는 API를 호출하면 해당 제품의 id는 cartIdSet에 포함되어야 한다.', () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(() => useFetchAddCart());

    act(() => {
      result.current.patchToAddCart(PRODUCT_ID);
    });

    expect(result.current.cartIdSet.has(PRODUCT_ID)).toBe(true);
  });

  it('장바구니에서 삭제하는 API를 호출하면 해당 제품의 id는 cartIdSet에서 삭제되어야 한다.', () => {
    const PRODUCT_ID = 3;
    const { result } = renderHook(() => useFetchAddCart());

    act(() => {
      result.current.patchToRemoveCart(PRODUCT_ID);
    });

    expect(result.current.cartIdSet.has(PRODUCT_ID)).toBe(false);
  });

  it('장바구니에 담겨있지 않은 제품을 담으면 장바구니에 담긴 제품 종류 개수가 증가되어야 한다.', () => {
    const { result } = renderHook(() => useFetchAddCart());

    expect(result.current.cartIdSet.size).toBe(0);

    act(() => {
      result.current.patchToAddCart(3);
    });

    expect(result.current.cartIdSet.size).toBe(1);
  });

  it('장바구니에 담겨있는 제품을 삭제하면 장바구니에 담긴 제품 종류 개수가 감소되어야 한다.', async () => {
    const { result } = renderHook(() => useFetchAddCart());

    act(() => {
      result.current.patchToAddCart(3);
    });

    expect(result.current.cartIdSet.size).toBe(1);

    await waitFor(() => {
      result.current.patchToRemoveCart(3);
    });

    expect(result.current.cartIdSet.size).toBe(0);
  });

  // 해결하지 못한 테스트
  // it('장바구니에 제품을 추가하고 장바구니를 다시 불러왔을 때, 해당 제품이 포함되어 있어야한다.', async () => {
  //   const PRODUCT_ID = 3;
  //   const { result } = renderHook(() => useFetchAddCart());

  //   await waitFor(() => {
  //     result.current.patchToAddCart(PRODUCT_ID);
  //   });

  //   let cartItems = [];
  //   await waitFor(async () => {
  //     cartItems = await result.current.fetchCart();
  //     console.log(cartItems);
  //     expect(
  //       (await result.current.fetchCart()).some(
  //         (item) => item.product.id === PRODUCT_ID,
  //       ),
  //     ).toBe(true);
  //   });

  //   // expect(
  //   //   (await result.current.fetchCart()).some((item) => item.id === PRODUCT_ID),
  //   // ).toBe(true);
  // });

  // it('장바구니에 제품을 두 개 추가하고 장바구니를 다시 불러왔을 때, 해당 제품들이 포함되어 있어야한다.', async () => {
  //   const PRODUCT_ID_TWO = 2;
  //   const PRODUCT_ID_THREE = 3;
  //   const { result } = renderHook(() => useFetchAddCart());

  //   act(() => {
  //     result.current.patchToAddCart(PRODUCT_ID_TWO);
  //     result.current.patchToAddCart(PRODUCT_ID_THREE);
  //   });

  //   expect(
  //     (await result.current.fetchCart()).some(
  //       (item) => item.id === PRODUCT_ID_TWO,
  //     ),
  //   ).toBe(true);
  //   expect(
  //     (await result.current.fetchCart()).some(
  //       (item) => item.id === PRODUCT_ID_THREE,
  //     ),
  //   ).toBe(true);
  // });
});
