import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

const Nav = styled.nav`
  display: flex;
  align-items: center;
  padding: 12px 24px;
  background: white;
  border-bottom: 1px solid #eee;
  gap: 24px;
`;

const BreadcrumbContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  display: flex;
  align-items: center;
  color: #666;

  &:hover {
    color: #333;
  }
`;

const Breadcrumb = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  color: #666;
  font-size: 14px;

  span {
    color: #333;
  }
`;

const RightSection = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 16px;
`;

const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const HelpButton = styled.button`
  background: #0066FF;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  font-size: 14px;
  cursor: pointer;

  &:hover {
    background: #0052cc;
  }
`;

export const Navigation = () => {
  return (
    <Nav>
      <Image 
        src="https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739378446131x671454155771771300/Vector.svg"
        alt="Logo"
        width={24}
        height={24}
      />
      
      <BreadcrumbContainer>
        <BackButton>
          ‹
        </BackButton>
        <Breadcrumb>
          Home / <span>Criação de Campanha</span>
        </Breadcrumb>
      </BreadcrumbContainer>

      <RightSection>
        <HelpButton>?</HelpButton>
        <UserAvatar>
          <span>👤</span>
        </UserAvatar>
      </RightSection>
    </Nav>
  );
}; 