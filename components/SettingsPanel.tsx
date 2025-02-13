import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Preview, PreviewState } from '@creatomate/preview';
import { CreateButton } from './CreateButton';
import { ProductCarousel } from './ProductCarousel';
import Slider from 'react-slick';
import { Header } from './Header';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



// Adicionar interface SettingsPanelProps
interface SettingsPanelProps {
  preview: Preview;
  currentState?: PreviewState;
}

// Adicionar interface para ofertas


// Interface para os vídeos
interface VideoUrls {
  cabeca: string;
  assinatura: string;
}

// Adicionar interface Product
interface Product {
  id: number;
  imagem: string;
  titulo: string;
  subtitulo: string;
  feature: string;
  precoReal: string;
  precoCentavos: string;
}

// Adicionar componentes styled que estavam faltando
const Group = styled.div`
  margin-bottom: 20px;
`;

const GroupTitle = styled.h3`
  margin-bottom: 10px;
  font-size: 16px;
  color: #333;
`;

const ItemName = styled.span`
  font-size: 14px;
  text-align: center;
  margin-top: 8px;
`;

// Adicionar funções utilitárias
const setPropertyValue = async (
  preview: Preview,
  selector: string,
  value: string,
  modifications: Record<string, any>,
) => {
  if (!preview || typeof preview.setModifications !== 'function') {
    console.error('preview não é válido ou setModifications não é uma função');
    return;
  }

  if (value.trim()) {
    modifications[selector] = value;
  } else {
    delete modifications[selector];
  }

  try {
    await preview.setModifications(modifications);
  } catch (error) {
    console.error('Erro ao definir modificações:', error);
  }
};

// Definição das celebridades
const celebridades = [
  {
    id: 1,
    nome: 'AJ',
    foto: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739390984397x221334746432352960/thumbAJ.png?_gl=1*15q0sf8*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTM2ODU5NS4yMC4xLjE3MzkzOTA5NDMuNjAuMC4w'
  },
  {
    id: 2,
    nome: 'CD',
    foto: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739390968563x210028769460394400/thumbCD.png?_gl=1*15q0sf8*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTM2ODU5NS4yMC4xLjE3MzkzOTA5NDMuNjAuMC4w'
  },
  {
    id: 3,
    nome: 'CL',
    foto: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739391050283x935105451254024800/thumbCL.png?_gl=1*r2kq2w*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTM2ODU5NS4yMC4xLjE3MzkzOTA5NDMuNjAuMC4w'
  },
  {
    id: 4,
    nome: 'PB',
    foto: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739390977215x115139737743763520/thumbPB.png?_gl=1*ykfpj*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTM2ODU5NS4yMC4xLjE3MzkzOTA5NDMuNjAuMC4w'
  }
];

// Objeto com todos os vídeos organizados
const videosConfig = {
  'AJ': {
    'Tecnologia': {
      cabeca: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320563578x540353553171945660/cabLorealAJ.mp4?_gl=1*mdxrlk*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA1NTAuMTUuMC4w',
      assinatura: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320548620x855688049929861800/assLorealAJ.mp4?_gl=1*ts7jzz*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA1MTcuNDguMC4'
    }
  },
  'CD': {
    'Tecnologia': {
      cabeca: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320823340x314677354195926460/cabLorealCD.mp4?_gl=1*cfiv8d*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA4NzkuNjAuMC4w',
      assinatura: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320808780x869602339937597800/assLorealCD.mp4?_gl=1*1lt7h17*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA1ODkuNjAuMC4w'
    }
  },
  'CL': {
    'Tecnologia': {
      cabeca: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320851138x537274955092655900/cabLorealCL.mp4?_gl=1*1mevnss*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA5MzIuNy4wLjA.',
      assinatura: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320839948x329495788447920000/assLorealCL.mp4?_gl=1*e5qv9y*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA5MDguMzEuMC4w'
    }
  },
  'PB': {
    'Tecnologia': {
      cabeca: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320876224x254089496207782200/cabLorealPB.mp4?_gl=1*1aeewpj*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA5NjAuNDUuMC4w',
      assinatura: 'https://12a3388ae72b3046e48cc88a697af4c7.cdn.bubble.io/f1739320864359x250086892021992740/assLorealPB.mp4?_gl=1*p24dnc*_gcl_au*MTk1MDgwMTUyNy4xNzM5MjE3MDAw*_ga*MTU0NTM0MjAyNC4xNzM3MTQzMjQz*_ga_BFPVR2DEE2*MTczOTI3NjY0My4xOS4xLjE3MzkzMjA5NDUuNjAuMC4w'
    }
  }
} as const;

const SettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  const modificationsRef = useRef<Record<string, any>>({});
  const [selectedCelebridade, setSelectedCelebridade] = useState<string>('');
  const [selectedSegmento, setSelectedSegmento] = useState<string>('Tecnologia'); // Valor padrão
  const [selectedVideos, setSelectedVideos] = useState<VideoUrls | null>(null);

  const findElement = (elementName: string) => {
    return props.preview.getElements().find((element: any) => element.source.name === elementName);
  };

  // Função para filtrar e obter os vídeos
  const getVideos = (celebridade: string): VideoUrls | null => {
    const videos = videosConfig[celebridade as keyof typeof videosConfig]?.['Tecnologia'];
    return videos || null;
  };

  // Função para atualizar o preview
  const updatePreview = async (videos: VideoUrls) => {
    const elements = {
      cabeca: findElement('cabeca'),
      assinatura: findElement('assinatura')
    };

    // Atualiza cabeça
    if (elements.cabeca) {
        await setPropertyValue(
          props.preview,
        elements.cabeca.source.name,
        videos.cabeca,
          modificationsRef.current
        );
      }

    // Atualiza assinatura
    if (elements.assinatura) {
        await setPropertyValue(
          props.preview,
        elements.assinatura.source.name,
        videos.assinatura,
          modificationsRef.current
        );
      }
  };

  // Handler para seleção de celebridade
  const handleCelebridadeSelect = async (celebridade: string) => {
    setSelectedCelebridade(celebridade);
    const videos = getVideos(celebridade);
    
    if (videos) {
      setSelectedVideos(videos);
      await updatePreview(videos);
    }
  };

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  };
  const CelebrityCarousel = styled(Slider)`
  margin-top: 15px;
  

  .slick-track {
    display: flex;
    gap: 8px;
  }

  .slick-prev,
  .slick-next {
    width: 8px;
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
    left: -10px;
    &:before {
      content: '‹'; // Símbolo personalizado para seta esquerda
    }
  }

  .slick-next {
    right: -10px;
    &:before {
      content: '›'; // Símbolo personalizado para seta direita
    }
  }
`;

  // Remover função não utilizada
  const handleAddProduct = (produto: Product) => {
    // Remover esta função já que não está sendo usada
  };

  // Remover função não utilizada
  const handleUpdatePreview = (produto: Product) => {
    // Remover esta função já que não está sendo usada
  };

  return (
    <div>
      <Header />
      <Group>
        <GroupTitle>Selecione a Celebridade</GroupTitle>
        <CelebrityCarousel {...settings}>
          {celebridades.map((celeb) => (
            <ItemCard 
              key={celeb.id}
              selected={selectedCelebridade === celeb.nome}
              onClick={() => handleCelebridadeSelect(celeb.nome)}
            >
              <CelebrityImage src={celeb.foto} alt={celeb.nome} />          
            </ItemCard>
          ))}
        </CelebrityCarousel>  
      </Group>

      {/* Lista de Ofertas */}
      <Group>
        <GroupTitle>Ofertas Disponíveis</GroupTitle>
        <ProductCarousel 
          preview={props.preview}
        />
      </Group>
    </div>
  );
};

export default SettingsPanel;

const ItemCard = styled.div<{ selected: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  border: 2px solid ${props => props.selected ? '#2D9CA4' : 'F5F5F5'};
  cursor: pointer;
  padding: 2px;
  width: 160px;
  height: 160px;
  overflow: hidden;

  transition: all 0.2s ease;
  background: white;
  margin: 0 auto;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
`;

const CelebrityImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 2px;
  display: block;
`;

