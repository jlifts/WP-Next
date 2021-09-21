import React from 'react';
import Link from 'next/link';
import { Footer, Cart, Drawer, ShopNav, MainHero } from '../components';

export default function Page(): JSX.Element {
  const title = 'Victis Health';

  return (
    <>
      {/* <Header title={settings?.title} description={settings?.description} /> */}
      <div className="sticky top-0 z-70 mx-6" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-6">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <main className="flex flex-col items-center h-screen">
        <MainHero title="404" subtitle="Oops! This page cannot be found..." />
        <div className="">
          <div>
            <div className="underline md:text-xl px-5 md:px-0">
              <Link href="/">
                The page you were looking for does not exist or is no longer
                available. Please click here to go back to your experience.
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer copyrightHolder={title} />
    </>
  );
}
