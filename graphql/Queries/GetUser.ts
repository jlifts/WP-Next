import { gql } from '@apollo/client';

export const GET_USER = gql`
  query getUser {
    viewer {
      id
      userId
      databaseId
      firstName
      lastName
      email
      capabilities
      avatar {
        url
      }
      roles {
        nodes {
          name
        }
      }
    }
  }
`;
