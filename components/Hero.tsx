/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

interface Props {
  title?: string;
  id?: string;
  bgImage?: string;
  buttonText?: string;
  buttonURL?: string;
  button2Text?: string;
  button2URL?: string;
  children?: React.ReactNode;
}

function Hero({
  title = '',
  id,
  bgImage,
  buttonText,
  buttonURL,
  button2Text,
  button2URL,
  children,
}: Props): JSX.Element {
  return (
    <section
      className="h-4/6 w-5/8 flex items-center justify-center mt-8 z-30"
      {...(id && { id })}
    >
      <div
        style={{ backgroundImage: bgImage ? `url(${bgImage})` : 'none' }}
        className="h-4/6 w-5/8 absolute z-10 bg-cover shadow-2xl"
      >
        <div>
          <h1>{title}</h1>
          <div>
            <div>{children}</div>
            {buttonText && buttonURL && (
              <p>
                <a href={buttonURL} className="uppercase">
                  {buttonText}
                </a>
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
