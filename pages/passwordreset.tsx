import { Cart, Drawer, Footer, PasswordResetForm, ShopNav } from 'components';
import React from 'react';

const Passwordreset = (): JSX.Element => {
  return (
    <div className="bg-primary font-mont h-full">
      <div className="sticky top-0 z-70 md:text-white text-black" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <PasswordResetForm />
      <Footer />
    </div>
  );
};

export default Passwordreset;
