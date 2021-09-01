/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { useQuery, ApolloError } from '@apollo/client';
import { GET_USER } from 'graphql/Queries';
import React, { createContext, useContext, ReactNode } from 'react';

export interface User {
  id: string;
  userId: number;
  databaseId: number;
  firstName: string;
  lastName: string;
  email: string;
  capabilities: string[];
  avatarUrl?: string;
  roles?: string;
}

interface AuthData {
  loggedIn: boolean;
  user?: User;
  loading: boolean;
  error?: ApolloError;
}

const DEFAULT_STATE: AuthData = {
  loggedIn: false,
  user: undefined,
  loading: false,
  error: undefined,
};

const AuthContext = createContext(DEFAULT_STATE);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data, loading, error } = useQuery(GET_USER);
  const user = data?.viewer;
  const loggedIn = Boolean(user);
  console.log(user?.id);

  const value = {
    loggedIn,
    user,
    loading,
    error,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

const useAuth = () => useContext(AuthContext);

export default useAuth;
