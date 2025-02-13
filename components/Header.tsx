import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  padding: 16px 0;
  border-bottom: 1px solid #eee;
  margin-bottom: 20px;
`;

const Logo = styled.img`
  height: 40px;
  width: auto;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 24px;
  color: #333;
  margin: 0;
  font-weight: 600;
`;

const Subtitle = styled.p`
  font-size: 14px;
  color: #666;
  line-height: 1.4;
  margin: 0;
`;

export const Header = () => {
  return (
    <HeaderContainer>
      <Logo 
        src="https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739378446131x671454155771771300/Vector.svg" 
        alt="GeoFast" 
      />
      <Title>Agora você pode editar em tempo real.</Title>
      <Subtitle>
        Com as informações abaixo você poderá editar e visualizar as alterações em tempo real
      </Subtitle>
    </HeaderContainer>
  );
}; 