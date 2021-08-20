import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';
import { usePost } from '@wpengine/headless/next';
import { Footer, MainHero, Cart, Drawer, ShopNav } from '../components';

export default function Page(): JSX.Element {
  const post = usePost();
  const settings = useGeneralSettings();

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
      <main className="p-12 space-y-4 cursor-default">
        {post?.title && (
          <div className="text-3xl flex justify-center tracking-widest text-black">
            <MainHero
              title={post?.title}
              subtitle="Science You Can Trust, Pain Relief You Can Feel"
            />
          </div>
        )}
        <div className="p-8 tracking-wide leading-8">
          {post && (
            <div>
              <div className="flex flex-col items-center">
                {/* eslint-disable-next-line react/no-danger */}
                <div dangerouslySetInnerHTML={{ __html: post.content ?? '' }} />
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer copyrightHolder={settings?.title} />
    </>
  );
}
