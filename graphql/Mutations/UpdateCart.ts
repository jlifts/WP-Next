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
              image {
                id
                sourceUrl
                altText
                title
                srcSet
              }
            }
            ... on VariableProduct {
              id
              name
              productId: databaseId
              slug
              regularPrice
              image {
                id
                sourceUrl
                altText
                title
                srcSet
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
