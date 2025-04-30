import { gql } from "@apollo/client";

const BOOKS_QUERY = gql`
  query GetBooks {
    books {
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

export default BOOKS_QUERY;
