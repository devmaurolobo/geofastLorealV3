import React from 'react';
import styled from 'styled-components';

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo src="https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739390984397x221334746432352960/logo.png" alt="Logo" />
      <Title>Gerador de Vídeos</Title>
    </HeaderContainer>
  );
};

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
`;

const Title = styled.h1`
  font-size: 20px;
  color: #333;
  margin: 0;
`; 