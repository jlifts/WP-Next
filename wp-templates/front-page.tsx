/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import { usePosts, useGeneralSettings } from '@wpengine/headless/react';
import { GetStaticPropsContext } from 'next';
import { getApolloClient, getPosts } from '@wpengine/headless';
import { AnimatePresence } from 'framer-motion';
import {
  CTA,
  Footer,
  MainHero,
  Posts,
  Drawer,
  PopOut,
  FPItem,
  Cart,
} from '../components';

/**
 * Example of post variables to query the first six posts in a named category.
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
const firstSixInCategory = {
  variables: {
    first: 6,
    // where: { categoryName: 'uncategorized' }, // Omit this to get posts from all categories.
  },
};

export default function FrontPage(): JSX.Element {
  const posts = usePosts(firstSixInCategory);
  const settings = useGeneralSettings();

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
            <div className="flex items-center justify-center z-10">
              <p className="uppercase">Share</p>
              <div className="border-b-2 px-8 mx-2" />
              <CTA
                title=""
                buttonText="Instagram"
                buttonURL="https://www.instagram.com/victishealth/?hl=en"
              />
              <div className="mx-2">/</div>
              <CTA
                title=""
                buttonText="Facebook"
                buttonURL="https://www.facebook.com/VictisHealth/"
              />
            </div>
          </div>
          <div className="flex justify-center items-center h-7/8 w-full z-10 text-white">
            <MainHero
              title="Victis Health"
              bgImage="/images/yoga.jpeg"
              subtitle="Science You Can Trust, Pain Relief You Can Feel"
            />
          </div>
          <div className="flex text-white">
            <div className="border-b-2 px-16" />
            <div className="border-b-2 text-xl uppercase font-cochin">
              <CTA title="" buttonText="Shop" buttonURL="/shop" />
            </div>
          </div>
          <div className="absolute bottom-0 right-5">
            <div className="border-l-2 h-48 text-white z-10" />
          </div>
        </section>
        <section className="h-screen+">
          <img
            src="/images/insta-victis-lawncare2.jpeg"
            alt="Victis Plant"
            className="w-3/6 h-4/6 absolute z-10 left-36"
          />
          <img
            src="/images/Victis-BlueTin-front_noCBD-1.jpeg"
            alt="Victis Cream"
            className="w-1/4 absolute left-72 shadow-2xl mt-96 z-40"
          />
          <div className="flex justify-end pt-20 z-30">
            <div className="w-3/5 h-full z-30">
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
        <section className="h-full+">
          <FPItem />
          <FPItem />
          <FPItem />
        </section>

        <Posts
          posts={posts?.nodes}
          heading="Latest Posts"
          intro="The Posts component in wp-templates/front-page.tsx shows the latest six posts from the connected WordPress site."
          headingLevel="h2"
          postTitleLevel="h3"
        />

        {/* <CTA
          title="Questions or comments?"
          buttonText="Join the discussion on GitHub"
          buttonURL="https://github.com/wpengine/headless-framework/discussions"
          headingLevel="h2"
        >
          <p>
            We welcome feature requests, bug reports and questions in the{' '}
            <a href="https://github.com/wpengine/headless-framework">
              Headless Framework GitHub repository
            </a>
            .
          </p>
        </CTA> */}
      </main>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </AnimatePresence>
  );
}

/**
 * Get additional data from WordPress that is specific to this template.
 *
 * Here we retrieve the latest six WordPress posts in a named category to
 * display at the bottom of the front page.
 *
 * @see https://github.com/wpengine/headless-framework/tree/canary/docs/queries
 */
export async function getStaticProps(context: GetStaticPropsContext) {
  const client = getApolloClient(context);
  await getPosts(client, firstSixInCategory);
}
