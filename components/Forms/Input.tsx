/* eslint-disable jsx-a11y/label-has-associated-control */
import Link from 'next/link';
import React from 'react';

interface IInput {
  name: string;
  type: string;
  label: string;
  required: boolean;
  autoComplete: string;
  passwordReset: boolean;
}

const Input = ({
  name,
  type,
  label,
  required,
  autoComplete,
  passwordReset,
}: IInput): JSX.Element => {
  return (
    <div className="relative border-b-2 focus-within:border-blue-500 z-10">
      <input
        type={type}
        name={name}
        placeholder=" "
        autoComplete={autoComplete}
        className="block w-full appearance-none focus:outline-none bg-transparent z-30"
        required={required}
        // ref={emailRef}
      />
      <label
        htmlFor={name}
        className="absolute top-0 duration-300 origin-0 z-20"
      >
        {label}
      </label>
      {passwordReset && (
        <div className="absolute text-xs mt-2">
          <Link href="/passwordreset">Forgot Password?</Link>
        </div>
      )}
    </div>
  );
};

export default Input;
