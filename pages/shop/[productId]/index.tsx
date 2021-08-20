/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useGeneralSettings } from '@wpengine/headless/react';
import { Drawer, Cart, ShopNav, Footer } from 'components';
import Heading from 'components/Heading';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React from 'react';
import { SINGLE_PRODUCT_QUERY } from 'graphql/Queries';
import { GetServerSidePropsContext, GetStaticPropsContext } from 'next';
import { getApolloClient } from '@wpengine/headless';
import { ProductQuery } from 'typings/global';

const Products = (): JSX.Element => {
  const settings = useGeneralSettings();
  const router = useRouter();
  const itemPage = router.asPath.split('/').slice(2).toString();
  const page = router.asPath;
  const { data } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id: itemPage },
  });
  const product = data?.productCategory?.products?.nodes;
  // console.log(data?.productCategory?.products?.nodes);
  // console.log(page);

  return (
    <main className="font-cochin">
      <div className="sticky top-0 z-70" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-10">
          <ShopNav
            catagory={`Products / ${itemPage}`}
            link={router.asPath}
            catagory2="Collections"
            link2="/shop"
          />
        </div>
      </div>
      <section className="">
        <div className="flex font-bold font-mont text-5xl tracking-widest uppercase justify-center pt-10 cursor-default">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="mt-24 bg-midgray w-screen h-full ml-20 pl-8 pt-28 mb-8">
          <div className="text-3xl tracking-wide uppercase pb-10 cursor-default">
            Products
          </div>
          <div className="grid grid-cols-3 gap-10 w-7/8 z-50 h-full py-12">
            {product &&
              product.map((item: ProductQuery) => (
                <a
                  href={`${page}/${item.slug}`}
                  key={item.id}
                  className="h-full"
                >
                  <div className="flex flex-col col-span-1 cursor-pointer">
                    <img
                      src={item.featuredImage.node.sourceUrl}
                      alt={item.featuredImage.node.title}
                      className="h-96 z-10 shadow-2xl"
                    />
                    <Heading
                      level="h5"
                      className="text-black text-base font-semibold z-40 font-mont py-3"
                    >
                      {item.name}
                    </Heading>
                    <p>{item.regularPrice}</p>
                  </div>
                </a>
              ))}
          </div>
        </div>
      </section>
      <Footer copyrightHolder={settings?.title} key="footer" />
    </main>
  );
};

// export async function getStaticProps({ params }) {

// }

// export async function getStaticPaths(
//   context: GetStaticPropsContext | GetServerSidePropsContext,
// ) {
//   const client = getApolloClient(context);
//   const { data } = await client.query({ query: STORE_QUERY });
//   const catagory = data?.productCategories?.nodes?.slice(2).reverse();

//   return {
//     paths: catagory.map((slug: any) => ({
//       params: { slug },
//     })),
//     fallback: false,
//   };
// }

// export async function getServerSideProps(context: GetServerSidePropsContext) {
//   const client = getApolloClient(context);
//   const product = await client.query({
//     query: PRODUCT_QUERY,
//     variables: { id: context?.params?.slug },
//   });

//   return {
//     props: { product },
//   };
// }

export default Products;
