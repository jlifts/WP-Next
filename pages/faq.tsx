/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
import { Cart, Drawer, Footer, ShopNav, FAQ } from 'components';
import Heading from 'components/UI/Heading';
import React from 'react';
import axios from './api/axios/faq';

interface FaqQuery {
  id: number;
  title: string;
  content: string;
  slug: string;
}

const faq = ({ faqs }: any): JSX.Element => {
  const title = 'Victis Health';
  // console.log(faqs);

  return (
    <main className="">
      <div className="sticky top-0 z-70 ml-12" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default overflow-hidden">
        <div className="text-3xl pt-20 md:pt-0 md:text-5xl font-bold md:tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">The FAQs</Heading>
        </div>
      </div>
      <section className="flex flex-col items-center py-12 md:py-0 md:p-20">
        {faqs &&
          faqs.map((item: FaqQuery) => (
            <FAQ
              key={item.id}
              title={item.title}
              content={item.content
                .replace('<!-- wp:paragraph -->', '')
                .replace('<!-- /wp:paragraph -->', '')
                .replace('<p>', '')
                .replace('</p>', '')}
            />
          ))}
      </section>
      <Footer copyrightHolder={title} key="footer" />
    </main>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get('/posts');
  return {
    props: { faqs: data },
    revalidate: 1,
  };
}

export default faq;
