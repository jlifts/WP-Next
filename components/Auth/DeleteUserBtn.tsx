/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMutation } from '@apollo/client';
import { DELETE } from 'graphql/Mutations';
import useAuth from 'hooks/useAuth';
import { useRouter } from 'next/router';
import React from 'react';

const DeleteUserBtn = (): JSX.Element => {
  const router = useRouter();
  const { user } = useAuth();
  const [deleted, { loading, error, data }] = useMutation(DELETE, {
    variables: { id: user?.id },
  });
  const deletedUser = Boolean(data?.deletedId);

  async function handleDelete() {
    await deleted();
  }

  if (deletedUser) {
    router.push('/');
  }

  return (
    <>
      {error && (
        <p className="flex justify-center items-center h-screen w-screen text-red-500 bg-red-300 ">
          {error.message}
        </p>
      )}
      <button
        type="button"
        disabled={loading}
        className="text-black text-sm bg-red-500 px-3 py-4"
        onClick={handleDelete}
      >
        X Delete User
      </button>
    </>
  );
};

export default DeleteUserBtn;
