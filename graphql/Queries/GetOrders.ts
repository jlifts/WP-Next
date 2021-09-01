import { gql } from '@apollo/client';

export const GET_ORDERS = gql`
  query getOrders($customerId: Int!) {
    orders(
      where: { customerId: $customerId, orderby: { field: DATE } }
      first: 101000
    ) {
      nodes {
        id
        databaseId
        date
        orderNumber
        status
        total
      }
    }
  }
`;
