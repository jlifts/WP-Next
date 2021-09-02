/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-plus-operands */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import React, { useContext, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faMinus } from '@fortawesome/free-solid-svg-icons';
import { updateCart } from 'helpers/functions';
import { CartContext } from 'Context/CartContext';

const QuantityHandler = ({ className, quantity, item }: any): JSX.Element => {
  const [cart, setCart] = useContext(CartContext);
  const [qty, setQuantity] = useState(quantity);
  console.log(item);

  const increment = () => {
    setQuantity(qty + 1);
  };

  const decrement = () => {
    if (qty === 1) {
      return;
    }
    setQuantity(qty - 1);
  };

  const handleQtyChange = (e: { target: { value: any } }) => {
    if (process.browser) {
      const newQty = e.target.value;
      setQuantity(newQty);

      let existingCart: any = localStorage.getItem('woo-cart');
      existingCart = JSON.parse(existingCart);

      const updatedCart = updateCart(existingCart, item, false, newQty);

      setCart(updatedCart);
    }
  };

  return (
    <div className={`${className} flex px-3 items-center`}>
      <button type="button" onClick={increment}>
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </button>

      <input
        type="text"
        value={qty}
        onChange={handleQtyChange}
        min="1"
        max="100"
        className="w-8 text-lg bg-transparent px-3 mx-2"
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
