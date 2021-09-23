import { gql } from '@apollo/client';

export const CATAGORIES = gql`
  query Collections {
    productCategories(where: { excludeTree: [29, 19, 15] }) {
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
