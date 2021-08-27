/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Heading from '../Heading';

type PaymentFormData = {
  cardName: string;
  cardNum: number;
  CCV: number;
};

const PaymentForm = (): JSX.Element => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  //   const [button, setButton] = useState('Send');

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<PaymentFormData>();

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
          Billing Address
        </Heading>
        <p className="text-sm">Leave blank if it is same as shipping address</p>
      </div>
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
      <div className="flex justify-center">
        <div className="rounded-lg bg-primary h-3/4 w-4/5 flex flex-col px-6 py-10 my-6 items-center">
          <div className="flex">
            <input
              placeholder="Card Number"
              className="rounded-lg focus:outline-none"
            />
            <input placeholder="Expires:" />
          </div>
          <div className="flex">
            <input placeholder="Name" />
            <input placeholder="CVC" />
          </div>
        </div>
      </div>
    </form>
  );
};

export default PaymentForm;
