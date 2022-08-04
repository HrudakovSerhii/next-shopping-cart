import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Layout from '../../components/Layout';

import {
  selectCartItems,
  incrementQuantity,
  decrementQuantity,
} from './cart.slice';

import CartItemView from '../../components/CartItemView';

const CartPage = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);

  return (
    <Layout>
      <div className="grid grid-cols-1 gap-y-4 gap-x-4 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8 mt-4">
        {cartItems.map(cartItem => (
          <CartItemView
            key={cartItem.gtin}
            {...cartItem}
            incrementQuantity={v => dispatch(incrementQuantity(v))}
            decrementQuantity={v => dispatch(decrementQuantity(v))}
          />
        ))}
      </div>
    </Layout>
  );
};

export default CartPage;
