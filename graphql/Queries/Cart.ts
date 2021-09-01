import { gql } from '@apollo/client';

export const CART_QUERY = gql`
  query Cart {
    cart {
      total
      subtotal
      isEmpty
      feeTax
      discountTotal
      appliedCoupons {
        code
        discountAmount
      }
    }
  }
`;
