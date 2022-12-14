import { Schema } from 'mongoose';

const UserSchema = new Schema(
   {
      email: {
         type: String,
         required: true,
      },
      name: {
         type: String,
         required: true,
      },
      password: {
         type: String,
         required: true,
      },
      phoneNumber: {
         type: String,
         required: false,
      },
      address: {
         type: new Schema(
            {
               postalCode: String,
               address: String,
               addressDetail: String,
            },
            {
               _id: false,
            },
         ),
         required: false,
      },
      role: {
         type: String,
         required: false,
         default: 'basic',
      },
   },
   {
      collection: 'users',
      timestamps: true,
   },
);

const EmailAuthSchema = new Schema({
   email: {
      type: String,
      required: true,
   },
   code: {
      type: String,
      required: true,
   },
   createdAt: {
      type: Date,
      expires: 180,
      default: Date.now,
   },
});

export { UserSchema, EmailAuthSchema };
