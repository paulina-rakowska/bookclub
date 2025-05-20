import { ID } from '@/models/book';
import { AuthorI } from '@/models/author';
import BookModel from '@/models/book';
import AuthorModel from '@/models/author';

export const resolvers = {
  Query: {
    books: async ()=> {
      return await BookModel.getBooks();
    },
    author: async (_: Promise<AuthorI | null>, { id }: { id: ID }) => {
      return await AuthorModel.getAuthorById(id);
    },
    bookById: async (_: any, { id }: { id: ID }) => {   
      return await BookModel.getBookById(id);
    },
  /*  authors: async() => {
      return await Author.getAuthors();
    }*/
  },

  Mutation: {
    addAuthor: async (_parent, { firstName, lastName }: { firstName: string; lastName: string }) => {
      return await new AuthorModel({ firstName, lastName }).save();
    },
    addBook: async (_parent, { title, description, authorId }: { title: string; description: string; authorId: ID}) => {
      return await new BookModel({ title, description, author: [authorId] }).save();
    }
  }
};