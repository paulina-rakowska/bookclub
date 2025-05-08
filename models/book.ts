import { Schema, model } from 'mongoose';
import Author from './author';
import mongoose from 'mongoose';

export interface BookI {
  title: string;
  description: string;
  author: Array<typeof Author>
}

const BookSchema = new Schema<BookI>({
  title:{ type: String, required: true },
  description: { type: String, required: true },
  author: [{ type:Schema.Types.ObjectId, ref: 'Author' }]
});

const BookModel = () => model<BookI>('Book', BookSchema);

// export const getBooks = async () => {
//   const BookModel = await BookModel();
//   const instance = await BookModel.find({}, (err: any, foundItems: any) => {
//     if (err) {
//       console.log(err);
//       return err;
//     } else {
//       return foundItems
//     }
//   });
//   const data = instance;
//   return data;
// }

export const getBooks = async () => {
  try {
    const data = await BookModel.find().populate('book');
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get books');
  }
};


export default (mongoose.models.Book || BookModel()) as ReturnType<
  typeof BookModel
>;