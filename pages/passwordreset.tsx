import {
  Cart,
  Drawer,
  Footer,
  PasswordResetForm,
  ShopNav,
  UnAuth,
} from 'components';
import React from 'react';

const passwordreset = (): JSX.Element => {
  return (
    <div className="bg-primary font-mont h-full">
      <div className="sticky top-0 z-70 text-white" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <UnAuth>
        <PasswordResetForm />
      </UnAuth>
      <Footer />
    </div>
  );
};

export default passwordreset;
