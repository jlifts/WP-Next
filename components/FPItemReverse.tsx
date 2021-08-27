/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import Heading from './Heading';

export interface IFPProps {
  imageURL: string | any;
  imageName: string;
  ProductTitle: string;
}

const FPItemReverse = ({
  imageURL,
  imageName,
  ProductTitle,
}: IFPProps): JSX.Element => {
  return (
    <div className="w-screen flex z-10 my-28 justify-end">
      <div className="transform translate-x-96">
        <div className="flex justify-start relative">
          <img src={imageURL} alt={imageName} className="w-3/8" />
          <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute -bottom-28 -right-48"
          />
          <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute  transform rotate-180"
          />
        </div>
        <div className="text-white flex transform rotate-90 justify-start items-center ml-16 my-20">
          <div className="border-b-2 px-16 mr-3" />
          <Heading level="h4" className="cursor-default">
            {ProductTitle}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default FPItemReverse;
