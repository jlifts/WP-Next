/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Cart, Drawer, Footer, ShopNav } from 'components';
import Heading from 'components/Heading';
import React from 'react';

const faq = (): JSX.Element => {
  const settings = useGeneralSettings();
  return (
    <main className="">
      <div className="sticky top-0 z-70 ml-12" key="drawer">
        <Cart />
        <Drawer />
        <ShopNav catagory="Shop" link="/shop" />
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default">
        <div className="text-5xl font-bold tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">The FAQs</Heading>
        </div>
      </div>
      <section className="flex flex-col items-center p-20">Faqs</section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default faq;
