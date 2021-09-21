/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  faLevelUpAlt,
  faCalendarAlt,
  faCogs,
  faSignOutAlt,
  faUser,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Heading from 'components/Heading';
import useAuth from 'hooks/useAuth';
import Link from 'next/link';
// import LogOut from 'pages/logOut';
import React from 'react';
import crypto from 'crypto';
import Socials from './Socials';

const ProfileNav = (): JSX.Element => {
  const { user } = useAuth();
  const { firstName, lastName, email } = user;
  const md5 = crypto.createHash('md5').update(email).digest('hex');
  const image = `https://www.gravatar.com/avatar/${md5}?r=pg`;

  return (
    <div className=" md:grid md:grid-cols-5 w-screen h-screen md:sticky md:top-0">
      <div className="flex flex-col bg-secondary h-screen col-span-1 text-white font-mont tracking-widest uppercase items-center">
        <img
          src={image}
          alt="User Profile"
          className="border-8 h-1/6 md:w-2/5 rounded-full mt-16"
        />
        <Heading level="h4" className="text-2xl py-3">
          {!firstName ? 'Teammate' : <p>{`${firstName} ${lastName}`}</p>}
        </Heading>
        {/* For the ranking system */}
        {/* <div className="relative pt-1 w-7/8">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-orangeLight">
            <div
              style={{ width: '30%' }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange"
            />
          </div>
        </div>
        <p className="text-sm pt-2 pb-6">55/60 XP</p> */}
        <Link href="/members">
          <p className="border-b w-full border-t py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faUser} />
            Profile Home
          </p>
        </Link>
        {/* <Link href="/members/levels">
          <p className="border-b w-full border-t py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faLevelUpAlt} />
            Levels &amp; Rewards
          </p>
        </Link> */}
        {/* <p className="border-b w-full py-3 px-3 space-x-3 flex justify-between">
                  <img
                    src="/images/Victis_White_clr.png"
                    alt="victis logo"
                    className="w-6"
                  />
                  Victis Test
                </p> */}
        <Link href="/members/events">
          <p className="border-b w-full py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faCalendarAlt} />
            Giveaways and Events
          </p>
        </Link>
        <Link href="/members/settings">
          <p className="border-b w-full py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faCogs} />
            Settings
          </p>
        </Link>
        <p className="border-b w-full py-3 px-3 flex justify-between">
          <FontAwesomeIcon icon={faSignOutAlt} />
          {/* <LogOut /> */}
          Logout
        </p>
        <div className="absolute bottom-2 left-4">
          <Socials />
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
