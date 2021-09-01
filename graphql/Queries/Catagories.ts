import { gql } from '@apollo/client';

export const CATAGORIES = gql`
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
