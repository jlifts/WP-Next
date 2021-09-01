/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { toast } from 'react-toastify';

interface ButtonProps {
  className?: string;
  product?: any;
  productName?: string;
}

const AddToCart = ({
  className,
  product,
  productName,
}: ButtonProps): JSX.Element => {
  const handler = () => {};
  const notify = () => {
    toast.success(`🦄 ${productName} Added To Cart!`, {
      position: toast.POSITION.BOTTOM_LEFT,
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <button className={className} type="submit" onClick={notify}>
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;
