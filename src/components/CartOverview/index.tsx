import React from 'react';

import Link from 'next/link';

const CartOverview: React.FC<{ subtotalPriceString: string}> = ({ subtotalPriceString }) => (
  <div className="cart-overview pl-0 pt-5 md:pt-0 md:pl-5 border-gray-200 border-t md:border-t-0">
    <div className="cart-subtotal flex justify-between text-base font-medium text-gray-900">
      <p>Total</p>
      <p>{subtotalPriceString}</p>
    </div>
    <p className="cart-overview-shipping mt-4 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    <div className="cart-overview-controls mt-4 flex flex-col items-center md:items-end ">
      <Link href="/checkout">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="cart-checkout-link flex items-center justify-center w-full max-w-sm md:max-w-none md:w-full rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </a>
      </Link>
      <p>
        or
        {' '}
        <Link href="/">
          <button type="button" className="font-medium mt-4 text-indigo-600 hover:text-indigo-500">
            Continue Shopping
          </button>
        </Link>
      </p>
    </div>
    <div className="cart-controls mt-4 flex justify-center text-center text-sm text-gray-500">

    </div>
  </div>
);

export default CartOverview;
