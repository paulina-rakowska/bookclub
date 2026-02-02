import { BookI, ID } from "@/models/book";
import { AuthorI } from "@/models/author";
import BookModel from "@/models/book";
import AuthorModel from "@/models/author";
import CategoryModel, { CategoryI } from "@/models/category";
import { GraphQLScalarType, Kind } from "graphql";
import PublisherModel, { PublisherI } from "@/models/publisher";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date Custom Scalar Type (YYYY-MM-DD)",
  //from server to client
  serialize(value) {
    if(value instanceof Date) {
      return value?.toISOString()?.split('T')[0]
    }
    throw new Error('Date serialize error: value is not a Date instance');
  },
  //from client to server (variables)
  parseValue(value:unknown) {
    if(typeof value === 'string') {
      //Validate format YYYY-MM-DD
      if(! /^\d{4}-\d{2}-\d{2}$/.test(value)) {
        throw new Error('Invalid date format. Expected YYYY-MM-DD');
      }
      const date = new Date(value + 'T00:00:00.000Z');
      if(isNaN(date.getTime())) {
        throw new Error('Invalid date value.');
      } 
      return date; // Return Date object
    }
    throw new Error('Date must be a string in YYYY-MM-DD format');
  },
  //from client inline query
  parseLiteral(ast) {
    if(ast.kind == Kind.STRING) {
      const date = new Date(ast.value + 'T00:00:00.000Z');
      if(isNaN(date.getTime())){
        throw new Error("Invalid date format. Expected YYYY-MM-DD");
      }
      return date; // Return Date object
    }
    return new Error("Date literal must be a string in YYYY-MM-DD format");
  },

});

export const resolvers = {
  Date: dateScalar,
  Query: {
    books: (_: Promise<BookI[] | []>, { limit, offset, sort }: { limit: number, offset: number, sort: string }) => {
      return BookModel.getBooks(limit, offset)
    },
    book: (_: Promise<BookI | null>, { id }: { id: ID }) =>
      BookModel.getBookById(id),
    authors: () => AuthorModel.getAuthors(),
    author: (_: Promise<AuthorI | null>, { id }: { id: ID }) => 
      AuthorModel.getAuthorById(id),
    categories: () => CategoryModel.getCategories(),
    category: (_: Promise<CategoryI | null>, { id }: { id: ID }) => 
      CategoryModel.getCategoryById(id),
    publishers: () => PublisherModel.getPublishers(),
    publisher: (_: Promise<PublisherI | null>, {id }: {id: ID}) => PublisherModel.getPublisherById(id)
  },

  Mutation: {
    addAuthor: async (
      _parent: unknown,
      { firstName, lastName, biography }: { firstName: string; lastName: string; biography: string }
    ) => {
      return await new AuthorModel({ firstName, lastName, biography }).save();
    },
    addBook: async (
      _parent: unknown,
      {
        title,
        description,
        coverUrl,
        releaseDate,
        authorIds,
        categoryIds,
        publisherId
      }: {
        title: string;
        description: string;
        coverUrl: string;
        releaseDate: Date;
        authorIds: ID[];
        categoryIds: ID[];
        publisherId: ID;
      }
    ) => {
      return await BookModel.addBook(
        title,
        description,
        coverUrl,
        releaseDate,
        authorIds,
        categoryIds,
        publisherId
      );
    },
    addCategory: async (_parent: unknown, { name }: { name: string }) => {
      return await CategoryModel.addCategory(name);
    },
    addPublisher: async (_parent: unknown, { name, description }: { name: string, description: string }) => {
      return await PublisherModel.addPublisher(name, description)
    },
    updateBookCover: async (
      _parent: unknown,
      { id, coverUrl }: { id: ID; coverUrl: string }
    ) => {
      const book = await BookModel.findByIdAndUpdate(
        id,
        { coverUrl },
        { new: true } // Return the updated document
      ).populate("author");

      if (!book) throw new Error("Book not found");
      return book;
    },
    updateBookCategory: async (
      _parent: unknown,
      { id, categoryId }: { id: ID; categoryId: ID }
    ) => {
      const category = await CategoryModel.getCategoryById(categoryId);
      if (!category) throw new Error("Category not found");
      const book = await BookModel.findByIdAndUpdate(
        id,
        { category },
        { new: true } // Return the updated document
      ).populate("category").populate("author");

      if (!book) throw new Error("Book not found");
      return book;
    },
  },
};
