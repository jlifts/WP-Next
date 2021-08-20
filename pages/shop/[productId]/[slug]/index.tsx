/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Drawer, Cart, ShopNav, Footer } from 'components';
import Heading from 'components/Heading';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React from 'react';
import { INDIVIDUAL_QUERY } from 'graphql/Queries';

const products = (): JSX.Element => {
  const settings = useGeneralSettings();
  const router = useRouter();
  const lastPage = router.asPath.split('/').slice(0, -1).join('/');
  const item = router.asPath.split('/').pop();
  const { data } = useQuery(INDIVIDUAL_QUERY, {
    variables: { id: item },
  });
  // console.log(router.asPath.split('/').slice(0, -1).join('/'));
  const product = data?.product;
  const gallery = product?.galleryImages?.edges;
  // console.log(gallery);
  const featuredImage = data?.product?.featuredImage.node.sourceUrl;

  return (
    <main className="font-cochin h-full">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="">
          {product && (
            <ShopNav
              catagory="Collections"
              link="/shop"
              catagory2="Products"
              link2={lastPage}
              catagory3={product.slug.replaceAll('-', ' ')}
              link3={router.asPath}
            />
          )}
        </div>
      </div>
      <section className="">
        <div className="flex font-bold font-mont text-5xl tracking-widest uppercase justify-center pt-10 cursor-default">
          <Heading level="h4">Victis Health</Heading>
        </div>
        {/* <div className="mt-24 bg-midgray w-screen h-full ml-20 pl-8 pt-28 mb-8"> */}
        <div className="grid grid-cols-2 gap-44 w-screen z-50 h-full pt-5 pb-12 pl-40 mt-24">
          {product && (
            <>
              <div className="flex flex-col col-span-1">
                <Heading
                  level="h5"
                  className="text-black text-3xl tracking-wide uppercase pb-1 z-40 font-mont"
                >
                  {product.name}
                </Heading>
                <p className="text-black text-xl tracking-wide pb-10 z-40">
                  {product.regularPrice}
                </p>
                <p
                  className="space-y-2 leading-5"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription ?? '',
                  }}
                />
              </div>
              <div className=" z-10 col-span-1">
                <img
                  src={featuredImage}
                  alt={product.name}
                  className="h-120 z-10"
                />
                {gallery &&
                  gallery.map(
                    (image: { node: { sourceUrl: string | undefined } }) => (
                      <img
                        src={image.node.sourceUrl}
                        alt={product.name}
                        className="h-120 z-10"
                      />
                    ),
                  )}
              </div>
            </>
          )}
        </div>
        {/* </div> */}
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

export default products;
