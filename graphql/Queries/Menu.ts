import { gql } from '@apollo/client';

// In Production give menu's a location so that they can be queried

export const MENU_QUERY = gql`
  query MyQuery {
    # DB ID is 24
    # Dev: Menu
    # Prod: Headless Menu
    # ($id: ID!)
    menu(id: "Headless Menu", idType: NAME) {
      menuItems {
        nodes {
          url
          label
          id
        }
      }
    }
    # menus(where: { id: $id }) {
    #   nodes {
    #     menuItems {
    #       nodes {
    #         url
    #         label
    #         databaseId
    #         path
    #       }
    #     }
    #   }
    # }
  }
`;

export const LEGAL_MENU_QUERY = gql`
  query MyQuery {
    # DB ID is 25
    # Dev: Legal Menu
    # Prod: Headless Legal Menu
    menu(id: "Headless Legal Menu", idType: NAME) {
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
