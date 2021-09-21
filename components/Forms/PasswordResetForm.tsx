/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { useMutation } from '@apollo/client';
import Heading from 'components/Heading';
import { SEND_PASSWORD_RESET_EMAIL } from 'graphql/Mutations';
import Link from 'next/link';
import React, { useState } from 'react';
import Input from './Input';

const PasswordResetForm = (): JSX.Element => {
  const [button, setButton] = useState('Send Password Reset Email');
  const [sendPasswordResetEmail, { loading, error, data }] = useMutation(
    SEND_PASSWORD_RESET_EMAIL,
  );
  const wasEmailSent = Boolean(data?.sendPasswordResetEmail?.user?.databaseId);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setButton('Sending...');
    const Data = new FormData(e.currentTarget);
    const { email } = Object.fromEntries(Data);
    sendPasswordResetEmail({
      variables: {
        username: email,
      },
    }).catch((err) => {
      console.error(err);
    });
  }

  if (wasEmailSent) {
    return (
      <div className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 mb-12 space-y-10 bg-white z-10">
        <p className="flex justify-evenly text-base cursor-default font-mont">
          Please check your email. A password reset link has been sent to you.
        </p>
      </div>
    );
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 pt-44 md:pt-0 mb-12 space-y-10 bg-white z-10"
    >
      <Heading
        level="h4"
        className="flex justify-evenly text-2xl font-bold cursor-default font-mont"
      >
        Forgot Your Password?
      </Heading>
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3"
          role="alert"
        >
          <p className="font-bold font-items">Error</p>
          <p>{error.message}</p>
        </div>
      )}
      <Input
        name="email"
        label="Email"
        type="email"
        required
        autoComplete="off"
        passwordReset={false}
      />
      <button
        aria-label="Log In"
        disabled={loading}
        type="submit"
        className="w-full px-3 py-4 text-white bg-secondary rounded-md border-2 border-secondary focus:bg-secondary focus:outline-none font-items hover:bg-white hover:text-secondary hover:border-secondary"
      >
        {button}
      </button>
      <div className="or text-xs">
        <Link href="/signup">Need to Make an Account? Sign Up</Link>
      </div>
    </form>
  );
};

export default PasswordResetForm;
