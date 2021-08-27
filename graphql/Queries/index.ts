import { gql } from '@apollo/client';

export const FDA_QUERY = gql`
  query FDA {
    post(id: "cG9zdDoyOTE5") {
      content
    }
  }
`;

export const LEGAL_MENU_QUERY = gql`
  query MyQuery {
    menu(id: "dGVybToyNQ==") {
      menuItems {
        nodes {
          url
          label
          id
        }
      }
    }
  }
`;
// ($id: String!)
export const MENU_QUERY = gql`
  query MyQuery {
    menu(id: "dGVybToyNA==") {
      menuItems {
        nodes {
          url
          label
          id
        }
      }
    }
  }
`;

export const CART_QUERY = gql`
  query Cart {
    cart {
      total
      subtotal
      isEmpty
      feeTax
      discountTotal
      appliedCoupons {
        code
        discountAmount
      }
    }
  }
`;

export const STORE_QUERY = gql`
  query Collections {
    productCategories(where: { orderby: COUNT, order: ASC }) {
      nodes {
        id
        name
        image {
          sourceUrl
        }
        slug
        count
      }
    }
  }
`;

// export const PRODUCT_QUERY = gql`
//   query Collection($id: String!) {
//     productCategory(id: $id, idType: SLUG) {
//       name
//       products {
//         nodes {
//           ... on SimpleProduct {
//             id
//             name
//             price
//             regularPrice
//             stockStatus
//           }
//         }
//       }
//     }
//   }
// `;

export const SINGLE_PRODUCT_QUERY = gql`
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

export const INDIVIDUAL_QUERY = gql`
  query Product($id: ID!) {
    product(id: $id, idType: SLUG) {
      ... on SimpleProduct {
        id
        name
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
