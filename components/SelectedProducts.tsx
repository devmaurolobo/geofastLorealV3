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
          <div key={index}>
            <img src={produto.imagem} alt={produto.nome} style={{width: '60px', height: '60px', objectFit: 'contain'}} />
            <div>
              <h4>{produto.nome}</h4>
              <div>
                <input
                  type="text"
                  value={produto.precoReal}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePrecoChange(index, 'precoReal', e.target.value)}
                  placeholder="R$"
                  style={{width: '50px'}}
                />
                <span>,</span>
                <input
                  type="text"
                  value={produto.precoCentavos}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => handlePrecoChange(index, 'precoCentavos', e.target.value)}
                  placeholder="00"
                  maxLength={2}
                  style={{width: '30px'}}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};