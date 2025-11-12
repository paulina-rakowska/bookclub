import { BookI, ID } from "@/models/book";
import { AuthorI } from "@/models/author";
import BookModel from "@/models/book";
import AuthorModel from "@/models/author";
import CategoryModel, { CategoryI } from "@/models/category";

export const resolvers = {
  Query: {
    books: async () => {
      return await BookModel.getBooks();
    },
    book: async (_: Promise<BookI | null>, { id }: { id: ID }) => {
      const book = await BookModel.getBookById(id);
      if (!book) throw new Error("Book not found");
      await book.populate("author");
      await book.populate("category");
      console.log("in resolvers");
      console.log(book);
      return book as BookI;
    },
    authors: async () => {
      return await AuthorModel.getAuthors();
    },
    author: async (_: Promise<AuthorI | null>, { id }: { id: ID }) => {
      const author = await AuthorModel.getAuthorById(id);
      console.log("in author");
      console.log(author);
      return author as AuthorI;
    },
    categories: async () => {
      return await CategoryModel.getCategories();
    },
    category: async (_: Promise<CategoryI | null>, { id }: { id: ID }) => {
      const category = await CategoryModel.getCategoryById(id);
      if (!category) throw new Error("Category not found");
      console.log("in resolvers");
      console.log(category);
      return category as CategoryI;
    },
  },

  Mutation: {
    addAuthor: async (
      _parent,
      { firstName, lastName }: { firstName: string; lastName: string }
    ) => {
      return await new AuthorModel({ firstName, lastName }).save();
    },
    addBook: async (
      _parent,
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
        authorIds: [ID];
        categoryIds?: [ID];
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
    addCategory: async (_parent, { name }: { name: string }) => {
      return await CategoryModel.addCategory(name);
    },
    updateBookCover: async (
      _parent,
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
      _parent,
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
