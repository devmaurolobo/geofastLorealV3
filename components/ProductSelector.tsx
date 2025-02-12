import React, { useState } from 'react';
import styled from 'styled-components';

interface Product {
  id: number;
  name: string;
  image: string;
}

interface SelectedProduct extends Product {
  price: number;
}

const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
`;

const SelectedProductsContainer = styled.div`
  margin-bottom: 20px;
`;

const ProductList = styled.div`
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const ProductItem = styled.div`
  padding: 12px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 12px;
  border-bottom: 1px solid #eee;

  &:last-child {
    border-bottom: none;
  }

  &:hover {
    background: #f5f5f5;
  }
`;

const SelectedProductItem = styled.div`
  padding: 12px;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 4px;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
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

const PriceInput = styled.input`
  width: 100px;
  padding: 4px 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const RemoveButton = styled.button`
  padding: 4px 8px;
  background: #e74c3c;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background: #c0392b;
  }
`;

const products: Product[] = [
  {
    id: 1,
    name: 'Kit L\'Oréal Paris Protetor Solar Corporal FPS 70',
    image: '/kit-protetor.jpg'
  },
  {
    id: 2,
    name: 'Água Micelar L\'Oréal Paris 5 em 1 200ml',
    image: '/agua-micelar.jpg'
  },
  {
    id: 3,
    name: 'Óleo Extraordinário Elseve L\'Oréal Paris 100ml',
    image: '/oleo-extraordinario.jpg'
  }
];

export const ProductSelector: React.FC = () => {
  const [selectedProducts, setSelectedProducts] = useState<SelectedProduct[]>([]);

  const handleSelectProduct = (product: Product) => {
    if (!selectedProducts.some(p => p.id === product.id)) {
      setSelectedProducts(prev => [...prev, { ...product, price: 0 }]);
    }
  };

  const handleRemoveProduct = (productId: number) => {
    setSelectedProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handlePriceChange = (productId: number, price: string) => {
    setSelectedProducts(prev =>
      prev.map(p =>
        p.id === productId
          ? { ...p, price: parseFloat(price) || 0 }
          : p
      )
    );
  };

  const availableProducts = products.filter(
    product => !selectedProducts.some(p => p.id === product.id)
  );

  return (
    <Container>
      <SelectedProductsContainer>
        {selectedProducts.map(product => (
          <SelectedProductItem key={product.id}>
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
              <PriceInput
                type="number"
                value={product.price || ''}
                onChange={(e) => handlePriceChange(product.id, e.target.value)}
                placeholder="Preço"
                step="0.01"
              />
            </ProductInfo>
            <RemoveButton onClick={() => handleRemoveProduct(product.id)}>
              Remover
            </RemoveButton>
          </SelectedProductItem>
        ))}
      </SelectedProductsContainer>

      <ProductList>
        {availableProducts.map(product => (
          <ProductItem
            key={product.id}
            onClick={() => handleSelectProduct(product)}
          >
            <ProductImage src={product.image} alt={product.name} />
            <ProductInfo>
              <ProductName>{product.name}</ProductName>
            </ProductInfo>
          </ProductItem>
        ))}
      </ProductList>
    </Container>
  );
}; 