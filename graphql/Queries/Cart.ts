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
          key
          product {
            node {
              ... on SimpleProduct {
                id
                name
                productId: databaseId
                featuredImage {
                  node {
                    sourceUrl
                    slug
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
