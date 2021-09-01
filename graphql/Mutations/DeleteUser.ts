import { gql } from '@apollo/client';

export const DELETE = gql`
  mutation logOut($id: ID!) {
    deleteUser(input: { id: $id }) {
      status
    }
  }
`;
