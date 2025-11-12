import { gql } from '@apollo/client';

const BOOK_QUERY = gql`
  query GetBook($id: ID!) {
    book(id: $id) {
      id
      title
      description
      cover
      author {
        id
        firstName
        lastName
      }
      category {
        id
        name
      }
    }
  }
`;

export default BOOK_QUERY;