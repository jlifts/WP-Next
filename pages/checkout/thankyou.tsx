import { useMutation } from '@apollo/client';
import { Drawer } from 'components';
import Heading from 'components/UI/Heading';
import { useAnimation } from 'framer-motion';

import { CLEAR_CART } from 'graphql/Mutations';

import Link from 'next/link';
import React, { useEffect } from 'react';

const CheckoutDetails = (): JSX.Element => {
  const [clearCartMutation] = useMutation(CLEAR_CART);
  const animationControl = useAnimation();

  void animationControl.start({
    x: 1,
    opacity: 1,
    transition: {
      delay: 0.6,
      duration: 1.2,
    },
  });

  useEffect(() => {
    // const cartData = localStorage.getItem('woo-cart');
    // setCart(cartData);
    void clearCartMutation();
    localStorage.removeItem('woo-cart');
    localStorage.removeItem('woo-session');
    // set the react context to no cart data
  }, [clearCartMutation]);

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
          <div className="text-xl md:text-2xl pt-16">
            <Heading level="h4">Thank You For Your Order</Heading>
          </div>
          <p className="pt-10 md:pt-0 pl-2 md:ml-0 text-base mx-6 md:mx-0">
            Thank you for ordering with Victis, please reach out to us if you
            have any questions or concerns!
          </p>
        </div>
        <div className="bg-lightgray h-60 sm:h-80 md:h-120 w-3/4 absolute z-10 font-mont tracking-widest uppercase ">
          <p className="flex text-base px-8 sm:px-12 md:px-44 md:mx-0 justify-center items-center h-full">
            An email will be sent to the email you provided us with during the
            checkout process with your reciept shortly.
          </p>
        </div>

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
