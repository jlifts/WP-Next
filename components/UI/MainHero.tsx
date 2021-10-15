/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import React from 'react';
import { HeroProps } from 'typings/global';
import { motion } from 'framer-motion';
import Image from 'next/image';

function Hero({
  title = '',
  subtitle = '',
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
}: HeroProps): JSX.Element {
  return (
    <section
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...(id && { id })}
      className="h-4/6 w-full lg:w-5/8 flex items-center justify-center mt-8 z-40"
    >
      <div
        className={
          bgImage &&
          ` md:h-4/6 w-full lg:w-5/8 absolute z-20 bg-black opacity-30 `
        }
      />
      {bgImage && (
        <div
          // style={{
          //   backgroundImage: bgImage ? ` url(${bgImage})` : 'none',
          // }}
          className="h-4/6 w-full lg:w-5/8 absolute z-10 md:bg-cover bg-contain bg-no-repeat bg-center invisible md:visible"
        >
          <Image
            src={bgImage}
            alt="Hero background"
            layout="fill"
            priority
            // placeholder="blur"
            // blurDataURL={bgImage}
            objectFit="cover"
            quality={100}
          />
        </div>
      )}
      <div className="z-30">
        <motion.div
          className="flex flex-col items-center justify-center opacity-0"
          transition={{ duration: 1.6, delay: 0.5 }}
          animate={{ opacity: 1 }}
        >
          <h1 className="text-4xl md:text-7xl uppercase font-bold font-mont md:tracking-widest">
            {title}
          </h1>
          <h2 className="flex font-cochin uppercase text-base items-center px-12 mr-6 md:text-xl md:tracking-wide md:px-0 md:mr-0">
            {subtitle}
          </h2>
        </motion.div>
        <div>
          <div>{children}</div>
          {buttonText && buttonURL && (
            <div className="flex flex-row">
              <div className=" border-b-2 px-12" />
              <p className="uppercase text-white font-rale border-b-2">
                <Link href={buttonURL}>{buttonText}</Link>
              </p>
            </div>
          )}
          {button2Text && button2URL && (
            <p>
              <a href={button2URL} className="button button-secondary">
                {button2Text}
              </a>
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default Hero;
