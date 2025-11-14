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
    category: [Category]
  }
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    books: [Book!]!
  }
  type Category {
    id: ID!
    name: String!
  }
  type Slide {
    id: ID!
    title: String!
    subtitle: String
    description: String
    linkText: String!
    linkHref: String!
    image: String!
  }

  type Query {
    books: [Book]
    book(id: ID!): Book
    authors: [Author]
    author(id: ID!): Author
    categories: [Category]
    category(id: ID!): Category
    slides: [Slide]
  }

  type Mutation {
    addAuthor(firstName: String!, lastName: String!): Author!
    addBook(title: String!, description: String, cover: Boolean!, authorIds: [ID!]!, categoryIds: [ID]): Book!
    addCategory(name: String!): Category!
    addSlide(title: String!, subtitle: String, description: String, linkText: String!, linkHref: String!, image: String!): Slide!
    updateBookCover(id: ID!, cover: Boolean!): Book!  
    updateBookCategory(id: ID!, categoryId: ID!): Book! 
  }

`;