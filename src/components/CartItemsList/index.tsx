import React from 'react';
import { useDispatch } from 'react-redux';

import CartItemView from '../CartItemView';

import { decrementQuantity, incrementQuantity, removeFromCart } from '../../pages/cart/cart.slice';

import { CartItem } from '../../types';

const CartItemsList: React.FC<{ cartItems: CartItem[]}> = ({ cartItems }) => {
  const dispatch = useDispatch();

  return (
    <div className="content my-4 md:pr-5">
      <ul className="divide-y divide-gray-200">
        {cartItems.map(cartItem => (
          <CartItemView
            key={cartItem.gtin}
            {...cartItem}
            removeItem={v => dispatch(removeFromCart(v))}
            incrementQuantity={v => dispatch(incrementQuantity(v))}
            decrementQuantity={v => dispatch(decrementQuantity(v))}
          />
        ))}
      </ul>
    </div>
  );
};

export default CartItemsList;
