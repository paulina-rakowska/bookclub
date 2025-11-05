import { BookI, ID } from '@/models/book';
import { AuthorI } from '@/models/author';
import BookModel from '@/models/book';
import AuthorModel from '@/models/author';

export const resolvers = {
  Query: {
    books: async ()=> {
      return await BookModel.getBooks();
    },
    author: async (_: Promise<AuthorI | null>, { id }: { id: ID }) => {
      const author = await AuthorModel.getAuthorById(id);
      console.log("in author");
      console.log(author);
      return author as AuthorI;
    },
    book: async (_: Promise<BookI | null>, { id }: { id: ID }) => {   
      const book = await BookModel.getBookById(id);
      if (!book) throw new Error('Book not found');
      await book.populate('author');
      console.log("in resolvers");
      console.log(book);
      return book as BookI;
    },
    authors: async() => {
      return await AuthorModel.getAuthors();
    }
  },

  Mutation: {
    addAuthor: async (_parent, { firstName, lastName }: { firstName: string; lastName: string }) => {
      return await new AuthorModel({ firstName, lastName }).save();
    },
    addBook: async (_parent, { title, description, cover, authorIds }: { title: string; description: string; cover: boolean; authorIds: [ID]}) => {
      return await BookModel.addBook(title, description, cover, authorIds);
    }
  }
};