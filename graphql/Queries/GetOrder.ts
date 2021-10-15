import { gql } from '@apollo/client';

export const GET_ORDER = gql`
  query MyQuery($id: ID!) {
    order(id: $id, idType: DATABASE_ID) {
      total
      subtotal
      shippingAddressMapUrl
      orderNumber
      id
      date
      databaseId
      lineItems {
        nodes {
          quantity
          subtotal
          total
          product {
            image {
              sourceUrl
              title
            }
          }
        }
      }
      shipping {
        address1
        address2
        city
        company
        country
        email
        firstName
        lastName
        phone
        postcode
        state
      }
      shippingTotal
      couponLines {
        nodes {
          discount
          code
        }
      }
    }
  }
`;

export const GET_ORDER_TOTAL = gql`
  query GET_ORDER_TOTAL($orderId: ID!) {
    order(id: $orderId, idType: DATABASE_ID) {
      total(format: RAW)
    }
  }
`;
