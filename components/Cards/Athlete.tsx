/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';
import { AthleteProps } from 'typings/global';
import Heading from '../Heading';

const Athlete = ({
  bgImage,
  subTitle,
  headingLevel = 'h3',
  name,
  Insta,
  Facebook,
  Twitter,
  id,
}: AthleteProps): JSX.Element => {
  return (
    <div
      {...(id && { id })}
      className="flex flex-col text-gray w-full z-40 h-full overflow-hidden"
    >
      <div
        style={{
          backgroundImage: bgImage ? `url(${bgImage})` : 'none',
        }}
        className="h-120 w-full absolute z-10 md:bg-cover md:bg-fixed bg-center bg-no-repeat"
      />
      <div
        className={bgImage && `h-120 w-full absolute z-20 bg-black opacity-30`}
      />
      <div className="flex flex-col items-start h-120 justify-end pl-8 md:pl-24">
        <Heading
          className="font-cochin text-lg z-20 cursor-default"
          level={headingLevel}
        >
          {subTitle}
        </Heading>
        <Heading
          className="uppercase font-mont text-2xl z-20 cursor-default"
          level={headingLevel}
        >
          {name}
        </Heading>
        <div className="flex flex-row text-xl z-20 pb-16">
          {Insta && (
            <a href={Insta}>
              <FontAwesomeIcon
                icon={faInstagram}
                className="cursor-pointer hover:text-instagram"
              />
            </a>
          )}
          {Facebook && (
            <a href={Facebook}>
              <FontAwesomeIcon
                icon={faFacebook}
                className="ml-3 cursor-pointer hover:text-facebook"
              />
            </a>
          )}
          {Twitter && (
            <a href={Twitter}>
              <FontAwesomeIcon
                icon={faTwitter}
                className="ml-3 cursor-pointer hover:text-twitter"
              />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default Athlete;
