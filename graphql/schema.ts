import { gql } from "apollo-server-micro";
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
export const typeDefs = gql`
  #graphql
  scalar Date
  type Book {
    id: ID!
    title: String!
    description: String
    coverUrl: String
    releaseDate: Date
    author: [Author!]!
    category: [Category]
    publisher: Publisher!
  }
  type Author {
    id: ID!
    firstName: String!
    lastName: String!
    biography: String
    imageUrl: String
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
  type Publisher {
    id: ID!
    name: String!
    description: String
  }

  type Query {
    books(limit: Int, offset: Int, categoryId: ID): [Book]
    book(id: ID!): Book
    authors(limit: Int, sort: String): [Author]
    author(id: ID!): Author
    categories: [Category]
    category(id: ID!): Category
    slides: [Slide]
    publishers: [Publisher]
    publisher(id: ID!): Publisher
  }

  type Mutation {
    addAuthor(
      firstName: String!
      lastName: String!
      biography: String
      imageUrl: String
    ): Author!
    addBook(
      title: String!
      description: String
      coverUrl: String
      releaseDate: Date
      authorIds: [ID!]!
      categoryIds: [ID]
      publisherId: ID!
    ): Book!
    addCategory(name: String!): Category!
    addPublisher(name: String!, description: String): Publisher!
    addSlide(
      title: String!
      subtitle: String
      description: String
      linkText: String!
      linkHref: String!
      image: String!
    ): Slide!
    updateBookCover(id: ID!, coverUrl: String!): Book!
    updateBookCategory(id: ID!, categoryId: ID!): Book!
  }
`;
