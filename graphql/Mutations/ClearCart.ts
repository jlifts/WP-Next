import { gql } from '@apollo/client';

export const CLEAR_CART = gql`
  mutation CLEAR_CART_MUTATION {
    removeItemsFromCart(input: { all: true }) {
      cartItems {
        quantity
      }
    }
  }
`;
