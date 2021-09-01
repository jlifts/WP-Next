/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';

const QuantityHandler = ({ className }: any): JSX.Element => {
  const [quantity, setQuantity] = useState(1);

  const increment = () => {
    setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity === 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div className={`${className} flex justify-around px-2`}>
      <button type="button" onClick={increment}>
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </button>

      <input
        type="text"
        value={quantity}
        onChange={() => setQuantity(quantity)}
        min="1"
        max="100"
        className="w-1/6 transform translate-x-4 text-lg bg-transparent"
      />

      <button type="button">
        <FontAwesomeIcon
          icon={faMinus}
          className="cursor-pointer"
          onClick={decrement}
        />
      </button>
    </div>
  );
};

export default QuantityHandler;
