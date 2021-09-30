import { gql } from '@apollo/client';

export const GET_CART_QUERY = gql`
  query GetCart {
    cart {
      isEmpty
      subtotal
      totalTax
      total
      shippingTotal
      appliedCoupons {
        code
        discountAmount
      }
      contents {
        itemCount
        nodes {
          quantity
          total
          subtotal
          key
          variation {
            node {
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
          product {
            node {
              ... on SimpleProduct {
                id
                name
                price
                regularPrice
                productId: databaseId
                image {
                  sourceUrl
                  slug
                  altText
                  title
                  srcSet
                }
              }
              ... on VariableProduct {
                id
                name
                price
                regularPrice
                productId: databaseId
                image {
                  sourceUrl
                  slug
                  altText
                  title
                  srcSet
                }
              }
            }
          }
        }
      }
    }
  }
`;
