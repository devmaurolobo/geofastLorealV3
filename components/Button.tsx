import styled from 'styled-components';

export const Button = styled.button`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: pointer;
  transition: background-color 0.2s;

  &:disabled {
    cursor: not-allowed;
    opacity: 0.7;
  }
`;
