import { Cart, Drawer } from 'components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSignOutAlt,
  faCogs,
  faJedi,
  faCalendarAlt,
  faLevelUpAlt,
} from '@fortawesome/free-solid-svg-icons';
import Heading from 'components/Heading';
import Socials from 'components/Socials';
import React from 'react';

const user = (): JSX.Element => {
  return (
    <main className="bg-primary h-screen w-screen">
      <div className="sticky top-0 z-70 text-white" key="drawer">
        <Cart />
        <Drawer />
      </div>
      <div className="grid grid-cols-5">
        <div className="flex flex-col bg-secondary h-screen col-span-1 text-white font-mont tracking-widest uppercase items-center">
          <img
            src="/images/zeb.jpeg"
            alt="User Profile"
            className="border-8 h-1/6 w-2/5 rounded-full mt-16"
          />
          <Heading level="h4" className="text-2xl py-3">
            John Doe
          </Heading>
          <p className="text-sm py-6">55/60 XP</p>
          <p className="border-b w-full border-t py-3 px-3 flex justify-between">
            <FontAwesomeIcon icon={faLevelUpAlt} />
            Levels &amp; Rewards
          </p>
          <p className="border-b w-full py-3 px-3 space-x-3 flex justify-between">
            <img
              src="/images/Victis_White_clr.png"
              alt="victis logo"
              className="w-6"
            />
            Victis Test
          </p>
          <p className="border-b w-full py-3 px-3 flex justify-between">
            <FontAwesomeIcon icon={faCalendarAlt} />
            Giveaways and Events
          </p>
          <p className="border-b w-full py-3 px-3 flex justify-between">
            <FontAwesomeIcon icon={faJedi} />
            Past Orders
          </p>
          <p className="border-b w-full py-3 px-3 flex justify-between">
            <FontAwesomeIcon icon={faCogs} />
            Settings
          </p>
          <p className="border-b w-full py-3 px-3 flex justify-between">
            <FontAwesomeIcon icon={faSignOutAlt} />
            Logout
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
    </main>
  );
};

export default user;
