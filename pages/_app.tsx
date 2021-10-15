/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { AppContext, AppInitialProps } from 'next/app';
import { ApolloProvider } from '@apollo/client';
import { CookiesProvider } from 'react-cookie';
import { AuthProvider } from 'hooks/useAuth';
import { ToastContainer } from 'react-toastify';
import Head from 'lib/Head';
import { CartProvider } from 'Context/CartContext';
import { FacebookPixel, GoogleAnalyticsTag } from 'components';
import CookieModal from 'components/UI/CookieModal';
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

    // TODO: Order Review Page, Meta from Yoast
    // TODO: Bugs:
    // TODO: DevOps: place wordpress instance on admin.victishealth.com (talk to WPEngine)
    // TODO: Features: Square Rewards system, Wholesaler special dashboard, Square subscription model, Google/Facebook Login, Square GPay, Related Products, create account from checkout, fill in user info at checkout if logged in, login remember me cookie time extention, enable banner, Utilize Yoast SEO, integrate GA and Omni deeper, Typescript Typings, Refactoring and optimizing speed, News Page
    // TODO: Wordpress Add-ons: Build button for Vercel Redeployment, Tier system custom post type, Giveaway announcement special post type, social media links manager, athlete post type manager

    <ApolloProvider client={Client}>
      <CookiesProvider>
        <AuthProvider>
          <CartProvider>
            <GoogleAnalyticsTag>
              <FacebookPixel>
                <Head />
                <Component {...pageProps} />
                <div id="modal-root" />
                <div id="cookie-modal-root" />
                <CookieModal>
                  We use cookies on our site to improve your experience and show
                  you relevant information.
                </CookieModal>
                <ToastContainer />
              </FacebookPixel>
            </GoogleAnalyticsTag>
          </CartProvider>
        </AuthProvider>
      </CookiesProvider>
    </ApolloProvider>
  );
}
