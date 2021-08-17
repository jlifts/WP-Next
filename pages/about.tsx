/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import {
  Athlete,
  Card,
  Cart,
  Drawer,
  Footer,
  PopOut,
  ShopNav,
} from 'components';
import Heading from 'components/Heading';
import React from 'react';

const about = (): JSX.Element => {
  const settings = useGeneralSettings();
  return (
    <main className="">
      <div className="sticky top-0 z-70 ml-12" key="drawer">
        <Cart />
        <Drawer />
        <ShopNav catagory="Shop" link="/shop" />
      </div>
      <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default">
        <div className="text-5xl font-bold tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="text-2xl pt-16">
          <Heading level="h4">About</Heading>
        </div>
      </div>
      <section className="h-screen+ py-20">
        <img
          src="/images/richFroning.jpeg"
          alt="Victis Plant"
          className="w-3/6 h-4/6 absolute z-10 right-8"
        />
        <img
          src="/images/tinandcream.jpeg"
          alt="Victis Cream"
          className="w-1/4 absolute right-60 shadow-2xl mt-96 z-40"
        />
        <div className="flex justify-start pt-20 z-30">
          <div className="w-3/5 h-full z-30">
            <PopOut
              title="This Is Victis"
              subTitle="#NotLikeOtherBrands"
              body="There is real science behind our CBD. In a world where 70% of CBD products are not labeled correctly, our products are made with the highest quality standards and most advanced science for consistent, effective results you can trust."
              body2="Our formulas have undergone rigorously-controlled testing by expert scientists and are validated by ISO accredited, third-party lab certification."
              body3="From seed to science, we own our entire supply chain to deliver consistently high quality results that work."
              body4="Due to its high Active Pharmaceutical Ingredient, our product works quickly to relieve sore joints and muscles."
            />
          </div>
        </div>
      </section>
      <section className="flex flex-col h-full+ text-white py-28">
        <Athlete
          bgImage="images/Froning1.jpeg"
          name="Rich Froning"
          subTitle="CrossFit Champion"
          Insta="https://www.instagram.com/richfroning/"
          Facebook="https://www.instagram.com/richfroning/"
        />
        <Athlete
          bgImage="images/Square_AZ_Background.png"
          name="Arizona Rattlers"
          subTitle="Indoor FootBall"
          Insta="https://www.instagram.com/richfroning/"
          Facebook="https://www.instagram.com/richfroning/"
          Twitter="https://www.instagram.com/richfroning/"
        />
        <Athlete
          bgImage="images/Square_TUC_Background.png"
          name="Tuscon Sugar Skulls"
          subTitle="Indoor FootBall"
          Insta="https://www.instagram.com/richfroning/"
          Facebook="https://www.instagram.com/richfroning/"
          Twitter="https://www.instagram.com/richfroning/"
        />
      </section>
      <section className="h-full p-12">
        <div className="flex justify-around">
          <Card
            name="Zeb Portanova"
            image="/images/zeb.jpeg"
            description="Zeb Portanova is President of Yield Scientific and CEO of GEM Opportunity Zone Fund, an impact investment fund focused on opportunity zones in the USA. He was previously COO for Vestergaard, a global health company focused on malaria prevention and public health, and President / CEO of Swiss KRONO USA. Zeb has served on numerous boards of directors including the UN Global Compact Switzerland, Habitat for Humanity, and the Southern Carolina Regional Development Alliance. He earned his MBA from Duke University, a Master’s in Public Policy from Harvard University, and a Bachelor’s Degree from the University of Florida."
          />
          <Card
            name="Dr. Mike LaCount"
            image="/images/mike.jpeg"
            description="Dr. Mike LaCount is Founder and CEO of Yield Scientific as well as Advising Managing Director at Frontcourt, a leading boutique healthcare and technology investment bank. He previously served as President and CEO at Arcus Medical, and as Interim CEO, Managing Director, and Vice Chairman for Elauwit. Mike has completed research fellowships with Wyeth-Ayerst Laboratories, Procter and Gamble Pharmaceuticals, and the Computational Crystallography Group at the Pittsburgh Supercomputing Center. He earned his Doctorate in Chemistry from the University of South Carolina and holds a B.S. in Chemistry from the State University of New York."
          />
        </div>
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default about;
