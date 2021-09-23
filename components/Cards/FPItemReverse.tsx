/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { motion, useAnimation } from 'framer-motion';
import React from 'react';
import { useInView } from 'react-intersection-observer';
import Heading from '../Heading';

export interface IFPProps {
  imageURL?: string | any;
  imageName?: string;
  ProductTitle?: string;
  ProductId?: number;
  ShortDescription?: string;
  item?: any;
  product?: any;
}

const FPItemReverse = ({ product }: IFPProps): JSX.Element => {
  const { inView, ref } = useInView();
  const animationControl = useAnimation();

  // const cartProducts = item?.products?.map((items: any) => items);
  // const cartProduct = cartProducts?.find(
  //   (element: any) => element?.name === ProductTitle,
  // );
  // console.log(cartProduct?.qty);

  if (inView) {
    animationControl.start({
      x: 40,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    });
  }

  return (
    <div className="w-screen mt-44 sm:mt-20 md:-mt-56 py-24 flex flex-col-reverse md:flex-row md:grid md:grid-cols-3 z-10 lg:my-40 transform -translate-x-8 text-white">
      <motion.div
        className="flex flex-col-reverse md:flex-col md:col-span-1 md:mx-4 md:justify-center transform translate-x-28 px-7 md:px-0 pt-9 lg:pl-24 md:w-80 lg:w-132"
        animate={animationControl}
        initial={{ x: -400, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="pb-7 text-base"
          dangerouslySetInnerHTML={{
            __html: product.shortDescription ?? '',
          }}
        />
        <p
          className={`${
            product.stockStatus === 'IN_STOCK'
              ? 'text-green-300 italic'
              : 'text-red-300'
          }`}
        >
          {product.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
        </p>
      </motion.div>
      <div className="md:col-span-2 flex flex-col-reverse md:flex-row md:justify-end">
        <div className="flex justify-end transform md:translate-x-80 md:w-full+">
          <img
            ref={ref}
            src={product.image.sourceUrl}
            alt={product.image.title}
            // height={300}
            // width={400}
            className="w-5/6 lg:h-5/6 lg:w-4/6  md:invisible lg:visible"
          />
          {/* <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute right-80"
          /> */}
        </div>
        <div className="text-white flex transform md:rotate-90 items-center md:translate-x-44 pb-9 md:pb-0">
          <div className="border-b-2 px-16 mr-3" />
          <Heading level="h4" className="cursor-default w-80">
            {product.name}
          </Heading>
        </div>
      </div>
    </div>
  );
};

export default FPItemReverse;
