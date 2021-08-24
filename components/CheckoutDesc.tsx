import Link from 'next/link';
import React from 'react';

const CheckoutDesc = (): JSX.Element => {
  return (
    <div className="flex flex-col justify-start">
      <p>SubTotal:</p>
      <p>$100.00</p>

      <Link href="/checkout">
        <p className="text-white font-mont text-xl bg-black border-white border-2 px-10 py-1 hover:bg-white hover:border-black hover:text-black cursor-pointer">
          Checkout
        </p>
      </Link>
    </div>
  );
};

export default CheckoutDesc;
