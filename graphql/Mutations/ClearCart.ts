import { gql } from '@apollo/client';

export const CLEAR_CART = gql`
  mutation CLEAR_CART_MUTATION($input: RemoveItemsFromCartInput!) {
    removeItemsFromCart(input: $input) {
      cartItems {
        quantity
      }
    }
  }
`;
