import { gql } from '@apollo/client';

export const PRODUCT_QUERY = gql`
  query Product(
    $id: ID!
    $first: Int
    $last: Int
    $after: String
    $before: String
  ) {
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
        price
        onSale
        stockStatus
        slug
        shortDescription
        attributes {
          nodes {
            name
            options
            attributeId
          }
        }
        averageRating
        reviewCount
        reviews(first: $first, last: $last, after: $after, before: $before) {
          edges {
            node {
              content
              databaseId
              date
              author {
                node {
                  name
                  databaseId
                }
              }
            }
            rating
          }
          pageInfo {
            startCursor
            endCursor
            hasNextPage
            hasPreviousPage
          }
        }
      }
    }
  }
`;
