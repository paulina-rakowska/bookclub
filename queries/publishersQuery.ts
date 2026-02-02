import { gql } from "@apollo/client";

const PUBLISHERS_QUERY = gql`
  query GetPublishers {
    publishers {
      id
      name
    }
  }
`;

export default PUBLISHERS_QUERY;
