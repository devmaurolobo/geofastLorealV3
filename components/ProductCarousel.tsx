import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState } from 'react';
import styled from 'styled-components';
import Slider from 'react-slick';
import { Preview } from '@creatomate/preview';

// Interfaces
interface ProductCarouselProps {
  preview: Preview;
}

interface Produto {
  id: number;
  produto: string;
  titulo: string;
  subtitulo: string;
}

interface ProdutoSelecionado {
  imagem: string;
  titulo: string;
  subtitulo: string;
  precoReal: string;
  precoCentavos: string;
}

// Array de produtos
const produtos: Produto[] = [
  {
    id: 1,
    titulo: 'Kit L\'Oréal Paris Protetor Solar Corporal FPS 70',
    subtitulo: 'Kit Protetor Solar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta1.png?alt=media&token=235e5701-54a8-4ac7-aadb-f716d30b475d.jpg',
  },
  {
    id: 2,
    titulo: 'Água Micelar L\'Oréal Paris 5 em 1 200ml',
    subtitulo: 'Água Micelar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta2.png?alt=media&token=791ef69c-b423-413a-bf5a-1ca61763236f.jpg',
  },
  {
    id: 3,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml3',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta3.png?alt=media&token=4580949b-2024-41c6-b964-f3ae8e09744a.jpg',
  },
  {
    id: 4,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml4',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta4.png?alt=media&token=e00d75af-03e4-4241-8851-4d720761c644.jpg',
  },
  {
    id: 5,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml5',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta5.png?alt=media&token=0930a758-b126-45b0-b017-7f66cd1ab5c4.jpg',
  },
  {
    id: 6,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml6',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta6.png?alt=media&token=b101d41a-b59c-4f80-84e3-0b043ae99560.jpg',
  },
  {
    id: 7,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml7',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta7.png?alt=media&token=9adfd991-c0eb-4251-aef7-0cf563eba3d6.jpg',
  },
  {
    id: 8,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml8',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta8.png?alt=media&token=900015ac-2cb1-446a-99fa-55aef1bf7970.jpg',
  },
  {
    id: 9,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml9',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta9.png?alt=media&token=363e356c-bb3c-42f3-a6ca-06f9594ff402.jpg',
  },
  {
    id: 10,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml10',
    subtitulo: 'Óleo Capilar',
    imagem: 'https://firebasestorage.googleapis.com/v0/b/orbita-89c83.firebasestorage.app/o/pngOfertas%2Foferta10.png?alt=media&token=2c4f6f34-05e1-4e58-a9f1-0df081e2e159.jpg',
  }
];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ preview }) => {
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);

  const isProdutoSelecionado = (produto: Produto) => {
    return produtosSelecionados.some(p => p.titulo === produto.titulo);
  };

  const handleProdutoSelect = async (produto: Produto) => {
    console.log('🎯 handleProdutoSelect iniciado:', produto);
    
    // Verifica se o produto já está selecionado
    const isProdutoJaSelecionado = isProdutoSelecionado(produto);
    console.log('🔍 Produto já selecionado?', isProdutoJaSelecionado);

    if (isProdutoJaSelecionado) {
      // Remove o produto da lista
      const novosProdutos = produtosSelecionados.filter(p => p.titulo !== produto.titulo);
      console.log('🗑️ Produtos após remoção:', novosProdutos);
      setProdutosSelecionados(novosProdutos);

      try {
        const modifications: Record<string, any> = {};
        
        // Atualiza as modificações com a nova lista
        novosProdutos.forEach((prod, index) => {
          updatePreviewProdutos(preview, prod, index, modifications);
        });

        // Limpa as modificações dos slots que não são mais usados
        for (let i = novosProdutos.length; i < 3; i++) {
          updatePreviewProdutos(preview, null, i, modifications);
        }

        await preview.setModifications(modifications);
      } catch (error) {
        console.error('❌ Erro ao atualizar produtos:', error);
      }
      return;
    }

    // Verifica se já atingiu o limite de 3 produtos
    if (produtosSelecionados.length >= 3) {
      console.log('⚠️ Limite de 3 produtos atingido!');
      alert('Você já selecionou o máximo de 3 produtos permitidos.');
      return;
    }

    // Adiciona o novo produto
    try {
      const novosProdutos = [...produtosSelecionados, produto];
      setProdutosSelecionados(novosProdutos);

      const modifications: Record<string, any> = {};
      novosProdutos.forEach((prod, index) => {
        updatePreviewProdutos(preview, prod, index, modifications);
      });

      await preview.setModifications(modifications);
    } catch (error) {
      console.error('❌ Erro ao adicionar produto:', error);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <Container>
      <CarouselSection>
        <SectionTitle>Ofertas Disponíveis</SectionTitle>
        <StyledSlider {...settings}>
          {produtos.map((produto) => (
            <ProdutoCard 
              key={produto.id}
              onClick={() => handleProdutoSelect(produto)}
              selected={isProdutoSelecionado(produto)}
            >
              <ProdutoImage src={produto.imagem} alt={produto.titulo} />
              <ProdutoTitulo>{produto.titulo}</ProdutoTitulo>
            </ProdutoCard>
          ))}
        </StyledSlider>
      </CarouselSection>

      {produtosSelecionados.length > 0 && (
        <SelectedSection>
          <SectionTitle>Produtos Selecionados</SectionTitle>
          <ProdutosSelecionadosList>
            {produtosSelecionados.map((produto, index) => (
              <ProdutoSelecionadoCard key={index}>
                <ProdutoImageSmall src={produto.imagem} alt={produto.titulo} />
                <ProdutoInfo>
                  <ProdutoTitulo>{produto.titulo}</ProdutoTitulo>
                  <ProdutoPreco>
                    {produto.subtitulo}
                    <PrecoDestaque>
                      R$ {produto.precoReal},
                      <PrecoCentavos>{produto.precoCentavos}</PrecoCentavos>
                    </PrecoDestaque>
                  </ProdutoPreco>
                </ProdutoInfo>
              </ProdutoSelecionadoCard>
            ))}
          </ProdutosSelecionadosList>
        </SelectedSection>
      )}
    </Container>
  );
};

