import { Schema, model, models} from 'mongoose';
import { BookI, ID } from './book';


export interface AuthorI {
  firstName: string,
  lastName: string,
  books: BookI[]
}

const AuthorSchema = new Schema<AuthorI>({
  firstName: { type: String, required: true },
  lastName:  { type: String, required: true },
  books: [{ type: Schema.Types.ObjectId, ref: 'Book' }]!
});

AuthorSchema.statics.getAuthorById = async function (id: ID) {
  try {
    console.log(id);
    return await this.findById(id).populate('books');
  } catch (err) {
    console.error(err);
    throw new Error('Failed to get author by ID');
  }
};

const AuthorModel = (models.Author || model<AuthorI>('Author', AuthorSchema));

export default AuthorModel;