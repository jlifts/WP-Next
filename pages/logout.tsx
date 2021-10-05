/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-floating-promises */
import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';

import { Loading } from 'components';
import { useRouter } from 'next/router';
import { Client } from 'lib/ApolloClient';
import { LOG_OUT } from 'graphql/Mutations';
import { GET_USER } from 'graphql/Queries';

export default function LogOut(): JSX.Element {
  const router = useRouter();
  const [logOut, { loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  const loggedOut = Boolean(data?.logout?.status);

  useEffect(() => {
    Client.clearStore();
    logOut();
  }, [logOut]);

  if (loggedOut) {
    router.reload();
    router.push('/');
  }

  return (
    <>
      {error && (
        <p className="flex justify-center items-center h-screen w-screen text-red-500 bg-red-300 ">
          {error.message}
        </p>
      )}
      {loading && <Loading />}
    </>
  );
}
