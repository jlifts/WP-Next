/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import React from 'react';
import Heading from 'components/Heading';
import { Cart, ContactForm, Drawer, Footer, Hero, ShopNav } from 'components';
import { useGeneralSettings } from '@wpengine/headless/react';
import axios from './api/axios/deets';

const contact = ({ deets }: any): JSX.Element => {
  const settings = useGeneralSettings();
  const body = deets?.content;

  return (
    <main className="flex flex-col">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default">
        <div className="text-5xl font-bold tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">Contact Us</Heading>
        </div>
      </div>
      <div
        className="flex justify-center items-center z-10 transform -translate-x-24 mb-20"
        style={{ height: '40rem' }}
      >
        <Hero bgImage="/images/cbdshelf.webp" />
        <div className="absolute z-10 bg-midgray h-7/10 w-7/8 transform translate-x-32 translate-y-28 cursor-default">
          <span
            className="flex justify-center items-end h-full p-12 transform translate-y-7 font-mont text-lg"
            dangerouslySetInnerHTML={{
              __html: body ?? '',
            }}
          />
        </div>
      </div>
      <ContactForm />
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get('/contact-page');
  return {
    props: { deets: data },
  };
}

export default contact;
