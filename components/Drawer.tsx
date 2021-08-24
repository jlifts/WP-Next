import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Menu from './Menu';
import Socials from './Socials';

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
    <nav className="absolute top-0 right-2 z-90">
      <div className="absolute top-3 right-2 z-60">
        <button
          type="button"
          aria-label="Nav Menu"
          className="p-3 pr-8  w-10 h-10 relative focus:outline-none outline-none"
          onClick={handleOpen}
        >
          <div className="block w-5 absolute left-1/2 top-3 transform  -translate-x-1/2 -translate-y-1/2 shadow-xl">
            <motion.span
              className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                rotate ? 'rotate text-white' : ''
              }`}
            />
            <motion.span
              className={`block absolute mt-2 h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                disapear ? 'disapear' : ''
              }`}
            />
            <motion.span
              className={`block absolute  mt-4 h-0.5 w-5 bg-current transform  transition duration-500 ease-in-out ${
                rotateReverse ? 'rotateReverse text-white' : ''
              }`}
            />
          </div>
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
            <div className="bg-primary w-screen h-screen z-50 pt-12">
              <Menu open={handleOpen} />
              <motion.div
                className="text-white flex items-end h-80 pl-14"
                initial={{ x: '100%' }}
                animate={{
                  x: 0,
                }}
                exit={{
                  x: '100%',
                }}
                transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              >
                <Socials />
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
