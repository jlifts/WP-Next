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
import { createPortal } from 'react-dom';

const Modal = ({ show, onClose, children, title }: any) => {
  const [isBrowser, setIsBrowser] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
  }, []);

  const handleCloseClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    onClose();
  };

  const modalContent = show ? (
    <div className="absolute top-0 w-screen h-screen flex justify-center items-center bg-black bg-opacity-30 z-10 overflow-hidden">
      <div className="bg-white w-full md:w-1/2 h-3/4 rounded-lg p-8 z-30">
        <span className="flex justify-end text-lg">
          <span onClick={handleCloseClick} className="cursor-pointer">
            x
          </span>
        </span>
        {title && <Heading level="h4">{title}</Heading>}
        <div className="pt-4">{children}</div>
      </div>
    </div>
  ) : null;

  if (isBrowser) {
    return createPortal(modalContent, document.getElementById('modal-root'));
  }
  return null;
};

export default Modal;
