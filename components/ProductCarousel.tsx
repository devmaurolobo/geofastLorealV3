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
  precoReal: string;
  precoCentavos: string;
}

interface ProdutoSelecionado {
  id: number;
  imagem: string;
  feature: string;
  titulo: string;
  subtitulo: string;
  precoReal: string;
  precoCentavos: string;
}

interface ProdutoCardProps {
  selected?: boolean;
  slotNumber?: number;
}

// Array de produtos
const produtos: Produto[] = [
  {
    id: 1,
    titulo: 'Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antirrugas Com Cor FPS 60',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337496524x771520678743958500/oferta1.png?_gl=1*ll1ygi*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "25",
    precoCentavos: "90"
  },
  {
    id: 2,
    titulo: 'Água Micelar L\'Oréal Paris 5 em 1 200ml',
    subtitulo: "L'Oréal Paris",
    feature: 'Solução de Limpeza 5 em 1 400ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337501494x571288350261434100/oferta2.png?_gl=1*d3bvp9*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "15",
    precoCentavos: "70"
  },
  {
    id: 3,
    titulo: 'Óleo Extraordinário',
    subtitulo: "L'Oréal Paris",
    feature: 'Tratamento Sublime Reconstrutor 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337506674x207754128235593250/oferta3.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "14",
    precoCentavos: "80"
  },
  {
    id: 4,
    titulo: 'Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antirrugas Com Cor FPS 60',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337512240x775390511035061400/oferta4.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "12",
    precoCentavos: "80"
  },
  {
    id: 5,
    titulo: 'Tinta de Cabelo',
    subtitulo: "L'Oréal Paris",
    feature: 'Casting Creme Gloss 400 Castanho Natural',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337517986x598654082347327400/oferta5.png?_gl=1*tv68hk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "15",
    precoCentavos: "90"
  },
  {
    id: 6,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml6',
    subtitulo: "L'Oréal Paris",
    feature: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337525020x337669568332362940/oferta6.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "18",
    precoCentavos: "90"
  },
  {
    id: 7,
    titulo: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml7',
    subtitulo: "L'Oréal Paris",
    feature: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337530198x481989571846889860/oferta7.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "21",
    precoCentavos: "90"
  },
  {
    id: 8,
    titulo: ' Protetor Solar Facial',
    subtitulo: "L'Oréal Paris",
    feature: 'Protetor Solar Expertise Antioleosidade FPS 60 40g',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337534944x893607253015382000/oferta8.png?_gl=1*2ko9o7*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "30",
    precoCentavos: "90"
  },
  {
    id: 9,
    titulo: 'Óleo Extraordinário',
    subtitulo: "L'Oréal Paris", 
    feature: 'Tratamento Sublime Reconstrutor 100ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337539978x638378810115613200/oferta9.png?_gl=1*1ce7asm*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "50",
    precoCentavos: "60"
  },
  {
    id: 10,
    titulo: 'Kit Elseve Pure',
    subtitulo: "L'Oréal Paris",
    feature: 'Shampoo Hialurônico 375ml + Condicionador 170ml',
    imagem: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739337544656x185974454250747100/oferta10.png?_gl=1*1ce7asm*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMzcxMDEuNjAuMC4w',
    precoReal: "70",
    precoCentavos: "40"
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
    produto: Produto | ProdutoSelecionado | null,
    index: number,
    modifications: Record<string, any>
  ) => {
    console.log(`🔍 Atualizando produto ${index + 1}:`, produto);
  
    const slotNumber = index + 1;
  
    const elements = {
      produto: findElement(`produto${slotNumber}`),
      titulo: findElement(`titulo${slotNumber}`),
      subtitulo: findElement(`subtitulo${slotNumber}`),
      feature: findElement(`feature${slotNumber}`),
      reais: findElement(`reais${slotNumber}`),
      centavos: findElement(`centavos${slotNumber}`)
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

    // Atualiza preço (reais e centavos)
    if (elements.reais) {
      modifications[elements.reais.source.name] = produto ? produto.precoReal : '0';
      console.log(`💰 Reais ${slotNumber}:`, produto ? produto.precoReal : '0');
    }

    if (elements.centavos) {
      modifications[elements.centavos.source.name] = produto ? produto.precoCentavos : '00';
      console.log(`💰 Centavos ${slotNumber}:`, produto ? produto.precoCentavos : '00');
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
        id: produto.id,
        imagem: produto.imagem,
        titulo: produto.titulo,
        subtitulo: produto.subtitulo,
        precoReal: "0",
        precoCentavos: "00",
        feature: produto.feature
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

  const handlePrecoChange = async (index: number, campo: 'precoReal' | 'precoCentavos', valor: string) => {
    const novosProdutos = [...produtosSelecionados];
    
    // Validação dos inputs
    if (campo === 'precoReal' && !/^\d*$/.test(valor)) return;
    if (campo === 'precoCentavos' && !/^\d{0,2}$/.test(valor)) return;

    novosProdutos[index] = {
      ...novosProdutos[index],
      [campo]: valor
    };

    setProdutosSelecionados(novosProdutos);

    try {
      const modifications: Record<string, any> = {};
      novosProdutos.forEach((prod, idx) => {
        const slotNumber = idx + 1;
        modifications[`reais${slotNumber}`] = prod.precoReal || '0';
        modifications[`centavos${slotNumber}`] = prod.precoCentavos || '00';
      });

      await preview.setModifications(modifications);
      console.log('✅ Preview atualizado com novos preços');
    } catch (error) {
      console.error('❌ Erro ao atualizar preços:', error);
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
                <ProdutoInfo>
                  <ProdutoTitulo>{produto.titulo}</ProdutoTitulo>
                  <ProdutoSubtitulo>{produto.subtitulo}</ProdutoSubtitulo>
                  <ProdutoFeature>{produto.feature}</ProdutoFeature>
                </ProdutoInfo>
              </ProdutoCard>
            );
          })}
        </StyledSlider>
      </CarouselSection>

      {produtosSelecionados.length > 0 && (
        <SelectedSection>
          <SectionTitle>
            <CartIcon 
              src="https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739408201530x447285901418742000/solar_bag-3-outline.svg" 
              alt="Ícone de carrinho"
            />
            Ofertas
          </SectionTitle>
          <ProdutosSelecionadosList>
            {produtosSelecionados.map((produto, index) => (
              <ProdutoSelecionadoCard key={index}>
                <SlotBadge>{index + 1}</SlotBadge>
                <ProdutoImageSmall src={produto.imagem} alt={produto.titulo} />
                <ProdutoSelecionadoInfo>
                  <ProdutoSelecionadoTextos>
                    <ProdutoSelecionadoTitulo>{produto.titulo}</ProdutoSelecionadoTitulo>
              
                  </ProdutoSelecionadoTextos>
                  <PrecoContainer>
  <PrecoWrapper>
    <PrecoSymbol>R$</PrecoSymbol>
    <PrecoInput
      type="text"
      value={produto.precoReal}
      onChange={(e) => handlePrecoChange(index, 'precoReal', e.target.value)}
    />
    <PrecoSeparator>,</PrecoSeparator>
    <CentavosInput
      type="text"
      value={produto.precoCentavos}
      onChange={(e) => handlePrecoChange(index, 'precoCentavos', e.target.value)}
      maxLength={2}
    />
  </PrecoWrapper>
</PrecoContainer>
                </ProdutoSelecionadoInfo>
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

`;

const CarouselSection = styled.section`
  margin-top: 15px;
  padding: 5px;

  .slick-track {
    display: flex;
    gap: 8px;
  }

  .slick-prev,
  .slick-next {
    width: 12px;
    height: 24px;
    z-index: 1;
    
    &:before {
      color: #2D9CA4; // Cor principal das setas
      font-size: 24px;
      opacity: 1;
    }

    &:hover:before {
      color: #248891; // Cor ao passar o mouse
    }

    &.slick-disabled:before {
      color: #ccc; // Cor quando desabilitado
    }
  } 

  .slick-prev {
    left: -20px;
    &:before {
      content: '‹'; // Símbolo personalizado para seta esquerda
    }
  }

  .slick-next {
    right: -16px;
    &:before {
      content: '›'; // Símbolo personalizado para seta direita
    }
  }
`;
const SelectedSection = styled.section`
  margin-top: 30px;
  width: 100%;
`;

const SectionTitle = styled.h3`
  margin-bottom: 20px;
  font-size: 18px;
  color: #333;
`;

const StyledSlider = styled(Slider)`
  .slick-track {
    display: flex;
    gap: 10px;
  }
`;
const ProdutoCard = styled.div<ProdutoCardProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 4px;
  border: 2px solid ${props => props.selected ? '#2D9CA4' : 'F5F5F5'};
  cursor: pointer;
  box-shadow:   1px 1px 1px 1px rgba(0,0,0,0.1);
  width: 150px; // Largura fixa para todos os cards
  height: 150px; // Altura fixa para todos os cards
  padding: 4x;

  transition: all 0.2s ease;
  background: white;
  margin: 2px auto; // Adicionada margem superior e inferior de 20px

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
`;

const ProdutoImage = styled.img`
  height: 80px;
  width: 80px;
  object-fit: contain;
  border-radius: 4px;
  margin: 0 auto;
  padding: 4px;
  display: block;
`;
const ProdutoImageSmall = styled.img`
  width: 40px;
  height: 40px;
  object-fit: contain;
  margin-right: 8px;
  padding: 2px;
  background: #fff;
  border-radius: 4px;
`;

const ProdutoInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ProdutoTitulo = styled.h4`
  font-size: 8px;
  font-weight: 600;
  color: #333;
  margin: 0 0 4px 0;
  line-height: 1.2;
  text-align: center;
  padding: 0 8px;
`;

const ProdutoSubtitulo = styled.div`
  font-size: 6px;
  color: #666;
  margin-bottom: 2px;
  text-align: center;
  padding: 0 8px;
`;

const ProdutoFeature = styled.div`
  font-size: 6px;
  color: #888;
  line-height: 1.2;
  text-align: center;
  padding: 0 8px;
`;

const PrecoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 8px;
`;
const PrecoWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end; // Alinha o conteúdo à direita
  background: #FFFFF5;
  padding: 8px 12px;
  border-radius: 6px;
  border: 1px solid #F5F5F5;
  margin-left: 80px;ra o elemento para a direita
  min-width: 120px; // Garante um espaço mínimo
`;

const PrecoInput = styled.input`
  width: 32px;
  border: none;
  background: transparent;
  font-size: 14px;
  color: #333;
  text-align: right; // Alinha o texto do input à direita
  padding: 0;

  &:focus {
    outline: none;
  }
`;

const PrecoSymbol = styled.span`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin-right: 4px;
`;

const PrecoSeparator = styled.span`
  color: #666;
  font-size: 14px;
  font-weight: 500;
  margin: 0 2px;
`;



const CentavosInput = styled(PrecoInput)`
  width: 24px;
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  width: 32px;
  height: 32px;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  opacity: 0.6;

  svg {
    width: 18px;
    height: 18px;
    color: #666;
    transition: all 0.2s ease;
  }

  &:hover {
    opacity: 1;
    svg {
      color: #ff4d4d;
    }
  }
`;

const ProdutosSelecionadosList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin-otton: 15px;
  width: 100%;
`;

const ProdutoSelecionadoCard = styled.div`
  display: flex;
  align-items: center;
  padding: 12px 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
  border: 1px solid #eee;
  height: 48PX;
  position: relative;

  &:hover {
    box-shadow: 0 4px 8px rgba(0,0,0,0.1);
    transform: translateY(-1px);
  }
`;
const SlotBadge = styled.div`
  position: relative;
  left: -25px;
  width: 24px;
  height: 24px;
  background: #CACACA;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 500;
  border: 1px solid white;
  box-shadow: 0 1px 2px rgba(0,0,0,0.1);
  z-index: 10;
`; 

const ProdutoSelecionadoInfo = styled.div`
  flex: 1;
  display: flex;
 ;
`;

const ProdutoSelecionadoTextos = styled.div`
  text-align: center;
`;

const ProdutoSelecionadoTitulo = styled.h5`
  font-size: 8px;
  font-weight: 600;
  color: #333;
  line-height: 1.3;
  text-align: center;
`;

const ProdutoSelecionadoSubtitulo = styled.div`
  font-size: 6px;
  color: #666;
  margin-bottom: 4px;
  text-align: center;
`;

const CartIcon = styled.img`
  width: 20px;
  height: 20px;
  margin-right: 8px;
`;