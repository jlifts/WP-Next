/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// TODO: Fix with UseEffect
// Make a duplicate that returns a quantity for AddToCart Buttons?

const AddToCartQuantity = ({ className, qty, setQty }: any): JSX.Element => {
  const increment = () => {
    const newQty = qty + 1;
    setQty(newQty);
  };

  const decrement = () => {
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    setQty(newQty);
  };

  const handleQtyChange = () => {
    setQty(qty);
  };
  // console.log(qty);

  return (
    <div className={`${className} flex px-3 items-center`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={increment}
      >
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </motion.button>

      <input
        type="text"
        value={qty}
        onChange={handleQtyChange}
        min="1"
        max="100"
        className=" w-8 text-lg bg-transparent px-2 mx-2"
      />

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={decrement}
      >
        <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
      </motion.button>
    </div>
  );
};

export default AddToCartQuantity;
