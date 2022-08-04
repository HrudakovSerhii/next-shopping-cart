import { createSlice } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState, CartItem, CartState } from '../../types';

export const CART = 'cart';
export const initialState = {
  items: [],
};

type ChangeQuantityAction = {
  payload: string
}

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
    incrementQuantity: (state: CartState, action: ChangeQuantityAction) => {
      const existingItem = state.items.find(item => item.gtin === action.payload);

      if (existingItem) {
        existingItem.quantity += 1;
      }
    },
    decrementQuantity: (state: CartState, action: ChangeQuantityAction) => {
      const existingItem = state.items.find(item => item.gtin === action.payload);

      if (existingItem) {
        if (existingItem.quantity === 1) {
          const index = state.items.findIndex(item => item.gtin === action.payload);

          state.items.splice(index, 1);
        } else {
          existingItem.quantity -= 1;
        }
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

export const selectCart = (state: AppState) => state.cart || initialState;
export const selectCartItems = (state: AppState) => selectCart(state).items;
export const selectCartSize = (state: AppState) => selectCartItems(state)?.length || 0;

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
} = cartSlice.actions;

export default cartSlice.reducer;
