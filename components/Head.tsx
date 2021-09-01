import React from 'react';
import { WPHead } from '@wpengine/headless/next';
import Head from 'next/head';
import { HeaderProps } from 'typings/global';
import Meta from 'lib/Meta';

// SEO Props to be added {}: HeaderProps
function SEO(): JSX.Element {
  return (
    <>
      <Head>
        <title>{/* Title is required here but replaced by WPHead. */}</title>
        {/* Add extra elements to <head> here. */}
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
      </Head>
      <WPHead />
    </>
  );
}

export default SEO;
