import { gql } from '@apollo/client';

export const COUPONS = gql`
  query MyQuery {
    coupons {
      id
      code
      amount
    }
  }
`;
