/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Cart, Drawer, Footer, ShopNav, UnAuth, LoginForm } from 'components';
import React from 'react';

const Login = (): JSX.Element => {
  const title = 'Victis Health';
  return (
    <main className="bg-primary h-screen w-screen">
      <div className="sticky top-0 z-70 md:text-white text-black" key="drawer">
        <Cart />
        <Drawer />
        <div className="transform rotate-90 absolute translate-y-8 -translate-x-14 text-xl ml-12">
          <ShopNav catagory="Shop" link="/shop/all" />
        </div>
      </div>
      <UnAuth>
        <LoginForm />
      </UnAuth>
      <Footer copyrightHolder={title} />
    </main>
  );
};

export default Login;
