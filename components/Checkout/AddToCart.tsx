/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { gql, useQuery, useMutation } from '@apollo/client';
import { CartContext } from 'Context/CartContext';
import { addFirstProduct, updateCart } from 'helpers/functions';
import React, { useState, useContext } from 'react';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';

interface ButtonProps {
  className?: string;
  product?: any;
  productName?: string;
  quant?: number;
}

const ADD_TO_CART = gql`
  mutation AddToCart {
    addToCart(input: { productId: 10, clientMutationId: "", quantity: 1 }) {
      cartItem {
        key
        quantity
        subtotal
        total
        product {
          node {
            id
            databaseId
            image {
              sourceUrl
            }
            name
            onSale
          }
        }
      }
    }
  }
`;

const toastConfig = {
  position: toast.POSITION.BOTTOM_LEFT,
  autoClose: 5000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};

const AddToCart = ({
  className,
  product,
  productName,
  quant,
}: ButtonProps): JSX.Element => {
  const [cart, setCart] = useContext(CartContext);

  const handler = () => {
    // Checks that client side has loaded for localstorage
    if (process.browser) {
      // If there are items, update
      let exists = localStorage.getItem('woo-cart');

      if (exists) {
        exists = JSON.parse(exists);
        const qtyToBeAdded = 1;

        const updatedCart = updateCart(exists, product, qtyToBeAdded);
        setCart(updatedCart);
      } else {
        // Add new item by adding to empty array
        const newCart = addFirstProduct(product);
        setCart(newCart);
      }
      toast.success(
        `🦄 ${product.name || productName} Added To Cart!`,
        toastConfig,
      );
    }
  };

  return (
    <>
      <button className={className} type="submit" onClick={handler}>
        Add To Cart
      </button>
    </>
  );
};

export default AddToCart;
