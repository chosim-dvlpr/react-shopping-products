import React, { useState, useEffect, useContext } from 'react';

import { AddCartIcon, DeleteCartIcon } from '../../assets';
import * as S from './AddCartButton.styled';
import { CartContext } from '../../CartContext';

interface AddCartButtonProps {
  id: number;
  onAddClick: (event: React.MouseEvent) => void;
  onDeleteClick: (event: React.MouseEvent) => void;
}
function AddCartButton({ id, onAddClick, onDeleteClick }: AddCartButtonProps) {
  const { cartIdSet } = useContext(CartContext);
  
  useEffect(() => {
    setIsClicked(cartIdSet.has(id));
  }, [cartIdSet,id]);

  const [isClicked, setIsClicked] = useState(false);
  const handleDeleteClick = (event: React.MouseEvent) => {
    onDeleteClick(event);
    setIsClicked(false);
  };

  const handleAddClick = (event: React.MouseEvent) => {
    onAddClick(event);
    setIsClicked(true);
  };

  return isClicked ? (
    <S.DeleteButton onClick={handleDeleteClick}>
      <img src={DeleteCartIcon} />
      빼기
    </S.DeleteButton>
  ) : (
    <S.AddButton onClick={handleAddClick}>
      <img src={AddCartIcon} />
      담기
    </S.AddButton>
  );
}

export default AddCartButton;
