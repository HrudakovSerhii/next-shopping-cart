import { createWrapper } from 'next-redux-wrapper';

import {
  combineReducers,
  configureStore,
  createStore,
  AnyAction,
} from '@reduxjs/toolkit';

import cartReducer, { CART, initialState as CartInitialState } from '../pages/cart/cart.slice';

import { AppState } from '../types';

// eslint-disable-next-line import/no-unresolved
const storage = require('redux-persist/lib/storage').default;

const masterReducer = combineReducers({
  [CART]: cartReducer,
});

const rootReducer = (state: AppState, action: AnyAction) => {
  if (action.type === 'cart/clearCart') {
    // this applies to all keys defined in persistConfig(s)
    storage.removeItem('persist:root');

    const updatedState = {
      [CART]: CartInitialState,
    };

    return masterReducer(updatedState, action);
  }

  // @ts-ignore
  return masterReducer(state, action);
};

// export type RootState = ReturnType<typeof rootReducer>

export const makeStore = ({ isServer } : { isServer: boolean }) => {
  if (isServer) {
    return configureStore({
      reducer: {
        [CART]: cartReducer,
      },
      devTools: true,
    });
  }

  // eslint-disable-next-line global-require,import/no-unresolved
  const { persistStore, persistReducer } = require('redux-persist');

  const persistConfig = {
    storage,
    key: 'root',
    whitelist: ['cart'],
  };

  const persistedReducer = persistReducer(persistConfig, rootReducer);

  const store = createStore(
    persistedReducer,
  );

  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
  store.__persistor = persistStore(store);

  return store;
};

// @ts-ignore
export const wrapper = createWrapper(makeStore, { debug: true });
