/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ContactData } from 'typings/global';
import axios from '../pages/api/axios/contact';
import { EMAIL_REGEX } from '../helpers/email';

const ContactForm = (): JSX.Element => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactData>();

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [button, setButton] = useState('Send');

  const onSubmit = handleSubmit(async (data: ContactData) => {
    setButton('Sending...');
    const formData = new FormData();
    try {
      setLoading(true);
      setError('');
      formData.append('ename', data.ename);
      formData.append('email', data.email);
      formData.append('subject', data.subject);
      formData.append('messageBox', data.messageBox);

      await axios.post(`/feedback`, formData).then((res) => {
        console.log(res.status);
      });
      setMessage('Thank you for your Email, we will get back to you soon!');
    } catch {
      setError('Failed to Send');
    }
    setLoading(false);
    setButton('Send');
    reset();

    // console.log(data);
  });

  return (
    <form
      className="flex flex-col w-full space-y-10 my-20 mx-2 px-64 text-xl"
      onSubmit={onSubmit}
    >
      {error && (
        <div
          className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 cursor-default"
          role="alert"
        >
          <p className="font-bold font-items">Error</p>
          <p>{error}</p>
        </div>
      )}
      {message && (
        <div
          className="bg-green-100 border-l-4 border-green-500 text-green-700 p-3 mb-4 cursor-default"
          role="alert"
        >
          <p className="font-bold font-items">Sent!</p>
          <p>{message}</p>
        </div>
      )}
      <div
        className={`relative border-b-2 ${
          !errors.ename
            ? 'focus-within:border-primary'
            : 'focus-within:border-red-500'
        }`}
      >
        <input
          type="text"
          id="name"
          placeholder=" "
          autoComplete="off"
          className="block w-full appearance-none focus:outline-none bg-transparent"
          {...register('ename', { required: true })}
        />
        <label
          htmlFor="name"
          className={`absolute top-0 -z-1 duration-300 origin-0 ${
            errors.ename && 'text-red-500 focus-within:text-red-500'
          }`}
        >
          Name
        </label>
      </div>
      {errors.ename && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <div
        className={`relative border-b-2 ${
          !errors.email
            ? 'focus-within:border-primary'
            : 'focus-within:border-red-500'
        }`}
      >
        <input
          type="text"
          id="email"
          placeholder=" "
          autoComplete="off"
          className="block w-full appearance-none focus:outline-none bg-transparent"
          {...register('email', { required: true, pattern: EMAIL_REGEX })}
        />
        <label
          htmlFor="email"
          className={`absolute top-0 -z-1 duration-300 origin-0 ${
            errors.email && 'text-red-500 focus-within:text-red-500'
          }`}
        >
          Email
        </label>
      </div>
      {errors.email && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <div
        className={`relative border-b-2 ${
          !errors.subject
            ? 'focus-within:border-primary'
            : 'focus-within:border-red-500'
        }`}
      >
        <input
          type="text"
          id="subject"
          placeholder=" "
          autoComplete="off"
          {...register('subject', { required: true })}
          className="block w-full appearance-none focus:outline-none bg-transparent"
        />
        <label
          htmlFor="subject"
          className={`absolute top-0 -z-1 duration-300 origin-0 ${
            errors.subject && 'text-red-500 focus-within:text-red-500'
          }`}
        >
          Subject
        </label>
      </div>
      {errors.subject && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <div
        className={`relative border-b-2 ${
          !errors.messageBox
            ? 'focus-within:border-primary'
            : 'focus-within:border-red-500'
        }`}
      >
        <textarea
          {...register('messageBox', { required: true })}
          id="message"
          placeholder=" "
          autoComplete="off"
          className="block w-full appearance-none pb-32 pt-4 focus:outline-none bg-transparent"
        />
        <label
          htmlFor="message"
          className={`absolute top-0 -z-1 duration-300 origin-0 ${
            errors.messageBox && 'text-red-500 focus-within:text-red-500'
          }`}
        >
          Message
        </label>
      </div>
      {errors.messageBox && (
        <span className="text-red-500 text-base">This field is required</span>
      )}
      <button
        aria-label="Sign Up"
        disabled={loading}
        type="submit"
        className="w-1/4 px-3 py-4 text-white bg-darkgray hover:bg-primary focus:bg-secondary focus:outline-none"
      >
        {button}
      </button>
    </form>
  );
};

export default ContactForm;
