import { gql } from "apollo-server-micro";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`#graphql
  type Book {
    id: ID!
    title: String
    description: String
    authorId: ID!
  }
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    books: [Book!]!
  }

  type Query {
    books: [Book]
    booksById(id: Int!): Book
  }
`;

// type Mutation {
//   addAuthor(firstName: String!, lastName: String!): Author!
//   addBook(title: String!, description, authorId: ID!): Book!
// }