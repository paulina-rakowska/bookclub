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

BookSchema.statics.getBooks = async function(): Promise<BookI[]> {
  try {
    const data = await this.find({}).populate('author');
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get books');
  }
}

BookSchema.statics.getBookById = async function(id: ID): Promise<BookI> {
  try {
    const data = await this.findById(id).populate('author');
    console.log("in getBookById");
    console.log(data);
    return data as BookI;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get books');
  }
}

BookSchema.statics.addBook = async function(title: string, description: string, authorId: ID): Promise<BookI> {
  const author = await AuthorModel.getAuthorById(authorId);
  if (!author) throw new Error('Author not found');
  
  const book = new this({ title, description, author: [authorId] });
  await book.save();
    // Add the book to the author's books array
  author.books.push(book);
  await author.save();

  // Explicitly populate the author field
  await book.populate('author');

  await book.save();

  return book as BookI;

}

const BookModel = models.Book || model<BookI>('Book', BookSchema);


export default BookModel;