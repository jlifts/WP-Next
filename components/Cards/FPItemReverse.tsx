/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { AddToCart, QuantityHandler } from 'components';
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
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
  const { inView, ref } = useInView();
  const animationControl = useAnimation();

  if (inView) {
    animationControl.start({
      x: 114,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    });
  }

  return (
    <div className="w-screen h-96 flex flex-col md:grid md:grid-cols-3 z-10 my-40 text-white">
      <motion.div
        className="flex flex-col col-span-1 mx-4 justify-center transform translate-x-28"
        animate={animationControl}
        initial={{ x: -300, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <p className="pb-12">{ShortDescription}</p>
        <div className="flex h-16 justify-start" ref={ref}>
          <AddToCart
            product={ProductId}
            productName={ProductTitle}
            className="border-white border-2 px-4 py-3 mr-12"
          />
          <QuantityHandler />
        </div>
      </motion.div>
      <div className="md:col-span-2 flex justify-end">
        <div className="flex justify-end transform md:translate-x-80 md:w-full+">
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
