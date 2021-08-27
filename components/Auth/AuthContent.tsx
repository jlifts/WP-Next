import React, { ReactNode } from 'react';

import useAuth from '../../hooks/useAuth';

export default function AuthContent({
  children,
}: {
  children: ReactNode;
}): JSX.Element {
  const { loggedIn } = useAuth();

  // Navigate UnAuthenticated Users to login

  if (loggedIn) {
    return <>{children}</>;
  }

  return <p />;
}
