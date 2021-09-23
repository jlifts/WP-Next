/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import React from 'react';
import { HeroProps } from 'typings/global';

function Hero({
  title = '',
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
      className="h-5/6 w-5/6 md:h-4/6 md:w-5/8 flex items-center justify-center md:mt-8 z-30"
      {...(id && { id })}
    >
      <div
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
        className="h-5/6 w-5/6 md:h-4/6 md:w-5/8 md:absolute z-10 bg-cover shadow-2xl"
      >
        <div>
          <h1 className="cursor-default">{title}</h1>
          <div>
            <div>{children}</div>
            {buttonText && buttonURL && (
              <p className="uppercase">
                <Link href={buttonURL}>{buttonText}</Link>
              </p>
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
      </div>
    </section>
  );
}

export default Hero;
