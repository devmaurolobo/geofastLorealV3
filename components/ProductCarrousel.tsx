const ProductCarrousel = ({ onAddProduct, onUpdatePreview }) => {
  const handleValueChange = (product, newValue) => {
    // Atualiza o valor do produto
    const updatedProduct = {
      ...product,
      value: newValue
    };

    // Executa a função de adicionar produto
    onAddProduct(updatedProduct);
    
    // Executa a função de atualizar preview
    onUpdatePreview(updatedProduct);
  };

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          {/* ... outros elementos do produto ... */}
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