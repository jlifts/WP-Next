/* eslint-disable react/jsx-curly-newline */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import useAuth from 'hooks/useAuth';
import { useMutation, useQuery } from '@apollo/client';
import { USER_ADDRESS } from 'graphql/Queries';
import { UPDATE_USER, CLEAR_CART, CHECKOUT_MUTATION } from 'graphql/Mutations';
import { toast } from 'react-toastify';
import {
  getFormattedCart,
  createCheckoutData,
  handleBillingDifferentThanShipping,
} from 'helpers/functions';
import { CartContext } from 'Context/CartContext';
import { GET_CART_QUERY } from 'graphql/Queries/Cart';
import { States } from 'components/states';
import { toastConfig } from 'components/ToastConfig';
import validateAndSanitizeCheckoutForm from 'helpers/validateAndSanatize';
import Heading from '../Heading';
import { EMAIL_REGEX } from '../../helpers/email';
import FormInput from './FormInput';
import Address from './AddressForm';
import Error from './Errors';
import { SquarePaymentsForm } from 'react-square-web-payments-sdk';
import SquarePayments from './SquarePaymentForm';

type CustomerData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  country: string;
  state: string;
  postcode: string;
  errors: any;
};

const defaultCustomerInfo: CustomerData = {
  firstName: '',
  lastName: '',
  address1: '',
  address2: '',
  city: '',
  country: '',
  state: '',
  postcode: '',
  email: '',
  phone: '',
  company: '',
  errors: null,
};

// TODO: Split forms up to more readable componenets, Create order mutation for woo, hide shipping unless different
// TODO: Create Account from checkout

