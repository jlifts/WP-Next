import React from 'react';
import Document, { Html, Main, NextScript } from 'next/document';
import Head from 'lib/Head';

class MyDocument extends Document {
  render(): JSX.Element {
    return (
      <Html lang="en">
        <Head />
        <body>
          <div id="fb-root" />
          <script
            async
            defer
            crossOrigin="anonymous"
            src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v12.0"
            nonce="kzyIuGbS"
          />
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
