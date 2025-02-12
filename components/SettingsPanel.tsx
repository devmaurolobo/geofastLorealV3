import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Preview, PreviewState } from '@creatomate/preview';
import { CreateButton } from './CreateButton';
import { ProductCarousel } from './ProductCarousel';


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
    foto: 'https://02cababed70b81fd6ba44180993206c4.cdn.bubble.io/f1738866274704x787186918500453900/Leonardo_Phoenix_10_INSTITUCIONALPREGAO_DE_GUERRASUPER_MEGA_VE_2.jpg?_gl=1*p4tvop*_gcl_aw*R0NMLjE3Mzg3NTA4NzkuQ2p3S0NBaUF0WXk5QmhCY0Vpd0FOV1FRTDhNaXhLQzJzWUR3Q0gyeU1JMTdqenVPZWt4eXBINVlpSXBOY3M2Y1VERjF4bWpMcFVWZmN4b0NCNHdRQXZEX0J3RQ..*_gcl_au*MTI4Nzk3MzgyMy4xNzM0OTE2MTcw*_ga*MTM2NDM0MTY0MS4xNjk4MTY1OTE2*_ga_BFPVR2DEE2*MTczOTMxNzgzMi4yMTcuMS4xNzM5MzE3ODUzLjM5LjAuMA..'
  },
  {
    id: 2,
    nome: 'CD',
    foto: 'https://02cababed70b81fd6ba44180993206c4.cdn.bubble.io/f1738866274704x787186918500453900/Leonardo_Phoenix_10_INSTITUCIONALPREGAO_DE_GUERRASUPER_MEGA_VE_2.jpg?_gl=1*p4tvop*_gcl_aw*R0NMLjE3Mzg3NTA4NzkuQ2p3S0NBaUF0WXk5QmhCY0Vpd0FOV1FRTDhNaXhLQzJzWUR3Q0gyeU1JMTdqenVPZWt4eXBINVlpSXBOY3M2Y1VERjF4bWpMcFVWZmN4b0NCNHdRQXZEX0J3RQ..*_gcl_au*MTI4Nzk3MzgyMy4xNzM0OTE2MTcw*_ga*MTM2NDM0MTY0MS4xNjk4MTY1OTE2*_ga_BFPVR2DEE2*MTczOTMxNzgzMi4yMTcuMS4xNzM5MzE3ODUzLjM5LjAuMA..'
  },
  {
    id: 3,
    nome: 'CL',
    foto: 'https://02cababed70b81fd6ba44180993206c4.cdn.bubble.io/f1738866274704x787186918500453900/Leonardo_Phoenix_10_INSTITUCIONALPREGAO_DE_GUERRASUPER_MEGA_VE_2.jpg?_gl=1*p4tvop*_gcl_aw*R0NMLjE3Mzg3NTA4NzkuQ2p3S0NBaUF0WXk5QmhCY0Vpd0FOV1FRTDhNaXhLQzJzWUR3Q0gyeU1JMTdqenVPZWt4eXBINVlpSXBOY3M2Y1VERjF4bWpMcFVWZmN4b0NCNHdRQXZEX0J3RQ..*_gcl_au*MTI4Nzk3MzgyMy4xNzM0OTE2MTcw*_ga*MTM2NDM0MTY0MS4xNjk4MTY1OTE2*_ga_BFPVR2DEE2*MTczOTMxNzgzMi4yMTcuMS4xNzM5MzE3ODUzLjM5LjAuMA..'
  },
  {
    id: 4,
    nome: 'PB',
    foto: 'https://02cababed70b81fd6ba44180993206c4.cdn.bubble.io/f1738866274704x787186918500453900/Leonardo_Phoenix_10_INSTITUCIONALPREGAO_DE_GUERRASUPER_MEGA_VE_2.jpg?_gl=1*p4tvop*_gcl_aw*R0NMLjE3Mzg3NTA4NzkuQ2p3S0NBaUF0WXk5QmhCY0Vpd0FOV1FRTDhNaXhLQzJzWUR3Q0gyeU1JMTdqenVPZWt4eXBINVlpSXBOY3M2Y1VERjF4bWpMcFVWZmN4b0NCNHdRQXZEX0J3RQ..*_gcl_au*MTI4Nzk3MzgyMy4xNzM0OTE2MTcw*_ga*MTM2NDM0MTY0MS4xNjk4MTY1OTE2*_ga_BFPVR2DEE2*MTczOTMxNzgzMi4yMTcuMS4xNzM5MzE3ODUzLjM5LjAuMA..'
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

export const SimpleSettingsPanel: React.FC<SettingsPanelProps> = (props) => {
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

  return (
    <div>
      <CreateButton preview={props.preview} />
      
      {/* Lista de Celebridades */}
      <Group>
        <GroupTitle>Selecione a Celebridade</GroupTitle>
        <CelebrityList>
          {celebridades.map((celeb) => (
            <ItemCard 
              key={celeb.id}
              selected={selectedCelebridade === celeb.nome}
              onClick={() => handleCelebridadeSelect(celeb.nome)}
            >
              <CelebrityImage src={celeb.foto} alt={celeb.nome} />
              <ItemName>{celeb.nome}</ItemName>
            </ItemCard>
          ))}
        </CelebrityList>
      </Group>

      {/* Lista de Ofertas */}
      <Group>
        <GroupTitle>Ofertas Disponíveis</GroupTitle>
        <ProductCarousel preview={props.preview} maxProducts={3} />
      </Group>

    </div>
  );
};

// Estilos para os dropdowns
const CelebrityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 30px;
  margin-top: 15px;
`;


const ItemCard = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-radius: 12px;
  border: 2px solid ${props => props.selected ? '#0066cc' : '#ddd'};
  cursor: pointer;
  transition: all 0.2s ease;
  background: white;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0,0,0,0.1);
  }
`;

const CelebrityImage = styled.img`
  width: 100%;
  height: 240px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
`;

