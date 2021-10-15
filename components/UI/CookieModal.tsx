/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import Heading from 'components/UI/Heading';
import React, { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';

const CookieModal = ({ children, title }: any) => {
  const [show, setShowModal] = useState(true);
  const [cookie, setCookie] = useCookies();

  const handleCloseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShowModal(false);
  };

  const handleAcceptance = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setCookie('cookiePolicy', 'ACCEPTED');
    setShowModal(false);
  };

  // If clicked accept put in local storage that it is accepted and do not show again
  useEffect(() => {
    if (cookie.cookiePolicy !== 'ACCEPTED') {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  }, []);

  return show ? (
    <div className="sticky bottom-0 z-90">
      <div className=" w-screen bg-white h-1/6 p-8 pt-6 z-30">
        <span className="flex justify-end text-lg">
          <span onClick={handleCloseClick} className="cursor-pointer">
            x
          </span>
        </span>
        {title && <Heading level="h4">{title}</Heading>}
        <div className="flex items-center justify-between px-32">
          <div className="flex items-center text-black text-base cursor-default">
            {children}
          </div>
          <button
            type="button"
            className="bg-primary rounded-lg px-4 py-2 text-white"
            onClick={handleAcceptance}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  ) : null;
};

export default CookieModal;
