import { gql } from '@apollo/client';

export const CATAGORIES = gql`
  # Staging catagory Ids: 51 featured, 39 natural pain, 15 Uncatagorized
  # Staging catagory Ids: 29 featured, 19 natural pain, 15 Uncatagorized
  query Collections {
    productCategories(where: { excludeTree: [51, 39, 15] }) {
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
