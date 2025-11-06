import { gql } from "@apollo/client";

const CATEGORIES_QUERY = gql`
  query GetCategories {
    categories {
      id
      name
    }
  }
`;

export default CATEGORIES_QUERY;
