import { gql } from '@apollo/client';

const PUBLISHER_QUERY = gql`
  query GetPublisher($id: ID!) {
    publisher(id: $id) {
      id
      name
      description
    }
  }
`;

export default PUBLISHER_QUERY;