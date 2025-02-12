import React from 'react';
import styled from 'styled-components';
import { Preview } from '@creatomate/preview';

interface SelectedProductsProps {
  produtos: ProdutoSelecionado[];
  setProdutos: (produtos: ProdutoSelecionado[]) => void;
  preview: Preview;
}

interface ProdutoSelecionado {
  imagem: string;
  nome: string;
  precoReal: string;
  precoCentavos: string;
}

const ProductCard = styled.div`
  display: flex;
  align-items: flex-start;
  padding: 16px;
  border-bottom: 1px solid #eee;
  gap: 16px;
`;

const ProductImage = styled.img`
  width: 80px;
  height: 80px;
  object-fit: contain;
`;

const ProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
`;

const ProductName = styled.h4`
  font-size: 16px;
  color: #333;
  margin: 0;
`;

const PriceContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const SelectedProducts: React.FC<SelectedProductsProps> = ({ 
  produtos, 
  setProdutos, 
  preview 
}) => {
  const handlePrecoChange = async (index: number, campo: 'precoReal' | 'precoCentavos', valor: string) => {
    const novosProdutos = [...produtos];
    
    if (campo === 'precoReal' && !/^\d*$/.test(valor)) return;
    if (campo === 'precoCentavos' && !/^\d{0,2}$/.test(valor)) return;

    novosProdutos[index] = {
      ...novosProdutos[index],
      [campo]: valor
    };

    setProdutos(novosProdutos);

    try {
      const modifications: Record<string, any> = {};
      novosProdutos.forEach((prod, i) => {
        modifications[`produto${i}_imagem`] = prod.imagem;
        modifications[`produto${i}_nome`] = prod.nome;
        modifications[`produto${i}_precoReal`] = prod.precoReal;
        modifications[`produto${i}_precoCentavos`] = prod.precoCentavos;
      });

      await preview.setModifications(modifications);
    } catch (error) {
      console.error('Erro ao atualizar preços:', error);
    }
  };

  if (produtos.length === 0) return null;

  return (
    <div>
      <h3>Produtos Selecionados ({produtos.length}/3)</h3>
      <div>
        {produtos.map((produto, index) => (
          <ProductCard key={index}>
            <ProductImage src={produto.imagem} alt={produto.nome} />
            <ProductInfo>
              <ProductName>{produto.nome}</ProductName>
              <PriceContainer>
                <span>R$</span>
                <input
                  type="text"
                  value={produto.precoReal}
                  onChange={(e) => handlePrecoChange(index, 'precoReal', e.target.value)}
                  style={{width: '50px'}}
                />
                <span>,</span>
                <input
                  type="text"
                  value={produto.precoCentavos}
                  onChange={(e) => handlePrecoChange(index, 'precoCentavos', e.target.value)}
                  style={{width: '30px'}}
                  maxLength={2}
                />
              </PriceContainer>
            </ProductInfo>
          </ProductCard>
        ))}
      </div>
    </div>
  );
};