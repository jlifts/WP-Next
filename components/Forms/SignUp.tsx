/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpData } from 'typings/global';
import axios from '../../pages/api/axios/omni';

const SignUp = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpData>();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [button, setButton] = useState('News Sign Up');

  const onSubmit = handleSubmit(async (data: SignUpData) => {
    setButton('Sending...');

    try {
      setLoading(true);
      setError('');
      const name = data.name.split(' ');
      const today = new Date().toISOString();

      const json = {
        createdAt: today,
        firstName: name[0],
        lastName: name[1],
        tags: ['victis_site_signup'],
        identifiers: [
          {
            type: 'email',
            id: data.email,
            channels: {
              email: {
                status: 'subscribed',
                statusDate: today,
              },
            },
          },
        ],
      };

      await axios.post(`/contacts`, json).then((res) => {
        console.log(res);
      });
      setMessage('Let The Deals Begin!');
    } catch {
      setError('Failed to Sign Up, you may already be signed up.');
    }
    setLoading(false);
    setButton('Sign Up');
    reset();

    // console.log(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full space-y-8 mt-20 mx-2 px-64 text-lg items-center text-white"
    >
      <input
        type="name"
        {...register('name')}
        placeholder="First &amp; Last Name"
        className="border-b-2 border-darkgrayAccent bg-transparent w-3/5 outline-none "
      />
      {errors.name && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <input
        type="email"
        {...register('email')}
        placeholder="Email"
        className="border-b-2 border-darkgrayAccent bg-transparent w-3/5 outline-none"
      />
      {errors.email && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      {message && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-2 mb-2 w-full"
          role="alert"
        >
          <p className="font-bold font-items">Signed Up!</p>
          <p>{message}</p>
        </div>
      )}
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-2 mb-2 w-full"
          role="alert"
        >
          <p className="font-bold font-items">
            Failed to sign up, you may already be signed up
          </p>
          <p>{error}</p>
        </div>
      )}
      <button
        disabled={loading}
        type="submit"
        className="text-white boder-2 border-midgray bg-black w-1/6 hover:bg-gray-700"
      >
        {button}
      </button>
    </form>
  );
};

export default SignUp;
