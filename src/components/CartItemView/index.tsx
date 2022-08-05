import React from 'react';

import { CartItem } from '../../types';

type CartItemAction = (gtin: string) => void;

type CartItemProps = CartItem & {
    incrementQuantity: CartItemAction,
    decrementQuantity: CartItemAction,
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
    <li className="cart-item-view flex py-4 w-full">
      <div className="cart-item-image p-4 h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
        <img alt={name} src={imageUrl} className="h-full w-full object-cover object-center" />
      </div>

      <div className="cart-item-content ml-4 flex flex-1 flex-col justify-between">
        <div>
          <div className="cart-item-name flex justify-between text-base font-medium text-gray-900">
            <h3>
              {name}
            </h3>

            <p className="cart-item-price ml-4">
              {recommendedRetailPrice
                ? `${recommendedRetailPriceCurrency} ${recommendedRetailPrice}`
                : 'No Price Available' }
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between text-sm">
          <p className="text-gray-500">{`Qty ${quantity}`}</p>
          <div className="cart-item-controls flex flex-row items-center border-2">
            <button
              type="button"
              disabled={quantity <= 1}
              onClick={() => decrementQuantity(gtin)}
              className="increment-quantity-btn px-3 py-1 font-medium text-indigo-600 hover:text-indigo-500 disabled:bg-aliceblue-300 disabled:opacity-30"
            >
              -
            </button>
            <h3 className="quantity mx-2">{quantity}</h3>
            <button
              type="button"
              onClick={() => incrementQuantity(gtin)}
              className="decrement-quantity-btn px-3 py-1 font-medium text-indigo-600 hover:text-indigo-500 disabled:bg-aliceblue-300 disabled:opacity-30"
            >
              +
            </button>
          </div>
          <div className="flex">
            <button
              type="button"
              className="remove-item-btn font-medium text-indigo-600 hover:text-indigo-500"
              onClick={onRemoveItemClick}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
    </li>
  );
};

export default CartItemView;
