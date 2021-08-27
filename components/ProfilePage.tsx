import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import React from 'react';
import {
  faSignOutAlt,
  faCogs,
  faJedi,
  faCalendarAlt,
  faLevelUpAlt,
} from '@fortawesome/free-solid-svg-icons';
import Heading from './Heading';
import Socials from './Nav/Socials';
import LogOut from './Auth/LogOut';

const ProfilePage = (): JSX.Element => {
  return (
    <div className="grid grid-cols-5">
      <div className="flex flex-col bg-secondary h-screen col-span-1 text-white font-mont tracking-widest uppercase items-center">
        <img
          src="/images/zeb.webp"
          alt="User Profile"
          className="border-8 h-1/6 w-2/5 rounded-full mt-16"
        />
        <Heading level="h4" className="text-2xl py-3">
          John Doe
        </Heading>
        <div className="relative pt-1 w-7/8">
          <div className="overflow-hidden h-2 text-xs flex rounded bg-orangeLight">
            <div
              style={{ width: '30%' }}
              className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange"
            />
          </div>
        </div>
        <p className="text-sm pt-2 pb-6">55/60 XP</p>
        <Link href="/members/levels">
          <p className="border-b w-full border-t py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faLevelUpAlt} />
            Levels &amp; Rewards
          </p>
        </Link>
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
        <Link href="/members/past_orders">
          <p className="border-b w-full py-3 px-3 flex justify-between cursor-pointer">
            <FontAwesomeIcon icon={faJedi} />
            Past Orders
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
          <LogOut />
        </p>
        <div className="absolute bottom-2 left-4">
          <Socials />
        </div>
      </div>
      <div className="flex flex-col font-mont col-span-4 text-white ">
        <div className="flex tracking-widest uppercase justify-center h-1/5 w-full items-center pt-10 cursor-default border-b">
          <Heading level="h4" className="text-5xl font-bold tracking-widest">
            Welcome to Team Victis
          </Heading>
        </div>
        <p className="text-xl p-6">Ranking: Guru</p>
      </div>
    </div>
  );
};

export default ProfilePage;
