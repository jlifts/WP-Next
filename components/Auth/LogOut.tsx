/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useMutation } from '@apollo/client';
import { LOG_OUT } from 'graphql/Mutations';
import { GET_USER } from 'graphql/Queries';

// import { useLogoutMutation } from 'hooks/useLogout';
import { useRouter } from 'next/router';
import React, { useState } from 'react';

interface IClassName {
  className?: string;
}

const LogOut = ({ className }: IClassName): JSX.Element => {
  const router = useRouter();
  const [log, setLog] = useState('LogOut');
  // const [loading, setLoading] = useState(false);
  const [logOut, { loading, error, data }] = useMutation(LOG_OUT, {
    refetchQueries: [{ query: GET_USER }],
  });
  // // add data to params to work
  // const loggedOut = Boolean(data?.logout?.status);
  // console.log(loggedOut);

  const handleClick = async () => {
    setLog('Logging Out...');
    // setLoading(true);
    await logOut();
    await router.push('/');
  };

  return (
    <button
      className={`${className} ${loading && 'text-gray-400'}`}
      type="button"
      disabled={loading}
      onChange={handleClick}
    >
      {log}
      {error && <p>{error.message}</p>}
      {/* {!loggedOut && (
        <p>Unable to log out. Please refresh the page and try again</p>
      )} */}
    </button>
  );
};

export default LogOut;
