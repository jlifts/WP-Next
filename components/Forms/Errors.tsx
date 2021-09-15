/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React from 'react';

interface IErrors {
  errors: any;
  fieldName: string;
}

const Error = ({ errors, fieldName }: IErrors) => {
  return errors && errors.hasOwnProperty(fieldName) ? (
    <div className="flex flex-col text-red-500 text-sm">
      {errors[fieldName]}
    </div>
  ) : null;
};

export default Error;
