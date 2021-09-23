/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { IInput } from './Input';
import Error from './Errors';

const FormInput = ({
  name,
  type = 'text',
  required = true,
  placeholder,
  defaultValue,
  className,
  handleInputChange,
  inputValue,
  isShipping,
  errors,
}: IInput): JSX.Element => {
  const inputId = `${name}-${isShipping ? 'shipping' : ''}`;

  return (
    <>
      <input
        type={type}
        name={name}
        id={inputId}
        onChange={handleInputChange}
        // May have to remove the default prop
        defaultValue={defaultValue}
        value={inputValue}
        placeholder={placeholder}
        className={
          className
            ? `${className} focus:outline-none bg-transparent rounded-md border text-sm p-2 my-1`
            : 'w-full focus:outline-none bg-transparent rounded-md border text-sm p-2 my-1'
        }
        required={required}
      />
      <Error errors={errors} fieldName={name} />
    </>
  );
};

export default FormInput;
