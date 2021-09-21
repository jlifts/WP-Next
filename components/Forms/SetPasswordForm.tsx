/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import Link from 'next/link';
import { RESET_PASSWORD } from 'graphql/Mutations';

interface Props {
  resetKey: string;
  login: string;
}

const SetPasswordForm = ({ resetKey: key, login }: Props): JSX.Element => {
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [clientErrorMessage, setClientErrorMessage] = useState('');
  const [resetPassword, { data, loading, error }] = useMutation(RESET_PASSWORD);
  const wasPasswordReset = Boolean(data?.resetUserPassword?.user?.databaseId);

  function validate() {
    setClientErrorMessage('');

    const isPasswordLongEnough = password.length >= 5;
    if (!isPasswordLongEnough) {
      setClientErrorMessage('Password must be at least 5 characters.');
      return false;
    }

    const doPasswordsMatch = password === passwordConfirm;
    if (!doPasswordsMatch) {
      setClientErrorMessage('Passwords must match.');
      return false;
    }

    return true;
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const isValid = validate();
    if (!isValid) return;

    resetPassword({
      variables: {
        key,
        login,
        password,
      },
    }).catch((err) => {
      console.error(err);
    });
  }

  if (wasPasswordReset) {
    return (
      <div className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 mt-12 mb-12 space-y-10 bg-white z-10">
        <p className="text-xl flex justify-center py-10">
          Your new password has been set.
        </p>
        <Link href="/login">
          <a className="flex justify-center text-xl">Log in</a>
        </Link>
      </div>
    );
  }

  return (
    <form
      method="post"
      onSubmit={handleSubmit}
      className="flex flex-col max-w-md mx-auto w-full rounded-lg shadow-xl overflow-hidden p-10 pt-44 md:pt-0 md:mt-12 mb-12 bg-white z-10"
    >
      <fieldset disabled={loading} aria-busy={loading} className="space-y-10">
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            id="new-password"
            type="password"
            value={password}
            className="block w-full appearance-none focus:outline-none bg-transparent z-30"
            autoComplete="new-password"
            onChange={(event) => setPassword(event.target.value)}
            required
          />
          <label
            htmlFor="new-password"
            className="absolute top-0 duration-300 origin-0 z-20"
          >
            Password
          </label>
        </div>
        <div className="relative border-b-2 focus-within:border-blue-500 z-10">
          <input
            id="password-confirm"
            type="password"
            className="block w-full appearance-none focus:outline-none bg-transparent z-30"
            value={passwordConfirm}
            autoComplete="new-password"
            onChange={(event) => setPasswordConfirm(event.target.value)}
            required
          />
          <label
            htmlFor="password-confirm"
            className="absolute top-0 duration-300 origin-0 z-20"
          >
            Confirm Password
          </label>
        </div>
        {clientErrorMessage ? (
          <p className="error-message">{clientErrorMessage}</p>
        ) : null}
        {error ? <p className="error-message">{error.message}</p> : null}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-3 py-4 text-white bg-secondary hover:text-secondary border-2 border-secondary hover:border-secondary rounded-md hover:bg-white focus:bg-white focus:outline-none"
        >
          {loading ? 'Saving...' : 'Save password'}
        </button>
      </fieldset>
    </form>
  );
};

export default SetPasswordForm;
