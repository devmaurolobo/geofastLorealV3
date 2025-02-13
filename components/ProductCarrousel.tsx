import React from 'react';

interface Product {
  id: string | number;
  value?: string;
  // outras propriedades do produto
}

interface ProductCarrouselProps {
  onAddProduct: (product: Product) => void;
  onUpdatePreview: (product: Product) => void;
  preview: any;
  maxProducts: number;
  products: Product[]; // Adicionando products como prop
}

const ProductCarrousel: React.FC<ProductCarrouselProps> = ({ 
  onAddProduct, 
  onUpdatePreview, 
  maxProducts,
  products // Recebendo products como prop
}) => {
  const handleValueChange = (product: Product, newValue: string): void => {
    const updatedProduct: Product = {
      ...product,
      value: newValue
    };

    onAddProduct(updatedProduct);
    onUpdatePreview(updatedProduct);
  };

  return (
    <div>
      {products?.slice(0, maxProducts).map((product: Product) => (
        <div key={product.id}>
          <input
            type="text"
            value={product.value || ''}
            onChange={(e) => handleValueChange(product, e.target.value)}
            placeholder="Digite o valor"
            className="input-valor"
          />
          <button 
            onClick={() => {
              onAddProduct(product);
              onUpdatePreview(product);
            }}
            className="btn-adicionar"
          >
            Adicionar
          </button>
        </div>
      ))}
    </div>
  );
};

export default ProductCarrousel; 