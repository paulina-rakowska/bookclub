import type { Model } from "mongoose";
import { Schema, model, models } from 'mongoose';

export type ID = string | number;

export interface CategoryI {
  id?: ID;
  name: string;
}

interface CategoryModelType extends Model<CategoryI> {
    getCategories(): Promise<CategoryI[]>
    getCategoryById(id: ID): Promise<CategoryI>;
    addCategory(name: string): Promise<CategoryI>;   
}

const CategorySchema = new Schema<CategoryI>({
  name:{ type: String, required: true },
});

CategorySchema.statics.getCategories = async function(): Promise<CategoryI[]> {
  try {
    const data = await this.find({});
    return data;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get Categories');
  }
}

CategorySchema.statics.getCategoryById = async function(id: ID): Promise<CategoryI> {
  try {
    const data = await this.findById(id);
    return data as CategoryI;
  } catch (err) {
    console.log(err);
    throw new Error('Failed to get Category');
  }
}

CategorySchema.statics.addCategory = async function(name: string): Promise<CategoryI> {
  
  const Category = new this({ name });
  await Category.save();

  return Category as CategoryI;

}

const CategoryModel =
  (models.Category as CategoryModelType) || model<CategoryI, CategoryModelType>("Category", CategorySchema);


export default CategoryModel;