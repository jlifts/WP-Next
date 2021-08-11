/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

const Menu = () => {
  const variants = {
    open: {
      transition: { staggerChildren: 0.07 },
      y: 0,
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  };

  const variant = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      y: 50,
      opacity: 0,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  };

  return (
    <motion.div
      className="z-70 text-white space-y-6"
      initial={{ x: '100%' }}
      animate={{
        x: 0,
      }}
      exit={{
        x: '100%',
      }}
      transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
    >
      <motion.ul
        className="z-70 flex flex-col space-y-6 mt-10"
        initial="false"
        variants={variants}
        // animate={open ? 'open' : 'closed'}
      >
        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-full"
        >
          <Link href="/" aria-label="Home">
            Home
          </Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-2/4"
        >
          <Link href="/rsvp">RSVP</Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-2/4"
        >
          <Link href="/photos">Photos</Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-2/4"
        >
          <Link href="/faq">FAQ</Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-2/4"
        >
          <Link href="/places-to-stay">Places To Stay</Link>
        </motion.li>

        <motion.li
          variants={variant}
          //   whileHover={{ scale: 1.1 }}
          //   whileTap={{ scale: 0.95 }}
          className="px-3 hover:text-secondary w-2/4"
        >
          <Link href="/login">Bridal Party Login</Link>
        </motion.li>
      </motion.ul>
    </motion.div>
  );
};

export default Menu;
