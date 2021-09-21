import { Cart, Drawer, SetPasswordForm, ShopNav } from 'components';
import { useRouter } from 'next/router';

import React from 'react';

const SetPassword = (): JSX.Element => {
  const router = useRouter();
  const resetKey = String(router.query.key || '');
  const login = String(router.query.login || '');
  return (
    <div className="font-mont h-full">
      <div className="sticky top-0 z-70 text-black" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <SetPasswordForm resetKey={resetKey} login={login} />
    </div>
  );
};

export default SetPassword;
