/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface IDiscount {
  // discount?: boolean;
  products: any;
}

const CheckoutCart = ({ products }: IDiscount): JSX.Element => {
  // console.log(products);
  return (
    <div className="pt-20">
      {products &&
        products?.products?.map((item: any) => (
          <div
            className="grid grid-cols-4 py-8 border-b cursor-default"
            key={item.productId}
          >
            <div className="relative col-span-1">
              <p className="absolute bg-gray-500 rounded-full px-2 -top-2 right-14">
                {item.qty}
              </p>
              <img
                className="w-3/5 rounded-xl"
                alt={item.name}
                src={item.image.sourceUrl}
              />
            </div>
            <p className="flex items-center -ml-6 justify-start col-span-2">
              {item.name}
            </p>
            <p className="flex items-center justify-end col-span-1">
              {item.totalPrice}
            </p>
          </div>
        ))}

      <div className="py-6 cursor-default">
        <div className="border-b space-y-4 pb-6">
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>{products?.subTotalProductsPrice}</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{products?.shippingRate}</p>
          </div>
          {products?.discountAmount && (
            <p className="flex justify-end relative">
              <span className="font-semibold px-4">
                Code: {products?.discountCode}
              </span>
              <span>-{products?.discountAmount}</span>
            </p>
          )}
        </div>
        <div className="flex justify-between py-6">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">
            <span className="text-gray-300 px-3 font-normal">USD</span>
            {products?.totalProductsPrice}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckoutCart;
