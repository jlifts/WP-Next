import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Collection($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products(first: 20) {
        nodes {
          ... on SimpleProduct {
            id
            productId: databaseId
            name
            price
            regularPrice
            onSale
            stockStatus
            slug
            featuredImage {
              node {
                sourceUrl
                title
              }
            }
          }
        }
      }
    }
  }
`;
