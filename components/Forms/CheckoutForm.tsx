/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from 'hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { USER_ADDRESS } from 'graphql/Queries';
import { UPDATE_USER } from 'graphql/Mutations';
import { toast } from 'react-toastify';
import { getFormattedCart } from 'helpers/functions';
import { CartContext } from 'Context/CartContext';
import { GET_CART_QUERY } from 'graphql/Queries/Cart';
import { States } from 'components/states';
import { toastConfig } from 'components/ToastConfig';
import Heading from '../Heading';
import { EMAIL_REGEX } from '../../helpers/email';
import FormInput from './FormInput';

type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  address: string;
  addressNum?: string;
  city: string;
  country: string;
  state: string;
  zip: number;
};

const CheckoutForm = (): JSX.Element => {
  const { user } = useAuth();
  const [click, setClick] = useState(true);
  const [check, setCheck] = useState(true);
  const [cart, setCart] = useContext(CartContext);
  const [orderData, setOrderData] = useState(null);

  //   const [button, setButton] = useState('Send');
  const {
    data: addressData,
    loading,
    error,
  } = useQuery(USER_ADDRESS, {
    variables: { customerId: user?.userId },
  });
  const id = user?.id;
  const shipping = addressData?.customer?.shipping;
  const billing = addressData?.customer?.billing;
  // console.log(billing);
  // console.log(user);
  // const [updateProfile, { data: userData, loading, error }] =
  //   useMutation(UPDATE_USER);
  // const wasProfileUpdated = Boolean(
  //   userData?.updateCustomer?.customer?.databaseId,
  // );

  const { data } = useQuery(GET_CART_QUERY, {
    notifyOnNetworkStatusChange: true,
    onCompleted: () => {
      // Update cart in the localStorage.
      const updatedCart = getFormattedCart(data);
      localStorage.setItem('woo-cart', JSON.stringify(updatedCart));

      // Update cart data in React Context.
      setCart(updatedCart);
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CustomerData>();

  const onSubmit = (Data: CustomerData) => console.log(Data);

  const clicked = () => {
    setClick(!click);
  };
  // const handleUpdate = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const formData = new FormData(event.currentTarget);
  //   const values = Object.fromEntries(formData);
  //   updateProfile({
  //     variables: { id, ...values },
  //   }).catch((err) => {
  //     console.error(err);
  //   });
  // };

  // if (wasProfileUpdated) {
  //   toast.success(`🦄 Profile Updated!`, toastConfig);
  // }

  // if (error) {
  //   toast.error(`ERROR: ${error}`, toastConfig);
  // }

  return (
    <form
      className="flex flex-col w-full font-mont"
      onSubmit={handleSubmit(onSubmit)}
    >
      <fieldset disabled={loading} aria-busy={loading}>
        {error && (
          <div
            className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 cursor-default"
            role="alert"
          >
            <p className="font-bold font-items">Error</p>
            <p>{error}</p>
          </div>
        )}
        <div className="flex items-center justify-between">
          <Heading level="h5" className="text-xl">
            Contact Information
          </Heading>
          {!user ? (
            <p className="text-sm">
              Already Have an Account?
              <span className="text-primary">Log In</span>
            </p>
          ) : (
            <p className="text-sm">Hi, {user?.firstName}!</p>
          )}
        </div>
        <FormInput
          type="email"
          name="email"
          defaultValue={user?.email || ''}
          placeholder="Email"
          autoComplete="off"
          className="my-3 w-full"
          required
        />
        {/* className={`w-full focus:outline-none bg-transparent rounded-md border text-sm ${
            errors.email && 'border-red-500'
          } p-2 my-3`}
          {...register('email', { required: true, pattern: EMAIL_REGEX })}
        />
        {errors.email && (
          <span className="text-red-500 text-base">This field is required</span>
        )} */}
        {!user && (
          <div>
            <label htmlFor="signup-check" className="flex text-xs">
              <input
                type="checkbox"
                id="signup-check"
                className="relative mb-3 appearance-none rounded-md border-2 h-4 w-4 mr-2 cursor-pointer"
                onClick={clicked}
              />
              <FontAwesomeIcon
                icon={faCheck}
                className={`h-4 text-primary absolute cursor-pointer ${
                  click ? 'visible' : 'invisible'
                }`}
              />
              Keep me up to date on news and offers
            </label>
          </div>
        )}
        <Heading level="h5" className="text-xl mt-1">
          Shipping Address
        </Heading>
        <div className="flex">
          <FormInput
            name="firstName"
            defaultValue={user?.firstName || ''}
            placeholder="First Name"
            autoComplete="off"
            className="w-1/2 mr-3"
            required
          />
          <FormInput
            name="lastName"
            defaultValue={user?.lastName || ''}
            placeholder="Last Name"
            autoComplete="off"
            className="w-1/2"
            required
          />
        </div>
        <FormInput
          placeholder="Company (optional)"
          name="company"
          defaultValue={shipping?.company || ''}
          autoComplete="off"
          required={false}
        />
        <FormInput
          name="address"
          placeholder="Address"
          defaultValue={shipping?.address1 || ''}
          autoComplete="off"
          required
        />

        <FormInput
          name="addressNum"
          placeholder="Apartment, Suite, etc. (optional)"
          defaultValue={shipping?.address2 || ''}
          autoComplete="off"
          required={false}
        />
        <FormInput
          name="city"
          placeholder="City"
          defaultValue={shipping?.city || ''}
          autoComplete="off"
          required
        />

        <div className="flex space-x-4 w-full">
          <select
            className="w-1/3 appearance-none p-2 my-1 text-sm"
            defaultValue="United States"
            name="country"
          >
            <option value="United States">United States</option>
          </select>
          <select
            className="w-1/3 border rounded-md p-2 my-1 text-sm focus:outline-none"
            defaultValue="state"
            name="state"
            {...(register('state'), { required: true })}
          >
            <option value="state" disabled selected>
              State
            </option>
            <States />
          </select>
          <FormInput
            name="zip"
            defaultValue={shipping?.postcode || ''}
            placeholder="Zip"
            autoComplete="off"
            className="w-1/3"
            required
          />
        </div>
        <label htmlFor="sameAsShipping" className="text-sm">
          <input type="checkbox" className="mr-3 color-primary" checked />
          Billing Same As Shipping?
        </label>
        {/* {user && (
          <>
            <button
              type="submit"
              className="text-xs text-white bg-primary rounded-lg p-3"
              onClick={(event) => handleUpdate(event)}
            >
              Save information for next time
            </button>
          </>
        )} */}
        <Heading level="h5" className="text-xl my-2">
          Billing Address
        </Heading>
        <div className="flex">
          <FormInput
            name="BfirstName"
            defaultValue={user?.firstName || ''}
            placeholder="First Name"
            autoComplete="off"
            className="w-1/2 mr-3"
            required
          />
          <FormInput
            name="BlastName"
            defaultValue={user?.lastName || ''}
            placeholder="Last Name"
            autoComplete="off"
            className="w-1/2"
            required
          />
        </div>
        <FormInput
          name="Bcompany"
          placeholder="Company (optional)"
          defaultValue={billing?.company || ''}
          autoComplete="off"
          required={false}
        />
        <FormInput
          name="Baddress"
          placeholder="Address"
          defaultValue={billing?.address1 || ''}
          autoComplete="off"
          required
        />
        <FormInput
          name="BaddressNum"
          placeholder="Apartment, Suite, etc. (optional)"
          defaultValue={billing?.address2 || ''}
          autoComplete="off"
          required={false}
        />
        <FormInput
          name="Bcity"
          placeholder="City"
          defaultValue={billing?.city || ''}
          autoComplete="off"
          required
        />
        <div className="flex space-x-4 w-full">
          <select
            className="w-1/3 appearance-none p-2 my-1 text-sm"
            name="BCountry"
            defaultValue="United States"
          >
            <option value="United States">United States</option>
          </select>
          <select
            className="w-1/3 border rounded-md p-2 my-1 text-sm focus:outline-none"
            defaultValue="state"
            name="BState"
          >
            <option value="state" disabled selected>
              State
            </option>
            <States />
          </select>
          <FormInput
            name="Bzip"
            defaultValue={billing?.postcode || ''}
            placeholder="Zip"
            autoComplete="off"
            className="w-1/3"
            required={false}
          />
        </div>
        {/* {user && (
          <>
            <button
              type="submit"
              className="text-xs text-white bg-primary rounded-lg p-3"
              onClick={(event) => handleUpdate(event)}
            >
              Save information for next time
            </button>
          </>
        )} */}
        <div className="flex items-center pt-6">
          <button
            aria-label="Coninue"
            disabled={loading}
            type="submit"
            className="w-1/4 px-2 py-4 text-white bg-primary rounded-xl focus:bg-secondary focus:outline-none text-sm"
          >
            Place Order
          </button>
          <Link href="/shop/all">
            <p className="text-primary px-6 cursor-pointer text-sm">
              Return to Shop
            </p>
          </Link>
        </div>
      </fieldset>
    </form>
  );
};

export default CheckoutForm;
