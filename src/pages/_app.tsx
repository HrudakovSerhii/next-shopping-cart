import React from 'react';
import { useStore } from 'react-redux';

// @ts-ignore
import { PersistGate } from 'redux-persist/integration/react';

import type { AppProps } from 'next/app';

import { wrapper } from '../redux/store';

import '../global.css';

const QogitaApp: React.FC<AppProps> = ({ Component, pageProps }) => {
  // @ts-ignore eslint-disable-next-line no-shadow
  const store = useStore((storeValue: any) => storeValue);

  return (
  // @ts-ignore
  // eslint-disable-next-line no-underscore-dangle
    <PersistGate persistor={store.__persistor} loading={<div>Loading</div>}>
      <Component {...pageProps} />
    </PersistGate>
  );
};

export default wrapper.withRedux(QogitaApp);
