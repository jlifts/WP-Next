/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from 'hooks/useAuth';
import { Provider } from 'react-redux';
import { Client } from '../lib/ApolloClient';
import { store } from '../redux/store';
import 'normalize.css/normalize.css';
import 'scss/tailwind.scss';

/* eslint-disable react/jsx-props-no-spreading */
export default function App({
  Component,
  pageProps,
}: AppContext & AppInitialProps) {
  return (
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment

    <ApolloProvider client={Client}>
      <AuthProvider>
        <HeadlessProvider pageProps={pageProps}>
          <Provider store={store}>
            <Component {...pageProps} />
          </Provider>
        </HeadlessProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
