import { Badge, CartIcon, LogoIcon } from '../../assets';
import * as S from './Header.styled';

interface HeaderProps {
  badgeCount: number;
}

function Header({ badgeCount }: HeaderProps) {
  return (
    <S.HeaderContainer>
      <S.LogoIcon src={LogoIcon} />
      <S.CartIconContainer>
        <S.CartIcon src={CartIcon} />
        <S.BadgeIconContainer>
          <S.BadgeIcon src={Badge} />
          <S.BadgeIconCount>{badgeCount}</S.BadgeIconCount>
        </S.BadgeIconContainer>
      </S.CartIconContainer>
    </S.HeaderContainer>
  );
}

export default Header;
