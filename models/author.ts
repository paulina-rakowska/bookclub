import { Schema, model } from 'mongoose';
import BookSchema from './book';

const defineAuthorModel = async () => {
  const AuthorSchema = new Schema({
    firstName: String,
    lastName: String,
    books: [BookSchema]!
  });

  const AuthorModel = model('author', AuthorSchema);
  return AuthorModel;

}

export default defineAuthorModel;

// AuthorSchema.statics.findBooks = function(id) {
//   return this.findById(id)
//     .populate('books')
//     .then(author => author.books);
// }