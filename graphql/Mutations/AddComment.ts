import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation writeReview($input: WriteReview!) {
    writeReview(input: $input) {
      review {
        databaseId
        content
        author {
          node {
            name
            databaseId
          }
        }
      }
      rating
      clientMutationId
    }
  }
`;
