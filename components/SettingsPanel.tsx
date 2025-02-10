import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { Preview, PreviewState } from '@creatomate/preview';
import { TextInput } from './TextInput';
import { Button } from './Button';
import { CreateButton } from './CreateButton';

// Adicionar interface SettingsPanelProps
interface SettingsPanelProps {
  preview: Preview;
  currentState?: PreviewState;
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

const ensureElementVisibility = (
  preview: Preview,
  elementName: string,
  duration: number
) => {
  // Implementação da função
  preview.setPropertyValue(elementName, 'visible', true);
};

const getTrilhaAudio = (segmento: string): string | null => {
  const trilhas = {
    'Tecnologia': 'url_da_trilha_tech',
    'Educação': 'url_da_trilha_edu',
    'Carros': 'url_da_trilha_carros',
    'Moda': 'url_da_trilha_moda',
    'Supermercado': 'url_da_trilha_super'
  };
  
  return trilhas[segmento as keyof typeof trilhas] || null;
};

// Definição das celebridades
const celebridades = [
  {
    id: 1,
    nome: 'Rodrigo Faro',
    foto: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737467575738x638870328259317400/RODRIGO%20FARO.png'
  },
  {
    id: 2,
    nome: 'Juliana Paes',
    foto: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737469547544x890918897730985900/JULIANA%20PAES.png'
  },
  {
    id: 3,
    nome: 'Vitória Strada',
    foto: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737467187142x432441187940656000/vitoria%20strada.png'
  }
];

// Definição dos segmentos
const segmentos = [
  {
    id: 1,
    option: 'Supermercado',
    image: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737470359857x417210886713010000/SUPERMERCADOTHUMB.png'
  },
  {
    id: 2,
    option: 'Moda',
    image: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737470374242x782265742169210800/MODATHUMB.png'
  },
  {
    id: 3,
    option: 'Carros',
    image: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737470386839x892623108604885200/CARROTHUMB.png'
  },
  {
    id: 4,
    option: 'Educação',
    image: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737470401380x994709559571271600/EDUCACAOTHUMB.png'
  },
  {
    id: 5,
    option: 'Tecnologia',
    image: 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737470412910x327187726985682700/TECNOLOGIATHUMB.png'
  }
];


export const SimpleSettingsPanel: React.FC<SettingsPanelProps> = (props) => {
  const modificationsRef = useRef<Record<string, any>>({});
  const [selectedCelebridade, setSelectedCelebridade] = useState<string>('');
  const [selectedSegmento, setSelectedSegmento] = useState<string>('');

  const findElement = (elementName: string) => {
    return props.preview.getElements().find((element: any) => element.source.name === elementName);
  };

  // Função getMcabecaVideo movida para dentro do componente
  const getMcabecaVideo = (celebridade: string, segmento: string): string | null => {
    const videos = {
      'Rodrigo Faro': {
        'Tecnologia': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400848848x372390175366407600/techCabFr.mp4',
        'Educação': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400118637x885973244047698400/eduCabFr.mp4',
        'Carros': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737399724946x749724726791223700/carroCabFr.mp4',
        'Moda': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737477855944x861550925987752100/modaCabFr%20%281%29.mp4',
        'Supermercado': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737477958145x974964175820362900/supCabFr%20%281%29.mp4'
      },
      'Juliana Paes': {
        'Tecnologia': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400817038x671140396871675400/techCabJp.mp4',
        'Educação': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400091721x528111862706756700/eduCabJp.mp4',
        'Carros': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737399701763x618959377382234000/carroCabJp.mp4',
        'Moda': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737477878297x810339304993771000/modaCabJp%20%281%29.mp4',
        'Supermercado': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737477939467x731690991169157800/supCabJp%20%281%29.mp4'
      },
      'Vitória Strada': {
        'Tecnologia': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400781348x885233334405119500/techCabVs.mp4',
        'Educação': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400070194x107201734906771760/eduCabVs.mp4',
        'Carros': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737463658073x685485920054953500/carroCabVs.mp4',
        'Moda': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737477900919x562753402732993900/modaCabVs%20%282%29.mp4',
        'Supermercado': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737400597835x875016790955537900/supCabVs.mp4'
      }
    };

    return videos[celebridade as keyof typeof videos]?.[segmento as keyof (typeof videos)[keyof typeof videos]] || null;
  };

  const handleSelection = async (celebridade: string, segmento: string) => {
    // Atualiza o vídeo da cabeça
    const cabecaUrl = getMcabecaVideo(celebridade, segmento);
    if (cabecaUrl) {
      const cabecaElement = findElement('cabeca');
      if (cabecaElement) {
        await setPropertyValue(
          props.preview,
          cabecaElement.source.name,
          cabecaUrl,
          modificationsRef.current
        );
      }
    }

    // Atualiza o vídeo do miolo
    const mioloUrl = getMioloVideo(segmento);
    if (mioloUrl) {
      const mioloElement = findElement('miolo');
      if (mioloElement) {
        await setPropertyValue(
          props.preview,
          mioloElement.source.name,
          mioloUrl,
          modificationsRef.current
        );
      }
    }

    // Atualiza a trilha sonora
    const trilhaUrl = getTrilhaAudio(segmento);
    if (trilhaUrl) {
      const trilhaElement = findElement('trilha');
      if (trilhaElement) {
        await setPropertyValue(
          props.preview,
          trilhaElement.source.name,
          trilhaUrl,
          modificationsRef.current
        );
      }
    }
  };

  const getMioloVideo = (segmento: string): string | null => {
    const videos = {
      'Tecnologia': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401585784x132846469528500320/techMiolo1.mp4',
      'Educação': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401142991x769589510301051000/eduMiolo1.mp4',
      'Carros': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737401043927x344956645103745150/carroMiolo1.mp4',
      'Moda': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737478051902x808693933761051300/modaMiolo1%20%281%29.mp4',
      'Supermercado': 'https://1bcfd2ed3e9278b4c4612858fdf1801c.cdn.bubble.io/f1737478103006x950931566599126000/supMiolo1%20%281%29.mp4'
    };
  
    return videos[segmento as keyof typeof videos] || null;
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
              onClick={() => {
                setSelectedCelebridade(celeb.nome);
                if (selectedSegmento) {
                  handleSelection(celeb.nome, selectedSegmento);
                }
              }}
            >
              <CelebrityImage src={celeb.foto} alt={celeb.nome} />
              <ItemName>{celeb.nome}</ItemName>
            </ItemCard>
          ))}
        </CelebrityList>
      </Group>

      {/* Lista de Segmentos */}
      <Group>
        <GroupTitle>Selecione o Segmento</GroupTitle>
        <SegmentList>
          {segmentos.map((seg) => (
            <ItemCard 
              key={seg.id}
              selected={selectedSegmento === seg.option}
              onClick={() => {
                setSelectedSegmento(seg.option);
                if (selectedCelebridade) {
                  handleSelection(selectedCelebridade, seg.option);
                }
              }}
            >
              <SegmentImage src={seg.image} alt={seg.option} />
              <ItemName>{seg.option}</ItemName>
            </ItemCard>
          ))}
        </SegmentList>
      </Group>

      {/* Grupo de Textos */}
      <Group>
        <GroupTitle>Textos</GroupTitle>
        {['Title', 'Subtitle', 'Description', 'Value', 'Footer'].map((textName, index) => (
          <TextInput
            key={textName}
            placeholder={textName}
            onFocus={() => ensureElementVisibility(props.preview, textName, 1.5)}
            onChange={(e) =>
              setPropertyValue(props.preview, textName, e.target.value, modificationsRef.current)
            }
          />
        ))}
      </Group>

      <Button onClick={() => console.log('Ação adicional')} style={{ width: '100%' }}>
        Executar Ação
      </Button>
    </div>
  );
};

// Estilos para os dropdowns
const CelebrityList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const SegmentList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 15px;
  margin-top: 15px;
`;

const ItemCard = styled.div<{ selected?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 12px;
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
  height: 200px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
`;

const SegmentImage = styled.img`
  width: 100%;
  height: 120px;
  object-fit: cover;
  border-radius: 6px;
  margin-bottom: 8px;
`;

