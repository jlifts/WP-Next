/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable no-console */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import { LOG_IN } from 'graphql/Mutations';
import { GET_USER } from 'graphql/Queries';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import {
  GoogleLoginButton,
  FacebookLoginButton,
} from 'react-social-login-buttons';

const LoginForm = (): JSX.Element => {
  const router = useRouter();
  const [button, setButton] = useState('Log In');
  const [logIn, { loading, error }] = useMutation(LOG_IN, {
    refetchQueries: [{ query: GET_USER }],
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setButton('Loading...');
    const Data = new FormData(e.currentTarget);
    const { email, password } = Object.fromEntries(Data);
    logIn({
      variables: {
        login: email,
        password,
      },
    })
      .then(() => router.push('/members'))
      .catch((err) => {
        console.error(err);
        setButton('Log In');
      });
  };

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 mb-12 space-y-10 bg-white z-10"
    >
      <div className="flex flex-row justify-evenly text-2xl font-bold">
        <div className="text-gray-500 hover:text-black">
          <Link href="/signup">Sign Up</Link>
        </div>
        <h4 className="cursor-default">Sign In</h4>
      </div>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
          role="alert"
        >
          <p className="font-bold font-items">Error</p>
          <p>{error.message}</p>
        </div>
      )}
      <div className="relative border-b-2 focus-within:border-blue-500 z-10">
        <input
          type="text"
          name="email"
          placeholder=" "
          autoComplete="off"
          className="block w-full appearance-none focus:outline-none bg-transparent z-30"
          required
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
          required
          // ref={passwordRef}
        />
        <label
          htmlFor="password"
          className="absolute top-0 duration-300 z-20 origin-0"
        >
          Password
        </label>
        <div className="absolute text-xs mt-2">
          <Link href="/passwordreset">Forgot Password?</Link>
        </div>
      </div>
      <button
        aria-label="Log In"
        disabled={loading}
        type="submit"
        className="w-full px-3 py-4 text-white bg-secondary rounded-md hover:bg-secondaryAccent focus:bg-secondaryAccent focus:outline-none font-items"
      >
        {button}
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
          // onClick={handleFacebook}
          aria-label="Log In with Google"
        >
          <span className="text-sm sm:text-xl">Log In with Facebook</span>
        </FacebookLoginButton>
      </div>
      <div className="or text-xs">
        <Link href="/signup">Need to Make an Account? Sign Up</Link>
      </div>
    </form>
  );
};

export default LoginForm;
