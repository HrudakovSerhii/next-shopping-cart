import { createWrapper } from 'next-redux-wrapper';

import {
  configureStore,
} from '@reduxjs/toolkit';

const makeStore = () =>
  configureStore({
    reducer: {},
    devTools: true,
  });

// @ts-ignore
export const wrapper = createWrapper(makeStore, { debug: true });
