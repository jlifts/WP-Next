import { gql } from '@apollo/client';

export const CHECKOUT_MUTATION = gql`
  mutation CHECKOUT_MUTATION($input: CheckoutInput!) {
    checkout(input: $input) {
      clientMutationId
      order {
        id
        databaseId
        orderKey
        orderNumber
        status
        refunds {
          nodes {
            amount
          }
        }
      }
      result
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation ORDER_MUT($input: CreateOrderInput!) {
    createOrder(input: $input) {
      clientMutationId
      orderId
    }
  }
`;

export const UPDATE_ORDER = gql`
  mutation ORDER_MUTATION($orderId: Int!) {
    updateOrder(input: { orderId: $orderId, status: PROCESSING }) {
      clientMutationId
    }
  }
`;
