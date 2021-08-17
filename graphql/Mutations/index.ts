import { gql } from '@apollo/client';

export const FDA_QUERY = gql`
  query MyQuery {
    post(id: "cG9zdDoyOTE5") {
      content
    }
  }
`;
