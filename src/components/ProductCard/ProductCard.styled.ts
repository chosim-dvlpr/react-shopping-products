import styled from 'styled-components';

export const ProductCardContainer = styled.div``;

export const ProductImage = styled.img`
  width: 100%;
  height: 50%;
  object-fit: cover;
  border-radius: 0.8rem 0.8rem 0 0;
`;

export const ContentWrapper = styled.div`
  height: 50%;
  padding: 0.8rem;
  box-sizing: border-box;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const InfoWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const ProductName = styled.p`
  font-family: Inter;
  font-size: 1.4rem;
  font-weight: 700;
  line-height: 2rem;
  color: var(--black-color-2);
`;

export const ProductPrice = styled.p`
  color: var(--black-color-2);
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
