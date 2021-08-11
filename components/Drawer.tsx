import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './Menu';

const Drawer: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [rotate, setRotate] = useState(false);
  const [rotateReverse, setRotateReverse] = useState(false);
  const [disapear, setDisapear] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setRotate(!rotate);
    setRotateReverse(!rotateReverse);
    setDisapear(!disapear);
  };

  return (
    <div className="sticky mr-5">
      <nav className="absolute top-3 right-5 z-70">
        <div className="flex items-center justify-end z-70 mb-2 bg-transparent relative">
          <button
            type="button"
            aria-label="Nav Menu"
            className="p-3 pr-8 text-white w-10 h-10 relative focus:outline-none outline-none"
            onClick={handleOpen}
          >
            <div className="block w-5 absolute left-1/2 top-3 transform  -translate-x-1/2 -translate-y-1/2 shadow-xl">
              <motion.span
                className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  rotate ? 'rotate' : ''
                }`}
              />
              <motion.span
                className={`block absolute mt-2 h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                  disapear ? 'disapear' : ''
                }`}
              />
              <motion.span
                className={`block absolute  mt-4 h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                  rotateReverse ? 'rotateReverse' : ''
                }`}
              />
            </div>
          </button>
        </div>
        <AnimatePresence>
          {open ? (
            <motion.div className="grid grid-cols-6 w-screen">
              <motion.div
                className="bg-black h-screen cursor-pointer outline-none col-span-5"
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
              <div className="bg-primary">
                <Menu />
              </div>
            </motion.div>
          ) : (
            ''
          )}
        </AnimatePresence>
      </nav>
    </div>
  );
};

export default Drawer;
