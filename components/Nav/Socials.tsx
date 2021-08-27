import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFacebook,
  faInstagram,
  faTwitter,
} from '@fortawesome/free-brands-svg-icons';

const Socials = (): JSX.Element => {
  return (
    <div className="flex flex-row text-xl">
      <a href="https://www.instagram.com/victishealth/?hl=en">
        <FontAwesomeIcon
          icon={faInstagram}
          className="cursor-pointer hover:text-instagram"
        />
      </a>
      <a href="https://www.facebook.com/VictisHealth/">
        <FontAwesomeIcon
          icon={faFacebook}
          className="ml-3 cursor-pointer hover:text-facebook"
        />
      </a>
      <a href="https://twitter.com/victis_health?lang=en">
        <FontAwesomeIcon
          icon={faTwitter}
          className="ml-3 cursor-pointer hover:text-twitter"
        />
      </a>
    </div>
  );
};

export default Socials;
