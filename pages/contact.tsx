/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-console */
import React from 'react';
import Heading from 'components/Heading';
import { Cart, ContactForm, Drawer, Footer, Hero, ShopNav } from 'components';
import axios from './api/axios/deets';

const contact = ({ deets }: any): JSX.Element => {
  const settings = 'Victis Health';
  const body = deets?.content;

  return (
    <main className="overflow-y-auto overflow-hidden">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12 overflow-hidden">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default">
        <div className="text-3xl pt-20 md:pt-0 md:text-5xl font-bold md:tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">Contact Us</Heading>
        </div>
      </div>
      <div
        className="flex flex-col md:flex-row justify-center items-center z-10 transform -translate-x-24 mb-20"
        style={{ height: '40rem' }}
      >
        <Hero bgImage="/images/cbdshelf.webp" />
        <div className="md:absolute z-10 bg-midgray h-7/10 w-7/8 transform translate-x-32 md:translate-y-44 lg:translate-y-28 cursor-default">
          <span
            className="flex justify-center items-end h-full p-12 transform translate-y-7 font-mont text-base md:text-lg"
            dangerouslySetInnerHTML={{
              __html: body ?? '',
            }}
          />
        </div>
      </div>
      <ContactForm />
      <Footer copyrightHolder={settings} key="footer" />
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
