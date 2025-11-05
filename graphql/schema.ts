import { gql } from "apollo-server-micro";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`#graphql
  type Book {
    id: ID!
    title: String!
    description: String
    cover: Boolean!
    author: [Author!]!
  }
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    books: [Book!]!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
  }

  type Mutation {
    addAuthor(firstName: String!, lastName: String!): Author!
    addBook(title: String!, description: String, cover: Boolean!, authorIds: [ID!]!): Book!
  }

`;