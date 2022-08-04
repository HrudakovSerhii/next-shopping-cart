import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { CartItem, CartState } from '../../types';

export const CART = 'cart';
export const initialState = {
  items: [],
};

const cartSlice = createSlice({
  name: CART,
  initialState,
  reducers: {
    addToCart: (state: CartState, action: { payload: CartItem }) => {
      const existingItem = state.items.find(item => item.gtin === action.payload.gtin);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload,
    }),
  },
});

export const {
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;
