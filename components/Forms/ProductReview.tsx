/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation } from '@apollo/client';
import { toastConfig } from 'components/ToastConfig';
import { ADD_COMMENT } from 'graphql/Mutations';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import StarRatingForm from './StarRatingForm';

const ProductReview = (productId: any): JSX.Element => {
  const [rating, setRating] = useState(0);
  const [button, setButton] = useState('Submit');
  const {
    register,
    handleSubmit,
    // formState: { errors },
    reset,
  } = useForm();

  const date = new Date().toISOString();
  let inputData = {
    author: 'Anonymous',
    content: '',
    date,
    rating: 1,
    clientMutationId: v4(),
    commentOn: productId,
  };

  const [addReview, { data: CommentData, loading, error }] = useMutation(
    ADD_COMMENT,
    { variables: { input: inputData } },
  );

  const onSubmit = handleSubmit(async (data: any) => {
    setButton('Writing...');
    try {
      inputData = {
        author: data.name || 'Anonymous',
        content: data.message,
        rating,
        clientMutationId: v4(),
        date,
        commentOn: productId.productId,
      };
      await addReview({ variables: { input: inputData } });
      toast.success('Thank you, your review is under review', toastConfig);
    } catch {
      toast.error(`Error: ${error.message}`, toastConfig);
    }
    setButton('Submit');
    reset();
  });

  return (
    <form onSubmit={onSubmit}>
      <fieldset
        className="flex flex-col border p-3 space-y-3"
        disabled={loading}
        aria-busy={loading}
      >
        <div className="flex">
          <StarRatingForm
            rating={rating}
            onRating={(rate: any) => setRating(rate)}
          />
          <span className="items-center px-2"> - {rating}</span>
        </div>
        <input
          type="text"
          name="name"
          {...register('name')}
          placeholder="Name (If left Blank, it is Anonymous)"
          className="border-b focus:outline-none"
        />
        <textarea
          name="message"
          placeholder="Message"
          {...register('message')}
          className="h-24 border-b focus:outline-none"
          required
        />
        <button
          type="submit"
          className="bg-secondary text-white px-3 py-2 rounded-md hover:bg-white hover:text-secondary border border-white hover:border-secondary"
        >
          {button}
        </button>
      </fieldset>
    </form>
  );
};

export default ProductReview;
