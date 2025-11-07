import { gql } from '@apollo/client';

const CATEGORY_QUERY = gql`
  query GetCategory($id: ID!) {
    category(id: $id) {
      id
      name
    }
  }
`;

export default CATEGORY_QUERY;