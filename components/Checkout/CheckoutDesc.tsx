/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-one-expression-per-line */
import Link from 'next/link';
import React, { useState } from 'react';

interface IProps {
  subTotal?: number | any;
  disabled?: boolean;
}

const CheckoutDesc = ({ subTotal, disabled = true }: IProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-start">
      <p>SubTotal:</p>
      <p>${subTotal ? subTotal.toFixed(2) : 0}</p>

      <button
        type="button"
        disabled={disabled}
        className={`${
          disabled && 'hidden'
        } text-white font-mont text-xl bg-black border-white border-2 px-10 py-1 hover:bg-white hover:border-black hover:text-black cursor-pointer`}
      >
        <Link href="/checkout">Checkout</Link>
      </button>
    </div>
  );
};

export default CheckoutDesc;
