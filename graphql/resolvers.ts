import mongoose from 'mongoose';
import { getBooks } from '../models/book';

// const Book = mongoose.model('book');
// const Author = mongoose.model('author');

export const resolvers = {
  Query: {
    books: async () => {
      return await getBooks();
    },
   /* bookById: async (_: any, { id }: { id: number }) => {   
      return await Book.getBookById(id);
    },
    authors: async() => {
      return await Author.getAuthors();
    },
    authorById: async (_: any, { id }: { id: number }) => {
      return await Author.getAuthorById(id);
    }*/
  },

  // Mutation: {
  //   addAuthor: (_: any, { firstName, lastName }: { firstName: string; lastName: string }) => {

  //     return null; // Simulated addition
  //   },
  //   addBook: (_: any, { title, description }: { title: string; description: string }) => {
  //     return {

  //     };
  //   }
  // }
};