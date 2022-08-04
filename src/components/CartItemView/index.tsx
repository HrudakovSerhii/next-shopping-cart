import React from 'react';

import { CartItem } from '../../types';

type CartItemAction = (gtin: string) => void;

type CartItemProps = CartItem & {
    incrementQuantity?: CartItemAction,
    decrementQuantity?: CartItemAction,
    removeItem?: CartItemAction,
}

const CartItemView: React.FC<CartItemProps> = ({
  gtin,
  imageUrl,
  name,
  quantity,
  recommendedRetailPrice,
  recommendedRetailPriceCurrency,
  incrementQuantity,
  decrementQuantity,
  removeItem,
}) => {
  const onRemoveItemClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (removeItem) {
      removeItem(gtin);
    }
  };

  return (
    <div className="cart-item-view">
      <div className="image">
        <img alt={name} src={imageUrl} />
      </div>
      <div className="content">
        <h3 className="name">{name}</h3>
        <h4 className="price">
          {recommendedRetailPrice
            ? `${recommendedRetailPriceCurrency} ${recommendedRetailPrice}`
            : 'No Price Available' }
        </h4>
      </div>
      <div className="controls">
        <button
          type="button"
          onClick={() => incrementQuantity()}
          className="increment-quantity-btn"
        >
          +
        </button>
        <h3 className="quantity">{quantity}</h3>
        <button
          type="button"
          onClick={() => decrementQuantity()}
          className="decrement-quantity-btn"
        >
          -
        </button>
      </div>
      <button
        type="button"
        onClick={onRemoveItemClick}
        className="remove-item-btn"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default CartItemView;
