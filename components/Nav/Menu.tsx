/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/prop-types */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
import { MenuProps, MenuQuery } from 'typings/global';
import { MENU_QUERY } from 'graphql/Queries';
import useAuth from 'hooks/useAuth';
import { Client } from 'lib/ApolloClient';

const Menu = ({ open }: MenuProps) => {
  const router = useRouter();
  // const id = 'dGVybToyNA==';
  const { loggedIn } = useAuth();
  const { data } = useQuery(MENU_QUERY);
  const menu = data?.menu?.menuItems?.nodes;
  // const menu = menus?.menus?.nodes[0]?.menuItems?.nodes;
  // console.log(menus);
  // console.log(router.asPath);

  const variants = {
    open: {
      transition: { staggerChildren: 0.1 },
      y: 0,
    },
    closed: {
      transition: { staggerChildren: 0.1, staggerDirection: -1 },
    },
  };

  const variant = {
    open: {
      y: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 500, velocity: -100 },
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
      className="z-50 text-white space-y-6 font-mont"
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
        <motion.li
          variants={variant}
          className="px-3 hover:text-secondary w-full flex"
        >
          <div
            className={`${
              router.pathname === '/[[...page]]' ? 'active' : ''
            } px-4 mb-3 mr-3`}
          />
          <Link href="/" aria-label="Home">
            Home
          </Link>
        </motion.li>
        {menu &&
          menu.map((item: MenuQuery) => (
            <motion.li
              key={item.id}
              variants={variant}
              className="px-3 hover:text-secondary w-full flex"
            >
              <div
                className={`${
                  router.asPath ===
                  item.url.replace('http://localhost:3000', '')
                    ? 'active'
                    : ''
                } px-4 mb-3 mr-3`}
              />
              <Link href={item.url} aria-label={item.label}>
                {item.label}
              </Link>
            </motion.li>
          ))}
        {!loggedIn ? (
          <motion.li
            variants={variant}
            className="px-3 hover:text-secondary w-full flex"
          >
            <div
              className={`${
                router.pathname === '/login' ? 'active' : ''
              } px-4 mb-3 mr-3`}
            />
            <Link href="/login" aria-label="Home">
              Login
            </Link>
          </motion.li>
        ) : (
          <>
            <motion.li
              variants={variant}
              className="px-3 hover:text-secondary w-full flex"
            >
              <div
                className={`${
                  router.pathname === '/members' ? 'active' : ''
                } px-4 mb-3 mr-3`}
              />
              <Link href="/members" aria-label="Home">
                Profile
              </Link>
            </motion.li>

            <motion.li
              variants={variant}
              className="px-3 hover:text-secondary w-full flex"
            >
              <div className="px-4 mb-3 mr-3" />
              <Link href="/logout" aria-label="Home">
                LogOut
              </Link>
            </motion.li>
          </>
        )}
      </motion.ul>
    </motion.div>
  );
};

export async function getStaticProps(/* context: GetStaticPropsContext */) {
  const { data } = await Client.query({
    query: MENU_QUERY,
    variables: { id: 24 },
  });
  return {
    props: { menus: data },
    revalidate: 600,
  };
}

export default Menu;
