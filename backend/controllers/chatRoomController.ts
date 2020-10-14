import { ChatRoom } from "../models/chatRoom";
import * as joi from "@hapi/joi";

export const createChatRoom = async (req: any, res: any) => {
  const { name } = req.body;
  const { error } = validate(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  let chatRoom = await ChatRoom.findOne({ name });
  if (chatRoom) return res.status(400).send("Chat room is already exist");
  chatRoom = new ChatRoom({ name });
  await chatRoom.save();
  res.status(200).send("created chat room");
};

export const getAllChatRooms = async (req: any, res: any) => {
  const room = await ChatRoom.find();
  res.status(200).send(room);
};

export const validate = (req: any) => {
  const schema = joi.object({
    name: joi.string().min(5).max(50).required(),
  });
  return schema.validate(req);
};
