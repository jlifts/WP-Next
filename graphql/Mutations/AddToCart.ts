import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        key
        product {
          node {
            ... on SimpleProduct {
              id
              productId: databaseId
              name
              slug
              regularPrice
              featuredImage {
                node {
                  sourceUrl
                  id
                }
              }
            }
          }
        }
        total
        quantity
      }
    }
  }
`;
