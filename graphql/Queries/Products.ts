import { gql } from '@apollo/client';

export const PRODUCTS_QUERY = gql`
  query Collection($id: ID!) {
    productCategory(id: $id, idType: SLUG) {
      name
      products(first: 20, where: { orderby: { field: PRICE } }) {
        nodes {
          ... on SimpleProduct {
            id
            productId: databaseId
            name
            price
            regularPrice
            onSale
            stockStatus
            backorders
            slug
            featuredImage {
              node {
                sourceUrl
                title
              }
            }
            # attributes {
            #   nodes {
            #     name
            #     options
            #   }
            # }
          }
          ... on VariableProduct {
            id
            name
            productId: databaseId
            price
            regularPrice
            onSale
            stockStatus
            backorders
            slug
            featuredImage {
              node {
                sourceUrl
                title
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
          }
        }
      }
    }
  }
`;

export const FEATURED_PRODUCTS = gql`
  # catagory dbId for Dev: 29
  # catagory dbId for Staging: 51
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
