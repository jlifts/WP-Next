/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Athlete,
  Card,
  Cart,
  Drawer,
  Footer,
  PopOut,
  ShopNav,
} from 'components';
import Heading from 'components/UI/Heading';
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import axios from './api/axios/deets';

const about = ({ deets }: any): JSX.Element => {
  const { inView, ref } = useInView();
  const animationControl = useAnimation();
  const animationControlY = useAnimation();
  // eslint-disable-next-line prettier/prettier
  const content = deets?.content
    ?.replace('<!-- wp:paragraph -->', '')
    .replace('<!-- /wp:paragraph -->', '')
    .replace('<p>', '')
    .replace('</p>', '');
  const title = deets?.slug?.replace(/-/g, ' ');
  // console.log(deets);

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
    <main className="">
      <div className="sticky top-0 z-70 ml-12" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default ">
        <div className="text-3xl pt-20 md:pt-0 md:text-5xl font-bold md:tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">About</Heading>
        </div>
      </div>
      <section className="h-screen+ py-20 lg:mt-20 overflow-hidden">
        <div ref={ref} />
        <motion.img
          src="/images/richFroning.webp"
          alt="Victis Plant"
          className="lg:w-3/6 md:h-4/6 absolute right-8 top-56 md:top-auto"
          animate={animationControl}
          transition={{ duration: 1 }}
          initial={{ x: -400, opacity: 0 }}
        />
        <motion.img
          src="/images/tinandcream.webp"
          alt="Victis Cream"
          className="invisible md:visible w-1/4 absolute right-60 shadow-2xl md:mt-112 lg:mt-96 z-40"
          animate={animationControlY}
          transition={{ duration: 1.2 }}
          initial={{ y: 400, opacity: 0 }}
        />
        <motion.div
          className="flex justify-start pt-20 z-30"
          animate={animationControl}
          transition={{ duration: 1.5 }}
          initial={{ x: 400, opacity: 0 }}
        >
          <div className="md:w-3/5 h-full z-30">
            <PopOut title={title} subTitle={deets?.title} body={content} />
          </div>
        </motion.div>
      </section>
      <section className="flex flex-col h-full+ text-white py-28">
        <Athlete
          bgImage="images/Froning1.webp"
          name="Rich Froning"
          subTitle="CrossFit Champion"
          Insta="https://www.instagram.com/richfroning/"
          Facebook="https://www.facebook.com/RichFroning"
          Twitter="https://twitter.com/richfroning"
        />
        <Athlete
          bgImage="images/Square_AZ_Background.webp"
          name="Arizona Rattlers"
          subTitle="Indoor FootBall"
          Insta="https://www.instagram.com/arizonarattlers/?hl=en"
          Facebook="https://www.facebook.com/azrattlers/"
          Twitter="https://twitter.com/arizonarattlers?lang=en"
        />
        <Athlete
          bgImage="images/Square_TUC_Background.webp"
          name="Tuscon Sugar Skulls"
          subTitle="Indoor FootBall"
          Insta="https://www.instagram.com/sugarskullsfootball/?hl=en"
          Facebook="https://www.facebook.com/sugarskullsfootball/"
          Twitter="https://twitter.com/sugarskullsfb?lang=en"
        />
      </section>
      <section className="h-full p-2 lg:p-12">
        <div className="flex flex-col md:flex-row justify-around">
          <Card
            name="Zeb Portanova"
            image="/images/zeb.webp"
            description="Zeb Portanova is President of Yield Scientific and CEO of GEM Opportunity Zone Fund, an impact investment fund focused on opportunity zones in the USA. He was previously COO for Vestergaard, a global health company focused on malaria prevention and public health, and President / CEO of Swiss KRONO USA. Zeb has served on numerous boards of directors including the UN Global Compact Switzerland, Habitat for Humanity, and the Southern Carolina Regional Development Alliance. He earned his MBA from Duke University, a Master’s in Public Policy from Harvard University, and a Bachelor’s Degree from the University of Florida."
          />
          <Card
            name="Dr. Mike LaCount"
            image="/images/mike.webp"
            description="Dr. Mike LaCount is Founder and CEO of Yield Scientific as well as Advising Managing Director at Frontcourt, a leading boutique healthcare and technology investment bank. He previously served as President and CEO at Arcus Medical, and as Interim CEO, Managing Director, and Vice Chairman for Elauwit. Mike has completed research fellowships with Wyeth-Ayerst Laboratories, Procter and Gamble Pharmaceuticals, and the Computational Crystallography Group at the Pittsburgh Supercomputing Center. He earned his Doctorate in Chemistry from the University of South Carolina and holds a B.S. in Chemistry from the State University of New York."
          />
        </div>
      </section>
      {/* Possibly take away hard code */}
      <Footer copyrightHolder="Victis Health" key="footer" />
    </main>
  );
};

export async function getStaticProps() {
  const { data } = await axios.get('/this-is-victis');
  return {
    props: {
      deets: data,
    },
    revalidate: 600,
  };
}

export default about;
