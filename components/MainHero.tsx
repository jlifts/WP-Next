/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import React from 'react';
import { HeroProps } from 'typings/global';

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
      className="h-4/6 w-5/8 flex items-center justify-center mt-8 z-40"
    >
      <div
        className={bgImage && `h-4/6 w-5/8 absolute z-20 bg-black opacity-30 `}
      />
      <div
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        }}
        className="h-4/6 w-5/8 absolute z-10 bg-cover"
      />
      <div className=" z-30">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-7xl uppercase font-bold font-mont tracking-widest">
            {title}
          </h1>
          <h2 className="font-cochin uppercase text-xl tracking-wide">
            {subtitle}
          </h2>
        </div>
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
