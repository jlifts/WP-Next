/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';

interface CartItems {
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
}

const CartContent = ({
  name,
  imageUrl,
  price,
  quantity,
}: CartItems): JSX.Element => {
  return (
    <div className="flex">
      {name && (
        <>
          <span className="rounded-full bg-black text-white cursor-pointer absolute -top-2 left-2 px-1.5">
            X
          </span>
          <img className="h-xs" alt="cbd" src={imageUrl} />
        </>
      )}
      <div className="text-black pl-1 space-y-1">
        <p>{name}</p>
        <p>{price}</p>
        <p>{quantity}</p>
      </div>
    </div>
  );
};

export default CartContent;
