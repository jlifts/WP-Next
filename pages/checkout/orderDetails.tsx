import { PaymentForm } from 'components';
import Heading from 'components/Heading';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';

const Checkout = (): JSX.Element => {
  const router = useRouter();

  return (
    <section className="grid grid-cols-2 h-screen w-screen">
      <div className="col-span-1 p-6 ">
        <Heading
          level="h4"
          className="text-5xl font-bold tracking-widest uppercase font-mont"
        >
          Victis Health
        </Heading>

        <PaymentForm />
        <div className="absolute bottom-2 pr-12 w-1/2">
          <nav className="flex text-primary justify-between">
            <Link href="/checkout">Refund Policy</Link>
            <Link href="/checkout">Privacy Policy</Link>
            <Link href="/checkout">Terms of Service</Link>
          </nav>
        </div>
      </div>
      <div className="col-span-1 bg-lightgray p-6 " />
    </section>
  );
};

export default Checkout;
