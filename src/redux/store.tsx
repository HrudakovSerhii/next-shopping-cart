import { createWrapper } from 'next-redux-wrapper';

import {
  configureStore,
} from '@reduxjs/toolkit';

import cartReducer, { CART } from '../pages/cart/cart.slice';

const makeStore = () =>
  configureStore({
    reducer: {
      [CART]: cartReducer,
    },
    devTools: true,
  });

// @ts-ignore
export const wrapper = createWrapper(makeStore, { debug: true });
