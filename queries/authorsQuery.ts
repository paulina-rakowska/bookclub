import { gql } from '@apollo/client';

const AUTHOR_QUERY = gql`
  query GetAuthors {
    authors {
        id
        firstName
        lastName
        books {
            id
            title
            description
        }
    }
  }
`;

export default AUTHOR_QUERY;