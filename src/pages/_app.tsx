import React from 'react';

import type { AppProps } from 'next/app';

import { wrapper } from '../redux/store';

import '../global.css';

const QogitaApp = ({ Component, pageProps }: AppProps): JSX.Element => (
  <Component {...pageProps} />
);

export default wrapper.withRedux(QogitaApp);
