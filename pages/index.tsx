/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
// import { GetStaticPropsContext } from 'next';
import { AnimatePresence, motion, useAnimation } from 'framer-motion';
// import { SINGLE_PRODUCT_QUERY } from 'graphql/Queries';
import { useInView } from 'react-intersection-observer';
import axios from './api/axios/deets';
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

const FrontPage = ({ deets }: any): JSX.Element => {
  const { inView, ref } = useInView();
  const animationControl = useAnimation();
  const animationControlY = useAnimation();
  const title = 'Victis Health';
  // const name = products?.product?.name;
  // const image = products?.product?.featuredImage.node.sourceUrl;
  // console.log(deets);
  // console.log(products);

  // async function test() {
  //   const { data } = await Client.query({
  //     query: LEGAL_MENU_QUERY,
  //   });
  //   const menu = data?.menu?.menuItems;
  //   const slugs = menu?.nodes?.map((menus: { path: any }) =>
  //     menus?.path.replaceAll('/', ''),
  //   );
  //   const paths = slugs?.map((slug: any) => ({ params: { slug: slug } }));
  //   console.log(paths);
  // }
  // test();

  if (inView) {
    animationControl.start({
      x: 1,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    });
  }
  if (inView) {
    animationControlY.start({
      y: 1,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1,
      },
    });
  }

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
          <div className="absolute top-7 md:top-3 left-3 text-white font-cochin z-1 text-xs md:text-base">
            <motion.div
              className="flex items-center justify-center z-10 opacity-0"
              transition={{ duration: 1 }}
              animate={{ opacity: 1 }}
            >
              <p className="uppercase cursor-default">Share</p>
              <motion.div
                className="border-b-2 px-8 mx-2"
                initial={{ x: -60, opacity: 0 }}
                transition={{ duration: 1.4, delay: 0.5 }}
                animate={{ x: 1, opacity: 1 }}
              />
              <CTA
                title=""
                buttonText="Instagram"
                buttonURL="https://www.instagram.com/victishealth/?hl=en"
              />
              <div className="mx-2 cursor-default">/</div>
              {/* <CTA
                title=""
                buttonText="Facebook"
                buttonURL="https://www.facebook.com/VictisHealth/"
              /> */}
              <div
                className="fb-share-button"
                data-href="https://victishealth.com"
                data-layout="button_count"
                data-size="small"
              >
                <a
                  target="_blank"
                  href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fvictishealth.com%2F&amp;src=sdkpreparse"
                  className="fb-xfbml-parse-ignore"
                  rel="noreferrer"
                >
                  Facebook
                </a>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center items-center h-7/8 w-full z-10 text-white ">
            <MainHero
              title="Victis Health"
              bgImage="/images/yoga.webp"
              subtitle="Science You Can Trust, Pain Relief You Can Feel"
            />
          </div>
          <div className="flex text-white">
            <motion.div
              className="border-b-2"
              initial={{ x: -150 }}
              transition={{ duration: 1, delay: 1 }}
              animate={{ x: 1, width: 200 }}
            />
            <motion.div
              className=" text-xl uppercase font-cochin opacity-0 transform -translate-x-14"
              transition={{ duration: 1.5, delay: 1.2 }}
              animate={{ opacity: 1 }}
            >
              <CTA title="" buttonText="Shop" buttonURL="/shop/all" />
            </motion.div>
          </div>
          <div className="absolute bottom-0 right-5">
            <div className="border-l-2 h-48 text-white z-10 scroll-line" />
          </div>
        </section>
        <section className="h-screen+ ">
          <motion.img
            src="/images/insta-victis-lawncare2.webp"
            alt="Victis Plant"
            className="invisible md:visible w-4/6 md:w-2/4 md:h-1/4 md:left-10 lg:w-3/6 lg:h-4/6 lg:left-36 absolute "
            // animate={{ x: 1, opacity: 1 }}
            animate={animationControl}
            transition={{ duration: 1 }}
            initial={{ x: -400, opacity: 0 }}
          />
          <motion.img
            src="/images/Victis-BlueTin-front_noCBD-1.webp"
            alt="Victis Cream"
            className="w-3/4 md:w-1/4 absolute left-20 mt-136 md:mt-132 md:left-112 lg:left-72 xl:left-96 shadow-2xl lg:mt-96 z-40"
            // animate={{ y: 1, opacity: 1 }}
            animate={animationControlY}
            transition={{ duration: 1.2 }}
            initial={{ y: 400, opacity: 0 }}
          />
          <motion.div
            className="flex justify-end pt-20 z-30"
            // animate={{ x: 1, opacity: 1 }}
            animate={animationControl}
            transition={{ duration: 1.5 }}
            initial={{ x: 400, opacity: 0 }}
          >
            <div className="md:w-4/5 lg:w-3/5 h-full" ref={ref}>
              <PopOut
                title={deets?.slug.replace('-', ' ')}
                subTitle={deets?.title}
                body={deets?.content}
              />
            </div>
          </motion.div>
        </section>
        <section className="h-full md:-mt-44 lg:mt-0">
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
      <Footer copyrightHolder={title} key="footer" />
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
