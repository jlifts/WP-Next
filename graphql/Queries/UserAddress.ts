import { gql } from '@apollo/client';

export const USER_ADDRESS = gql`
  query getCustomer($customerId: Int!) {
    customer(customerId: $customerId) {
      billing {
        address1
        address2
        city
        company
        country
        state
        postcode
        phone
      }
      shipping {
        address1
        address2
        city
        company
        country
        phone
        postcode
        state
      }
    }
  }
`;
