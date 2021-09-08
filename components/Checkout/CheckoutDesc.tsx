/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-one-expression-per-line */
import Link from 'next/link';
import React from 'react';

interface IProps {
  subTotal?: number | any;
  disabled?: boolean;
}

const CheckoutDesc = ({ subTotal, disabled = true }: IProps): JSX.Element => {
  return (
    <div className="flex flex-col justify-start">
      <p>SubTotal:</p>
      {subTotal ? (
        <p>
          {typeof subTotal !== 'string' ? `$${subTotal?.toFixed(2)}` : subTotal}
        </p>
      ) : (
        <p>$0.00</p>
      )}
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
