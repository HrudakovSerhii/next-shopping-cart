import { HYDRATE } from 'next-redux-wrapper';

import cartReducer, {
  addToCart,
  clearCart,
  decrementQuantity,
  incrementQuantity,
  removeFromCart,
  selectSubtotalPriceString,
  initialState as cartInitialState,
} from '../cart.slice';

import { makeStore } from '../../../redux/store';

import { AppState } from '../../../types';

describe('cart.slice', () => {
  const store = makeStore({ isServer: true });
  const { dispatch } = store;

  const mockCartItem = {
    gtin: '12345',
    name: 'mock item',
    imageUrl: '/fallback.png',
    quantity: 1,
    recommendedRetailPrice: 10.4,
    recommendedRetailPriceCurrency: '$',
  };

  describe('cart.slice actions', () => {
    it('Should initially set cart items to an empty array', () => {
      // @ts-ignore
      const state: AppState = store.getState();

      expect(state.cart).toEqual({
        items: [],
      });
    });

    it('Should add product item to cart correctly', () => {
      dispatch(addToCart(mockCartItem));

      // @ts-ignore
      expect(store.getState().cart).toStrictEqual({
        items: [
          mockCartItem,
        ],
      });
    });

    it('Should increment by 1 existing product quantity correctly', () => {
      dispatch(incrementQuantity(mockCartItem.gtin));

      // @ts-ignore
      expect(store.getState().cart).toStrictEqual({
        items: [
          { ...mockCartItem, quantity: 2 },
        ],
      });
    });

    it('Should decrement by 1 existing product quantity correctly', () => {
      dispatch(decrementQuantity(mockCartItem.gtin));

      // @ts-ignore
      expect(store.getState().cart).toStrictEqual({
        items: [
          { ...mockCartItem, quantity: 1 },
        ],
      });
    });

    it('Should not decrement by 1 if searched product is not in a list', () => {
      dispatch(decrementQuantity('4321'));

      // @ts-ignore
      expect(store.getState().cart).toStrictEqual({
        items: [
          { ...mockCartItem, quantity: 1 },
        ],
      });
    });

    it('Should remove item from Cart correctly', () => {
      dispatch(removeFromCart(mockCartItem.gtin));

      // @ts-ignore
      expect(store.getState().cart).toStrictEqual({
        items: [],
      });
    });

    it('Should clear cart list correctly', () => {
      // @ts-ignore
      const { cart } = store.getState();

      dispatch(addToCart(mockCartItem));
      dispatch(clearCart());

      expect(cart).toStrictEqual({
        items: [],
      });
    });

    it('Should hydrate cart state on Hydrate action correctly', () => {
      const action = {
        type: HYDRATE,
        payload: {
          cart: {
            items: [mockCartItem],
          },
        },
      };

      const state = cartReducer({ items: [] }, action);

      expect(state).toEqual({ items: [mockCartItem] });
    });
  });

  describe('cart.slice selectors', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Should return cart Sub total Price String correctly', () => {
      const secondItemQuantity = 3;
      const expectedResult = mockCartItem.recommendedRetailPrice
          + mockCartItem.recommendedRetailPrice * secondItemQuantity;

      const result = selectSubtotalPriceString({
        ...cartInitialState,
        cart: {
          items: [
            mockCartItem,
            { ...mockCartItem, gtin: '234567', quantity: 3 },
          ],
        },
      });

      expect(result).toStrictEqual(`$ ${expectedResult}`);
    });

    it('Should return empty cart Sub total Price String when no products available correctly', () => {
      const result = selectSubtotalPriceString({
        cart: cartInitialState,
      });

      expect(result).toStrictEqual('');
    });
  });
});
