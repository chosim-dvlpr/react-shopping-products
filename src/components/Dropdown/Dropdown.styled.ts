import styled from 'styled-components';
import { ArrowDownIcon } from '../../assets';

export const DropdownContainer = styled.div`
  display: flex;
  justify-content: space-between;

  margin-bottom: 2.8rem;

  font-family: Inter;
  font-size: 1.4rem;
  line-height: 2rem;
`;

export const Dropdown = styled.select`
  border: 1px solid var(--black-color-1-10);
  border-radius: 0.8rem;

  padding: 0.8rem 2.8rem 0.8rem 0.8rem;
  background-color: var(--white-color-1);
  background: url(${ArrowDownIcon}) no-repeat right 0.8rem center;

  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
`;

export const ArrowIcon = styled.img``;
