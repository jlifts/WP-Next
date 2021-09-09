import { gql } from '@apollo/client';

export const REMOVE_COUPONS = gql`
  mutation MyMutation($code: [String]) {
    removeCoupons(input: { codes: $code }) {
      cart {
        appliedCoupons {
          code
          discountAmount
        }
        total
      }
    }
  }
`;
