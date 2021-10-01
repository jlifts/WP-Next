/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
/* eslint-disable no-nested-ternary */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import { useMutation } from '@apollo/client';
import React from 'react';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import { REGISTER_USER } from 'graphql/Mutations';

const UserCreationForm = (): JSX.Element => {
  const [register, { data, loading, error }] = useMutation(REGISTER_USER);
  const wasSignUpSuccessful = Boolean(data?.registerUser?.user?.databaseId);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData);
    register({
      variables: values,
    }).catch((err) => {
      console.error(err);
    });
  }

  if (wasSignUpSuccessful) {
    return (
      <p className="text-white flex justify-center items-center h-72 w-full">
        Thanks! Check your email – an account confirmation link has been sent to
        you.
      </p>
    );
  }

  return (
    <form
      className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden pt-44 md:pt-10 p-10 mb-12  bg-white z-10"
      onSubmit={handleSubmit}
    >
      <fieldset disabled={loading} aria-busy={loading} className="space-y-10">
        <div className="flex flex-row justify-evenly text-2xl font-bold">
          <h4 className="cursor-default font-items">Sign Up</h4>
          <div className="text-gray-500 hover:text-black font-items">
            <Link href="/login">Sign In</Link>
          </div>
        </div>
        {error ? (
          error.message.includes('This username is already registered') ? (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
              role="alert"
            >
              <p className="font-bold font-items">
                You&#39;re already signed up!
                <Link href="/log-in">Log in</Link>
              </p>
            </div>
          ) : (
            <div
              className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
              role="alert"
            >
              <p className="font-bold font-items">Error</p>
              <p>{error.message}</p>
            </div>
          )
        ) : null}
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            type="text"
            name="firstName"
            placeholder=" "
            autoComplete="off"
            className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            // required={true}
            // ref={passwordRef}
          />
          <label
            htmlFor="firstName"
            className="absolute top-0 duration-300 z-20 origin-0"
          >
            First Name
          </label>
        </div>
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            type="text"
            name="lastName"
            placeholder=" "
            autoComplete="off"
            className="block w-full appearance-none focus:outline-none bg-transparent z-10"
            // required={true}
            // ref={passwordRef}
          />
          <label
            htmlFor="lastName"
            className="absolute top-0 duration-300 z-20 origin-0"
          >
            Last Name
          </label>
        </div>
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

        <button
          aria-label="Log In"
          disabled={loading}
          type="submit"
          className="w-full px-3 py-4 text-white bg-secondary rounded-md hover:bg-secondaryAccent focus:bg-secondaryAccent focus:outline-none font-items"
        >
          Sign Up
        </button>
        {/* Future OAuth feature */}
        {/* <div className="flex justify-center or">or</div>
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
        </div> */}
        <div className="or text-xs">
          <Link href="/login">Have an Account? Sign In</Link>
        </div>
      </fieldset>
    </form>
  );
};

export default UserCreationForm;
