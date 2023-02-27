import { Schema } from 'mongoose';

const CategorySchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
  },
  {
    collection: 'categories',
    timestamps: true,
  },
);

export default CategorySchema;
