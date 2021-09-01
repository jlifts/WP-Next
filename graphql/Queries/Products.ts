import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Collections($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products(first: 20) {
        nodes {
          ... on SimpleProduct {
            id
            name
            price
            regularPrice
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
