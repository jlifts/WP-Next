/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { QuantityHandler } from 'components';
import React from 'react';

interface CartItems {
  name: string;
  price: number;
  image: any;
  quantity: number;
  handleDelete: any;
  id: string;
  item: any;
  products: any;
  loading: any;
}

const CartContent = ({
  name,
  id,
  price,
  image,
  quantity,
  handleDelete,
  item,
  products,
  loading,
}: CartItems): JSX.Element => {
  return (
    <div className="flex flex-col h-1/6 pl-4 md:pl-0" key={id}>
      {name && (
        <div className="relative flex">
          <button
            type="button"
            className="rounded-full bg-black text-white cursor-pointer absolute -top-2 -left-2 px-1.5"
            onClick={(e) => handleDelete(e, item.cartKey, products)}
          >
            X
          </button>
          <img className="h-full" alt={name} src={image} width={80} />
        </div>
      )}
      <div className="text-black text-sm space-y-1 ">
        <p className="w-52">{loading ? 'Updating Product...' : name}</p>
        <div className="flex">
          <p>{typeof price !== 'string' ? `$${price.toFixed(2)}` : price}</p>
          <QuantityHandler
            item={item}
            products={products}
            quantity={quantity}
            className="text-xs transform -translate-y-1"
          />
        </div>
      </div>
    </div>
  );
};

export default CartContent;
