import React from 'react';

import Link from 'next/link';

const CartOverview: React.FC<{ subtotalPriceString: string}> = ({ subtotalPriceString }) => (
  <div className="cart-overview border-t border-gray-200 py-6 px-4 sm:px-6">
    <div className="cart-subtotal flex justify-between text-base font-medium text-gray-900">
      <p>{subtotalPriceString}</p>
    </div>
    <p className="cart-shipping-overview mt-0.5 text-sm text-gray-500">Shipping and taxes calculated at checkout.</p>
    <div className="mt-6">
      <Link href="/checkout">
        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          href="#"
          className="cart-checkout-link flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
        >
          Checkout
        </a>
      </Link>
    </div>
    <div className="cart-controls mt-6 flex justify-center text-center text-sm text-gray-500">
      <p>
        or
        {' '}
        <Link href="/">
          <button type="button" className="font-medium text-indigo-600 hover:text-indigo-500">
            Continue
            Shopping
            <span aria-hidden="true"> &rarr;</span>
          </button>
        </Link>
      </p>
    </div>
  </div>
);

export default CartOverview;
