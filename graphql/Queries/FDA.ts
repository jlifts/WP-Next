import { gql } from '@apollo/client';

export const FDA_QUERY = gql`
  query FDA {
    # Dev Id: cG9zdDoyOTE5
    #Staging Id:
    #Prod Id: cG9zdDozMDY5
    post(id: "cG9zdDozMDY5") {
      content
    }
  }
`;
