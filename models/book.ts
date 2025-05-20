import { Schema, model, models } from 'mongoose';
import { AuthorI } from './author';
import AuthorModel from '@/models/author';

export type ID = string | number;

export interface BookI {
  title: string;
  description: string;
  author: AuthorI[]
}

const BookSchema = new Schema<BookI>({
  title:{ type: String, required: true },
  description: { type: String, required: true },
  author: [{ type:Schema.Types.ObjectId, ref: 'Author' }]
});

BookSchema.statics.getBooks = async function() {
  try {
    const data = await this.find({}).populate('author');
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get books');
  }
}

BookSchema.statics.getBookById = async function(id: ID) {
  try {
    const data = await this.findById(id).populate('author');
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get books');
  }
}

BookSchema.statics.addBook = async function(title, description, authorId) {
  const author = AuthorModel.getAuthorById(authorId);
  console.log("author");
  console.log(author);
  if (!author) throw new Error('Author not found');
  const book = new this({ title, description, authorId });
  console.log(book);
  if(author) author.books.push(book);
  await Promise.all([book.save(), author.save()])
  return book;

}

const BookModel = models.Book || model<BookI>('Book', BookSchema);


export default BookModel;