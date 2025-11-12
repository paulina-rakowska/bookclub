import { Schema, model, models } from "mongoose";
import { AuthorI } from "./author";
import AuthorModel from "@/models/author";
import { CategoryI } from "./category";

export type ID = string | number;

export interface BookI {
  id?: ID;
  title: string;
  description: string;
  cover: boolean;
  author: AuthorI[];
  category: CategoryI[];
}

const BookSchema = new Schema<BookI>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  cover: { type: Boolean, default: false },
  author: [{ type: Schema.Types.ObjectId, ref: "Author" }],
  category: [{ type: Schema.Types.ObjectId, ref: "Category" }],
});

BookSchema.statics.getBooks = async function (): Promise<BookI[]> {
  try {
    const data = await this.find({}).populate("author").populate("category");
    return data;
  } catch (err) {
    throw new Error("Failed to get books");
  }
};

BookSchema.statics.getBookById = async function (id: ID): Promise<BookI> {
  try {
    const data = await this.findById(id).populate("author").populate("category");
    return data as BookI;
  } catch (err) {
    throw new Error("Failed to get books");
  }
};

BookSchema.statics.addBook = async function (
  title: string,
  description: string,
  cover: boolean,
  authorIds: [ID],
  categoryIds: [ID]
): Promise<BookI> {
  console.log(authorIds);
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

  const book = new this({
    title,
    description,
    cover,
    author: authorIds,
    category: categoryIds || [],
  });
  await book.save();

  // Add the book to each author's books array
  for (const author of authors) {
    author.books.push(book);
    await author.save();
  }

  // Explicitly populate the author and category fields
  await book.populate("author");
  await book.populate("category");

  await book.save();

  return book as BookI;
};

const BookModel = models.Book || model<BookI>("Book", BookSchema);

export default BookModel;
