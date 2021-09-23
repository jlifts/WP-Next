import {
  Authed,
  Cart,
  Drawer,
  ProfileNav,
  ProfileUpdateForm,
} from 'components';
import React from 'react';

const settings = (): JSX.Element => {
  return (
    <>
      <div className="sticky top-0 z-70 text-black" key="drawer">
        <Cart />
        <Drawer />
      </div>

      <Authed>
        <div className="flex flex-col md:grid md:grid-cols-6 lg:grid-cols-5">
          <ProfileNav />
          <ProfileUpdateForm />
        </div>
      </Authed>
    </>
  );
};

export default settings;
