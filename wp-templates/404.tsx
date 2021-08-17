import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import Link from 'next/link';
import { Footer, Cart, Drawer, ShopNav, MainHero } from '../components';

export default function Page(): JSX.Element {
  const settings = useGeneralSettings();

  return (
    <>
      {/* <Header title={settings?.title} description={settings?.description} /> */}
      <div className="sticky top-0 z-70 mx-6" key="drawer">
        <Cart />
        <Drawer />
        <ShopNav catagory="Shop" link="/shop" />
      </div>
      <main className="flex flex-col items-center h-screen">
        <MainHero title="404" subtitle="Oops! This page cannot be found..." />
        <div className="">
          <div>
            <div className="underline text-xl">
              <Link href="/">
                The page you were looking for does not exist or is no longer
                available. Please click here to go back to your experience.
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
