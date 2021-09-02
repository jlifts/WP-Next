/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { CartContext } from 'Context/CartContext';
import CartContent from '../Checkout/CartContent';
import CheckoutDesc from '../Checkout/CheckoutDesc';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [cart, setCart] = useContext(CartContext);
  const numItems =
    cart !== null && Object.keys(cart).length ? cart.totalCount : '';
  const totalPrice =
    cart !== null && Object.keys(cart).length ? cart.totalPrice : '';
  const totalVariants = cart !== null ? cart?.products?.length : 0;
  // console.log(cart.products.length);

  const handleOpen = () => {
    setOpen(!open);
  };

  const handleRemoveProduct = () => {};

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
          <motion.div className="grid grid-cols-6 w-screen z-50 h-screen">
            <motion.div
              className={`${
                totalVariants > 3 ? 'col-span-3' : 'col-span-5'
              } bg-black h-screen cursor-pointer outline-none z-50 overflow-hidden`}
              onClick={handleOpen}
              initial={{ opacity: 0 }}
              animate={{
                opacity: 0.6,
              }}
              exit={{
                opacity: 0,
              }}
              transition={{ type: 'spring', bounce: 0, duration: 0.2 }}
              key="drawer-div"
            />
            <div className="bg-lightgray w-screen h-screen z-50 pt-14 overflow-hidden">
              <motion.div
                className={`${
                  totalVariants > 3
                    ? 'grid grid-rows-3 grid-cols-3 w-3/6 h-7/8'
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
                      image: any;
                      qty: number;
                    }) => (
                      <div
                        key={item.id}
                        className={`${totalVariants > 3 ? 'h-1/6' : 'h-48'}`}
                      >
                        <CartContent
                          item={item}
                          name={item.name}
                          price={item.totalPrice}
                          image={item.image}
                          id={item.id}
                          quantity={item.qty}
                          handleDelete={handleRemoveProduct}
                        />
                      </div>
                    ),
                  )
                ) : (
                  <>
                    <p className="mt-9 mb-3 mx-2">Nothing In your Cart?</p>
                    <p className="my-9 mx-2">Better fix that</p>
                  </>
                )}

                <div
                  className={`${
                    totalVariants > 3 ? 'pl-4 -bottom-16' : 'bottom-16'
                  } absolute `}
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

export default Drawer;
