import { Schema } from 'mongoose';

const ProductSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: 'categories',
      required: true,
    },
    //짧은 소개
    shortDescription: {
      type: String,
      required: true,
    },
    //디테일 소개
    detailDescription: {
      type: String,
      required: true,
    },
    imageKey: {
      type: String,
      required: true,
    },
    //수량
    inventory: {
      type: Number,
      min: 0,
      default: 10,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    //키워드 , 카테고리가 겹쳐서 고민
    // searchKeywords: {
    //   type: [String],
    //   required: true,
    // },
  },
  {
    collection: 'products',
    timestamps: true,
  },
);

export default ProductSchema;
