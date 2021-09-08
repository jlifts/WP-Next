import { gql } from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query Product($id: ID!) {
    product(id: $id, idType: SLUG) {
      ... on SimpleProduct {
        id
        name
        productId: databaseId
        galleryImages {
          edges {
            node {
              sourceUrl
              id
            }
          }
        }
        featuredImage {
          node {
            sourceUrl
          }
        }
        regularPrice
        stockStatus
        slug
        shortDescription
      }
    }
  }
`;
