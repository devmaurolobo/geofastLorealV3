import React from 'react';
import { ProductCarousel } from '@/components/ProductCarousel';
import { Preview } from '@creatomate/preview';

export const App: React.FC = () => {
  const preview = new Preview(document.getElementById('preview') as HTMLDivElement, 'interactive', 'your_public_token');

  return (
    <div>
      <ProductCarousel preview={preview} />
    </div>
  );
};
