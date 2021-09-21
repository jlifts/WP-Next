/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from 'Context/CartContext';
import { getFormattedCart, getUpdatedItems } from 'helpers/functions';
import { useMutation, useQuery } from '@apollo/client';
import { GET_CART_QUERY } from 'graphql/Queries/Cart';
import { UPDATE_CART } from 'graphql/Mutations';
import { v4 } from 'uuid';
import CartContent from '../Checkout/CartContent';
import CheckoutDesc from '../Checkout/CheckoutDesc';

const Cart: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useContext(CartContext);

  const numItems =
    cart !== null && Object.keys(cart).length ? cart.totalProductsCount : '';
  const totalPrice =
    cart !== null && Object.keys(cart).length ? cart.totalProductsPrice : '';
  const totalVariants = cart !== null ? cart?.products?.length : 0;
  // console.log(cart);

  // // TS Functions for PWA syncronous offline handling

  // const handleRemoveProduct = (e: any, productId: any) => {
  //   const updatedCart = removeItemFromCart(productId);
  //   setCart(updatedCart);
  // };

  // END

  // Get Cart Data.
  const { loading, error, data, refetch } = useQuery(GET_CART_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  // Update Cart Mutation.
  const [
    updateCart,
    {
      data: updateCartResponse,
      loading: updateCartProcessing,
      error: updateCartError,
    },
  ] = useMutation(UPDATE_CART, {
    onCompleted: () => {
      void refetch();
    },
    onError: () => {
      if (updateCartError) {
        const errorMessage = error?.graphQLErrors?.[0]?.message
          ? error.graphQLErrors[0].message
          : '';
        console.error(errorMessage);
      }
    },
  });

  const handleRemoveProduct = (event: any, cartKey: string, products: any) => {
    event.stopPropagation();
    if (products.length) {
      // By passing the newQty to 0 in updateCart Mutation, it will remove the item.
      const newQty = 0;
      const updatedItems = getUpdatedItems(products, newQty, cartKey);

      void updateCart({
        variables: {
          input: {
            clientMutationId: v4(),
            items: updatedItems,
          },
        },
      });
    }
  };

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className="absolute top-0 right-8 z-70">
      <div className="absolute top-2 right-8 z-70">
        <button
          type="button"
          aria-label="Nav Menu"
          className="p-4 pr-2 relative focus:outline-none outline-none"
          onClick={handleOpen}
        >
          <FontAwesomeIcon
            icon={faShoppingCart}
            className={
              open
                ? 'hidden z-10 '
                : `cursor-pointer hover:text-secondary w-full h-full`
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              open
                ? 'cursor-pointer text-secondary hover:text-primary w-full h-full'
                : `hidden`
            }
          />
        </button>
        <span
          className={
            open
              ? 'hidden'
              : `text-white bg-black rounded-full px-2 py-0.5 text-xs shadow-xl absolute left-1 ${
                  !numItems ? 'hidden' : ''
                }`
          }
        >
          {numItems}
        </span>
      </div>
      <AnimatePresence>
        {open ? (
          <motion.div
            className="md:grid md:grid-cols-6 w-screen z-50 h-screen transform translate-x-8 overflow-hidden"
            key="cart-div"
          >
            <motion.div
              className="no-mobile md:col-span-3 lg:col-span-5 bg-black h-screen cursor-pointer outline-none z-50 overflow-hidden"
              onClick={handleOpen}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.6,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
            />
            <div className="bg-lightgray w-screen h-screen z-50 pt-14 overflow-y-auto">
              <motion.div
                className={`${
                  totalVariants > 3
                    ? 'flex flex-col space-y-10 md:space-y-24 md:pb-0 pb-24 w-3/6 md:h-7/8'
                    : 'h-screen'
                } text-black flex flex-col justify-start pl-4 cursor-default`}
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: '100%',
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              >
                {cart ? (
                  cart.products.map(
                    (item: {
                      id: string;
                      name: string;
                      totalPrice: number;
                      subtotalPrice: number;
                      productId: string;
                      image: any;
                      qty: number;
                    }) => (
                      <div
                        key={item.name}
                        className={`${totalVariants > 3 ? 'h-1/6' : 'h-38'}`}
                      >
                        <CartContent
                          key={item.productId}
                          item={item}
                          products={cart.products}
                          name={item.name}
                          price={item?.subtotalPrice}
                          image={item.image.sourceUrl}
                          id={item.id}
                          quantity={item.qty}
                          handleDelete={handleRemoveProduct}
                          updateCartProcessing={updateCartProcessing}
                          updateCart={updateCart}
                        />
                      </div>
                    ),
                  )
                ) : (
                  <>
                    <p className="mt-9 mb-3 mx-2" key="1">
                      Nothing In your Cart?
                    </p>
                    <p className="my-9 mx-2" key="2">
                      Better fix that
                    </p>
                  </>
                )}

                <div
                  className={`${
                    totalVariants > 3
                      ? 'w-full+ md:w-3/4 lg:w-2/6 xl:w-1/4'
                      : 'bottom-16 absolute '
                  } `}
                >
                  <CheckoutDesc subTotal={totalPrice} disabled={!cart} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        ) : (
          ''
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Cart;
