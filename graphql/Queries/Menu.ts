import { gql } from '@apollo/client';

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

export const LEGAL_MENU_QUERY = gql`
  query MyQuery {
    menu(id: "dGVybToyNQ==") {
      menuItems {
        nodes {
          url
          label
          id
          path
        }
      }
    }
  }
`;
