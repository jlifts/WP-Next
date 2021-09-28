/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CheckoutForm, CheckoutCart } from 'components';
import Heading from 'components/UI/Heading';
import { CartContext } from 'Context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Checkout = (): JSX.Element => {
  const router = useRouter();
  const [cart, setCart] = useContext(CartContext);

  return (
    <>
      <section className="flex flex-col md:grid md:grid-cols-2 w-screen">
        <div className="col-span-1 p-6 h-full">
          <Heading
            level="h4"
            className="flex font-bold font-mont md:text-5xl uppercase justify-center pt-10 md:pt-0 cursor-default text-3xl  md:tracking-widest"
          >
            Victis Health
          </Heading>
          <nav className="flex pb-6 pt-2 cursor-default">
            <div
              className={
                router.pathname === '/checkout' ? 'text-primary' : 'text-black'
              }
            >
              <p>Checkout</p>
            </div>
            <span className="px-6">{'>'}</span>
            <div
              className={
                router.pathname === '/payment'
                  ? 'text-primary'
                  : 'text-gray-300'
              }
            >
              <p>Payment</p>
            </div>
            <span className="px-6">{'>'}</span>
            <div
              className={
                router.pathname === '/orderdetails'
                  ? 'text-primary'
                  : 'text-gray-300'
              }
            >
              <p>Order Details</p>
            </div>
          </nav>
          <CheckoutForm />
          <div className="pt-4 px-6">
            <nav className="flex text-primary justify-between">
              <Link href="/return-policy">Refund Policy</Link>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/tc">Terms of Service</Link>
            </nav>
          </div>
        </div>
        <div className="h-full+ col-span-1 bg-lightgray p-6">
          <CheckoutCart products={cart} />
        </div>
      </section>
    </>
  );
};

export default Checkout;
