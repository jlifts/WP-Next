import React from 'react';
import Heading from './Heading';

const FPItem = (): JSX.Element => {
  return (
    <div className="w-screen flex z-10 my-36">
      <div className="text-white flex transform rotate-90 justify-start items-center -ml-36">
        <div className="border-b-2 px-16 mr-3" />
        <Heading level="h4" className="cursor-default">
          2oz Victis Therapuetic Cream
        </Heading>
      </div>
      <div className="flex justify-start pl-16  relative">
        <img
          src="/images/Victis-BlueTin-front_noCBD-1.jpeg"
          alt="Victis Cream"
          className="w-3/8"
        />
        {/* <img
          src="images/Detailline.svg"
          alt="Detailline"
          className="absolute -bottom-28 -right-48"
        />
        <img
          src="images/Detailline.svg"
          alt="Detailline"
          className="absolute  transform rotate-180"
        /> */}
      </div>
    </div>
  );
};

export default FPItem;
