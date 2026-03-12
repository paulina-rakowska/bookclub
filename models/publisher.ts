import type { Model } from "mongoose";
import { Schema, model, models } from "mongoose";

export type ID = string | number;

export interface PublisherI {
  id?: ID;
  name: string;
  description: string;
}

interface PublisherModelType extends Model<PublisherI> {
  getPublishers(): Promise<PublisherI[]>;
  getPublisherById(id: ID): Promise<PublisherI>;
  addPublisher(name: string, description: string): Promise<PublisherI>;
}

const PublisherSchema = new Schema<PublisherI>({
  name: { type: String, required: true },
  description: { type: String, required: false },
});

PublisherSchema.statics.getPublishers = async function (): Promise<
  PublisherI[]
> {
  try {
    const data = this.find({});
    return data;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get publishers");
  }
};

PublisherSchema.statics.getPublisherById = async function (
  id: ID,
): Promise<PublisherI> {
  try {
    const data = this.findById(id);
    return data as PublisherI;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to get publisher");
  }
};

PublisherSchema.statics.addPublisher = async function (
  name: string,
  description: string,
): Promise<PublisherI> {
  const Publisher = new this({ name, description });
  Publisher.save();

  return Publisher as PublisherI;
};

const PublisherModel =
  (models.Publisher as PublisherModelType) ||
  model<PublisherI, PublisherModelType>("Publisher", PublisherSchema);

export default PublisherModel;
