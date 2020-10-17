import * as joi from "@hapi/joi";
import { model, Document, Schema } from "mongoose";
// const joi=require('joi')
export interface User extends Document {
  name: String;
  email: String;
  password: String;
}
export const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 5,
      maxlength: 50,
    },
    email: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 100,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 6,
      maxlength: 1024,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);
export const User = model<User>("User", UserSchema);
export const validateUser = (user: any) => {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
    email: joi.string().min(10).max(100).email().required(),
    password: joi.string().min(6).max(1024).required(),
    // image:joi.string().required()
  });
  return schema.validate(user);
};
