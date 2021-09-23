/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useQuery, useMutation } from '@apollo/client';
import { toastConfig } from 'components/ToastConfig';
import { CartContext } from 'Context/CartContext';
import { motion } from 'framer-motion';
import { ADD_TO_CART } from 'graphql/Mutations';
import { GET_CART_QUERY } from 'graphql/Queries/Cart';
import {
  addFirstProduct,
  getFormattedCart,
  updateCart,
} from 'helpers/functions';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

interface ButtonProps {
  className?: string;
  product?: any;
  productName?: string;
  quant?: number;
}

const AddToCart = ({
  className,
  product,
  productName,
  quant,
}: ButtonProps): JSX.Element => {
  const [cart, setCart] = useContext(CartContext);

  // New
  const { productId } = product;

  const productQryInput = {
    clientMutationId: v4(), // Generate a unique id.
    productId,
    quantity: quant || 1,
  };

  // TS Functions for PWA syncronous offline handling
  // const addToCartHandler = () => {
  //   // Checks that client side has loaded for localstorage
  //   if (process.browser) {
  //     // If there are items, update
  //     let exists = localStorage.getItem('woo-cart');

  //     if (exists) {
  //       exists = JSON.parse(exists);
  //       const qtyToBeAdded = 1;

  //       const updatedCart = updateCart(exists, product, qtyToBeAdded);
  //       setCart(updatedCart);
  //     } else {
  //       // Add new item by adding to empty array
  //       const newCart = addFirstProduct(product);
  //       setCart(newCart);
  //     }
  //     toast.success(
  //       `🦄 ${product.name || productName} Added To Cart!`,
  //       toastConfig,
  //     );
  //   }
  // };

  // Get Cart Data
  const { data, refetch } = useQuery(GET_CART_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Add to Cart Mutation.
  const [addToCart, { data: addToCartRes, loading: addToCartLoading, error }] =
    useMutation(ADD_TO_CART, {
      variables: {
        input: productQryInput,
      },
      onCompleted: () => {
        // On Success:
        // Make the GET_CART query to update the cart with new values in React context.
        void refetch();
      },
      onError: () => {
        if (error) {
          console.error(error?.graphQLErrors?.[0]?.message ?? '');
        }
      },
    });

  const addToCartHandler = async () => {
    await addToCart();
    toast.success(
      `🦄 ${product.name || productName} Added To Cart!`,
      toastConfig,
    );
  };

  return (
    <>
      <motion.button
        className={className}
        type="submit"
        onClick={addToCartHandler}
        disabled={addToCartLoading}
        whileTap={{ scale: 0.95 }}
      >
        {addToCartLoading ? 'Adding to Cart...' : ' Add To Cart'}
      </motion.button>
    </>
  );
};

export default AddToCart;
