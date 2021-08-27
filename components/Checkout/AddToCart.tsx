/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
// import { useDispatch } from 'react-redux';
// import { setItem } from 'redux/slices/itemSlice';

interface ButtonProps {
  className?: string;
  handler?: any;
}

const AddToCart = ({ className, handler }: ButtonProps): JSX.Element => {
  //   const dispatch = useDispatch();

  //   const Add = () => {
  //     dispatch(
  //       setItem(itemName, quantity, itemImageUrl, itemImageAlt, itemPrice),
  //     );
  //   };

  return (
    <button className={className} type="submit" onClick={handler}>
      Add To Cart
    </button>
  );
};

export default AddToCart;
