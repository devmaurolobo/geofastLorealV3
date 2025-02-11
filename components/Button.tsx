import React from 'react';
import styled from 'styled-components';

interface ButtonProps {
  onClick?: () => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const ButtonWrapper = styled.button<{ disabled?: boolean }>`
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  font-weight: 600;
  color: white;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background-color 0.2s;
  display: block;
  margin-left: auto;
  background: ${props => props.disabled ? '#ccc' : '#2ecc71'};
  opacity: ${props => props.disabled ? 0.7 : 1};

  &:hover {
    background: ${props => props.disabled ? '#ccc' : '#27ae60'};
  }
`;

export const Button: React.FC<ButtonProps> = ({ onClick, disabled, children }) => {
  return (
    <ButtonWrapper onClick={onClick} disabled={disabled}>
      {children}
    </ButtonWrapper>
  );
}; 