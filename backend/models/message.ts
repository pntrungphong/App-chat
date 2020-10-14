import { Document, model, Schema } from "mongoose";

export interface message extends Document {
  chatRoomId: string;
  userId: string;
  message: string;
}
export const messageSchema = new Schema({
  chatRoom: {
    type: Schema.Types.ObjectId,
    ref: "ChatRoom",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  message: {
    type: String,
    minlength: 1,
  },
});
export const Message = model<message>("message", messageSchema);
