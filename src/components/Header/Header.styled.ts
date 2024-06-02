import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-sizing: border-box;
  padding: 0 2.4rem;
  background-color: #000000;
  width: 100%;
  height: 6.4rem;
`;

export const LogoIcon = styled.img`
  width: 5.6rem;
  aspect-ratio: 1;
`;

export const CartIconContainer = styled.div`
  position: relative;
`;

export const CartIcon = styled.img`
  width: 3.2rem;
  height: 3.2rem;
`;

export const BadgeIconContainer = styled.div`
  position: absolute;
  bottom: 0;
  right: 0;

  width: 1.9rem;
  height: 1.9rem;
`;

export const BadgeIcon = styled.img`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
`;

export const BadgeIconCount = styled.p`
  font-family: Montserrat;
  font-size: 1rem;
  font-weight: 700;

  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;
