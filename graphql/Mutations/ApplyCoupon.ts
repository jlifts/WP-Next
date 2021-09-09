import { gql } from '@apollo/client';

export const APPLY_COUPON = gql`
  mutation MyMutation($code: String!) {
    applyCoupon(input: { code: $code }) {
      applied {
        code
        discountAmount
      }
      cart {
        discountTotal
        total
      }
    }
  }
`;
