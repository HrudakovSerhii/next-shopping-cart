import React from 'react';
import { useSelector } from 'react-redux';

import Link from 'next/link';

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
      {cartItemsCount > 0 ? (
        <div className="flex-1 overflow-y-auto">
          <div className="flex items-start justify-between mt-4">
            <h4 className="text-lg font-medium text-gray-900" id="slide-over-title">Shopping cart</h4>
          </div>

          <div className="flex flex-col justify-between md:flex-row">
            <CartItemsList cartItems={cartItems} />
            <div className="divider hidden w-1 md:block border-l-2 border-gray-200 "></div>
            <CartOverview subtotalPriceString={subtotalPriceString} />
          </div>
        </div>
      ) : (
        <div className="container mx-auto flex flex-col items-center justify-center h-screen">
          <strong>
            Looks like your cart is empty...
            Lets add some products here! ;)
          </strong>
          <Link href="/">
            <button type="button" className="mt-4 font-medium text-indigo-600 hover:text-indigo-500">
              Back to Shopping
              <span aria-hidden="true"> &rarr;</span>
            </button>
          </Link>
        </div>
      )}

    </Layout>
  );
};

export default CartPage;
