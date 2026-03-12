import { gql } from "@apollo/client";

const BOOKS_QUERY = gql`
  query GetBooks($limit: Int, $offset: Int, $categoryId: ID) {
    books(limit: $limit, offset: $offset, categoryId: $categoryId) {
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
