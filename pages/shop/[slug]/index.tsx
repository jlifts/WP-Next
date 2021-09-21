/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/await-thenable */
/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Drawer, Cart, ShopNav, Footer, AddToCart } from 'components';
import Heading from 'components/Heading';
import { useRouter } from 'next/router';
import React from 'react';
import { PRODUCTS_QUERY, CATAGORIES } from 'graphql/Queries';
// import { GetStaticPathsContext } from 'next';
import { ProductQuery } from 'typings/global';
import { Client } from '../../../lib/ApolloClient';

const Products = ({ product }: any): JSX.Element => {
  const router = useRouter();
  const itemPage = router.asPath.split('/').slice(2).toString();
  const title = 'Victis Health';
  const page = router.asPath;
  // const prices = product[1].price.replace('$', '');
  // console.log(parseFloat(prices));

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
      <section className="overflow-hidden">
        <div className="flex font-bold font-mont md:text-5xl uppercase justify-center md:pt-10 cursor-default text-3xl pt-20 md:tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="flex flex-col items-center md:items-start mt-24 bg-midgray w-screen h-full md:ml-20 md:pl-8 pt-28 mb-8">
          <div className="text-3xl tracking-wide uppercase pb-10 cursor-default">
            Products
          </div>
          <div className="flex flex-col md:grid md:grid-cols-2 lg:grid-cols-3 gap-10 w-7/8 z-50 h-full py-12">
            {product &&
              product.map((item: ProductQuery) => (
                <div className="flex flex-col col-span-1" key={item.id}>
                  <a href={`${page}/${item.slug}`} className="h-full">
                    <div className="flex flex-col col-span-1 cursor-pointer">
                      <img
                        src={item.featuredImage.node.sourceUrl}
                        alt={item.featuredImage.node.title}
                        className="h-96 z-10 shadow-2xl transform hover:scale-105 ease-in-out"
                      />
                      <Heading
                        level="h5"
                        className="text-black text-base font-semibold z-40 font-mont py-3"
                      >
                        {item.name}
                      </Heading>
                    </div>
                  </a>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      <p
                        className={`${
                          item?.onSale ? 'line-through' : ''
                        } text-xl cursor-default`}
                      >
                        ${item?.regularPrice?.replace('$', '')}
                      </p>
                      {item?.onSale && (
                        <p className="text-xl cursor-default ml-4 font-semibold">
                          ${item?.price?.replace('$', '')}
                        </p>
                      )}
                    </div>
                    <AddToCart
                      className="text-white bg-black border-2 border-black py-2 px-4 mx-2 font-mont hover:bg-white hover:border-black hover:text-black"
                      product={item}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </section>
      <Footer copyrightHolder={title} key="footer" />
    </main>
  );
};

export async function getStaticPaths(/* context: GetStaticPathsContext */) {
  // const client = getApolloClient(context);
  const { data } = await Client.query({ query: CATAGORIES });
  const products = data?.productCategories?.nodes?.slice(2).reverse();
  const slugs = products?.map((product: { slug: any }) => product?.slug);
  const paths = slugs?.map((slug: any) => ({ params: { slug } }));
  return { paths, fallback: false };
}

export async function getStaticProps({ params: { slug } }: any) {
  // const client = getApolloClient(context);
  const { data } = await Client.query({
    query: PRODUCTS_QUERY,
    variables: { id: slug },
  });

  return {
    props: { product: data?.productCategory?.products?.nodes },
    revalidate: 60,
  };
}

export default Products;
