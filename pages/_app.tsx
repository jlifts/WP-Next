/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { HeadlessProvider } from '@wpengine/headless/react';
import { ApolloProvider } from '@apollo/client';

import { AuthProvider } from 'hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import Head from 'lib/Head';
import { CartProvider } from 'Context/CartContext';
import { Client } from '../lib/ApolloClient';
import 'normalize.css/normalize.css';
import 'scss/tailwind.scss';
import 'react-toastify/dist/ReactToastify.css';

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
          <CartProvider>
            <Head />
            <Component {...pageProps} />
            <ToastContainer />
          </CartProvider>
        </HeadlessProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
