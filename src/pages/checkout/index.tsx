import React from 'react';

import Link from 'next/link';

import {
  clearCart,
} from '../cart/cart.slice';

import { wrapper } from '../../redux/store';

export const getServerSideProps = wrapper.getServerSideProps(
  // @ts-ignore
  store => async () => {
    store.dispatch(clearCart);
  });

const Checkout: React.FC = () => (
  <div className="container mx-auto px-4">
    <strong>
      Yaay! You got all items for free! But I forgot to ask you your address...
      Lets try one more time! ;)
    </strong>
    <Link href="/">
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a className="home-link underline">Home</a>
    </Link>
  </div>
);

export default Checkout;
