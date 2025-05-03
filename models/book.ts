import { Schema, model } from 'mongoose';
import defineAuthorModel from './author';

const defineBookModel = async () => {
  const BookSchema = new Schema({
    title: String,
    author: [defineAuthorModel],
    description: String
  });

  const BookModel = model('book', BookSchema);
  return BookModel;

}

export const getBooks = async () => {
  const BookModel = await defineBookModel();
  const instance = await BookModel.find({}, (err: any, foundItems: any) => {
    if (err) {
      console.log(err);
      return err;
    } else {
      return foundItems
    }
  });
  const data = instance;
  return data;
}

export default defineBookModel;