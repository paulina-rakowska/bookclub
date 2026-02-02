import type { Model } from "mongoose";
import { Schema, model, models } from "mongoose";
import { AuthorI } from "./author";
import AuthorModel from "@/models/author";
import { CategoryI } from "./category";
import PublisherModel, { PublisherI } from "./publisher";

export type ID = string | number;

export interface BookI {
  id?: ID;
  title: string;
  description: string;
  coverUrl: string;
  releaseDate: Date;
  author: AuthorI[];
  category: CategoryI[];
  publisher: PublisherI;
}

interface BookModelType extends Model<BookI> {
  getBooks(limit?: number, offset?: number, sort?: string): Promise<BookI[]>;
  getBookById(id: ID): Promise<BookI>;
  addBook(
    title: string,
    description: string,
    coverUrl: string,
    releaseDate: Date,
    authorIds: ID[],
    categoryIds: ID[],
    publisherId: ID
  ): Promise<BookI>;
}


const BookSchema = new Schema<BookI>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverUrl: { type: String, required: false },
  releaseDate: { type: Date, required: true },
  author: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
  publisher: { type: Schema.Types.ObjectId, ref: "Publisher"}
});

BookSchema.statics.getBooks = async function (limit: number, offset: number = 0, sort: string): Promise<BookI[]> {
  try {
    const data = await this.find({})
                            .populate("author")
                            .populate("category")
                            .populate("publisher")
                            .skip(offset)
                            .limit(limit || 0)
                            .exec();
    return data;
  } catch (err) {
    console.error("getBooks error:", err);
    throw err; 
  }
};

BookSchema.statics.getBookById = async function (id: ID): Promise<BookI> {
  try {
    const data = await this.findById(id).populate("author").populate("category").populate("publisher");
    if (!data) throw new Error("Book not found");
    return data as BookI;
  } catch (err) {
    console.error("getBookById error:", err);
    throw err;
  }
};

BookSchema.statics.addBook = async function (
  title: string,
  description: string,
  coverUrl: string,
  releaseDate: Date,
  authorIds: [ID],
  categoryIds: [ID],
  publisherId: ID
): Promise<BookI> {

  const authors = await AuthorModel.find({ _id: { $in: authorIds } });

  if (!authors || authors.length !== authorIds.length) {
    throw new Error("No authors found");
  }
  // Validate categories if provided
  let categories = [];
  if (categoryIds && categoryIds.length > 0) {
    const CategoryModel = models.Category || model("Category");
    categories = await CategoryModel.find({ _id: { $in: categoryIds } });
    if (categories.length !== categoryIds.length) {
      throw new Error("One or more categories not found");
    }
  }

  const publisher = await PublisherModel.findById(publisherId);
  if(!publisher) {
    throw new Error("No publisher found");
  }

  const book = new this({
    title,
    description,
    coverUrl,
    releaseDate,
    author: authorIds,
    category: categoryIds || [],
    publisher: publisher
  });
  console.log(book);
  await book.save();

  // Add the book to each author's books array
  for (const author of authors) {
    author.books.push(book);
    await author.save();
  }

  // Explicitly populate the author and category fields
  await book.populate("author");
  await book.populate("category");
  await book.populate("publisher");

  await book.save();

  return book as BookI;
};

const BookModel =
  (models.Book as BookModelType) || model<BookI, BookModelType>("Book", BookSchema);

export default BookModel;