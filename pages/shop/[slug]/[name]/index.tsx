/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react-hooks/rules-of-hooks */
import {
  Drawer,
  Cart,
  ShopNav,
  Footer,
  AddToCart,
  AddToCartQuantity,
  StarRating,
  ProductReview,
} from 'components';
import Heading from 'components/UI/Heading';
import { useRouter } from 'next/router';
import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import { PRODUCT_QUERY, PRODUCTS_QUERY } from 'graphql/Queries';
import { getDate } from 'helpers/functions';
import { GetStaticPathsContext, GetStaticPropsContext } from 'next';
import { Client } from 'lib/ApolloClient';
import Skeleton from 'react-loading-skeleton';

// Loading or skeleton

const products = (): JSX.Element => {
  const title = 'Victis Health';
  const [qty, setQty] = useState(1);

  const router = useRouter();
  const lastPage = router.asPath.split('/').slice(0, -1).join('/');
  const itemPage = router.asPath.split('/').slice(2, -1).toString();
  const item = router.asPath.split('/').pop();

  const { data, loading, fetchMore } = useQuery(PRODUCT_QUERY, {
    variables: { id: item, first: 4, last: null, after: null, before: null },
  });
  const updateQuery = (previousResult: any, { fetchMoreResult }: any) => {
    return fetchMoreResult.product.reviews.edges.length
      ? fetchMoreResult
      : previousResult;
  };

  const product = data?.product;
  const productStatus = product?.stockStatus;
  const [productVariant, setProductVariant] = useState(null);
  const gallery = product?.galleryImages?.edges;
  const featuredImage = data?.product?.featuredImage.node.sourceUrl;
  const productOptions = product?.variations?.nodes;
  const reviews = product?.reviews?.edges;

  const handleChange = (e: any) => {
    const obj = JSON.parse(e.target.value);
    setProductVariant(obj);
  };
  // console.log(productVariant);
  // console.log(product);

  // console.log(product?.reviews);

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
      <section className="overflow-hidden w-screen">
        <div className="flex font-bold font-mont md:text-5xl uppercase justify-center md:pt-10 cursor-default text-3xl pt-20 md:tracking-widest">
          <Heading level="h4">Victis Health</Heading>
        </div>
        <div className="flex flex-col px-6 lg:px-0 md:grid md:grid-cols-2 md:gap-20 lg:gap-44 w-screen z-50 h-full pt-5 pb-12 lg:pl-40 mt-24">
          {loading && (
            <>
              <div className="flex flex-col col-span-1 cursor-default transform md:-translate-x-16 pt-20">
                <Skeleton duration={3} count={2} height={100} />
                <Skeleton duration={3} height={40} />
                <Skeleton duration={3} className="mt-28" />
                <Skeleton duration={3} count={5} className="mt-28" />
              </div>
              <div className="z-10 col-span-1 transform -translate-x-16 pt-20">
                <Skeleton height={400} count={2} />
              </div>
            </>
          )}
          {product && (
            <React.Fragment key={product.id}>
              <div className="flex flex-col col-span-1 cursor-default">
                <Heading
                  level="h5"
                  className="text-black text-3xl tracking-wide uppercase pb-1 z-40 font-mont"
                >
                  {product.name}
                </Heading>
                <div className="flex flex-col md:flex-row">
                  <div className="flex">
                    <p
                      className={`${
                        product.onSale ? 'line-through' : ''
                      } text-black text-xl tracking-wide md:pb-10 z-40 mr-4`}
                    >
                      ${product.regularPrice.replace('$', '')}
                    </p>
                    {product.onSale && (
                      <p className="text-xl cursor-default mx-4 font-semibold tracking-wide">
                        ${product.price?.replace('$', '')}
                      </p>
                    )}
                  </div>
                  <div className="flex">
                    {product.averageRating === 0 ? null : (
                      <>
                        <p className="pr-3 md:px-3 text-xl">
                          {product.averageRating}
                        </p>
                        <StarRating
                          rating={product.averageRating}
                          className="mx-0.5"
                        />
                        <p className="px-3 text-xl">{product.reviewCount}</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="flex my-8 justify-between w-5/6">
                  <AddToCartQuantity
                    className="border justify-around"
                    setQty={setQty}
                    qty={qty}
                  />
                  {product.variations && (
                    <select
                      defaultValue="Size"
                      onChange={handleChange}
                      className="border-black border"
                    >
                      <option disabled value="Size">
                        Size
                      </option>
                      {productOptions.map((sizes: any) => (
                        <option
                          value={JSON.stringify(sizes)}
                          key={sizes.attributes.nodes[0].value}
                        >
                          {sizes.attributes.nodes[0].value}
                        </option>
                      ))}
                    </select>
                  )}
                  {/* Change to the selected variation ID: disabled when Sizes */}
                  <AddToCart
                    disabled={
                      (product.stockStatus === 'OUT_OF_STOCK' &&
                        product.backorders === 'NO') ||
                      (productVariant === null && product.variations)
                    }
                    className="text-white bg-black border-2 border-black py-2 px-4 font-mont hover:bg-white hover:border-black hover:text-black"
                    product={productVariant || product}
                    quant={qty}
                  />
                </div>
                {/* Change to the selected variation ID */}
                <p
                  className={`${
                    productStatus === 'IN_STOCK'
                      ? 'text-green-300 italic'
                      : productStatus === 'ON_BACKORDER'
                      ? 'text-yellow-300 italic'
                      : 'text-red-300'
                  } py-3`}
                >
                  {productStatus === 'IN_STOCK'
                    ? 'In Stock'
                    : productStatus === 'ON_BACKORDER'
                    ? 'On Backorder'
                    : 'Out of Stock'}
                </p>
                <p
                  className="space-y-2 leading-5 pb-4"
                  dangerouslySetInnerHTML={{
                    __html: product.shortDescription ?? '',
                  }}
                />
                <ProductReview productId={product?.productId} />
                {product.reviewCount !== 0 && (
                  <div key={reviews?.node?.databaseId} className="my-5">
                    {reviews.map((review: any) => (
                      <div
                        className="border p-2 my-3 font-mont"
                        key={reviews?.node?.databaseId}
                      >
                        <div className="flex justify-between text-secondary">
                          <div className="flex">
                            {review.node.author.node !== null ? (
                              <p
                                className="font-semibold"
                                key={review?.node?.author?.node[0]?.databaseId}
                              >
                                {review?.node?.author?.node?.name}
                              </p>
                            ) : (
                              <p className="font-semibold">Anonymous</p>
                            )}
                            <StarRating
                              rating={review?.rating}
                              className="mx-2"
                            />
                          </div>
                          <p className="text-sm md:text-base md:font-semibold">
                            {getDate(review.node.date)}
                          </p>
                        </div>
                        <p
                          className="pt-2 italic"
                          dangerouslySetInnerHTML={{
                            __html: review.node.content ?? '',
                          }}
                        />
                      </div>
                    ))}
                    <div className="flex justify-between">
                      {product.reviews.pageInfo.hasPreviousPage ? (
                        <button
                          className="bg-secondary text-white px-3 py-2 rounded-full "
                          type="button"
                          onClick={() => {
                            fetchMore({
                              variables: {
                                first: null,
                                after: null,
                                last: 4,
                                before:
                                  product.reviews.pageInfo.startCursor || null,
                              },
                              updateQuery,
                            });
                          }}
                        >
                          Previous
                        </button>
                      ) : null}
                      {product.reviews.pageInfo.hasNextPage ? (
                        <button
                          className="bg-secondary text-white px-3 py-2 rounded-full "
                          type="button"
                          onClick={() => {
                            fetchMore({
                              variables: {
                                first: 4,
                                after:
                                  product.reviews.pageInfo.endCursor || null,
                                last: null,
                                before: null,
                              },
                              updateQuery,
                            });
                          }}
                        >
                          Next
                        </button>
                      ) : null}
                    </div>
                  </div>
                )}
              </div>
              <div className="z-10 col-span-1">
                <img
                  src={featuredImage}
                  alt={product.name}
                  className="h-80 lg:h-120 z-10"
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
                        className="h-80 lg:h-120 z-10"
                      />
                    ),
                  )}
              </div>
            </React.Fragment>
          )}
        </div>
      </section>
      <Footer copyrightHolder={title} key="footer" />
    </main>
  );
};

// TODO: furture nextjs static paths

// export async function getStaticPaths(context: GetStaticPathsContext) {
//   // const client = getApolloClient(context);
//   const { data } = await Client.query({
//     query: PRODUCTS_QUERY,
//     variables: { id: slug },
//   });
//   console.log(data);
//   // const singleProducts = data?.productCategory?.products?.nodes;
//   // const slugs = singleProducts?.map((product: { slug: any }) => product?.slug);
//   // const paths = slugs?.map((path: any) => ({ params: { id: path } }));

//   return { paths, fallback: false };
// }

// export async function getStaticProps(
//   { params: { name } }: any,
//   context: GetStaticPropsContext,
// ) {
//   // const client = getApolloClient(context);
//   const { data } = await Client.query({
//     query: PRODUCT_QUERY,
//     variables: { id: name },
//   });

//   return {
//     props: {
//       product: data?.product,
//       featuredImage: data?.product?.featuredImage.node.sourceUrl,
//       gallery: data?.product?.galleryImages?.edges,
//     },
//     revalidate: 1,
//   };
// }

export default products;
