/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import {
  Cart,
  Drawer,
  Footer,
  ShopNav,
  UnAuth,
  UserCreationForm,
} from 'components';
import React from 'react';
import { useGeneralSettings } from '@wpengine/headless/react';

const Login = (): JSX.Element => {
  const settings = useGeneralSettings();
  return (
    <main className="bg-primary h-full w-screen">
      <div className="sticky top-0 z-70 text-white" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <UnAuth>
        <UserCreationForm />
      </UnAuth>
      <Footer copyrightHolder={settings?.title} />
    </main>
  );
};

export default Login;
