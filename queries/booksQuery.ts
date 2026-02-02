import { gql } from "@apollo/client";

const BOOKS_QUERY = gql`
  query GetBooks($limit: Int, $offset: Int) {
    books (limit: $limit, offset: $offset) {
      id
      title
      description
      coverUrl
      releaseDate
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

export default BOOKS_QUERY;
