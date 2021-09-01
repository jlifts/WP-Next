/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { useMutation, useApolloClient } from '@apollo/client';
import { LOG_OUT } from 'graphql/Mutations';

export const useLogoutMutation = () => {
  const apolloClient = useApolloClient();
  const [mutation, mutationResults] = useMutation(LOG_OUT);

  const logoutMutation = async () => {
    // Remove all data from the store since we are now logged out.
    await apolloClient.clearStore();
    return mutation();
  };

  return { logoutMutation, results: mutationResults };
};
