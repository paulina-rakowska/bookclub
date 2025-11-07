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
      category {
        id
        name
      }
    }
  }
`;

export default BOOKS_QUERY;
