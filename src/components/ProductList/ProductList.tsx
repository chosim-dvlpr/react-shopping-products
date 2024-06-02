import { useEffect, useRef } from 'react';
import ProductCard from '../ProductCard/ProductCard';
import * as S from './ProductList.styled';
import { Product } from '../../types/fetch';
import useIntersectionObserver from '../../hooks/useIntersectionObserver';

interface ProductListProps {
  products: Product[];
  page: number;
  isPending: boolean;
  isLast: boolean;
  fetchNextPage: () => void;
}

function ProductList({
  products,
  page,
  isPending,
  isLast,
  fetchNextPage,
}: ProductListProps) {
  const target = useRef(null);
  const { observe, unobserve } = useIntersectionObserver(() =>
    fetchNextPage(),
  );

  useEffect(() => {
    if (!target.current || isPending || isLast) return;
    const currentTarget = target.current;
    observe(currentTarget);

    return () => {
      if (currentTarget) {
        unobserve(currentTarget);
      }
    };
  }, [page, isPending, isLast]);

  return (
    <S.ProductListContainer>
      {products.map((product, i) => {
        return <ProductCard key={i} product={product} />;
      })}
      <S.ObserverContainer ref={target} />
    </S.ProductListContainer>
  );
}

export default ProductList;
