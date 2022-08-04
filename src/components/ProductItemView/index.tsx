import React from 'react';

import { CartItem, Product } from '../../types';

type ProductItemProps = Product & {
    addToCart: (cartItem: CartItem) => void,
}

const ProductItemView: React.FC<ProductItemProps> = ({
  brandName,
  categoryName,
  gtin,
  imageUrl,
  name,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
  addToCart,
}) => {
  const onProductClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    const addedItem = {
      gtin,
      name,
      imageUrl,
      recommendedRetailPrice,
      recommendedRetailPriceCurrency,
      quantity: 1,
    };

    addToCart(addedItem);
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

export default ProductItemView;
