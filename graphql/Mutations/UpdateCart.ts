import { gql } from '@apollo/client';

export const UPDATE_CART = gql`
  mutation UpdateCart($input: UpdateItemQuantitiesInput!) {
    updateItemQuantities(input: $input) {
      items {
        key
        product {
          node {
            ... on SimpleProduct {
              id
              name
              productId: databaseId
              slug
              regularPrice
              featuredImage {
                node {
                  id
                  sourceUrl
                }
              }
            }
          }
        }
        quantity
        tax
        subtotal
        total
      }
      removed {
        key
        product {
          node {
            id
            productId: databaseId
          }
        }
      }
      updated {
        key
        product {
          node {
            id
            productId: databaseId
          }
        }
      }
    }
  }
`;
