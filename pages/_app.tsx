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
import { FacebookPixel, GoogleAnalyticsTag } from 'components';
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

    // TODO: Motion Framer, Mobile Responsiveness, Tablet, Desktop, Create Order, Process Payments, Order Review Page, Google/Facebook Login
    // TODO: Bugs: Logout Function, Added Discount Toast, Front Page add products to cart, query mess up
    // TODO: DevOps: Domain name for frontend, place wordpress instance on admin.victishealth.com (talk to WPEngine)
    // TODO: Features: Rewards system, Wholesaler special dashboard, subscription model
    // TODO: Wordpress Add-ons: Build button for Vercel Redeployment, Tier system custom post type, Giveaway announcement special post type

    <ApolloProvider client={Client}>
      <AuthProvider>
        <HeadlessProvider pageProps={pageProps}>
          <CartProvider>
            {/* <GoogleAnalyticsTag>
              <FacebookPixel> */}
            <Head />
            <Component {...pageProps} />
            <ToastContainer />
            {/* </FacebookPixel>
            </GoogleAnalyticsTag> */}
          </CartProvider>
        </HeadlessProvider>
      </AuthProvider>
    </ApolloProvider>
  );
}
