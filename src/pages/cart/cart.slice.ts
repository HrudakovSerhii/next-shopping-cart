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

      if (!existingItem) {
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
        existingItem.quantity -= 1;
      }
    },
    removeFromCart: (state: CartState, action: ChangeQuantityAction) => {
      const index = state.items.findIndex(item => item.gtin === action.payload);

      state.items.splice(index, 1);
    },
    clearCart: (state: CartState) => {
      state.items.slice(0, state.items.length);
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => ({
      ...state,
      ...action.payload.cart,
    }),
  },
});

export const selectCart = (state: AppState) => state.cart || initialState;
export const selectCartItems = (state: AppState) => selectCart(state).items;
export const selectCartSize = (state: AppState) => selectCartItems(state)?.length || 0;
export const selectSubtotalPriceString = (state: AppState) => {
  const cartItems = selectCartItems(state);

  if (cartItems.length) {
    const subtotalPrice = cartItems
      .map(({ recommendedRetailPrice, quantity }) => recommendedRetailPrice * quantity)
      .reduce((acc, current) => Number((acc + current).toFixed(2)), 0);

    const currency = cartItems[0].recommendedRetailPriceCurrency;

    return `${currency} ${subtotalPrice}`;
  }

  return '';
};

export const {
  addToCart,
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
