import { gql } from "@apollo/client";

const TOP_AUTHORS_QUERY = gql`
  query GetTopAuthors($limit: Int, $sort: String) {
    authors(limit: $limit, sort: $sort) {
      id
      firstName
      lastName
      biography
      books {
        id
        title
        description
      }
    }
  }
`;

export default TOP_AUTHORS_QUERY;
