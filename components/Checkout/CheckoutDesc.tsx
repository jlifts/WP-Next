/* eslint-disable react/jsx-one-expression-per-line */
import Link from 'next/link';
import React from 'react';

interface IProps {
  subTotal?: string;
}

const CheckoutDesc = ({ subTotal }: IProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-start">
      <p>SubTotal:</p>
      <p>${subTotal}</p>

      <Link href="/checkout">
        <button
          type="button"
          // disabled when no items and make it grayed out with no pointer
          className="text-white font-mont text-xl bg-black border-white border-2 px-10 py-1 hover:bg-white hover:border-black hover:text-black cursor-pointer"
        >
          Checkout
        </button>
      </Link>
    </div>
  );
};

export default CheckoutDesc;
