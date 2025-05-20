import { gql } from '@apollo/client';

const AUTHOR_QUERY = gql`
  query GetAuthor($id: ID!) {
    author(id: $id) {
        id
        firstName
    lastName
    }
  }
`;

export default AUTHOR_QUERY;