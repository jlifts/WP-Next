/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

interface ButtonProps {
  className?: string;
  product?: any;
}

const AddToCart = ({ className, product }: ButtonProps): JSX.Element => {
  const handler = () => {};

  return (
    <button className={className} type="submit" onClick={handler}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
