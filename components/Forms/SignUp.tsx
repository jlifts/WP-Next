/* eslint-disable no-console */
/* eslint-disable react/jsx-props-no-spreading */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { SignUpData } from 'typings/global';
import { toast } from 'react-toastify';
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
        console.assert(res);
      });
      toast.success(`🦄  Welcome To Team Victis!`, {
        position: toast.POSITION.BOTTOM_LEFT,
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch {
      setError('Failed to Sign Up, you may already be signed up.');
      toast.error(
        `Sign Up failed, you might alreaady be subscribbed! Error: ${error}`,
        {
          position: toast.POSITION.BOTTOM_LEFT,
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        },
      );
    }
    setLoading(false);
    setButton('Sign Up');
    reset();

    // console.log(data);
  });

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col lg:w-full w-screen space-y-8 mt-20 lg:mx-2 px-3 md:px-2 pl-14 lg:px-64 text-lg md:items-center text-white"
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
      <button
        disabled={loading}
        type="submit"
        className="text-white boder-2 border-midgray bg-black w-3/6 md:w-1/6 hover:bg-gray-700"
      >
        {button}
      </button>
    </form>
  );
};

export default SignUp;
