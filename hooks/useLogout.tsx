/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { gql, useMutation, useApolloClient } from '@apollo/client';

const LOGOUT = gql`
  mutation Logout {
    logout(input: {}) {
      status
    }
  }
`;

export const useLogoutMutation = () => {
  const apolloClient = useApolloClient();
  const [mutation, mutationResults] = useMutation(LOGOUT);

  const logoutMutation = async () => {
    // Remove all data from the store since we are now logged out.
    await apolloClient.clearStore();
    return mutation();
  };

  return { logoutMutation, results: mutationResults };
};
