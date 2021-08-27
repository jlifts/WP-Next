import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/router';

import useAuth from '../../hooks/useAuth';
import Loading from './Loading';

export default function UnAuth({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { loggedIn, loading } = useAuth();
  const router = useRouter();

  // Navigate UnAuthenticated Users to login
  useEffect(() => {
    if (!loading && loggedIn) {
      void router.push('/members');
    }
  }, [loggedIn, loading, router]);

  if (!loggedIn) {
    return <>{children}</>;
  }

  return <Loading />;
}
