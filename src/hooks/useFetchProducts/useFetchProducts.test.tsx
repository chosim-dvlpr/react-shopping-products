import { renderHook, waitFor, act } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { useFetchProducts } from '../index';
import { ENDPOINTS_PRODUCTS } from '../../api/endpoints';
import { Product } from '../../types/fetch';
import { SortingParam } from '../../types/sort';

import { server } from '../../mocks/node';
import { mockProductsResponse } from '../../mocks/products';

const queryClient = new QueryClient();
const wrapper = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
);

describe('useFetchProducts', () => {
  beforeEach(() => {
    queryClient.clear();
  });

  it('상품 목록 첫 조회시에는 20개의 아이템을 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });
  });

  it('상품 목록 조회 시 에러가 발생해야 한다.', async () => {
    server.use(
      http.get(ENDPOINTS_PRODUCTS, () => {
        return new HttpResponse(null, { status: 500 });
      }),
    );

    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.isPending).toBe(true);
    });
  });

  it('첫 상품목록 조회 이후부터는, 이전 결과에 이어 4개씩 아이템을 추가하여 가져온다.', async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    await act(async () => result.current.fetchNextPage());

    await waitFor(() => {
      expect(result.current.products).toHaveLength(24);
    });
  });

  it('마지막 페이지 도달 시 더 이상 요청하지 않는다.', async () => {
    const { result } = renderHook(() => useFetchProducts(), { wrapper });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products).toHaveLength(20);
    });

    for (let i = 0; i < 21; i++) {
      await waitFor(() => {
        act(() => {
          result.current.fetchNextPage();
        });
      });
    }

    await waitFor(() => {
      expect(result.current.products.at(-1)!.id).toBe(36);
    });

    act(() => {
      result.current.fetchNextPage();
    });

    await waitFor(() => {
      expect(result.current.products.at(-1)!.id).toBe(36);
    });
  });

  test.each([
    [
      [{ name: 'id', order: 'desc' }] as SortingParam[],
      [(a: Product, b: Product) => b.id - a.id],
    ],
    [
      [{ name: 'id', order: 'asc' }] as SortingParam[],
      [(a: Product, b: Product) => a.id - b.id],
    ],
    [
      [{ name: 'name', order: 'asc' }] as SortingParam[],
      [(a: Product, b: Product) => a.name.localeCompare(b.name)],
    ],
    [
      [
        { name: 'name', order: 'asc' },
        { name: 'id', order: 'desc' },
      ] as SortingParam[],
      [
        (a: Product, b: Product) => a.name.localeCompare(b.name),
        (a: Product, b: Product) => b.id - a.id,
      ],
    ],
  ])(
    '정렬 기준이 %s일 때 정렬된 결과가 나와야 한다.',
    async (
      sortings: SortingParam[],
      sortingFuncs: ((a: Product, b: Product) => number)[],
    ) => {
      const { result } = renderHook(() => useFetchProducts(sortings), {
        wrapper,
      });

      const mockProducts = mockProductsResponse.content;
      sortingFuncs.forEach((sortingFunc) => {
        mockProducts.sort(sortingFunc);
      });
      const SORTED_MOCK_PRODUCTS = mockProducts.slice(0, 20);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.products).toEqual(SORTED_MOCK_PRODUCTS);
      });
    },
  );

  test.each([['fashion'], ['electronics']])(
    '필터가 %s 일 때 필터링 된 결과가 나와야 한다.',
    async (category) => {
      const { result } = renderHook(() => useFetchProducts([], category), {
        wrapper,
      });

      const mockProducts = mockProductsResponse.content;
      const filteredMockProducts = mockProducts.filter(
        (product) => product.category === category,
      );
      const FILTERED_MOCK_PRODUCTS = filteredMockProducts.slice(0, 20);

      await waitFor(() => {
        expect(result.current.products).toHaveLength(20);
        expect(result.current.products).toStrictEqual(FILTERED_MOCK_PRODUCTS);
      });
    },
  );
});
