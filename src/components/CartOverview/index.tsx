import React from 'react';

import Link from 'next/link';

const CartOverview: React.FC<{ subtotalPriceString: string}> = ({ subtotalPriceString }) => (
  <div className="cart-overview">
    <h4 className="subtotal">
      <span>Subtotal</span>
      <span className="subtotal-price">
        {subtotalPriceString}
      </span>
    </h4>
    <h3 className="shipping-overview">
      Shipping and taxes calculated at checkout.
    </h3>
    <Link href="/checkout">
      <button
        type="button"
        className="cart-checkout-btn"
      >
        Checkout
      </button>
    </Link>

    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="underline">Or Continue Shopping</a>
    </Link>
  </div>
);

export default CartOverview;
