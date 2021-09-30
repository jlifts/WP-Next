import { gql } from '@apollo/client';

export const ADD_COMMENT = gql`
  mutation writeReview($input: WriteReviewInput!) {
    writeReview(input: $input) {
      rating
      clientMutationId
      review {
        content
        date
        author {
          node {
            name
          }
        }
        commentedOn {
          node {
            databaseId
          }
        }
      }
    }
  }
`;
