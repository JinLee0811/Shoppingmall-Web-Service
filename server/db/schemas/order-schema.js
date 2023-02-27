import { Schema } from 'mongoose';

const OrderItemSchema = new Schema(
  {
    //상품 아이디
    productId: {
      type: String,
      required: true,
    },
    //수량
    quantity: {
      type: Number,
      required: true,
    },
    //총 가격
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false },
);

const OrderSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'users',
      required: true,
    },
    items: {
      type: [OrderItemSchema],
      required: true,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
          receiverName: String,
          receiverPhoneNumber: String,
        },
        {
          _id: false,
        },
      ),
      required: true,
    },
    //배송상태 '상품 준비 중, 배송 중, 배송 완료'
    status: {
      type: String,
      required: false,
      default: '상품 준비중',
    },
  },
  {
    collection: 'orders',
    timestamps: true,
  },
);

export default OrderSchema;
