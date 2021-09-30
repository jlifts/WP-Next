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
        backorders
        slug
        shortDescription
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
      ... on VariableProduct {
        id
        # name
        # productId: databaseId
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
        backorders
        slug
        shortDescription
        attributes {
          nodes {
            options
          }
        }
        variations {
          nodes {
            productId: databaseId
            name
            regularPrice
            stockStatus
            backorders
            price
            attributes {
              nodes {
                value
              }
            }
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
