import React, { useEffect } from 'react';

import { useDispatch, useStore } from 'react-redux';

import Link from 'next/link';

import {
  clearCart,
} from '../cart/cart.slice';

const Checkout: React.FC = () => {
  const state = useStore().getState();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearCart());
  }, [state]);

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-screen">
      <strong>
        Yaay! You got all items for free! But I forgot to ask you your address...
        Lets try one more time! ;)
      </strong>
      <Link href="/">
        <button type="button" className="mt-4 font-medium text-indigo-600 hover:text-indigo-500">
          Back to Home Page
          <span aria-hidden="true"> &rarr;</span>
        </button>
      </Link>
    </div>
  );
};

export default Checkout;
