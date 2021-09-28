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
            attributes {
              nodes {
                name
                options
              }
            }
          }
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS = gql`
  # catagory dbId for Dev: 29
  # catagory dbId for Dev: 51
  query Featured {
    productCategories(where: { include: 51 }) {
      nodes {
        name
        databaseId
        products {
          nodes {
            ... on SimpleProduct {
              name
              databaseId
              stockStatus
              shortDescription
              image {
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
