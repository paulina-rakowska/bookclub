import type { Model } from "mongoose";
import { Schema, model, models } from "mongoose";
import { BookI, ID } from "./book";

export interface AuthorI {
  id?: ID;
  firstName: string;
  lastName: string;
  biography: string;
  imageUrl: string;
  books: BookI[];
}
interface AuthorModelType extends Model<AuthorI> {
  getAuthorById(id: ID): Promise<AuthorI>;
  getAuthors(limit?: number, sort?: string): Promise<AuthorI[]>;
}

const AuthorSchema = new Schema<AuthorI>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  biography: { type: String, required: false },
  imageUrl: { type: String, required: false },
  books: [{ type: Schema.Types.ObjectId, ref: "Book" }]!,
});

AuthorSchema.statics.getAuthorById = async function (
  id: ID,
): Promise<AuthorI[]> {
  try {
    const author = await this.findById(id);
    author.populate("books");
    return author as AuthorI[];
  } catch (err) {
    console.error(err);
    throw new Error("Failed to get author by ID");
  }
};

AuthorSchema.statics.getAuthors = async function (
  limit?: number,
  sort?: string,
): Promise<AuthorI[]> {
  try {
    const data = await this.find({})
      .populate("books")
      .limit(limit || 0)
      .exec();
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get authors");
  }
};

AuthorSchema.statics.getTopAuthors = async function (): Promise<AuthorI[]> {
  try {
    const data = await this.find({}).populate("books");
    return data;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to get authors");
  }
};

const AuthorModel =
  (models.Author as AuthorModelType) ||
  model<AuthorI, AuthorModelType>("Author", AuthorSchema);

export default AuthorModel;
