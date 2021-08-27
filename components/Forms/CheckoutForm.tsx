/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import Link from 'next/link';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { EMAIL_REGEX } from '../../helpers/email';
import Heading from '../Heading';

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
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [click, setClick] = useState(true);
  const [click2, setClick2] = useState(false);
  //   const [button, setButton] = useState('Send');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CustomerData>();

  //   const onSubmit = handleSubmit(async (data: ContactData) => {
  //     setButton('Loading...');
  //     const formData = new FormData();
  //     try {
  //       setLoading(true);
  //       setError('');
  //       formData.append('ename', data.ename);
  //       formData.append('email', data.email);
  //       formData.append('subject', data.subject);
  //       formData.append('messageBox', data.messageBox);

  //       await axios.post(`/feedback`, formData).then((res) => {
  //         console.log(res.status);
  //       });
  //       setMessage('Thank you for your Email, we will get back to you soon!');
  //     } catch {
  //       setError('Failed to Send');
  //     }
  //     setLoading(false);
  //     setButton('Send');
  //     reset();

  //     // console.log(data);
  //   });

  const clicked = () => {
    setClick(!click);
  };
  const clicked2 = () => {
    setClick2(!click2);
  };

  return (
    <form className="flex flex-col w-full font-mont">
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
        <p className="text-sm">
          Already Have an Account?
          <span className="text-primary">Log In</span>
        </p>
      </div>
      <input
        type="email"
        id="email"
        placeholder="Email"
        autoComplete="off"
        className={`w-full focus:outline-none bg-transparent rounded-md border text-sm ${
          errors.email && 'border-red-500'
        } p-2 my-3`}
        {...register('email', { required: true, pattern: EMAIL_REGEX })}
      />
      {errors.email && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
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
      <Heading level="h5" className="text-xl mt-1">
        Shipping Address
      </Heading>
      <div className="flex">
        <input
          type="text"
          id="firstName"
          placeholder="First Name"
          autoComplete="off"
          className={`w-1/2 focus:outline-none bg-transparent rounded-md border mr-3 text-sm ${
            errors.firstName && 'border-red-500'
          } p-2 my-1`}
          {...register('firstName', { required: true })}
        />
        {errors.firstName && (
          <span className="text-red-500 text-base">This field is required</span>
        )}
        <input
          type="text"
          id="lastName"
          placeholder="Last Name"
          autoComplete="off"
          className={`w-1/2 focus:outline-none bg-transparent rounded-md border text-sm ${
            errors.email && 'border-red-500'
          } p-2 my-1`}
          {...register('lastName', { required: true })}
        />
        {errors.lastName && (
          <span className="text-red-500 text-base">This field is required</span>
        )}
      </div>
      <input
        type="text"
        id="company"
        placeholder="Company (optional)"
        autoComplete="off"
        className="w-full focus:outline-none bg-transparent rounded-md border p-2 my-1 text-sm"
        {...register('company')}
      />
      <input
        type="text"
        id="address"
        placeholder="Address"
        autoComplete="off"
        className="w-full focus:outline-none bg-transparent rounded-md border p-2 my-1 text-sm"
        {...register('address')}
      />
      {errors.address && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <input
        type="text"
        id="addressNum"
        placeholder="Apartment, Suite, etc. (optional)"
        autoComplete="off"
        className="w-full focus:outline-none bg-transparent rounded-md border p-2 my-1 text-sm"
        {...register('addressNum')}
      />
      <input
        type="text"
        id="city"
        placeholder="City"
        autoComplete="off"
        className="w-full focus:outline-none bg-transparent rounded-md border p-2 my-1 text-sm"
        {...register('city')}
      />
      {errors.city && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <div className="flex space-x-4 w-full">
        <select className="w-1/3 appearance-none p-2 my-1 text-sm">
          <option value="grapefruit">Grapefruit</option>
          <option value="lime">Lime</option>
          <option selected value="coconut">
            United States
          </option>
          <option value="mango">Mango</option>
        </select>
        <select className="w-1/3 border rounded-md p-2 my-1 text-sm focus:outline-none">
          <option selected value="none" disabled>
            State
          </option>
          <option value="lime">Lime</option>
          <option value="coconut">Coconut</option>
          <option value="mango">Mango</option>
        </select>
        <input
          type="text"
          id="zip"
          placeholder="Zip"
          autoComplete="off"
          className="w-1/3 focus:outline-none bg-transparent rounded-md border p-2 my-1 text-sm"
          {...register('zip')}
        />
        {errors.city && (
          <span className="text-red-500 text-base">This field is required</span>
        )}
      </div>
      <div>
        <label htmlFor="signup-check" className="flex text-xs">
          <input
            type="checkbox"
            id="signup-check"
            className="relative appearance-none rounded-md border-2 h-4 w-4 mr-2 cursor-pointer z-20"
            onClick={clicked2}
          />
          <FontAwesomeIcon
            icon={faCheck}
            className={`h-4 text-primary absolute cursor-pointer ${
              click2 ? 'visible' : 'invisible'
            }`}
          />
          Save information for next time
        </label>
      </div>

      <div className="flex items-center pt-6">
        <button
          aria-label="Coninue"
          disabled={loading}
          type="submit"
          className="w-1/4 px-2 py-4 text-white bg-primary rounded-xl focus:bg-secondary focus:outline-none text-sm"
        >
          Continue to Payment
        </button>
        <Link href="/shop/all">
          <p className="text-primary px-6 cursor-pointer text-sm">
            Return to Shop
          </p>
        </Link>
      </div>
    </form>
  );
};

export default CheckoutForm;
