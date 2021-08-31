/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useAppSelector } from 'redux/hooks';
import { selectCart, selectSubTotalPrice } from 'redux/slices/cartSlice';
import CartContent from '../Checkout/CartContent';
import CheckoutDesc from '../Checkout/CheckoutDesc';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const numItems = useAppSelector(selectCart);
  const products = useAppSelector((state) => state.product.products);
  const items = useAppSelector((state) => state.cart.items);
  const totalPrice = useAppSelector(selectSubTotalPrice);

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
          <motion.div className="grid grid-cols-6 w-screen z-50 h-screen">
            <motion.div
              className="bg-black h-screen cursor-pointer outline-none col-span-5 z-50"
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
            <div className="bg-lightgray w-screen h-screen z-50 pt-14">
              <motion.div
                className="text-black flex flex-col justify-start h-screen pl-4 cursor-default"
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: '100%',
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              >
                {Object.entries(items).map(([id, quantity]) => (
                  <CartContent
                    name={id.name}
                    imageUrl={undefined}
                    price={undefined}
                    quantity={quantity}
                  />
                ))}
                <div className="absolute bottom-16">
                  <CheckoutDesc subTotal={totalPrice} />
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
