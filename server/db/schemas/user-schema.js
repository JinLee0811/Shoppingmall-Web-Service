import { Schema } from 'mongoose';

const UserSchema = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    //해쉬화된 문자열로 저장 해야함!!
    password: {
      type: String,
      required: true,
    },
    role: {
      //USER, ADMIN
      type: String,
      required: true,
      default: 'USER',
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    address: {
      type: new Schema(
        {
          postalCode: String,
          address1: String,
          address2: String,
        },
        {
          _id: false,
        },
      ),
      required: false,
    },
  },
  {
    collection: 'users',
    timestamps: true,
  },
);

export default UserSchema;
