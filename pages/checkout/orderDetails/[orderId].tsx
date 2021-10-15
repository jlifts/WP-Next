/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
// import { PaymentForm } from 'components';
import { useMutation, useQuery } from '@apollo/client';
import { CheckoutCart, Drawer } from 'components';
import Heading from 'components/UI/Heading';
import { CartContext } from 'Context/CartContext';
import { CLEAR_CART } from 'graphql/Mutations';
import { GET_ORDER } from 'graphql/Queries';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';

const CheckoutDetails = (): JSX.Element => {
  const [setCart] = useContext(CartContext);
  const router = useRouter();
  const orderId = parseInt(router.asPath.split('/').pop(), 10);
  const { data } = useQuery(GET_ORDER, {
    variables: { orderId },
  });
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const shipping = data?.order?.shipping;
  console.log(data);

  useEffect(() => {
    // const cartData = localStorage.getItem('woo-cart');
    // setCart(cartData);
    void clearCartMutation();
    localStorage.removeItem('woo-cart');
    localStorage.removeItem('woo-session');
    // set the react context to no cart data
  }, [clearCartMutation, setCart]);

  return (
    <section className="flex flex-col w-screen h-screen overflow-hidden">
      <div className="h-full">
        <div className="sticky top-0 z-70 ml-12" key="drawer">
          <Drawer />
        </div>
        <div className="flex flex-col font-mont tracking-widest uppercase justify-center items-center pt-10 cursor-default ">
          <div className="text-3xl pt-20 md:pt-0 md:text-5xl font-bold md:tracking-widest">
            <Heading level="h3">Victis Health</Heading>
          </div>
          <div className="text-2xl pt-16">
            <Heading level="h4">Order #{orderId}</Heading>
          </div>
          <p className="text-base mx-6 md:mx-0">
            Thank you for ordering with Victis, please reach out to us if you
            have any questions or concerns
          </p>
        </div>
        {/* <div className="bg-lightgray h-120 w-3/4 absolute z-10" /> */}
        <div className="flex w-full m-6">
          <div className="flex flex-col text-black z-30 text-lg font-semibold w-1/2 ml-20">
            <Heading level="h4">Shipping</Heading>
            {/* <Image
              src={data?.order?.shippingAddressMapUrl}
              alt={data?.order?.id}
              placeholder="blur"
              blurDataURL={data?.order?.shippingAddressMapUrl}
              layout="fill"
              objectFit="contain"
            /> */}
            <div>
              <p>
                {shipping?.firstName} {shipping?.lastName}
              </p>
              {shipping?.company && <p>{shipping?.company}</p>}
              <p>{shipping?.email}</p>
              {shipping?.phone && <p>{shipping?.phone}</p>}
              <p>{shipping?.address1}</p>
              {shipping?.address2 && <p>{shipping?.address2}</p>}
              <p>
                {shipping?.city}, {shipping?.state} {shipping?.postcode}
              </p>
            </div>
          </div>
          <div className="w-1/2 mx-20">
            <Heading level="h5">Items</Heading>
            <CheckoutCart
              products={data?.order?.lineItems?.nodes}
              postCheckout
            />
          </div>
        </div>

        {/* <PaymentForm /> */}
        <div className="absolute bottom-2 px-12 w-screen z-20">
          <nav className="flex text-primary justify-between">
            <Link href="/checkout">Refund Policy</Link>
            <Link href="/checkout">Privacy Policy</Link>
            <Link href="/checkout">Terms of Service</Link>
          </nav>
        </div>
      </div>
    </section>
  );
};

export default CheckoutDetails;
