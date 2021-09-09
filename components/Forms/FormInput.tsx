/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { IInput } from './Input';

const FormInput = ({
  name,
  type = 'text',
  required = true,
  autoComplete,
  placeholder,
  defaultValue,
  className,
}: IInput): JSX.Element => {
  return (
    <>
      <input
        type={type}
        name={name}
        id={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={
          className
            ? `${className} focus:outline-none bg-transparent rounded-md border text-sm p-2 my-1`
            : 'w-full focus:outline-none bg-transparent rounded-md border text-sm p-2 my-1'
        }
        required={required}
      />
    </>
  );
};

export default FormInput;
