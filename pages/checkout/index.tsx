/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { CheckoutForm, CheckoutCart } from 'components';
import Heading from 'components/Heading';
import { CartContext } from 'Context/CartContext';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';

const Checkout = (): JSX.Element => {
  const router = useRouter();
  const [cart, setCart] = useContext(CartContext);

  return (
    <>
      <section className="grid grid-cols-2 w-screen">
        <div className="col-span-1 p-6 h-full">
          <Heading
            level="h4"
            className="text-5xl font-bold tracking-widest uppercase font-mont"
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
              <p>Order Details</p>
            </div>
          </nav>
          <CheckoutForm />
        </div>
        <div className="h-full+ col-span-1 bg-lightgray p-6">
          <CheckoutCart products={cart} />
        </div>
      </section>
      <div className="w-1/2 px-6 ">
        <nav className="flex text-primary justify-between">
          <Link href="/return-policy">Refund Policy</Link>
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/tc">Terms of Service</Link>
        </nav>
      </div>
    </>
  );
};

export default Checkout;