// Estilos
const Container = styled.div`
  padding: 20px;
`;

const CarouselSection = styled.section`
  margin-bottom: 30px;
`;

const SelectedSection = styled.section`
  margin-top: 30px;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    gap: 15px;
  }
`;

const ProdutoCard = styled.div<{ selected?: boolean }>`
  position: relative;
  padding: 15px;
  border-radius: 8px;
  border: 1px solid #ddd;
  cursor: pointer;
  transition: all 0.2s ease;
  background: ${props => props.selected ? '#e6ffe6' : 'white'};

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
  }

  &:after {
    content: '✓';
    position: absolute;
    top: 10px;
    right: 10px;
    width: 20px;
    height: 20px;
    background: #4CAF50;
    color: white;
    border-radius: 50%;
    display: ${props => props.selected ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    font-size: 12px;
  }
`;

const ProdutoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 10px;
`;

const ProdutoImageSmall = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 10px;
`;

const ProdutoTitulo = styled.h4`
  font-size: 14px;
  margin: 0 0 10px;
`;

const PrecoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const PrecoOriginal = styled.span`
  text-decoration: line-through;
  color: #999;
  font-size: 14px;
`;

const PrecoAtual = styled.span`
  font-size: 18px;
  font-weight: bold;
  color: #0066cc;
`;

const ProdutosSelecionadosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ProdutoSelecionadoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 15px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
`;

const ProdutoInfo = styled.div`
  flex: 1;
`;

const ProdutoPreco = styled.div`
  font-size: 12px;
  color: #666;
`;
const PrecoDestaque = styled.div`
  font-size: 16px;
  color: #0066cc;
  font-weight: bold;
`;

const PrecoCentavos = styled.span`
  font-size: 12px;
`;
