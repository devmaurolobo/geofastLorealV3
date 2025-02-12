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
  imagem: string;
  titulo: string;
  subtitulo: string;
  feature: string;
}

interface ProdutoSelecionado {
  imagem: string;
  feature: string;
  titulo: string;
  subtitulo: string;
  precoReal: string;
  precoCentavos: string;
}

// Array de produtos
const produtos: Produto[] = [
  {
    id: 1,
    titulo: 'Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antirrugas Com Cor FPS 60',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337496524x771520678743958500/oferta1.png?_gl=1*ll1ygi*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 2,
    titulo: 'Água Micelar L\'Oréal Paris 5 em 1 200ml',
    subtitulo: "L'Oréal Paris",
    feature: 'Solução de Limpeza 5 em 1 400ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337501494x571288350261434100/oferta2.png?_gl=1*d3bvp9*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 3,
    titulo: 'Óleo Extraordinário',
    subtitulo: "L'Oréal Paris",
    feature: 'Tratamento Sublime Reconstrutor 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337506674x207754128235593250/oferta3.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 4,
    titulo: 'Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antirrugas Com Cor FPS 60',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337512240x775390511035061400/oferta4.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 5,
    titulo: 'Tinta de Cabelo',
    subtitulo: "L'Oréal Paris",
    feature: 'Casting Creme Gloss 400 Castanho Natural',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337517986x598654082347327400/oferta5.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 6,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml6',
    subtitulo: "L'Oréal Paris",
    feature: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337525020x337669568332362940/oferta6.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 7,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml7',
    subtitulo: "L'Oréal Paris",
    feature: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337530198x481989571846889860/oferta7.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 8,
    titulo: ' Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antioleosidade FPS 60 40g',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337534944x893607253015382000/oferta8.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 9,
    titulo: 'Óleo Extraordinário',
    subtitulo: "L'Oréal Paris", 
    feature: 'Tratamento Sublime Reconstrutor 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337539978x638378810115613200/oferta9.png?_gl=1*1ce7asm*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  },
  {
    id: 10,
    titulo: 'Kit Elseve Pure',
    subtitulo: "L'Oréal Paris",
    feature: 'Shampoo Hialurônico 375ml + Condicionador 170ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337544656x185974454250747100/oferta10.png?_gl=1*1ce7asm*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
  }
];

export const ProductCarousel: React.FC<ProductCarouselProps> = ({ preview }) => {
  const [produtosSelecionados, setProdutosSelecionados] = useState<ProdutoSelecionado[]>([]);

  // Definindo a função findElement
  const findElement = (elementName: string) => {
    return preview.getElements().find((element: any) => element.source.name === elementName);
  };

  const isProdutoSelecionado = (produto: Produto) => {
    return produtosSelecionados.some(p => p.titulo === produto.titulo);
  };

  const updatePreviewProdutos = async (
    preview: Preview,
    produto: Produto | null, 
    index: number,
    modifications: Record<string, any>
  ) => {
    console.log(`🔍 Atualizando produto ${index + 1}:`, produto);
  
    const slotNumber = index + 1;
  
    const elements = {
      produto: findElement(`produto${slotNumber}`),
      titulo: findElement(`titulo${slotNumber}`),
      subtitulo: findElement(`subtitulo${slotNumber}`),
      feature: findElement(`feature${slotNumber}`) // Adicionando feature
    };

    console.log(`📦 Elementos encontrados para slot ${slotNumber}:`, elements);

    // Atualiza produto
    if (elements.produto && produto) {
      try {
        modifications[`produto${slotNumber}.source`] = produto.imagem;
        console.log(`🖼️ Produto ${slotNumber}:`, produto.imagem);
      } catch (error) {
        console.error(`❌ Erro ao carregar imagem do produto ${slotNumber}:`, error);
        // Talvez usar uma imagem padrão/fallback
        modifications[`produto${slotNumber}.source`] = 'URL_DE_IMAGEM_PADRAO';
      }
    }

    // Atualiza título
    if (elements.titulo) {
      modifications[elements.titulo.source.name] = produto ? produto.titulo : '';
      console.log(`📝 Título ${slotNumber}:`, produto ? produto.titulo : 'removido');
    }

    // Atualiza subtítulo
    if (elements.subtitulo) {
      modifications[elements.subtitulo.source.name] = produto ? produto.subtitulo : '';
      console.log(`📄 Subtítulo ${slotNumber}:`, produto ? produto.subtitulo : 'removido');
    }

    // Atualiza feature
    if (elements.feature) {
      modifications[elements.feature.source.name] = produto ? produto.feature : '';
      console.log(`📄 Feature ${slotNumber}:`, produto ? produto.feature : 'removido');
    }

    console.log(`📊 Modifications para slot ${slotNumber}:`, modifications);
  };

  const handleProdutoSelect = async (produto: Produto) => {
    console.log('🎯 handleProdutoSelect iniciado:', produto);
    
    if (isProdutoSelecionado(produto)) {
      // Remove o produto e reorganiza os índices
      const novosProdutos = produtosSelecionados
        .filter(p => p.titulo !== produto.titulo);
      
      setProdutosSelecionados(novosProdutos);

      try {
        const modifications: Record<string, any> = {};
        
        // Atualiza os produtos restantes mantendo a ordem 1, 2, 3
        novosProdutos.forEach((prod, index) => {
          updatePreviewProdutos(preview, prod, index, modifications);
        });

        // Limpa os slots não utilizados
        for (let i = novosProdutos.length; i < 3; i++) {
          updatePreviewProdutos(preview, null, i, modifications);
        }

        await preview.setModifications(modifications);
        console.log('✅ Preview atualizado após remoção');
      } catch (error) {
        console.error('❌ Erro ao atualizar produtos:', error);
      }
      return;
    }

    if (produtosSelecionados.length >= 3) {
      console.log('⚠️ Limite de 3 produtos atingido!');
      alert('Você já selecionou o máximo de 3 produtos permitidos.');
      return;
    }

    try {
      const produtoSelecionado: ProdutoSelecionado = {
        imagem: produto.imagem,
        titulo: produto.titulo,
        subtitulo: produto.subtitulo,
        precoReal: "0",
        precoCentavos: "00",
        feature: produto.feature // Adicionando Feature aqui
      };
    
      // Adiciona o novo produto no próximo slot disponível
      const novoIndex = produtosSelecionados.length; // 0, 1, ou 2
      const novosProdutos = [...produtosSelecionados, produtoSelecionado];
      
      console.log(`➕ Adicionando produto ao slot ${novoIndex + 1}`);
      
      const modifications: Record<string, any> = {};
      novosProdutos.forEach((prod, index) => {
        updatePreviewProdutos(preview, prod, index, modifications);
      });

      setProdutosSelecionados(novosProdutos);
      await preview.setModifications(modifications);
      console.log('✅ Preview atualizado após adição');
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
          {produtos.map((produto) => {
            const slotNumber = produtosSelecionados.findIndex(p => p.titulo === produto.titulo) + 1;
            return (
              <ProdutoCard 
                key={produto.id}
                onClick={() => handleProdutoSelect(produto)}
                selected={isProdutoSelecionado(produto)}
                slotNumber={slotNumber > 0 ? slotNumber : undefined}
              >
                <ProdutoImage src={produto.imagem} alt={produto.titulo} />
                <ProdutoTitulo>{produto.titulo}</ProdutoTitulo>
                <ProdutoInfo>
                  {produto.subtitulo} • {produto.feature}
                </ProdutoInfo>
              </ProdutoCard>
            );
          })}
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
    margin-left: 0;
  }
  
  .slick-slide {
    padding: 0 8px;
    height: auto;
    > div {
      height: 100%;
      display: flex;
    }
  }

  .slick-list {
    margin: 0 -8px;
  }
`;

const ProdutoCard = styled.div<{ selected?: boolean; slotNumber?: number }>`
  position: relative;
  padding: 12px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#4CAF50' : '#e0e0e0'};
  cursor: pointer;
  transition: all 0.3s ease;
  background: ${props => props.selected ? '#f8fff8' : 'white'};
  box-shadow: 0 2px 8px rgba(0,0,0,0.05);
  margin: 10px 0;
  display: flex !important;
  flex-direction: column;
  height: 300px;
  width: 100%;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0,0,0,0.1);
  }

  &:after {
    content: '${props => props.selected ? props.slotNumber || '✓' : ''}';
    position: absolute;
    top: -12px;
    right: -12px;
    width: 28px;
    height: 28px;
    background: #4CAF50;
    color: white;
    border-radius: 50%;
    display: ${props => props.selected ? 'flex' : 'none'};
    align-items: center;
    justify-content: center;
    font-size: 16px;
    font-weight: bold;
    border: 2px solid white;
    box-shadow: 0 2px 4px rgba(0,0,0,0.2);
    z-index: 1;
  }
`;

const ProdutoImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 12px;
  padding: 10px;
  transition: all 0.3s ease;
`;

const ProdutoImageSmall = styled.img`
  width: 60px;
  height: 60px;
  object-fit: contain;
  margin-right: 10px;
`;

const ProdutoTitulo = styled.h4`
  font-size: 13px;
  margin: 0 0 4px 0;
  color: #333;
  text-align: center;
  line-height: 1.3;
  font-weight: bold;
`;

const ProdutoInfo = styled.div`
  text-align: center;
  margin-top: auto;
  padding: 0 5px;
  font-size: 11px;
  color: #666;
  line-height: 1.2;
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

