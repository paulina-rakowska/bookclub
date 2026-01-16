import { BookI, ID } from "@/models/book";
import { AuthorI } from "@/models/author";
import BookModel from "@/models/book";
import AuthorModel from "@/models/author";
import CategoryModel, { CategoryI } from "@/models/category";
import { GraphQLScalarType, Kind } from "graphql";

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Date Custom Scalar Type",
  //from server to client
  serialize(value) {
    if(value instanceof Date) {
      return value.toISOString();
    }
  },
  //from client to server
  parseValue(value:unknown) {
    if(typeof value === 'string' || typeof value === 'number') {
      const date = new Date(value);
      if(isNaN(date.getTime())) {
        throw new Error('Invalid date format');
      }
      return date;
    }
    throw new Error('Date must be a string or number');
  },
  //from client inline query
  parseLiteral(ast) {
    if(ast.kind == Kind.STRING || ast.kind == Kind.INT) {
      return new Date(ast.value);
    }
    return null;
  },

});

export const resolvers = {
  Date: dateScalar,
  Query: {
    books: () => BookModel.getBooks(),
    book: (_: Promise<BookI | null>, { id }: { id: ID }) =>
      BookModel.getBookById(id),
    authors: () => AuthorModel.getAuthors(),
    author: (_: Promise<AuthorI | null>, { id }: { id: ID }) => 
      AuthorModel.getAuthorById(id),
    categories: () => CategoryModel.getCategories(),
    category: (_: Promise<CategoryI | null>, { id }: { id: ID }) => 
      CategoryModel.getCategoryById(id),
  },

  Mutation: {
    addAuthor: async (
      _parent: unknown,
      { firstName, lastName }: { firstName: string; lastName: string }
    ) => {
      return await new AuthorModel({ firstName, lastName }).save();
    },
    addBook: async (
      _parent: unknown,
      {
        title,
        description,
        cover,
        authorIds,
        categoryIds,
      }: {
        title: string;
        description: string;
        cover: boolean;
        authorIds: ID[];
        categoryIds: ID[];
      }
    ) => {
      return await BookModel.addBook(
        title,
        description,
        cover,
        authorIds,
        categoryIds
      );
    },
    addCategory: async (_parent: unknown, { name }: { name: string }) => {
      return await CategoryModel.addCategory(name);
    },
    updateBookCover: async (
      _parent: unknown,
      { id, cover }: { id: ID; cover: boolean }
    ) => {
      const book = await BookModel.findByIdAndUpdate(
        id,
        { cover },
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
