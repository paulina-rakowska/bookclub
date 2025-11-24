import { BookI, ID } from "@/models/book";
import { AuthorI } from "@/models/author";
import BookModel from "@/models/book";
import AuthorModel from "@/models/author";
import CategoryModel, { CategoryI } from "@/models/category";

export const resolvers = {
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
