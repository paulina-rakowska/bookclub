import { gql } from "@apollo/client";

const BOOKS_QUERY = gql`
  query GetBooks {
    books {
      id
      title
      description
      cover
      author {
        id
        firstName
        lastName
      }
    }
  }
`;

export default BOOKS_QUERY;
