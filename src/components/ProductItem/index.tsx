import React from 'react';

import { Product } from '../../types';

const ProductItem: React.FC<Product> = ({
  brandName,
  categoryName,
  gtin,
  imageUrl,
  name,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
}) => {
  const onProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    console.log('product clicked');
  };

  return (
    <div>
      <div className="image">
        <img alt={name} src={imageUrl} />
      </div>
      <h3 className="name">{name}</h3>
      <div className="content">
        {categoryName && (
          <h4 className="category">
            Category:
            <p>{categoryName}</p>
          </h4>
        )}
        {brandName && (
          <h4 className="brand">
            Brand:
            <p>{brandName}</p>
          </h4>
        )}
      </div>
      <h4 className="price">
        {recommendedRetailPrice
          ? `${recommendedRetailPriceCurrency} ${recommendedRetailPrice}`
          : 'No Price Available' }
      </h4>
      <button
        type="submit"
        onClick={onProductClick}
        className="add-to-cart-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default ProductItem;
