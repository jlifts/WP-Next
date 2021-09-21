/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { GET_POST, LEGAL_MENU_QUERY } from 'graphql/Queries';
import { Client } from 'lib/ApolloClient';
import React from 'react';
// import { useGeneralSettings } from '@wpengine/headless/react';
// import { usePost } from '@wpengine/headless/next';
import { Footer, MainHero, Cart, Drawer, ShopNav } from '../components';

export default function Page(param: any): JSX.Element {
  // const post = usePost();
  const title = 'Victis Health';
  const post = param;
  console.log(post);

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
      <Footer copyrightHolder={title} />
    </>
  );
}

export async function getStaticPaths() {
  /* context: GetStaticPathsContext */
  // const client = getApolloClient(context);
  const { data: menuData } = await Client.query({
    query: LEGAL_MENU_QUERY,
  });
  const menu = menuData?.menu?.menuItems?.nodes;
  const slugs = menu?.map((menus: { path: string }) =>
    menus?.path.replaceAll('/', ''),
  );
  const paths = slugs?.map((slug: any) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  // const client = getApolloClient(context);
  const { data } = await Client.query({
    query: GET_POST,
    variables: { id: slug },
  });

  return {
    props: { param: data },
    revalidate: 60,
  };
}
