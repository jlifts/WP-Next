/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { useMutation } from '@apollo/client';
import Heading from 'components/UI/Heading';
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
    router.reload();
  }

  if (deletedUser) {
    router.push('/');
  }

  function handlePopUp() {
    return (
      <>
        <div>
          <div>
            <span>X</span>
            <Heading level="h4">Warning!!!</Heading>
          </div>
          <p>
            Are you sure? This will delete all your data, including your order
            history.
          </p>
          <button type="button" disabled={loading} onClick={handleDelete}>
            Delete
          </button>
          <button type="button" disabled={loading}>
            Stay with the Team
          </button>
        </div>
      </>
    );
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
        onClick={handlePopUp}
      >
        X Delete User
      </button>
    </>
  );
};

export default DeleteUserBtn;
