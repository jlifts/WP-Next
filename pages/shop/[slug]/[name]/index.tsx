/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import { useGeneralSettings } from '@wpengine/headless/react';
import {
  Drawer,
  Cart,
  ShopNav,
  Footer,
  AddToCart,
  QuantityHandler,
} from 'components';
import Heading from 'components/Heading';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React from 'react';
import { INDIVIDUAL_QUERY, SINGLE_PRODUCT_QUERY } from 'graphql/Queries';
import { getApolloClient } from '@wpengine/headless';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';

const products = ({
  producted,
  gallerys,
  featuredImages,
}: any): JSX.Element => {
  const settings = useGeneralSettings();
  const router = useRouter();
  const lastPage = router.asPath.split('/').slice(0, -1).join('/');
  const itemPage = router.asPath.split('/').slice(2, -1).toString();
  const item = router.asPath.split('/').pop();
  const { data } = useQuery(INDIVIDUAL_QUERY, {
    variables: { id: item },
  });
  const product = data?.product;
  // console.log(product?.stockStatus);
  const gallery = product?.galleryImages?.edges;
  const featuredImage = data?.product?.featuredImage.node.sourceUrl;

  return (
    <main className="font-cochin flex flex-col">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="">
          {product && (
            <ShopNav
              catagory="Collections"
              link="/shop"
              catagory2={`Products / ${itemPage}`}
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
              <div className="flex flex-col col-span-1" key={product.id}>
                <Heading
                  level="h5"
                  className="text-black text-3xl tracking-wide uppercase pb-1 z-40 font-mont"
                >
                  {product.name}
                </Heading>
                <p className="text-black text-xl tracking-wide pb-10 z-40">
                  ${product.regularPrice.replace('$', '')}
                </p>
                <div className="flex my-8 justify-between w-5/6">
                  <QuantityHandler className="border" />
                  <AddToCart
                    className="text-white bg-black border-2 border-black py-2 px-4 font-mont hover:bg-white hover:border-black hover:text-black"
                    product={product.id}
                  />
                </div>
                <p
                  className={`${
                    product.stockStatus === 'IN_STOCK'
                      ? 'text-green-300 italic'
                      : 'text-red-300'
                  } py-3`}
                >
                  {product.stockStatus === 'IN_STOCK'
                    ? 'In Stock'
                    : 'Out of Stock'}
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
                    (image: {
                      node: {
                        id: React.Key | null | undefined;
                        sourceUrl: string | undefined;
                      };
                    }) => (
                      <img
                        key={image.node.id}
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

// export async function getStaticPaths(context: GetStaticPathsContext) {
//   const client = getApolloClient(context);
//   const { data } = await client.query({
//     query: SINGLE_PRODUCT_QUERY,
//     variables: { id: slug },
//   });
//   console.log(data);
//   const singleProducts = data?.productCategory?.products?.nodes;
//   const slugs = singleProducts?.map((product: { slug: any }) => product?.slug);
//   const paths = slugs?.map((slug: any) => ({ params: { slug } }));
//   return { paths, fallback: true };
// }

// export async function getStaticProps(
//   { params: { slug } }: any,
//   context: GetStaticPropsContext,
// ) {
//   const client = getApolloClient(context);
//   const { data } = await client.query({
//     query: INDIVIDUAL_QUERY,
//     variables: { id: slug },
//   });

//   return {
//     props: {
//       product: data?.product,
//       featuredImage: data?.product?.featuredImage.node.sourceUrl,
//       gallery: data?.product?.galleryImages?.edges,
//     },
//     revalidate: 60,
//   };
// }

export default products;
