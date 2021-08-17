/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Drawer, Cart, ShopNav, Footer } from 'components';
import Heading from 'components/Heading';
import { useRouter } from 'next/router';
import React from 'react';

const products = (): JSX.Element => {
  const settings = useGeneralSettings();
  const router = useRouter();

  return (
    <main className="font-cochin">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform translate-x-1">
          <ShopNav
            catagory="Product Name"
            link={router.asPath}
            catagory2="Products"
            link2="/shop/id"
            catagory3="Collections"
            link3="/shop"
          />
        </div>
      </div>
      <section className="">
        <div className="flex font-bold font-mont text-5xl tracking-widest uppercase justify-center pt-10 cursor-default">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="mt-24 bg-midgray w-screen h-full ml-20 pl-8 pt-28">
          <div className="text-3xl tracking-wide uppercase pb-10 cursor-default">
            Single Product
          </div>
        </div>
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default products;
