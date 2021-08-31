/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-curly-brace-presence */
/* eslint-disable no-useless-concat */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Drawer, Cart, ShopNav, Footer } from 'components';
import { getApolloClient } from '@wpengine/headless';
import { GetStaticPropsContext } from 'next';
import Heading from 'components/Heading';
import React from 'react';
import { STORE_QUERY } from 'graphql/Queries';
import { CatagoryQuery } from 'typings/global';
// import { Client } from 'lib/ApolloClient';

const index = ({ catagories }: any): JSX.Element => {
  const settings = useGeneralSettings();

  return (
    <main className="font-cochin">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-14 -translate-x-6 text-xl">
          <ShopNav catagory="Collections" link="/shop" />
        </div>
      </div>
      <section className="">
        <div className="flex font-bold font-mont text-5xl tracking-widest uppercase justify-center pt-10 cursor-default">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="mt-24 bg-midgray w-screen h-full ml-20 pl-8 pt-28 mb-8">
          <div className="text-3xl tracking-wide uppercase pb-10 cursor-default">
            Collections
          </div>
          <div className="grid grid-cols-3 w-7/8 z-50 h-full pb-16">
            {catagories &&
              catagories.map((item: CatagoryQuery) => (
                <a href={`/shop/${item.slug}`} key={item.id}>
                  <div className="relative col-span-1 cursor-pointer">
                    <img
                      src={item.image.sourceUrl}
                      alt={item.name}
                      className="h-96 z-30 w-full item"
                    />
                    <div className="h-96 w-full bg-black absolute opacity-50 z-10 top-0 hover:opacity-70 hover:grow" />
                    <Heading
                      level="h5"
                      className="top-1/2 right-40 absolute font-bold text-white text-xl z-40"
                    >
                      {item.name}
                    </Heading>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  const { data } = await client.query({
    query: STORE_QUERY,
  });
  return {
    props: { catagories: data?.productCategories?.nodes?.slice(2).reverse() },
  };
}

export default index;
