/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { States } from 'components/UI/states';
import React from 'react';
import FormInput from './FormInput';
import Error from './Errors';

interface IAddress {
  input: any;
  handleOnChange: any;
  isShipping: boolean;
  // defaultValue?: any;
}

const Address = ({
  input,
  handleOnChange,
  isShipping,
}: // defaultValue,
IAddress) => {
  //   console.log(defaultValue);

  const { errors } = input || {};

  return (
    <>
      <div className="flex">
        <FormInput
          name="firstName"
          // defaultValue={defaultValue?.firstName || ''}
          inputValue={input?.firstName}
          handleInputChange={handleOnChange}
          placeholder="First Name"
          autoComplete="off"
          className="w-1/2 mr-3"
          isShipping={isShipping}
          errors={errors}
          required
        />
        <FormInput
          name="lastName"
          // defaultValue={defaultValue?.lastName || ''}
          inputValue={input?.lastName}
          handleInputChange={handleOnChange}
          placeholder="Last Name"
          autoComplete="off"
          className="w-1/2"
          isShipping={isShipping}
          errors={errors}
          required
        />
      </div>
      <FormInput
        name="company"
        placeholder="Company (optional)"
        inputValue={input?.company}
        // defaultValue={
        //   isShipping
        //     ? defaultValue?.shipping?.company || ''
        //     : defaultValue?.billing?.company || ''
        // }
        handleInputChange={handleOnChange}
        autoComplete="off"
        isShipping={isShipping}
        required={false}
        errors={errors}
      />
      <FormInput
        name="address1"
        placeholder="Address"
        inputValue={input?.address1}
        // defaultValue={
        //   isShipping
        //     ? defaultValue?.shipping?.address1 || ''
        //     : defaultValue?.billing?.address1 || ''
        // }
        handleInputChange={handleOnChange}
        autoComplete="off"
        isShipping={isShipping}
        errors={errors}
        required
      />
      <FormInput
        name="address2"
        placeholder="Apartment, Suite, etc. (optional)"
        inputValue={input?.address2}
        // defaultValue={
        //   isShipping
        //     ? defaultValue?.shipping?.address2 || ''
        //     : defaultValue?.billing?.address2 || ''
        // }
        handleInputChange={handleOnChange}
        autoComplete="off"
        isShipping={isShipping}
        required={false}
        errors={errors}
      />
      <FormInput
        name="city"
        placeholder="City"
        inputValue={input?.city}
        // defaultValue={
        //   isShipping
        //     ? defaultValue?.shipping?.city || ''
        //     : defaultValue?.billing?.city || ''
        // }
        handleInputChange={handleOnChange}
        autoComplete="off"
        isShipping={isShipping}
        required
        errors={errors}
      />
      <div className="flex space-x-4 w-full">
        <select
          className="w-1/3 appearance-none p-2 my-1 text-sm"
          name="country"
          value={input?.country}
          onChange={handleOnChange}
        >
          <option value="country" disabled>
            Country
          </option>
          <option value="US">United States</option>
        </select>
        <Error errors={errors} fieldName="country" />
        <select
          className="w-1/3 border rounded-md p-2 my-1 text-sm focus:outline-none"
          name="state"
          value={input?.state}
          onChange={handleOnChange}
        >
          <option value="state" disabled>
            State
          </option>
          <States />
        </select>
        <Error errors={errors} fieldName="state" />
        <FormInput
          name="postcode"
          inputValue={input?.postcode}
          // defaultValue={
          //   isShipping
          //     ? defaultValue?.shipping?.postcode || ''
          //     : defaultValue?.billing?.postcode || ''
          // }
          handleInputChange={handleOnChange}
          placeholder="Zip"
          autoComplete="off"
          className="w-1/3"
          isShipping={isShipping}
          required={false}
          errors={errors}
        />
      </div>
    </>
  );
};

export default Address;
