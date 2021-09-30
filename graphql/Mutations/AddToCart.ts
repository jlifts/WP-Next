import { gql } from '@apollo/client';

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
      cartItem {
        key
        total
        quantity
        product {
          node {
            ... on SimpleProduct {
              id
              productId: databaseId
              name
              slug
              regularPrice
              image {
                sourceUrl
                id
                altText
                title
                srcSet
              }
            }
            ... on VariableProduct {
              id
              productId: databaseId
              # name
              slug
              regularPrice
              image {
                sourceUrl
                id
                altText
                title
                srcSet
              }
              variations {
                nodes {
                  productId: databaseId
                  name
                  backorders
                  regularPrice
                  image {
                    altText
                    id
                    sourceUrl
                    srcSet
                    title
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
