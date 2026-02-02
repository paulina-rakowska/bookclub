import { gql } from "@apollo/client";

const NEWEST_QUERY = gql`
  query GetNewestBooks {
    books (limit:10, offset: 0, sort:"releaseDate") {
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

export default NEWEST_QUERY;
