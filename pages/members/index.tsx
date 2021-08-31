import { Cart, Drawer, Authed, ProfilePage, ProfileNav } from 'components';

import React from 'react';

const user = (): JSX.Element => {
  return (
    <main className="bg-primary w-screen">
      <div className="sticky top-0 z-70 text-white" key="drawer">
        <Cart />
        <Drawer />
      </div>
      <div className="grid grid-cols-5">
        <Authed>
          <ProfileNav />
          <ProfilePage />
        </Authed>
      </div>
    </main>
  );
};

export default user;
