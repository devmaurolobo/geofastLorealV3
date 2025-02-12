import styled from 'styled-components';

export const ProdutoSelecionadoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 24px;
  background: white;
  border-radius: 12px;
  border: 1px solid #eee;
  margin: 8px 0 8px 20px;
  position: relative;
`;

export const ProdutoImageSmall = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 16px;
`;

export const ProdutoSelecionadoInfo = styled.div`
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ProdutoSelecionadoTextos = styled.div`
  text-align: left;
  flex: 1;
`;

export const ProdutoSelecionadoTitulo = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0 0 4px 0;
`;

export const ProdutoSelecionadoSubtitulo = styled.div`
  font-size: 14px;
  color: #666;
`;


export const DeleteButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: 16px;
  color: #666;
  
  &:hover {
    color: #ff4444;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
`; 