/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

interface CartItems {
  name: string;
  imageUrl: string;
  price: string;
  quantity: number;
  id?: string;
}

const CartContent = ({
  name,
  id,
  imageUrl,
  price,
  quantity,
}: CartItems): JSX.Element => {
  return (
    <div className="flex">
      {name && (
        <>
          <button
            type="button"
            className="rounded-full bg-black text-white cursor-pointer absolute -top-2 left-2 px-1.5"
            // onClick={}
          >
            X
          </button>
          <img className="h-xs" alt="cbd" src={imageUrl} />
        </>
      )}
      <div className="text-black pl-1 space-y-1">
        <p>{name}</p>
        <p>${price}</p>
        <div className="flex justify-around px-2">
          <button type="button">
            <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
          </button>
          <p>{quantity}</p>
          <button type="button">
            <FontAwesomeIcon
              icon={faMinus}
              className="cursor-pointer"
              // onClick={}
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartContent;
