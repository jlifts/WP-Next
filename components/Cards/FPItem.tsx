/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable react/no-danger */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import Image from 'next/image';
import { IFPProps } from './FPItemReverse';
import Heading from '../UI/Heading';

const FPItem = ({ product }: IFPProps): JSX.Element => {
  const { inView, ref } = useInView();
  const animationControl = useAnimation();

  // console.log(product);

  if (inView) {
    animationControl.start({
      x: 0,
      opacity: 1,
      transition: {
        delay: 0.6,
        duration: 1.2,
      },
    });
  }

  return (
    <div className="w-screen flex flex-col md:flex-row md:grid md:grid-cols-3 text-white -mb-24 sm:-mb-10 md:-mb-32 mt-10 md:mt-24 transform md:-translate-x-48">
      <div className="md:col-span-2 flex md:flex-row flex-col pb-12">
        <div className="text-white flex transform md:rotate-90 justify-start items-center pb-9 md:pb-0">
          <div className="border-b-2 px-16 mr-3" />
          <Heading level="h4" className="cursor-default w-80">
            {product?.name}
          </Heading>
        </div>

        <div
          ref={ref}
          className="flex flex-col-reverse md:flex-col md:justify-start relative transform translate-x-10 md:-translate-x-36 w-4/6 lg:h-6/6 lg:w-5/6"
        >
          <Image
            src={product?.image.sourceUrl}
            alt={product?.image.title}
            placeholder="blur"
            blurDataURL={product?.image.sourceUrl}
            layout="fill"
            objectFit="contain"
            className="md:invisible lg:visible"
          />
        </div>
        {/* <img
            src="images/Detailline.svg"
            alt="Detailline"
            className="absolute -bottom-10 -right-48"
          /> */}
      </div>
      <motion.div
        className="md:col-span-1 transform translate-x-16 lg:translate-x-0 flex flex-col-reverse md:flex-col justify-center px-10 md:px-0 lg:pl-44 md:w-80 lg:w-132"
        animate={animationControl}
        initial={{ x: 400, opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <div
          className="pb-7"
          dangerouslySetInnerHTML={{
            __html: product?.shortDescription ?? '',
          }}
        />
        <p
          className={`${
            product?.stockStatus === 'IN_STOCK'
              ? 'text-green-300 italic'
              : 'text-red-300'
          }`}
        >
          {product?.stockStatus === 'IN_STOCK' ? 'In Stock' : 'Out of Stock'}
        </p>
      </motion.div>
    </div>
  );
};

export default FPItem;
