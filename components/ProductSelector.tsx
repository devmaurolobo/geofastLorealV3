import React, { useState } from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  image: string;
}

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const DropdownContainer = styled.div`
  position: relative;
  margin-bottom: 20px;
`;

const DropdownButton = styled.button`
  width: 100%;
  padding: 12px;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &:hover {
    background: #f5f5f5;
  }
`;

const DropdownList = styled.div<{ isOpen: boolean }>`
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: white;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-top: 4px;
  max-height: 300px;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};
  z-index: 1000;
`;

const ProductItem = styled.div<{ isSelected: boolean }>`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  background: ${props => props.isSelected ? '#e8f4ff' : 'white'};

  &:hover {
    background: ${props => props.isSelected ? '#d1e8ff' : '#f5f5f5'};
  }
`;

const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
`;

const ProductInfo = styled.div`
  flex: 1;
`;

const ProductName = styled.div`
  font-weight: 500;
`;

const ProductPrice = styled.div`
  color: #2ecc71;
  font-weight: 600;
`;

const SelectedProducts = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
  margin-top: 20px;
`;

const SelectedProduct = styled.div`
  padding: 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  display: flex;
  align-items: center;
  gap: 12px;
  background: white;
`;

const products: Product[] = [
  {
    id: 1,
    name: 'Kit L\'Oréal Paris Protetor Solar Corporal FPS 70',
    price: 65.99,
    originalPrice: 87.99,
    discount: 25,
    image: '/kit-protetor.jpg'
  },
  {
    id: 2,
    name: 'Água Micelar L\'Oréal Paris 5 em 1 200ml',
    price: 16.49,
    originalPrice: 31.99,
    discount: 48,
    image: '/agua-micelar.jpg'
  },
  {
    id: 3,
    name: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    price: 54.99,
    image: '/oleo-extraordinario.jpg'
  }
];

export const ProductSelector: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<Product[]>([]);

  const toggleProduct = (product: Product) => {
    setSelectedProducts(prev => {
      const isSelected = prev.some(p => p.id === product.id);
      if (isSelected) {
        return prev.filter(p => p.id !== product.id);
      } else {
        return [...prev, product];
      }
    });
  };

  return (
    <Container>
      <DropdownContainer>
        <DropdownButton onClick={() => setIsOpen(!isOpen)}>
          {selectedProducts.length 
            ? `${selectedProducts.length} produto(s) selecionado(s)`
            : 'Selecione os produtos'}
          <span>{isOpen ? '▲' : '▼'}</span>
        </DropdownButton>
        
        <DropdownList isOpen={isOpen}>
          {products.map(product => (
            <ProductItem
              key={product.id}
              isSelected={selectedProducts.some(p => p.id === product.id)}
              onClick={() => toggleProduct(product)}
            >
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>
                  R$ {product.price.toFixed(2)}
                  {product.discount && (
                    <span style={{ color: '#e74c3c', marginLeft: '8px' }}>
                      {product.discount}% OFF
                    </span>
                  )}
                </ProductPrice>
              </ProductInfo>
            </ProductItem>
          ))}
        </DropdownList>
      </DropdownContainer>

      {selectedProducts.length > 0 && (
        <SelectedProducts>
          {selectedProducts.map(product => (
            <SelectedProduct key={product.id}>
              <ProductImage src={product.image} alt={product.name} />
              <ProductInfo>
                <ProductName>{product.name}</ProductName>
                <ProductPrice>R$ {product.price.toFixed(2)}</ProductPrice>
              </ProductInfo>
            </SelectedProduct>
          ))}
        </SelectedProducts>
      )}
    </Container>
  );
}; 