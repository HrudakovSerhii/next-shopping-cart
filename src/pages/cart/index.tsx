import React from 'react';
import { useSelector } from 'react-redux';

import Layout from '../../components/Layout';

import {
  selectCartItems,
  selectCartSize,
  selectSubtotalPriceString,

} from './cart.slice';

import CartOverview from '../../components/CartOverview';
import CartItemsList from '../../components/CartItemsList';

const CartPage = () => {
  const cartItems = useSelector(selectCartItems);
  const cartItemsCount = useSelector(selectCartSize);
  const subtotalPriceString = useSelector(selectSubtotalPriceString);

  return (
    <Layout cartItemsCount={cartItemsCount}>
      <div className="flex-1 overflow-y-auto">
        <div className="flex items-start justify-between mt-4">
          <h4 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h4>
        </div>

        <CartItemsList cartItems={cartItems} />
      </div>
      <CartOverview subtotalPriceString={subtotalPriceString} />
    </Layout>
  );
};

export default CartPage;
