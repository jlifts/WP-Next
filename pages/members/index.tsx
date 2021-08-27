import { Cart, Drawer, Authed, ProfilePage } from 'components';

import React from 'react';

const user = (): JSX.Element => {
  return (
    <main className="bg-primary h-screen w-screen">
      <div className="sticky top-0 z-70 text-white" key="drawer">
        <Cart />
        <Drawer />
      </div>
      <Authed>
        <ProfilePage />
      </Authed>
    </main>
  );
};

export default user;
