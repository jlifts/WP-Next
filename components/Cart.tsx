import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faTimes } from '@fortawesome/free-solid-svg-icons';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
  };

  return (
    <nav className="absolute top-0 right-8 z-70">
      <div className="absolute top-0 right-8 z-70">
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
                ? 'hidden'
                : `cursor-pointer hover:text-secondary w-full h-full`
            }
          />
          <FontAwesomeIcon
            icon={faTimes}
            className={
              open
                ? 'cursor-pointer text-secondary hover:text-primary transform translate-x-10 w-full h-full'
                : `hidden`
            }
          />
        </button>
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
            <div className="bg-white w-screen h-screen z-50 pt-12">
              <motion.div
                className="text-black flex items-end h-80 pl-14 cursor-default"
                initial={{ y: '100%' }}
                animate={{
                  y: 0,
                }}
                exit={{
                  y: '100%',
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              >
                {' '}
                Cart
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