const CheckoutForm = (): JSX.Element => {
  const initialState = {
    billing: {
      ...defaultCustomerInfo,
    },
    shipping: {
      ...defaultCustomerInfo,
    },
    createAccount: false,
    billingDifferentThanShipping: false,
    paymentMethod: 'square_credit_card',
  };

  const { user } = useAuth();
  const [click, setClick] = useState(true);
  const [cart, setCart] = useContext(CartContext);

  const [orderData, setOrderData] = useState(null);
  const [input, setInput] = useState(initialState);

  const { data: addressData, loading } = useQuery(USER_ADDRESS, {
    variables: { customerId: user?.userId },
  });

  const shipping = addressData?.customer?.shipping;
  const billing = addressData?.customer?.billing;

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

  // Create New order: Checkout Mutation.
  const [
    checkout,
    { data: checkoutResponse, loading: checkoutLoading, error },
  ] = useMutation(CHECKOUT_MUTATION, {
    variables: {
      input: orderData,
    },
  });

  const [clearCartMutation] = useMutation(CLEAR_CART);

  const handleFormSubmit = (event: any) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const values = Object.fromEntries(formData);

    /**
     * Validate Billing and Shipping Details
     *
     * Note:
     * If billing is different than shipping address, only then validate billing.
     */

    // Error Handling
    const billingValidationResult: any = input?.billingDifferentThanShipping
      ? validateAndSanitizeCheckoutForm(input?.billing)
      : { errors: null, isValid: true };
    const shippingValidationResult = validateAndSanitizeCheckoutForm(
      input?.shipping,
    );

    if (!shippingValidationResult.isValid || !billingValidationResult.isValid) {
      setInput({
        ...input,
        billing: { ...input.billing, errors: billingValidationResult.errors },
        shipping: {
          ...input.shipping,
          errors: shippingValidationResult.errors,
        },
      });

      return;
    }

    const checkOutData = createCheckoutData(input);
    /**
     *  When order data is set, checkout mutation will automatically be called,
     *  because 'orderData' is added in useEffect as a dependency.
     */
    // setOrderData(checkOutData);
  };

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

  const handleShippingChange = (target: any) => {
    const newState = {
      ...input,
      shipping: { ...input?.shipping, [target.name]: target.value },
    };
    setInput(newState);
  };

  const handleBillingChange = (target: any) => {
    const newState = {
      ...input,
      billing: { ...input?.billing, [target.name]: target.value },
    };
    setInput(newState);
  };

  const handleOnChange = (
    event: any,
    isShipping = false,
    isBillingOrShipping = false,
  ) => {
    const { target } = event || {};

    // if (target.name === 'createAccount') {
    //   handleCreateAccount(input, setInput, target);
    // } else
    if (target.name === 'billingDifferentThanShipping') {
      handleBillingDifferentThanShipping(input, setInput, target);
    } else if (isBillingOrShipping) {
      if (isShipping) {
        handleShippingChange(target);
      } else {
        handleBillingChange(target);
      }
    } else {
      const newState = { ...input, [target.name]: target.value };
      setInput(newState);
    }
  };

  useEffect(() => {
    async function checkedout() {
      if (orderData !== null) {
        // Call the checkout mutation when the value for orderData changes/updates.
        await checkout();
      }
    }
    checkedout();
  }, [checkout, orderData]);

  const isOrderProcessing = checkoutLoading || loading;

  // console.log(input);

  return (
    <>
      {cart ? (
        <form
          className="flex flex-col w-full font-mont"
          id="payment-form"
          onSubmit={handleFormSubmit}
        >
          <fieldset disabled={isOrderProcessing} aria-busy={isOrderProcessing}>
            {error && (
              <div
                className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 cursor-default"
                role="alert"
              >
                <p className="font-bold font-items">Error:</p>
                <p>{error?.graphQLErrors?.[0]?.message ?? ''}</p>
                <p>&#9785; Please try again</p>
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
              inputValue={input?.shipping?.email || ''}
              placeholder="Email"
              handleInputChange={(event: any) =>
                handleOnChange(event, true, true)
              }
              autoComplete="off"
              className="my-3 w-full"
              required
            />
            <Error errors={input?.shipping?.errors} fieldName="email" />
            <FormInput
              type="phone"
              name="phone"
              defaultValue=""
              inputValue={input?.shipping?.phone || ''}
              handleInputChange={(event: any) =>
                handleOnChange(event, true, true)
              }
              placeholder="Phone Number (optional)"
              autoComplete="off"
              className="my-3 w-full"
              required={false}
            />
            <Error errors={input?.shipping?.errors} fieldName="phone" />
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
            <Address
              input={input?.shipping}
              defaultValue={shipping}
              handleOnChange={(event: any) => handleOnChange(event, true, true)}
              isShipping
              // isBillingOrShipping
            />
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
        )} */}{' '}
            <label htmlFor="billingDifferentThanShipping" className="text-sm">
              <input
                name="billingDifferentThanShipping"
                type="checkbox"
                className="mr-3 color-primary"
                checked={input?.billingDifferentThanShipping}
                onChange={handleOnChange}
              />
              Billing Different From Shipping?
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
            {input?.billingDifferentThanShipping ? (
              <>
                {' '}
                <Heading level="h5" className="text-xl my-2">
                  Billing Address
                </Heading>
                <Address
                  input={input?.billing}
                  defaultValue={billing}
                  handleOnChange={(event: any) =>
                    handleOnChange(event, false, true)
                  }
                  isShipping={false}
                  // isBillingOrShipping
                />
              </>
            ) : null}
            {/* <div className="flex items-center pt-6">
              <button
                aria-label="Coninue"
                disabled={isOrderProcessing}
                type="submit"
                className="w-1/4 px-2 py-4 text-white bg-primary rounded-xl focus:bg-secondary focus:outline-none text-sm"
              >
                {isOrderProcessing ? 'Processing...' : 'Pay'}
              </button>
            </div> */}
          </fieldset>
          <SquarePayments />
          <Link href="/shop/all">
            <p className="text-primary px-6 cursor-pointer text-sm">
              Return to Shop
            </p>
          </Link>
        </form>
      ) : null}
    </>
  );
};

export default CheckoutForm;
