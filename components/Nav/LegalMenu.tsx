/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
// import { GetStaticPropsContext } from 'next';
import { useQuery } from '@apollo/client';
import { LEGAL_MENU_QUERY } from 'graphql/Queries';
import { MenuProps, MenuQuery } from 'typings/global';
import { Client } from 'lib/ApolloClient';

const LegalMenu = ({ open }: MenuProps) => {
  const router = useRouter();
  const { data } = useQuery(LEGAL_MENU_QUERY);
  const menus = data?.menu?.menuItems?.nodes;
  // console.log(data);

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
      className="z-50 text-white space-y-6"
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
        className="flex flex-col space-y-6 mt-10"
        initial="false"
        variants={variants}
        animate={open ? 'open' : 'closed'}
      >
        {menus &&
          menus.map((item: MenuQuery) => (
            <motion.li
              key={item.id}
              variants={variant}
              //   whileHover={{ scale: 1.1 }}
              //   whileTap={{ scale: 0.95 }}
              className="px-3 hover:text-secondary w-full flex"
            >
              <div
                className={`${
                  router.pathname ===
                  item.url.replace('http://localhost:3000', '')
                    ? 'active'
                    : ''
                } px-4 mb-3 mr-3`}
              />
              <Link href={item.path} aria-label={item.label}>
                {item.label}
              </Link>
            </motion.li>
          ))}
      </motion.ul>
    </motion.div>
  );
};

export async function getStaticProps(/* context: GetStaticPropsContext */) {
  // const client = getApolloClient(context);
  const { data } = await Client.query({
    query: LEGAL_MENU_QUERY,
  });
  return {
    props: { data },
    revalidate: 600,
  };
}

export default LegalMenu;
