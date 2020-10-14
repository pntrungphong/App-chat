import * as joi from "@hapi/joi";
import { model, Document, Schema } from "mongoose";
export interface chatRoom extends Document {
  name: string;
}
export const chatRoomSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
});
export const ChatRoom = model<chatRoom>("ChatRoom", chatRoomSchema);
export const validateRoom = (room: any) => {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
  });
  return schema.validate(room);
};
