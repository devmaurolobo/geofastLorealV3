import React from 'react';
import styled from 'styled-components';

const Button = styled.button`
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 12px 24px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  width: 100%;
  transition: background 0.2s;

  &:hover {
    background: #0052cc;
  }
`;

export const CreateButton = () => {
  const handleClick = () => {
    window.location.href = 'https://orbita.aureatech.io/version-test/viewtemplate';
  };

  return (
    <Button onClick={handleClick}>
      CRIAR MATERIAL
    </Button>
  );
};
