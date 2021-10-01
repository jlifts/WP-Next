/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react/no-danger */
import React from 'react';
import Head from 'next/head';
// import { HeaderProps } from 'typings/global';
import Meta from 'lib/Meta';
import * as gtag from 'lib/GA';
import { FB_PIXEL_ID } from './fpixel';

// SEO Props to be added {}: HeaderProps
function SEO(): JSX.Element {
  return (
    <>
      <Head>
        <title>Victis Health</title>
        {/* Add extra elements to <head> here. */}

        {/* Square Web Payments API */}
        {/* <script
          type="text/javascript"
          src="https://sandbox.web.squarecdn.com/v1/square.js"
        ></script> */}

        {/* Global Site Code Pixel - Facebook Pixel */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
                !function(f,b,e,v,n,t,s)
                {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t,s)}(window, document,'script',
                'https://connect.facebook.net/en_US/fbevents.js');
                fbq('init', ${FB_PIXEL_ID});
              `,
          }}
        />

        {/* Global Site Tag (gtag.js) - Google Analytics */}
        <script
          // strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${gtag.GA_TRACKING_ID}`}
        />
        <script
          // strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gtag.GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `,
          }}
        />
        {/* Font Awesome for star ratings import */}
        <script
          src="https://kit.fontawesome.com/c1562e6535.js"
          crossOrigin="anonymous"
        ></script>
        <Meta>
          <link
            rel="preconnect"
            href="https://fonts.gstatic.com"
            crossOrigin="anonymous"
          />
          <link
            rel="preload"
            as="style"
            href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?display=swap&amp;family=Public%20Sans%3Aital%2Cwght%400%2C100..900%3B1%2C100..900&amp;subset=latin%2Clatin-ext"
            type="text/css"
            media="all"
          />
        </Meta>
        <noscript>
          <img
            alt="fbpixel"
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1`}
          />
        </noscript>
      </Head>
    </>
  );
}

export default SEO;
