import { gql } from '@apollo/client';

export const UPDATE_USER = gql`
  mutation updateCustomer(
    $id: ID!
    $firstName: String!
    $lastName: String!
    $email: String!
    $address1: String
    $address2: String
    $city: String
    $company: String
    $phone: String
    $postcode: String
    $state: String
    $Saddress1: String
    $Saddress2: String
    $Scity: String
    $Scompany: String
    $Sphone: String
    $Spostcode: String
    $Sstate: String
    $SandB: Boolean
  ) {
    updateCustomer(
      input: {
        id: $id
        email: $email
        firstName: $firstName
        lastName: $lastName
        billing: {
          address1: $address1
          address2: $address2
          city: $city
          company: $company
          phone: $phone
          postcode: $postcode
          state: $state
        }
        shipping: {
          address1: $Saddress1
          address2: $Saddress2
          city: $Scity
          company: $Scompany
          phone: $Sphone
          postcode: $Spostcode
          state: $Sstate
        }
        shippingSameAsBilling: $SandB
      }
    ) {
      customer {
        databaseId
      }
    }
  }
`;
