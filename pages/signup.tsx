/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Cart, Drawer, Footer, ShopNav } from 'components';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';
import React from 'react';
import Link from 'next/link';
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
      <form
        className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 mb-12 space-y-10 bg-white z-10"
        // onSubmit={handleSubmit}
      >
        <div className="flex flex-row justify-evenly text-2xl font-bold">
          <h4 className="cursor-default font-items">Sign Up</h4>
          <div className="text-gray-500 hover:text-black font-items">
            <Link href="/login">Sign In</Link>
          </div>
        </div>
        {/* {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
            role="alert"
          >
            <p className="font-bold font-items">Error</p>
            <p>{error}</p>
          </div>
        )} */}
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            type="text"
            name="email"
            placeholder=" "
            autoComplete="off"
            className="block w-full appearance-none focus:outline-none bg-transparent z-30"
            // required={true}
            // ref={emailRef}
          />
          <label
            htmlFor="email"
            className="absolute top-0 duration-300 origin-0 z-20"
          >
            Email
          </label>
        </div>
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            type="password"
            name="password"
            placeholder=" "
            autoComplete="off"
            className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            // required={true}
            // ref={passwordRef}
          />
          <label
            htmlFor="password"
            className="absolute top-0 duration-300 z-20 origin-0"
          >
            Password
          </label>
        </div>
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            type="password"
            name="passwordConf"
            placeholder=" "
            autoComplete="off"
            className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            // required={true}
            // ref={passwordRef}
          />
          <label
            htmlFor="password"
            className="absolute top-0 duration-300 z-20 origin-0"
          >
            Password Confirmation
          </label>
        </div>

        <button
          aria-label="Log In"
          // disabled={loading}
          type="submit"
          className="w-full px-3 py-4 text-white bg-secondary rounded-md hover:bg-secondaryAccent focus:bg-secondaryAccent focus:outline-none font-items"
        >
          Sign Up
        </button>
        <div className="flex justify-center or">or</div>
        <div>
          <GoogleLoginButton
            className="google font-items"
            // onClick={handleGoogle}
            aria-label="Log In with Google"
          >
            <span className="text-sm sm:text-xl">Log In with Google</span>
          </GoogleLoginButton>
          <FacebookLoginButton
            className="google font-items"
            // onClick={handleGoogle}
            aria-label="Log In with Google"
          >
            <span className="text-sm sm:text-xl">Log In with Facebook</span>
          </FacebookLoginButton>
        </div>
        <div className="or text-xs">
          <Link href="/login">Have an Account? Sign In</Link>
        </div>
      </form>
      <Footer copyrightHolder={settings?.title} />
    </main>
  );
};

export default Login;
