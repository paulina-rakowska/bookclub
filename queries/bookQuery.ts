import { gql } from '@apollo/client';

const BOOK_QUERY = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      author {
        firstName
        lastName
      }
      description
    }
  }
`;

export default BOOK_QUERY;