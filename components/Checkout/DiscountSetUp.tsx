import React from 'react';

interface IDiscount {
  discount: boolean;
  shippingText: string;
}

const DiscountSetUp = ({ discount, shippingText }: IDiscount): JSX.Element => {
  return (
    <div>
      <div className="grid grid-cols-4 pt-28 px-16 border-b pb-8">
        <div className="relative col-span-1">
          <p className="absolute bg-gray-500 rounded-full px-2 -top-2 right-12">
            2
          </p>
          <img
            className="w-3/5 rounded-xl"
            alt="cbd"
            src="/images/tinandcream.jpeg"
          />
        </div>
        <p className="flex items-center -ml-6 justify-start col-span-2">CBD</p>
        <p className="flex items-center justify-end col-span-1">$100</p>
      </div>
      {discount && (
        <form className="py-8 w-full border-b" action="">
          <input
            className="w-3/4 rounded-md p-3 border shadow-sm mr-8 focus:outline-none"
            placeholder="Discount Code"
          />
          <button
            className="w-1/5 bg-gray-400 text-white rounded-md p-3"
            type="submit"
          >
            Apply
          </button>
        </form>
      )}
      <div className="py-6">
        <div className="border-b space-y-4 pb-6">
          <div className="flex justify-between">
            <p>SubTotal</p>
            <p>$200</p>
          </div>
          <div className="flex justify-between">
            <p>Shipping</p>
            <p>{shippingText}</p>
          </div>
        </div>
        <div className="flex justify-between py-6">
          <p className="font-semibold">Total</p>
          <p className="font-semibold">
            <span className="text-gray-300 px-3 font-normal">USD</span>
            $200
          </p>
        </div>
      </div>
    </div>
  );
};

export default DiscountSetUp;
