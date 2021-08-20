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
import { getNextStaticProps } from '@wpengine/headless/next';
import { getApolloClient } from '@wpengine/headless';
import { GetStaticPropsContext } from 'next';
import Heading from 'components/Heading';
import React from 'react';
import { useQuery } from '@apollo/client';
import { STORE_QUERY } from 'graphql/Queries';
import { CatagoryQuery } from 'typings/global';

const index = (): JSX.Element => {
  const settings = useGeneralSettings();
  const { data } = useQuery(STORE_QUERY);
  const catagory = data?.productCategories?.nodes?.slice(2).reverse();
  // console.log(catagory);

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
            {catagory &&
              catagory.map((item: CatagoryQuery) => (
                <a href={`/shop/${item.slug}`} key={item.id}>
                  <div className="flex flex-col col-span-1 cursor-pointer">
                    <img
                      src={item.image.sourceUrl}
                      alt={item.name}
                      className="h-96 z-10"
                    />
                    <div className="absolute w-7/8">
                      <div className="h-96 hover:bg-black absolute opacity-50 z-30 " />
                      <Heading
                        level="h5"
                        className="font-bold text-transparent hover:text-white text-xl z-40"
                      >
                        {item.name}
                      </Heading>
                    </div>
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
  void client.query({
    query: STORE_QUERY,
  });
  return getNextStaticProps(context);
}

export default index;
