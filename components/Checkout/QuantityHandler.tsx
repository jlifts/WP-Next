/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
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
import { getUpdatedItems } from 'helpers/functions';
import { CartContext } from 'Context/CartContext';
import { v4 } from 'uuid';
import { motion } from 'framer-motion';
import { UPDATE_CART } from 'graphql/Mutations';
import { useMutation } from '@apollo/client';

// TODO: Fix with UseEffect
// Make a duplicate that returns a quantity for AddToCart Buttons?

const QuantityHandler = ({
  className,
  quantity,
  item,
  products,
}: any): JSX.Element => {
  // const [cart, setCart] = useContext(CartContext);
  const [qty, setQuantity] = useState(quantity);
  // console.log(item);
  // console.log(products);

  // Update Cart Mutation.
  const [
    updateCart,
    { data, loading: updateCartProcessing, error: updateCartError },
  ] = useMutation(UPDATE_CART, {
    onError: () => {
      if (updateCartError) {
        const errorMessage = updateCartError?.graphQLErrors?.[0]?.message
          ? updateCartError.graphQLErrors[0].message
          : '';
        console.error(errorMessage);
      }
    },
  });

  // Need to use a UseEffect

  const increment = (cartKey: string) => {
    const newQty = qty + 1;
    setQuantity(newQty);

    if (item) {
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  const decrement = (cartKey: string) => {
    if (qty === 1) {
      return;
    }
    const newQty = qty - 1;
    setQuantity(newQty);

    if (item) {
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  // // TS Functions for PWA syncronous offline handling
  // const handleQtyChange = (e: { target: { value: any } }) => {
  //   if (process.browser) {
  //     const newQty = e.target.value;
  //     setQuantity(newQty);

  //     let existingCart: any = localStorage.getItem('woo-cart');
  //     existingCart = JSON.parse(existingCart);

  //     const updatedCart = updateCart(existingCart, item, false, newQty);

  //     setCart(updatedCart);
  //   }
  // };

  const handleQtyChange = (
    event: { stopPropagation: () => void; target: { value: string } },
    cartKey: any,
  ) => {
    if (process.browser) {
      event.stopPropagation();

      // If the previous update cart mutation request is still processing, then return.
      if (updateCartProcessing) {
        return;
      }

      // If the user tries to delete the count of product, set that to 1 by default ( This will not allow him to reduce it less than zero )
      const newQty = event.target.value;

      // Set the new qty in state.
      setQuantity(newQty);

      if (item) {
        const updatedItems = getUpdatedItems(products, newQty, cartKey);

        updateCart({
          variables: {
            input: {
              clientMutationId: v4(),
              items: updatedItems,
            },
          },
        });
      }
    }
  };

  return (
    <div className={`${className} flex px-3 items-center`}>
      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => increment(item.cartKey)}
      >
        <FontAwesomeIcon icon={faPlus} className="cursor-pointer" />
      </motion.button>

      <input
        type="text"
        value={qty}
        onChange={(event) => handleQtyChange(event, item.cartKey)}
        min="1"
        max="100"
        className=" w-8 text-lg bg-transparent px-2 mx-2"
      />

      <motion.button
        type="button"
        whileTap={{ scale: 0.97 }}
        onClick={() => decrement(item.cartKey)}
      >
        <FontAwesomeIcon icon={faMinus} className="cursor-pointer" />
      </motion.button>
    </div>
  );
};

export default QuantityHandler;
