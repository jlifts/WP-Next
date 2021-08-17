/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Link from 'next/link';
import React from 'react';
import { useRouter } from 'next/router';
import { UrlObject } from 'url';

interface Props {
  catagory: string;
  link: UrlObject | string;
  catagory2?: string | null;
  link2?: UrlObject | string;
  catagory3?: string | null;
  link3?: UrlObject | string;
}

export const ShopNav = ({
  catagory,
  link,
  link2 = '#',
  catagory2 = '',
  link3 = '#',
  catagory3 = '',
}: Props): JSX.Element => {
  const router = useRouter();
  return (
    <nav className="absolute top-0 transform rotate-90 -translate-x-32 space-y-5 text-xl uppercase">
      <div className="flex">
        <div
          className={`${
            router.pathname === `${link}` ? 'px-32 border-black' : 'px-24'
          } border-b-2 mr-3 mb-3`}
        />
        <Link href={link}>{catagory}</Link>
      </div>
      <div className={`${link2 === '#' ? 'hidden border-black' : 'flex'}`}>
        <div
          className={`${
            router.pathname === `${link2}` ? 'px-32 border-black' : 'px-24'
          } border-b-2 mr-3 mb-3`}
        />
        <Link href={link2}>{catagory2}</Link>
      </div>
      <div className={`${link3 === '#' ? 'hidden' : 'flex'}`}>
        <div
          className={`${
            router.pathname === `${link3}` ? 'px-32 border-black' : 'px-24'
          } border-b-2 mr-3 mb-3`}
        />
        <Link href={link3}>{catagory3}</Link>
      </div>
    </nav>
  );
};
