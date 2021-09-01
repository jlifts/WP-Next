/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AddToCart, QuantityHandler } from 'components';
import React from 'react';
import Heading from '../Heading';

export interface IFPProps {
  imageURL: string | any;
  imageName: string;
  ProductTitle: string;
  ProductId: string;
  ShortDescription: string;
}

const FPItemReverse = ({
  imageURL,
  imageName,
  ProductTitle,
  ProductId,
  ShortDescription,
}: IFPProps): JSX.Element => {
  return (
    <div className="w-screen h-96 grid grid-cols-3 z-10 my-40 text-white">
      <div className="flex flex-col col-span-1 mx-4 justify-center transform translate-x-28">
        <p className="pb-12">{ShortDescription}</p>
        <div className="flex h-16 justify-start">
          <AddToCart
            product={ProductId}
            productName={ProductTitle}
            className="border-white border-2 px-4 py-3 mr-12"
          />
          <QuantityHandler />
        </div>
      </div>
      <div className="col-span-2 flex justify-end">
        <div className="flex justify-end transform translate-x-80 w-full+">
          <img src={imageURL} alt={imageName} height={300} width={400} />
          {/* <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute right-80"
          /> */}
        </div>
        <div className="text-white flex transform rotate-90 items-center translate-x-44">
          <div className="border-b-2 px-16 mr-3" />
          <Heading level="h4" className="cursor-default w-80">
            {ProductTitle}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default FPItemReverse;
