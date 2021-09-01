/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
// import { GetStaticPropsContext } from 'next';
// import { getApolloClient, getPosts } from '@wpengine/headless';
import { AnimatePresence, motion } from 'framer-motion';
// import { SINGLE_PRODUCT_QUERY } from 'graphql/Queries';
import axios from '../pages/api/axios/deets';
import {
  CTA,
  Footer,
  MainHero,
  // Posts,
  Drawer,
  PopOut,
  FPItem,
  Cart,
  FPItemReverse,
} from '../components';

/**
 * Example of post variables to query the first six posts in a named category.
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */

// const firstSixInCategory = {
//   variables: {
//     first: 6,
//     // where: { categoryName: 'uncategorized' }, // Omit this to get posts from all categories.
//   },
// };

// { deets, products }: any
const FrontPage = (): JSX.Element => {
  // const posts = usePosts(firstSixInCategory);
  const settings = useGeneralSettings();
  // const name = products?.product?.name;
  // const image = products?.product?.featuredImage.node.sourceUrl;
  // console.log(deets);
  // console.log(products);

  return (
    <AnimatePresence>
      {/* <Header title={settings?.title} description={settings?.description} /> */}
      <div className="sticky top-0 bg-primary z-50 text-white" key="drawer">
        <Cart />
        <Drawer />
      </div>
      <main
        className="bg-primary w-screen overflow-hidden static z-10"
        key="main"
      >
        <section className="h-screen z-20">
          <div className="absolute top-3 left-3 text-white font-cochin z-1">
            <motion.div className="flex items-center justify-center z-10">
              <p className="uppercase cursor-default">Share</p>
              <motion.div className="border-b-2 px-8 mx-2" />
              <CTA
                title=""
                buttonText="Instagram"
                buttonURL="https://www.instagram.com/victishealth/?hl=en"
              />
              <div className="mx-2 cursor-default">/</div>
              <CTA
                title=""
                buttonText="Facebook"
                buttonURL="https://www.facebook.com/VictisHealth/"
              />
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-7/8 w-full z-10 text-white">
            <MainHero
              title="Victis Health"
              bgImage="/images/yoga.webp"
              subtitle="Science You Can Trust, Pain Relief You Can Feel"
            />
          </div>
          <div className="flex text-white">
            <div className="border-b-2 px-16" />
            <div className="border-b-2 text-xl uppercase font-cochin">
              <CTA title="" buttonText="Shop" buttonURL="/shop/all" />
            </div>
          </div>
          <div className="absolute bottom-0 right-5">
            <div className="border-l-2 h-48 text-white z-10" />
          </div>
        </section>
        <section className="h-screen+">
          <img
            src="/images/insta-victis-lawncare2.webp"
            alt="Victis Plant"
            className="w-3/6 h-4/6 absolute z-10 left-36"
          />
          <img
            src="/images/Victis-BlueTin-front_noCBD-1.webp"
            alt="Victis Cream"
            className="w-1/4 absolute left-72 shadow-2xl mt-96 z-40"
          />
          <div className="flex justify-end pt-20 z-30">
            <div className="w-3/5 h-full z-30">
              {/* May Have to hard code */}
              {/* <PopOut
                title={deets?.slug.replace('-', ' ')}
                subTitle={deets?.title}
                body={deets?.content}
              /> */}
              <PopOut
                title="About Victis"
                subTitle="The Victis Advantage"
                body="There is real science behind our CBD. In a world where 70% of CBD products are not labeled correctly, our products are made with the highest quality standards and most advanced science for consistent, effective results you can trust."
                body2="Our formulas have undergone rigorously-controlled testing by expert scientists and are validated by ISO accredited, third-party lab certification."
                body3="From seed to science, we own our entire supply chain to deliver consistently high quality results that work."
                body4="Due to its high Active Pharmaceutical Ingredient, our product works quickly to relieve sore joints and muscles."
              />
            </div>
          </div>
        </section>
        <section className="h-full">
          {/* get rid of hardcode */}
          <FPItemReverse
            ShortDescription="This is the dissolvable pills and cool stuff about them, This is the dissolvable pills and cool stuff about them,"
            ProductId="cHJvZHVjdDoxOTEy"
            imageURL="http://localhost:10008/wp-content/uploads/2020/02/Victis-BlueTin-front.jpg"
            imageName="Therapeutic Cream: 1000MG CBD, 2OZ"
            ProductTitle="Therapeutic Cream: 1000MG CBD, 2OZ"
          />
          <FPItem
            ShortDescription="This is the dissolvable pills and cool stuff about them, This is the dissolvable pills and cool stuff about them,"
            ProductId="cHJvZHVjdDoyMDQ0"
            imageURL="http://localhost:10008/wp-content/uploads/2021/01/Victis_Rest-Melatonin_1.jpg"
            imageName="Rest + Melatonin: 600 MG CBD"
            ProductTitle="Rest + Melatonin: 600 MG CBD"
          />
          <FPItemReverse
            ShortDescription="This is the dissolvable pills and cool stuff about them, This is the dissolvable pills and cool stuff about them,"
            ProductId="cHJvZHVjdDoyMDQ1"
            imageURL="http://localhost:10008/wp-content/uploads/2021/01/Victis_Tabs_1.jpg"
            imageName="Dissolvable Tablets: 600MG CBD"
            ProductTitle="Dissolvable Tablets: 600MG CBD"
          />
        </section>
      </main>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </AnimatePresence>
  );
};

/**
 * Get additional data from WordPress that is specific to this template.
 *
 * Here we retrieve the latest six WordPress posts in a named category to
 * display at the bottom of the front page.
 *
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */

/** context: GetStaticPropsContext */
export async function getStaticProps() {
  // const client = getApolloClient(context);
  // const id = 'cbd-therapeutic-cream-1000mg-2oz-sc';
  // const { data } = await client.query({
  //   query: SINGLE_PRODUCT_QUERY,
  //   variables: { id },
  // });

  const { data: DATA } = await axios.get('/about-victis');
  return {
    props: { deets: DATA },
  };
}

export default FrontPage;
