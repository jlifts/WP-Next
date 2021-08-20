/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Cart, Drawer, Footer, ShopNav, FAQ } from 'components';
import Heading from 'components/Heading';
import React, { useState, useEffect } from 'react';
import axios from './api/axios/faq';

interface FaqQuery {
  id: number;
  title: string;
  content: string;
  slug: string;
}

const faq = (): JSX.Element => {
  const settings = useGeneralSettings();
  // const faqs = axios.get(`/posts`);
  const [faqs, setFaqs] = useState([]);

  const fetchFaqs = async () => {
    try {
      const res = await axios.get('/posts');
      setFaqs(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    void fetchFaqs();
  }, [faqs]);

  return (
    <main className="">
      <div className="sticky top-0 z-70 ml-12" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default">
        <div className="text-5xl font-bold tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">The FAQs</Heading>
        </div>
      </div>
      <section className="flex flex-col items-center p-20">
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
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default faq;
