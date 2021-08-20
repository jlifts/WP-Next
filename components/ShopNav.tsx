/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { NavProps } from 'typings/global';

export const ShopNav = ({
  catagory,
  link,
  link2 = '#',
  catagory2 = '',
  link3 = '#',
  catagory3 = '',
}: NavProps): JSX.Element => {
  const router = useRouter();
  return (
    <nav className="capitalize">
      <div className="flex my-3 justify-start">
        <div
          className={`${
            router.asPath === `${link}` ? 'px-10 border-black' : 'px-8'
          } border-b mr-3 mb-3`}
        />
        <Link href={link}>{catagory}</Link>
      </div>
      <div className={`${link2 === '#' ? 'hidden border-black' : 'flex mb-3'}`}>
        <div
          className={`${
            router.pathname === `${link2}` ? 'px-10 border-black' : 'px-8'
          } border-b mr-3 mb-3`}
        />
        <Link href={link2}>{catagory2}</Link>
      </div>
      <div className={`${link3 === '#' ? 'hidden' : 'flex mb-3'}`}>
        <div
          className={`${
            router.pathname === `${link3}` ? 'px-10 border-black' : 'px-8'
          } border-b mr-3 mb-3`}
        />
        <Link href={link3}>{catagory3}</Link>
      </div>
    </nav>
  );
};
