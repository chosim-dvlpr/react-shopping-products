import styled from 'styled-components';

const roundButtonCSS = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.4rem 0.8rem;
  gap: 0.4rem;
  border-radius: 0.4rem;
  border: none;
  box-sizing: border-box;

  font-weight: 600;
  line-height: 1.5rem;
`;

export const AddButton = styled(roundButtonCSS)`
  background: var(--black-color-1);
  color: var(--white-color-1);
`;

export const DeleteButton = styled(roundButtonCSS)`
  background: var(--gray-color-1);
  color: var(--black-color-1);
`;
