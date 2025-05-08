import { Schema, model } from 'mongoose';
import BookI from './book';
import mongoose from 'mongoose';

export interface AuthorI {
  firstName: string,
  lastName: string,
  books: Array<typeof BookI>
}

const AuthorSchema = new Schema<AuthorI>({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]!
});

const AuthorModel = () => model<AuthorI>('Author', AuthorSchema)

export default (mongoose.models.Author || AuthorModel()) as ReturnType<
  typeof AuthorModel
>;


// AuthorSchema.statics.findBooks = function(id) {
//   return this.findById(id)
//     .populate('books')
//     .then(author => author.books);
// }